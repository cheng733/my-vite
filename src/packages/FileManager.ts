import { AsyncTask, TaskOptions } from "./AsyncTask"

/**
 * 任务的状态：ready,loading,success,failed,aborted
 * state：
 * 任务排队列表
 * 任务数组
 * 异步的任务不会影响到js的执行 --- js的事件执行机制，不会阻塞到
 * 
 */
interface FileInfo {
    percent: number
    name: string
}
type FileTaskFn = AsyncTask<FileInfo>
class FileManager {
    private taskList = [] as AsyncTask[]
    private taskqueue = [] as AsyncTask[]
    finishedCount = 0
    unFinishedCount = 0
    addTask(fn: FileTaskFn['task'], options: TaskOptions<FileInfo>) {
        const task = new AsyncTask(fn, options)
        this.taskList.push(task)
        this.taskqueue.push(task)
        this.start()
    }
    start() {
        for (let i = 0; i < this.taskqueue.length; i++) {
            this.run(this.taskqueue[i])
        }
    }
    async run(task: AsyncTask) {
        if (task.status !== 'ready') return
        try {
            await task.run()
            this.popTask(task.id)
        } catch (error) {

        } finally {
            this.updateCount()
        }
    }
    runnext() {

    }
    rerun(id: number) {
        const task = this.taskList.find(task => task.id === id)
        if (task?.status === 'failed') {
            task.resetStatus()
            this.taskqueue.push(task)
            this.start()
        }
    }
    popTask(id: number) {
        const idx = this.taskqueue.findIndex(task => task.id === id)
        if (idx !== -1) {
            const task = this.taskList.find(task => task.id === id)
            if (task?.status === 'loading') {
                task.abortTask(task)
            } else {
                this.taskqueue.splice(idx, 1)
                this.updateCount()
            }
        }
    }
    removeAllFinishedTask() {
        this.taskList = this.taskList.filter(task => task.status === 'finished')
    }
    updateCount() {
        const finishedTask = this.taskList.filter(task => task.status === 'finished')
        this.finishedCount = finishedTask.length
        const unFinishedTask = this.taskList.filter(task => ['ready', 'loading'].indexOf(task.status) !== -1)
        this.unFinishedCount = unFinishedTask.length
    }
}

export default FileManager