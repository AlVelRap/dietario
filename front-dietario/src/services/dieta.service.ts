import type Dieta from "@/types/Dieta";
import http from "./http-comun";
import type ResponseData from "@/types/ResponseData";

class DietaService {
  post(data: Dieta): Promise<any> {
    return http.post(`/dieta/`, data).then((response: ResponseData) => {
      return response.data;
    });
  }
  getAll(id_cliente: number): Promise<any> {
    return http
      .get(`/dieta/cliente/${id_cliente}`)
      .then((response: ResponseData) => {
        return response.data;
      });
  }
  getOne(id_cliente: number, id_dieta: number): Promise<any> {
    return http
      .get(`/dieta/${id_dieta}/cliente/${id_cliente}`)
      .then((response: ResponseData) => {
        return response.data;
      });
  }
  update(id_dieta: number, data: Dieta): Promise<any> {
    return http
      .put(`/dieta/${id_dieta}`, data)
      .then((response: ResponseData) => {
        return response.data;
      });
  }
  delete(id_dieta: number, id_cliente: number): Promise<any> {
    return http
      .delete(`/dieta/${id_dieta}/cliente/${id_cliente}`)
      .then((response: ResponseData) => {
        return response.data;
      });
  }
}

export default new DietaService();
