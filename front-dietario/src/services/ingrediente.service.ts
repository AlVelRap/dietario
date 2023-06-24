import http from "./http-comun";
import type ResponseData from "@/types/ResponseData";

class IngredienteService {
  getOne(id_ingrediente: number): Promise<any> {
    return http
      .get(`/ingrediente/${id_ingrediente}`)
      .then((response: ResponseData) => {
        return response.data;
      });
  }
  getAll(params?: object): Promise<any> {
    return http.get(`/ingrediente/`, params).then((response: ResponseData) => {
      return response.data;
    });
  }
}

export default new IngredienteService();
