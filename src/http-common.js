import axios from 'axios'
import { serverUrl, apiVersion } from "../auth_config.json";

export const HTTP = axios.create({
  baseURL: `${serverUrl}${apiVersion}`
})