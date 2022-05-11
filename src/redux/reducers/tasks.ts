import { Action, Task, TaskTypes } from '../../types/tasks';

const initialState: Task[] = [];

export const tasksReducer = (state = initialState, action: Action): Task[] => {
    switch (action.type) {
        case TaskTypes.GET_TASKS:
            return action.payload;
        case TaskTypes.ADD_TASK:
            const newTask = {
                ...action.payload,
                id: state[state.length - 1]?.id + 1 || 1,
            };
            return [...state, newTask];
        case TaskTypes.DELETE_TASK:
            return state.filter((item) => item.id !== action.payload);
        case TaskTypes.EDIT_TASK:
            return state.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        text: action.payload.text,
                    };
                }
                return item;
            });
        case TaskTypes.DELETE_ALL_TASKS:
            return [];
        case TaskTypes.COMPLETE_TASK:
            return state.map((item) => {
                if (item.id === action.payload) {
                    return {
                        ...item,
                        completed: !item.completed,
                    };
                }
                return item;
            });
        case TaskTypes.CHECK_ALL_TASKS:
            return state.map((item) => ({ ...item, completed: true }));
        case TaskTypes.UNCHECK_ALL_TASKS:
            return state.map((item) => ({ ...item, completed: false }));
        default:
            return state;
    }
};
