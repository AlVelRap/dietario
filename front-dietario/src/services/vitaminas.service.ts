import http from "./http-comun";
import type ResponseData from "@/types/ResponseData";

class VitaminasService {
  getOne(id_ingrediente: number): Promise<any> {
    return http
      .get(`/vitaminas/ingrediente/${id_ingrediente}`)
      .then((response: ResponseData) => {
        return response.data;
      });
  }
}

export default new VitaminasService();
