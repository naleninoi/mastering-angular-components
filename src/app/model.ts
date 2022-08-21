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

export interface Tab {
  readonly id?: any;
  readonly title: string;
}

export interface User {
  readonly id?: number;
  readonly name: string;
  readonly pictureUrl: string;
}

export enum TaskListFilterType {
    ALL = 'ALL',
    OPEN = 'OPEN',
    DONE = 'DONE'
}
