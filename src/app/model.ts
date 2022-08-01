export interface Task {
    id?: number,
    title: string,
    done: boolean
}

export enum TaskListFilterType {
    ALL = 'ALL',
    OPEN = 'OPEN',
    DONE = 'DONE'
}