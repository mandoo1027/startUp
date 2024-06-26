import axios from 'axios'
export const useAxios = () => {
  const config = useRuntimeConfig()
  const baseApi = config.public.apiBase
  const instance = axios.create({
    baseURL: baseApi,
    timeout: 6000,
    withCredentials: true,
  })
  instance.interceptors.request.use(
    function (config) {
      return config
    },
    function (err) {
      return Promise.reject(err)
    },
  )
  instance.interceptors.response.use(
    (response) => {
      $fx.saveLoginTime()
      return response && response.data
    },
    (err) => {
      return Promise.reject(err)
    },
  )
  return {
    instance,
  }
}
