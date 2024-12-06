import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../database/backend";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const Transacciones = () => {
  const {
    user,
    transaccion,
    setTransaccion,
    filterType,
    setValues,
    setIsEdit,
  } = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchTransacciones = async () => {
      if (!user) return;
      let { data, error } = await supabase
        .from("transactions")
        .select("id, descripcion, monto, tipo, categoria, fecha")
        .eq("user_id", user?.id);
      if (error) {
        console.error(error);
      }
      if (data) {
        setTransaccion(data);
      }
    };
    fetchTransacciones();
  }, [user, transaccion]);

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Seguro que deseas eliminar?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    });

    if (result.isConfirmed) {
      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", id);
      if (error) {
        console.error(error);
        return;
      }
      Swal.fire({
        title: "Eliminado!",
        text: "La transacción ha sido eliminada.",
        icon: "success",
      });
      setTransaccion(transaccion.filter((t) => t.id !== id));
    }
  };
  const handleEdit = (id: number) => {
    const transactionToEdit = transaccion.find((t) => t.id === id);
    if (transactionToEdit) {
      setValues(transactionToEdit);
      setIsEdit(true);
    }
  };

  // Filtros y ordenación
  const filtroTransacciones = transaccion
    .filter((t) => {
      const tipoMatch =
        filterType.tipo === "Todos los tipos" || t.tipo === filterType.tipo;
      const categoriaMatch =
        filterType.categoria === "Todas las categorias" ||
        t.categoria === filterType.categoria;
      return tipoMatch && categoriaMatch;
    })
    .sort((a, b) => {
      if (filterType.fecha === "Ordenar por fecha") {
        const dateA = new Date(a.fecha).getTime();
        const dateB = new Date(b.fecha).getTime();
        return filterType.orden === "Ascendente"
          ? dateA - dateB
          : dateB - dateA;
      }
      if (filterType.fecha === "Ordenar por monto") {
        return filterType.orden === "Ascendente"
          ? a.monto - b.monto
          : b.monto - a.monto;
      }
      return 0;
    })
    .filter((t) => t.descripcion.toLowerCase().includes(search.toLowerCase()));

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const formatter = new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
  });
  return (
    <section className="p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Transacciones</h2>
      <input
        type="text"
        placeholder="Buscar"
        className="w-[100%] md:w-[25%] p-2 mb-2 border rounded-lg"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="w-[300px] md:w-full">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Descripción</TableCell>
                <TableCell>Monto</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Categoría</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtroTransacciones
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((t, index) => (
                  <TableRow key={index} hover className="transition">
                    <TableCell>
                      {t.descripcion.slice(0, 30) +
                        (t.descripcion.length > 30 ? "..." : "")}
                    </TableCell>
                    <TableCell>{formatter.format(t.monto)}</TableCell>
                    <TableCell>{t.tipo}</TableCell>
                    <TableCell>{t.categoria}</TableCell>
                    <TableCell>{t.fecha}</TableCell>
                    <TableCell>
                      <div className="flex gap-x-2">
                        <Button
                          variant="contained"
                          color="error"
                          size="large"
                          onClick={() => handleDelete(t.id)}
                        >
                          <MdDelete />
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          onClick={() => handleEdit(t.id)}
                        >
                          <FaRegEdit />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filtroTransacciones.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </section>
  );
};

export default Transacciones;
