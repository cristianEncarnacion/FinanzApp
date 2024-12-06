import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Filter } from "../types/Filter";

const Filtros = () => {
  const [values, setValues] = useState<Filter>({
    tipo: "Todos los tipos", // Corregido el valor
    categoria: "Todas las categorias",
    fecha: "Ordenar por fecha",
    orden: "Descendente",
  });
  const { setFilterType } = useAuth();

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setFilterType(values);
  }, [values]);

  return (
    <section className="bg-white shadow-md flex  flex-col justify-center items-center p-4 md:w-full w-[300px] mx-auto">
      <h2 className="text-xl font-semibold mb-2">Filtros y Ordenación</h2>
      <section className="flex flex-col md:flex-row justify-center items-center gap-y-4 md:gap-x-3 w-full">
        <select
          name="tipo"
          className=" w-[60%] border md:w-[25%] p-1"
          value={values.tipo}
          onChange={onChange}
        >
          <option value="Todos los tipos">Todos los tipos</option>
          <option value="Ingreso">Ingresos</option>
          <option value="Gasto">Gastos</option>
        </select>
        <select
          name="categoria"
          className=" w-[60%] border md:w-[25%] p-1"
          value={values.categoria}
          onChange={onChange}
        >
          <option value="Todas las categorias">Todas las categorias</option>
          <option value="Alimentacion">Alimentación</option>
          <option value="Entretenimiento">Entretenimiento</option>
          <option value="Transporte">Transporte</option>
          <option value="Otro">Otro</option>
        </select>
        <select
          name="fecha"
          className=" w-[60%] border md:w-[25%] p-1"
          value={values.fecha}
          onChange={onChange}
        >
          <option value="Ordenar por fecha">Ordenar por fecha</option>
          <option value="Ordenar por monto">Ordenar por monto</option>
        </select>
        <select
          name="orden"
          className=" w-[60%] border md:w-[25%] p-1"
          value={values.orden}
          onChange={onChange}
        >
          <option value="Descendente">Descendente</option>
          <option value="Ascendente">Ascendente</option>
        </select>
      </section>
    </section>
  );
};

export default Filtros;
