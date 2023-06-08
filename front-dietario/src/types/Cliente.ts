export default interface Cliente {
  id_cliente: number | undefined;
  id_user: number;
  nombre: string;
  apellidos: string;
  fecha_nacimiento: string | Date;
  imagen: string;
}
