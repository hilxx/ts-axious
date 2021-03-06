import Axios from './core/Axios'
import { AxiosStatic, AxiosConstructor, AxiosRequestConfig } from './types'
import { combinedObj } from './helpers/utils'
import defaultConfig from './default'
import { mergeConfig } from './helpers/requestConfig'
import { Cancel, CancelToken } from './core/cancel'
import { clearConfigCache } from 'prettier'

const prototype = Axios.prototype,
  createAxios = (defaultConfig?: AxiosRequestConfig): AxiosConstructor => {
    const axios = new Axios(defaultConfig),
      instance = prototype.request.bind(axios)

    combinedObj(instance, prototype, axios)

    return instance as AxiosConstructor
  },
  axios = createAxios(defaultConfig) as AxiosStatic

axios.Axios = Axios
axios.Cancel = Cancel
axios.CancelToken = CancelToken
axios.isCancel = Cancel.isCancel
axios.create = function(config) {
  return createAxios(mergeConfig(defaultConfig, config))
}
axios.all = function(arr) {
  return Promise.all(arr)
}
axios.spread = function(cb) {
  return function(arr) {
    return cb.apply(null, arr)
  }
}

export default axios
