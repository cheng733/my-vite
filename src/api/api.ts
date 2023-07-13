import  Fetch  from '@/packages/fetch'
// import {
//   ErrorCode,
//   GcError,
//   GcErrorOptions,
//   makeError,
//   Message
// } from '@/utils'
import { AxiosResponse } from 'axios'
// import { Api, GcI18n, getProp, fillTimeStr, noop, GcLang, joinPath, hasProp } from 'gc-shared'
const startWith = (n: number, start: number) => (n + '').startsWith(start + '')



export const createGcFetch = () => {

  const baseURL = ``
  return new Fetch({
    validateStatus: null,
    baseURL: baseURL,
    interceptorsResErrorHandle(e) {
      // const err = makeError(e.toString())
      // 直接调用不展示?

      setTimeout(() => {
        // Message.error(err)
      }, 0)

      // throw err
    },
    interceptorsReqSuccessHandle: (cf) => {
      let headers = {}
    //   headers['Authorization'] = getLocalToken()
    //   headers['Accept-Language'] = langToAccpetMap[GcI18n.currentLang] || GcI18n.currentLang
      Object.assign(cf.headers || (cf.headers = {}), headers)
      return cf
    },
    interceptorsResSuccessHandle: (res) => {
      if (res.config['tranfromResponse'] !== false) tranfromRes(res)

      return res
    },
    interceptorsReqErrorHandle(e) {
      // const err = makeError(e.toString())
      // 直接调用不展示?

      // setTimeout(() => {
      //   Message.error(err)
      // }, 0)

      // throw err
    },
  })
}

export const tranfromRes = (res: AxiosResponse<any>) => {
  if (res.data) {
    if (res.data.meta) {
      res['meta'] = res.data.meta
    }
    res.data.data && (res.data = res.data.data)
  }
  // return Object.assign(res, Api.transformRawResponse(res as any, false))
}

let gcFetch: ReturnType<typeof createGcFetch>

// gc.whenConfigSetup(() => {
//   gc.setupFetch((gcFetch = createGcFetch()))
// })
export { gcFetch }
