import { useState, useRef, useEffect } from "react";
import { User } from "../types/User";
import { useAuth } from "../context/AuthContext";

const Registro = () => {
  const [values, setValues] = useState<User>({
    id: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { signup, error, setError, message, setMessage } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const Focus = useRef<HTMLInputElement>(null);
  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.email && values.password) {
      if (values.password !== values.confirmPassword) {
        setError("Las contraseñas no coinciden");
        return;
      }
      if (values.password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres");
        return;
      }
      if (
        values.email === "" &&
        values.password === "" &&
        values.confirmPassword === ""
      ) {
        setError("Por favor llena todos los campos");
        return;
      } else {
        signup(values.email, values.password);
        setValues({
          id: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    }

    setMessage("Usuario registrado correctamente, por favor confirma tu email");
  };

  useEffect(() => {
    Focus.current?.focus();
  }, []);
  return (
    <div className=" bg-gradient-to-b from-blue-100 to-white flex justify-center items-center h-[100vh] p-[20px] flex-col ">
      <div className="bg-white text-gray-800 rounded-lg shadow-md p-5 max-w-md w-full">
        <h2 className="text-2xl mb-5 text-blue-600 font-bold text-center">
          Bienvenido
        </h2>
        {error && (
          <p className=" text-black text-xl text-center mt-3 bg-red-500 py-3 mb-2">
            {error}
          </p>
        )}
        {message && (
          <p className="text-black text-xl text-center mt-3 py-3 mb-2 bg-green-500">
            {message}
          </p>
        )}

        <form className="flex flex-col" onSubmit={handleClick}>
          <input
            ref={Focus}
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            required
            className="text-base p-3 mb-2 border border-gray-300 rounded-sm"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={values.password}
            onChange={handleChange}
            required
            className="text-base p-3 mb-2 border border-gray-300 rounded-sm"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirma tu contraseña"
            value={values.confirmPassword}
            onChange={handleChange}
            required
            className="text-base p-3 mb-2 border border-gray-300 rounded-sm"
          />
          <button
            type="submit"
            className="text-xl hover:bg-[#004d99] p-3 border-none rounded-md bg-[#0066cc] text-white cursor-pointer duration-[0.3s] ease transition-all"
          >
            Registrarse
          </button>
          <div>
            <p className="mt-5 text-center">
              ¿Ya tienes una cuenta?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Inicia Sesión
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Registro;
