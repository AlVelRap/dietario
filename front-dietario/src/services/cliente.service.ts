import type Cliente from "@/types/Cliente";
import http from "./http-comun";
import type ResponseData from "@/types/ResponseData";

class ClienteService {
  post(data: Cliente): Promise<any> {
    return http.post(`/cliente/`, data).then((response: ResponseData) => {
      return response.data;
    });
  }
  getAll(): Promise<any> {
    return http
      .get(`/cliente/`)
      .then((response: ResponseData) => {
        return response.data;
      });
  }
  getOne(id_cliente: number): Promise<any> {
    return http
      .get(`/cliente/${id_cliente}`)
      .then((response: ResponseData) => {
        return response.data;
      });
  }
  update(
    id_cliente: number,
    data: any
  ): Promise<any> {
    return http
      .put(
        `/cliente/${id_cliente}`,
        data
      )
      .then((response: ResponseData) => {
        return response.data;
      });
  }
  delete(id_cliente: number): Promise<any> {
    return http
      .delete(
        `/cliente/${id_cliente}`
      )
      .then((response: ResponseData) => {
        return response.data;
      });
  }
}

export default new ClienteService();
