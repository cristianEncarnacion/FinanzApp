import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../database/backend";

const Estadisticas = () => {
  const { user, transaccion, setTransaccion } = useAuth();

  useEffect(() => {
    const fetchTransacciones = async () => {
      if (!user) return;
      console.log(user);
      let { data, error } = await supabase
        .from("transactions")
        .select("id,descripcion, monto, tipo, categoria, fecha")
        .eq("user_id", user?.id);
      if (error) {
        console.log(error);
      }
      if (data) {
        setTransaccion(data);
      }
    };
    fetchTransacciones();
  }, [user]);

  const formatter = new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
  });

  const balanceTotal = transaccion.reduce(
    (acc: number, t: any) => (t.tipo === "Ingreso" ? acc + t.monto : acc),
    0
  );

  const ingresosTotales = transaccion.reduce(
    (acc: number, t: any) => (t.tipo === "Ingreso" ? acc + t.monto : acc),
    0
  );

  const gastosTotales = transaccion.reduce(
    (acc: number, t: any) => (t.tipo === "Gasto" ? acc + t.monto : acc),
    0
  );

  const total = balanceTotal - gastosTotales;

  return (
    <section className="flex w-full flex-col items-center px-4 py-6">
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3 w-full max-w-5xl">
        <div className="shadow-md p-6 bg-white rounded-md flex flex-col items-center">
          <h2 className="text-lg font-semibold">Balance Total</h2>
          <p
            className={`${
              total < 0 ? "text-red-500" : "text-green-500"
            } text-2xl font-bold mt-2`}
          >
            {formatter.format(total)}
          </p>
        </div>
        <div className="shadow-md p-6 bg-white rounded-md flex flex-col items-center">
          <h2 className="text-lg font-semibold">Ingresos Totales</h2>
          <p className="text-green-500 text-2xl font-bold mt-2">
            {formatter.format(ingresosTotales)}
          </p>
        </div>
        <div className="shadow-md p-6 bg-white rounded-md flex flex-col items-center">
          <h2 className="text-lg font-semibold">Gastos Totales</h2>
          <p className="text-red-500 text-2xl font-bold mt-2">
            {formatter.format(gastosTotales)}
          </p>
        </div>
      </section>
    </section>
  );
};

export default Estadisticas;
