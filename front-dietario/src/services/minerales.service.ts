import http from "./http-comun";
import type ResponseData from "@/types/ResponseData";

class MineralesService {
  getOne(id_ingrediente: number): Promise<any> {
    return http
      .get(`/minerales/ingrediente/${id_ingrediente}`)
      .then((response: ResponseData) => {
        return response.data;
      });
  }
}

export default new MineralesService();
