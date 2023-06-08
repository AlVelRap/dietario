import type IngestaIngrediente from "@/types/IngestaIngrediente";
import http from "./http-comun";
import type ResponseData from "@/types/ResponseData";

class IngestaIngredienteService {
  post(
    data: IngestaIngrediente
  ): Promise<any> {
    return http
      .post(
        `/ingesta_ingrediente/`,
        data
      )
      .then((response: ResponseData) => {
        return response.data;
      });
  }
  getAll(id_ingesta: number): Promise<any> {
    return http
      .get(`/ingesta_ingrediente/ingesta/${id_ingesta}`)
      .then((response: ResponseData) => {
        return response.data;
      });
  }
  getOne(
    id_ingrediente: number,
    id_ingesta: number
  ): Promise<any> {
    return http
      .get(
        `/ingesta_ingrediente/ingrediente/${id_ingrediente}/ingesta/${id_ingesta}`
      )
      .then((response: ResponseData) => {
        return response.data;
      });
  }
  update(
    id_ingrediente: number,
    id_ingesta: number,
    data: any
  ): Promise<any> {
    return http
      .put(
        `/ingesta_ingrediente/ingrediente/${id_ingrediente}/ingesta/${id_ingesta}`,
        data
      )
      .then((response: ResponseData) => {
        return response.data;
      });
  }
  delete(
    id_ingrediente: number,
    id_ingesta: number
  ): Promise<any> {
    return http
      .delete(
        `/ingesta_ingrediente/ingrediente/${id_ingrediente}/ingesta/${id_ingesta}`
      )
      .then((response: ResponseData) => {
        return response.data;
      });
  }
  deleteAll(id_ingesta: number): Promise<any> {
    return http
      .delete(`/ingesta_ingrediente/ingesta/${id_ingesta}`)
      .then((response: ResponseData) => {
        return response.data;
      });
  }
}

export default new IngestaIngredienteService();
