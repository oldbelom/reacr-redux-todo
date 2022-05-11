import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { tasksReducer } from './reducers/tasks';
import { filterReducer } from './reducers/filter';
import { composeWithDevTools } from '@redux-devtools/extension';
import { Action } from '../types/common';

const rootReducer = combineReducers({ tasks: tasksReducer, filter: filterReducer });

const addTaskMiddleware = (store: any) => (next: any) => (action: Action) => {
    if (action.type === 'ADD_TASK') {
        fetch('https://620a478f92946600171c593c.mockapi.io/tasks', {
            method: 'POST',
            body: JSON.stringify(action.payload),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    next(action);
};

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, addTaskMiddleware)),
);

export type RootState = ReturnType<typeof store.getState>;
export type RootAction = ReturnType<typeof store.dispatch>;
export type AppDispatch = ThunkDispatch<RootState, any, RootAction>;

export default store;
