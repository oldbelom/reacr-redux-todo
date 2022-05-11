export interface Task {
    id: number;
    text: string;
    completed: boolean;
}

export interface TaskItem extends Task {
    onDelete: (id: number) => void;
    onComplete: (id: number) => void;
}

export enum TaskTypes {
    GET_TASKS = 'GET_TASKS',
    ADD_TASK = 'ADD_TASK',
    DELETE_TASK = 'DELETE_TASK',
    EDIT_TASK = 'EDIT_TASK',
    DELETE_ALL_TASKS = 'DELETE_ALL_TASKS',
    COMPLETE_TASK = 'COMPLETE_TASK',
    CHECK_ALL_TASKS = 'CHECK_ALL_TASKS',
    UNCHECK_ALL_TASKS = 'UNCHECK_ALL_TASKS',
}

export interface GetTaskAction {
    type: TaskTypes.GET_TASKS;
    payload: Task[];
}

export interface AddTaskAction {
    type: TaskTypes.ADD_TASK;
    payload: {
        text: string;
        completed: boolean;
    };
}

export interface DeleteTaskAction {
    type: TaskTypes.DELETE_TASK;
    payload: number;
}

export interface EditTaskAction {
    type: TaskTypes.EDIT_TASK;
    payload: {
        id: number;
        text: string;
    };
}

export interface DeleteAllTaskAction {
    type: TaskTypes.DELETE_ALL_TASKS;
}

export interface CompleteTaskAction {
    type: TaskTypes.COMPLETE_TASK;
    payload: number;
}

export interface CheckAllTaskAction {
    type: TaskTypes.CHECK_ALL_TASKS;
}

export interface UnheckAllTaskAction {
    type: TaskTypes.UNCHECK_ALL_TASKS;
}

export type Action =
    | GetTaskAction
    | AddTaskAction
    | DeleteTaskAction
    | EditTaskAction
    | DeleteAllTaskAction
    | CompleteTaskAction
    | CheckAllTaskAction
    | UnheckAllTaskAction;
