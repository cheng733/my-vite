/**
 * 异步的任务
 * 状态：
 * ready,loading,finished,failed,aborted
 * 任务携带的各种配置信息
 * 
 */
export type TaskStatus = 'ready' | 'loading' | 'finished' | 'failed' | 'aborted'
export interface TaskOptions<T = Record<any, any>> {
    onFinished?: () => void
    onAborted?: (task: AsyncTask) => Promise<any>
    extraOptions?: T
}
export type TaskFn = (task: AsyncTask) => Promise<any>
let _id = 0

export class AsyncTask<T extends Record<any, any> = Record<any, any>> {
    private _status = 'ready' as TaskStatus
    private _id = _id++
    get status() {
        return this._status
    }
    set status(status) {
        this._status = status
    }
    get id() {
        return this._id
    }
    task: TaskFn
    options: TaskOptions
    extraOptions: T = {} as any

    constructor(fn: TaskFn, options: TaskOptions) {
        this.task = fn
        this.options = options
        options.extraOptions && (this.extraOptions = options.extraOptions)
    }
    canrunStatus(status: TaskStatus) {
        return ['ready', 'failed', 'aborted'].indexOf(status) !== -1
    }
    processedTask(status: TaskStatus) {
        return ['aborted', 'finished', 'failed'].indexOf(status) !== -1
    }
    async run() {
        this._status = 'loading'
        const fn = this.task
        try {
            if (fn && this.canrunStatus(this._status)) {
                await fn(this)
                this.options.onFinished?.()
                this._status = 'finished'
            }
        } catch (err) {
            this._status = 'failed'
        }
    }
    abortTask(task:AsyncTask) {
        this.status = 'aborted'
        this.options?.onAborted?.(task)
    }
    resetStatus() {
        this._status = 'ready'
    }
}

