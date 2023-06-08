import http from "./http-comun";
import type ResponseData from "@/types/ResponseData";

class Acidos_GrasosService {
  getOne(id_ingrediente: number): Promise<any> {
    return http
      .get(`/acidos_grasos/ingrediente/${id_ingrediente}`)
      .then((response: ResponseData) => {
        return response.data;
      });
  }
}

export default new Acidos_GrasosService();
