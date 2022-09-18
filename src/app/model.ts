export type ActivityAlignment = 'left' | 'right';

export type Activity = ProjectActivity;

export interface ActivityBase {
  kind: string;
  id?: number;
  user: User;
  time: number;
  category: string;
  title: string;
  message: string;
}

export interface ActivitySliderSelection {
  start: number;
  end: number;
}

export interface Comment {
  readonly time: number;
  readonly user: User;
  readonly content: string;
}

export interface CommentUpdate {
  readonly index: number;
  readonly comment: Comment;
}

export interface Project {
  readonly id?: number;
  readonly title: string;
  readonly description: string;
  readonly comments: Comment[];
}

export interface ProjectActivity extends ActivityBase {
  kind: 'project';
  projectId: number;
}

export interface Tab {
  readonly id?: any;
  readonly title: string;
}

export interface Task {
    readonly id?: number;
    readonly projectId?: number;
    readonly title: string;
    readonly done: boolean;
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
