import FormFinance from "../views/FormFinance";
import Estadisticas from "../views/Estadisticas";
import Filtros from "../views/Filtros";
import Transacciones from "../views/Transacciones";
import { useAuth } from "../context/AuthContext";

const Finance = () => {
  const { logout, user } = useAuth();
  return (
    <main className=" bg-gradient-to-b from-blue-100 to-white flex justify-center items-center flex-col relative ">
      <section className="mt-[50px] flex flex-col justify-center items-center mb-5">
        <button
          className="absolute md:left-[150px] top-0   bg-red-500 text-white px-4 py-2 rounded-md mt-4"
          onClick={logout}
        >
          Logout{" "}
        </button>
        <h2 className="hidden md:block md:text-2xl font-bold">
          Bienvenido {user?.email}
        </h2>
        <h1 className="mt-4 text-2xl font-bold">Finanzas Personales</h1>
        <section className="flex flex-col gap-y-8 mt-5">
          <FormFinance />
          <Estadisticas />
          <Filtros />
          <Transacciones />
        </section>
      </section>
    </main>
  );
};

export default Finance;
