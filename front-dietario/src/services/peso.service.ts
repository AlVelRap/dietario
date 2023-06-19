import type Peso from "@/types/Peso";
import http from "./http-comun";
import type ResponseData from "@/types/ResponseData";

class PesoService {
  post(data: Peso): Promise<any> {
    return http.post(`/peso/`, data).then((response: ResponseData) => {
      if(response.status==200){
        alert("Peso añadido satisfactoriamente.")
      }
      return response.data;
    });
  }
  getAll(id_cliente: number): Promise<any> {
    return http
      .get(`/peso/cliente/${id_cliente}`)
      .then((response: ResponseData) => {
        return response.data;
      });
  }
  getOne(id_cliente: number, id_peso: number): Promise<any> {
    return http
      .get(`/peso/${id_peso}/cliente/${id_cliente}`)
      .then((response: ResponseData) => {
        return response.data;
      });
  }
}

export default new PesoService();
