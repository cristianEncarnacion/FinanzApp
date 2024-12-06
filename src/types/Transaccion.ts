export interface Transaccion {
  id: number;
  fecha: string;
  descripcion: string;
  categoria: "Alimentacion" | "Entretenimiento" | "Transporte" | "Otro";
  tipo: "Ingreso" | "Gasto";
  monto: number;
}
