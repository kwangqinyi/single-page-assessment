import { httpGet } from "../cores/http"

export const apiFetchUsers = (params: any) => {
  return httpGet('https://randomuser.me/api/', params)
}