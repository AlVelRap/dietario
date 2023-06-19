import axios from "axios";
import type { AxiosInstance } from "axios";
import { VERSION, REST, API } from "../util/constants";

// const url =  `http://localhost:${process.env.PORT}/${API}/${REST}/${VERSION}` || `http://localhost:3000/${API}/${REST}/${VERSION}`
const url_backend =  `http://localhost:3000/${API}/${REST}/${VERSION}`
// const url_backend =  `http://backend:6868/${API}/${REST}/${VERSION}`
// const url_backend =  `http://localhost:6868/${API}/${REST}/${VERSION}`

const apiClient: AxiosInstance = axios.create({
  baseURL: url_backend,
  headers: {
    "Content-type": "application/json",
    "Authorization": localStorage.getItem('token-dietario'),
  },
});

export default apiClient;
