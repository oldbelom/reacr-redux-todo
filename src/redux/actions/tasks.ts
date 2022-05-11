import type { AppDispatch } from '../index';
import {
    Task,
    AddTaskAction,
    CheckAllTaskAction,
    CompleteTaskAction,
    DeleteAllTaskAction,
    DeleteTaskAction,
    TaskTypes,
    UnheckAllTaskAction,
    EditTaskAction,
} from '../../types/tasks';

export const getTasks = () => async (dispatch: AppDispatch) => {
    const response = await fetch('https://620a478f92946600171c593c.mockapi.io/tasks');
    if (response.ok) {
        const data = await response.json();
        dispatch({ type: TaskTypes.GET_TASKS, payload: data });
    }
};

export const addTask = (newTask: Omit<Task, 'id'>): AddTaskAction => {
    return { type: TaskTypes.ADD_TASK, payload: newTask };
};

export const deleteTask = (id: number): DeleteTaskAction => {
    return { type: TaskTypes.DELETE_TASK, payload: id };
};

export const editTask = (id: number, text: string): EditTaskAction => {
    return { type: TaskTypes.EDIT_TASK, payload: { id, text } };
};

export const deleteAllTask = (): DeleteAllTaskAction => {
    return { type: TaskTypes.DELETE_ALL_TASKS };
};

export const completeTask = (id: number): CompleteTaskAction => {
    return { type: TaskTypes.COMPLETE_TASK, payload: id };
};

export const checkAllTask = (): CheckAllTaskAction => {
    return { type: TaskTypes.CHECK_ALL_TASKS };
};

export const uncheckAllTask = (): UnheckAllTaskAction => {
    return { type: TaskTypes.UNCHECK_ALL_TASKS };
};
