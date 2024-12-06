import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../database/backend";
import { useNavigate } from "react-router-dom";
import { User } from "../types/User";
import { Transaccion } from "../types/Transaccion";
import { Filter } from "../types/Filter";
interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
  checkUser: () => void;
  logout: () => void;
  login: (email: string, password: string) => void;
  isAuth: boolean;
  error: string;
  setError: (error: string) => void;
  signup: (email: string, password: string) => void;
  transaccion: Transaccion[];
  setTransaccion: React.Dispatch<React.SetStateAction<Transaccion[]>>;
  filterType: Filter;
  setFilterType: React.Dispatch<React.SetStateAction<Filter>>;
  message: string;
  setMessage: (message: string) => void;
  values: Transaccion;
  setValues: React.Dispatch<React.SetStateAction<Transaccion>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditTransaccion: (id: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [values, setValues] = useState<Transaccion>({
    id: 0,
    descripcion: "",
    monto: 0,
    tipo: "Gasto",
    categoria: "Otro",
    fecha: new Date().toISOString().split("T")[0],
  });
  const [transaccion, setTransaccion] = useState<Transaccion[]>([]);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [filterType, setFilterType] = useState<Filter>({
    tipo: "Todos los tipos",
    categoria: "Todas las categorias",
    fecha: "Ordenar por fecha",
    orden: "Descendente",
  });
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();
  const publicRoutes = ["/", "/login", "/registro"];

  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      setUser({
        id: session.user.id,
        email: session.user.email || "",
      });
      setIsAuth(true);
    }

    if (!session && !publicRoutes.includes(location.pathname)) {
      navigate("/login");
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
    setIsAuth(false);
  };

  const login = async (email: string, password: string) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email || "",
        });
      }
      if (session?.user.email_confirmed_at === null) {
        setError("Debe activar su cuenta para iniciar sesión");
        return;
      }
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError("Credenciales incorrectas");
        return;
      }

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || "",
        });
        setIsAuth(true);
        navigate("/finance");
      } else {
        setError("No se pudo iniciar sesión. Verifique sus credenciales.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Ocurrió un error inesperado. Intente nuevamente.");
    }
  };

  const signup = async (email: string, password: string) => {
    let { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError("Error al registrarse");
      return;
    }
  };

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError("");
      setMessage("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [error]);

  const handleEditTransaccion = async (id: number) => {
    const updateTransaccion = transaccion.map((t) =>
      t.id === id ? { ...t, ...values } : t
    )[0];
    if (!updateTransaccion) {
      console.error("Transacción no encontrada");
      return;
    }

    const { data, error } = await supabase
      .from("transactions")
      .update({
        descripcion: updateTransaccion.descripcion,
        monto: updateTransaccion.monto,
        tipo: updateTransaccion.tipo,
        categoria: updateTransaccion.categoria,
        fecha: updateTransaccion.fecha,
      })
      .eq("id", id);

    if (error) {
      console.error("Error actualizando transacción:", error.message);
      return;
    }

    if (data) {
      setTransaccion((prevTransaccion) =>
        prevTransaccion.map((t) => (t.id === id ? data[0] : t))
      );
    }
    setIsEdit(false);
    setValues({
      id: 0,
      descripcion: "",
      monto: 0,
      tipo: "Gasto",
      categoria: "Otro",
      fecha: new Date().toISOString().split("T")[0],
    });
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        checkUser,
        setError,
        logout,
        login,
        isAuth,
        error,
        signup,
        transaccion,
        setTransaccion,
        filterType,
        setFilterType,
        message,
        setMessage,
        values,
        setValues,
        isEdit,
        setIsEdit,
        handleEditTransaccion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};
