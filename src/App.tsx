import React from 'react';
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

interface Action {
    type: string;
    payload: Omit<Task, 'id'>;
}

const reducer = (state: Task[], action: Action) => {
    switch (action.type) {
        case 'ADD_TASK':
            const newTask = { ...action.payload, id: state.length + 1 };
            return [...state, newTask];
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

    return (
        <div className="App">
            <Paper className="wrapper">
                <Paper className="header" elevation={0}>
                    <h4>Список задач</h4>
                </Paper>
                <AddField dispatch={dispatch} />
                <Divider />
                <Tabs value={0}>
                    <Tab label="Все" />
                    <Tab label="Активные" />
                    <Tab label="Завершённые" />
                </Tabs>
                <Divider />
                <List>
                    {state.map((item: Task) => (
                        <Item key={item.id} text={item.text} completed={item.completed} />
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
