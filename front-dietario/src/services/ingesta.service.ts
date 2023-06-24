import type Ingesta from "@/types/Ingesta";
import http from "./http-comun";
import type ResponseData from "@/types/ResponseData";

class IngestaService {
  post(data: Ingesta): Promise<any> {
    return http.post(`/ingesta/`, data).then((response: ResponseData) => {
      return response.data;
    });
  }
  getAll(id_dieta: number): Promise<any> {
    return http
      .get(`/ingesta/dieta/${id_dieta}`)
      .then((response: ResponseData) => {
        return response.data;
      });
  }
  getOne(id_dieta: number, id_ingesta: number): Promise<any> {
    return http
      .get(`/ingesta/${id_ingesta}/dieta/${id_dieta}`)
      .then((response: ResponseData) => {
        return response.data;
      });
  }
  delete(id_dieta: number, id_ingesta: number): Promise<any> {
    return http
      .delete(`/ingesta/${id_ingesta}/dieta/${id_dieta}`)
      .then((response: ResponseData) => {
        return response.data;
      });
  }
}

export default new IngestaService();
