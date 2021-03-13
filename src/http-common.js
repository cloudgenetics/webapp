import axios from 'axios'
import { serverUrl } from "../auth_config.json";

export const HTTP = axios.create({
  baseURL: `${serverUrl}/api/v1/`
})