export default interface Ingesta {
  id_ingesta: number | undefined;
  id_dieta: number;
  nombre: string;
  energiaTotal?: number;
  proteinasTotal?: number;
  hdcTotal?: number;
  fibraTotal?: number;
  lipidosTotal?: number;
}
