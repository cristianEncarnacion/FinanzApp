import { supabase } from "../database/backend";
import { useAuth } from "../context/AuthContext";

const FormFinance = () => {
  const { user, setValues, values, isEdit, handleEditTransaccion } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      values.descripcion === "" ||
      values.monto === 0 ||
      values.fecha === ""
    ) {
      alert("Por favor llenar todos los campos");
      return;
    }
    if (!user) return;
    if (isEdit) {
      handleEditTransaccion(values.id);
    } else {
      const { error } = await supabase
        .from("transactions")
        .insert([
          {
            descripcion: values.descripcion,
            monto: values.monto,
            tipo: values.tipo,
            categoria: values.categoria,
            fecha: values.fecha,
          },
        ])
        .eq("user_id", user?.id);
      if (error) {
        console.log(error);
      }

      setValues({
        id: 0,
        descripcion: "",
        monto: 0,
        tipo: "Gasto",
        categoria: "Otro",
        fecha: new Date().toISOString().split("T")[0],
      });
    }
  };

  return (
    <section className="bg-white shadow-md   p-4 md:w-full w-[300px] mx-auto">
      <h2 className="text-center md:text-left text-xl font-semibold mb-2">
        Nueva Transaccion
      </h2>
      <form
        onSubmit={handleClick}
        className="flex flex-col items-center gap-y-2 md:flex-row md:gap-x-4 md:gap-y-3 flex-wrap"
      >
        <input
          name="descripcion"
          type="text"
          value={values.descripcion}
          onChange={handleChange}
          className="md:w-[30%] border p-1"
          placeholder="Descripcion"
        />
        <input
          name="monto"
          type="number"
          value={values.monto}
          onChange={handleChange}
          className="md:w-[30%] border p-1"
          placeholder="Monto"
        />
        <select
          name="tipo"
          value={values.tipo}
          onChange={handleChange}
          className="w-[70%] md:w-[30%] border p-1"
        >
          <option value="Gasto">Gasto</option>
          <option value="Ingreso">Ingreso</option>
        </select>

        <select
          name="categoria"
          value={values.categoria}
          onChange={handleChange}
          className="w-[70%] md:w-[30%] border p-1"
        >
          <option value="otro">Otro</option>
          <option value="alimentacion">Alimentacion</option>
          <option value="entretenimiento">Entretenimiento</option>
          <option value="transporte">Transporte</option>
        </select>

        <input
          type="date"
          name="fecha"
          value={values.fecha}
          onChange={handleChange}
          className="w-[70%] md:w-[30%] border p-1"
        />
        <button
          className=" py-2 px-1  w-[70%] md:w-[30%] text-white bg-blue-500 hover:bg-blue-600"
          type="submit"
        >
          {isEdit ? "Editar transaccion" : "Añadir Transaccion"}
        </button>
      </form>
    </section>
  );
};

export default FormFinance;
