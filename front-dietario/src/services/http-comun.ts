import axios from "axios";
import type { AxiosInstance } from "axios";
import { VERSION, REST, API } from "../util/constants";

const apiClient: AxiosInstance = axios.create({
  baseURL: `http://localhost:3000/${API}/${REST}/${VERSION}`,
  headers: {
    "Content-type": "application/json",
    "Authorization": localStorage.getItem('token-dietario'),
  },
});

export default apiClient;
