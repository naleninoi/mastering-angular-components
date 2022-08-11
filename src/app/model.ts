export interface Task {
    readonly id?: number;
    readonly projectId?: number;
    readonly title: string;
    readonly done: boolean;
}

export interface Project {
    readonly id?: number;
    readonly title: string;
    readonly description: string;

}

export enum TaskListFilterType {
    ALL = 'ALL',
    OPEN = 'OPEN',
    DONE = 'DONE'
}