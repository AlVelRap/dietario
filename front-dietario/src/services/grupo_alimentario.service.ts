import http from "./http-comun";
import type ResponseData from "@/types/ResponseData";

class GrupoAlimentarioService {
  getOne(id_grupo: number): Promise<any> {
    return http
      .get(`/grupo_alimentario/${id_grupo}`)
      .then((response: ResponseData) => {
        return response.data;
      });
  }
  getAll(): Promise<any> {
    return http.get(`/grupo_alimentario/`).then((response: ResponseData) => {
      return response.data;
    });
  }
}

export default new GrupoAlimentarioService();
