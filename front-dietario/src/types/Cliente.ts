export default interface Cliente {
  id_cliente: number | undefined;
  id_user: number | undefined;
  nombre: string;
  apellidos: string;
  fecha_nacimiento: string | Date;
  imagen: string;
}
