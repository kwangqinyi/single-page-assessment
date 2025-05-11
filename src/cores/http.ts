import axios from 'axios'

export const httpGet = async <T = any>(url: string, params?: any): Promise<T> => {
  const response = await axios.get<T>(url, { params })
  return response.data
}

export const httpPost = async <T = any>(url: string, data?: any): Promise<T> => {
  const response = await axios.post<T>(url, data)
  return response.data
}