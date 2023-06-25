import axios from "axios";
import type { AxiosInstance } from "axios";
import { VERSION, REST, API } from "../util/constants";

// URL Para desarollo
// const url_backend = `http://localhost:3000/${API}/${REST}/${VERSION}`;

// Recuerda! Aqui va la IP!! Recuerda cambiarla al mover el portatil
const url_backend =  `http://192.168.1.142:6868/${API}/${REST}/${VERSION}`

const apiClient: AxiosInstance = axios.create({
  baseURL: url_backend,
  headers: {
    "Content-type": "application/json",
    Authorization: localStorage.getItem("token-dietario"),
  },
});

export default apiClient;
