import React from 'react';
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';
import { Task, TaskItem, Action } from './types';

const reducer = (state: Task[], action: Action) => {
    switch (action.type) {
        case 'ADD_TASK':
            const newTask = { ...action.payload, id: state[state.length - 1]?.id + 1 || 1 };
            return [...state, newTask];
        case 'DELETE_TASK':
            return state.filter((item) => item.id !== action.payload);
        case 'DELETE_ALL_TASKS':
            return [];
        case 'COMPLETE_TASK':
            return state.map((item) => {
                if (item.id === action.payload) {
                    return {
                        ...item,
                        completed: !item.completed,
                    };
                }
                return item;
            });
        case 'CHECK_ALL_TASKS':
            return state.map((item) => ({ ...item, completed: true }));
        case 'UNCHECK_ALL_TASKS':
            return state.map((item) => ({ ...item, completed: false }));
        default:
            return state;
    }
};

function App() {
    const [state, dispatch] = React.useReducer(reducer, [
        {
            id: 1,
            text: 'Задача №1',
            completed: false,
        },
    ]);

    const onAddTask = (newTask: Omit<Task, 'id'>) => {
        dispatch({ type: 'ADD_TASK', payload: newTask });
    };

    const onDeleteTask = (id: number) => {
        const deleteConfirm = window.confirm('Вы точно хотиту удалить задачу ?');
        if (deleteConfirm) {
            dispatch({ type: 'DELETE_TASK', payload: id });
        }
    };

    const onDeleteAllTask = () => {
        const deleteConfirm = window.confirm('Вы уверны, что хотите удалить все задачи ?');
        if (deleteConfirm) {
            dispatch({ type: 'DELETE_ALL_TASKS' });
        }
    };

    const onComplete = (id: number) => {
        dispatch({ type: 'COMPLETE_TASK', payload: id });
    };

    const isAllChecked = state.every((item) => item.completed === true);

    const toggleAllChecked = () => {
        if (isAllChecked) {
            dispatch({ type: 'UNCHECK_ALL_TASKS' });
            return;
        }
        dispatch({ type: 'CHECK_ALL_TASKS' });
    };

    return (
        <div className="App">
            <Paper className="wrapper">
                <Paper className="header" elevation={0}>
                    <h4>Список задач</h4>
                </Paper>
                <AddField onAdd={onAddTask} />
                <Divider />
                <Tabs value={0}>
                    <Tab label="Все" />
                    <Tab label="Активные" />
                    <Tab label="Завершённые" />
                </Tabs>
                <Divider />
                <List>
                    {state.map((item: TaskItem) => (
                        <Item
                            key={item.id}
                            id={item.id}
                            text={item.text}
                            completed={item.completed}
                            onDelete={onDeleteTask}
                            onComplete={onComplete}
                        />
                    ))}
                </List>
                <Divider />
                <div className="check-buttons">
                    <Button onClick={toggleAllChecked}>
                        {isAllChecked ? 'Снять отметки' : 'Отметить всё'}
                    </Button>
                    <Button onClick={onDeleteAllTask}>Очистить</Button>
                </div>
            </Paper>
        </div>
    );
}

export default App;
