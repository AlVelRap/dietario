export default interface Dieta {
  id_dieta: number | undefined;
  id_cliente: number;
  fecha_dieta: string | Date;
  objetivo: number;
  energiaTotal?: number;
  proteinasTotal?: number;
  hdcTotal?: number;
  fibraTotal?: number;
  lipidosTotal?: number;
}
