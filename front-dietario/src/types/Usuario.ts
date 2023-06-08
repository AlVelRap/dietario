export default interface Usuario {
  id_user: number | undefined;
  nombre: string | undefined;
  apellidos: string | undefined;
  email: string | undefined;
  password: string | undefined;
  salt: string | undefined;
}
