// @ts-nocheck
import * as internalGcApi from './api'

const GcApi: import('./api') = {}

let configurable = false

Object.keys(internalGcApi).forEach((key) => {
  Object.defineProperty(GcApi, key, {
    configurable: true,
    get: function () {
      return GcApi['$$' + key] || internalGcApi[key]
    },
    set: function (value) {
      if (!configurable) {
        __DEV__ && console.error(`[guidecore shared]: 使用extendsApi重新设置 GcApi ${key} 实现`)
        return value
      }
      GcApi['$$' + key] = value
      return value
    }
  })
})

export const extendsApi = (apis: Record<any, any>) => {
  configurable = true
  Object.assign(GcApi, apis)
  configurable = false

  return GcApi
}

export { GcApi }

export declare namespace GcApi {
  export * from './api'
}
