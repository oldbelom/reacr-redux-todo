import React from 'react';
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';
import { Task, TaskItem, Action } from './types';

const reducer = (state: Task[], action: Action) => {
    switch (action.type) {
        case 'ADD_TASK':
            const newTask = { ...action.payload, id: state.length + 1 };
            return [...state, newTask];
        case 'DELETE_TASK':
            return state.filter((item) => item.id !== action.payload);
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
        if (!deleteConfirm) {
            return;
        }
        dispatch({ type: 'DELETE_TASK', payload: id });
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
                        />
                    ))}
                </List>
                <Divider />
                <div className="check-buttons">
                    <Button>Отметить всё</Button>
                    <Button>Очистить</Button>
                </div>
            </Paper>
        </div>
    );
}

export default App;
