import type Usuario from "@/types/Usuario";
import http from "./http-comun";
import type ResponseData from "@/types/ResponseData";


class UsuarioService {
  login(data: Usuario): Promise<any> {
    return http
      .post("/usuario/login", data)
      .then((response: ResponseData) => {
        return response.data;
      })
  }
  register(data: Usuario): Promise<any> {
    return http
      .post("/usuario/register", data)
      .then((response: ResponseData) => {
        return response.data;
      });
  }
  getOne(): Promise<any> {
    return http.get("/usuario/").then((response: ResponseData) => {
      return response.data;
    });
  }
  updateGeneral(data: Usuario): Promise<any> {
    return http.put("/usuario/", data).then((response: ResponseData) => {
      // if(response.status==200){
      //   alert("Datos cambiados satisfactoriamente.")
      // }
      return response.data;
    });
  }
  updatePass(data: any): Promise<any> {
    return http
      .put("/usuario/password", data)
      .then((response: ResponseData) => {
        // if(response.status==200){
        //   alert("Contraseña cambiada satisfactoriamente.")
        // }
        return response.data;
      });
  }
  delete(): Promise<any> {
    return http.delete("/usuario/").then((response: ResponseData) => {
      // if(response.status==200){
      //   alert("Se ha eliminado al usuario satisfactoriamente.")
      // }
      return response.data;
    });
  }
}

export default new UsuarioService();
