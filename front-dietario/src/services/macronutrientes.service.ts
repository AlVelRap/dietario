import http from "./http-comun";
import type ResponseData from "@/types/ResponseData";

class MacronutrienteService {
  getOne(id_ingrediente: number): Promise<any> {
    return http
      .get(`/macronutrientes/ingrediente/${id_ingrediente}`)
      .then((response: ResponseData) => {
        return response.data;
      });
  }
}

export default new MacronutrienteService();
