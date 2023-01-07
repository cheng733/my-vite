import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios'
/**
1.基础的配置 基础路径。。。
2.拦截请求 拦截响应 
3.定制化各种的请求方式 --- 最底层的抽象不做
4.定制各种信息 --- 最底层的抽象不做
5.可以自定义各种请求方法的配置
 * 
 */
interface FectchConfig extends AxiosRequestConfig {
    interceptorsReqSuccessHandle: (config: AxiosRequestConfig) => void
    interceptorsReqErrorHandle: (error: any) => void
    interceptorsResSuccessHandle: (response: AxiosResponse) => void
    interceptorsResErrorHandle: (error: any) => void
}

class Fetch {
    _config: FectchConfig
    _ins: AxiosInstance
    constructor(config: FectchConfig) {
        this._config = config
        const ins = (this._ins = axios.create(config))
        ins.interceptors.request.use(this.interceptorsReqSuccessHandle.bind(this), this.interceptorsReqErrorHandle.bind(this))
        ins.interceptors.response.use(this.interceptorsResSuccessHandle.bind(this), this.interceptorsResErrorHandle.bind(this))
    }
    interceptorsReqSuccessHandle(config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> {
        this._config.interceptorsReqSuccessHandle(config)
        return config
    }
    interceptorsReqErrorHandle(error: any) {
        this._config.interceptorsReqErrorHandle(error)
    }
    interceptorsResSuccessHandle(response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> {
        this._config.interceptorsResSuccessHandle(response)
        return response
    }
    interceptorsResErrorHandle(error: any) {
        this._config.interceptorsResErrorHandle(error)
    }
    async get<T, R = AxiosResponse<T>>(url: string, config: FectchConfig): Promise<R> {
        return await this._ins.get(url, config)
    }
    async post<T, D = any, R = AxiosResponse<T>>(url: string, data?: D, config?: FectchConfig): Promise<R> {
        return await this._ins.post(url, data, config)
    }
    async put<T, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: FectchConfig): Promise<R> {
        return await this._ins.put(url, data, config)
    }
}

export default Fetch