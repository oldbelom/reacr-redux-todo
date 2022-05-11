import React from 'react';
import { Paper, Divider, Button, List } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';
import { Filter } from './components/Filter';
import { Task } from './types/tasks';
import {
    addTask,
    deleteTask,
    deleteAllTask,
    completeTask,
    checkAllTask,
    uncheckAllTask,
    getTasks,
} from './redux/actions/tasks';
import { useAppDispatch, useAppSelector } from './redux/hooks';

function App() {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state);

    React.useEffect(() => {
        dispatch(getTasks());
    }, []);

    const onAddTask = (newTask: Omit<Task, 'id'>) => {
        dispatch(addTask(newTask));
    };

    const onDeleteTask = (id: number) => {
        const deleteConfirm = window.confirm('Вы точно хотиту удалить задачу ?');
        if (deleteConfirm) {
            dispatch(deleteTask(id));
        }
    };

    const onDeleteAllTask = () => {
        const deleteConfirm = window.confirm('Вы уверны, что хотите удалить все задачи ?');
        if (deleteConfirm) {
            dispatch(deleteAllTask());
        }
    };

    const onComplete = (id: number) => {
        dispatch(completeTask(id));
    };

    const isAllChecked = state.tasks.every((item) => item.completed === true);

    const toggleAllChecked = () => {
        if (isAllChecked) {
            dispatch(uncheckAllTask());
            return;
        }
        dispatch(checkAllTask());
    };

    return (
        <div className="App">
            <Paper className="wrapper">
                <Paper className="header" elevation={0}>
                    <h4>Список задач</h4>
                </Paper>
                <AddField onAdd={onAddTask} />
                <Divider />
                <Filter />
                <Divider />
                <List className="list">
                    {state.tasks
                        .filter((item) => {
                            if (state.filter.filterBy === 'active') return !item.completed;
                            if (state.filter.filterBy === 'completed') return item.completed;
                            return true;
                        })
                        .map((item) => (
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
                    <Button disabled={!state.tasks.length} onClick={toggleAllChecked}>
                        {isAllChecked ? 'Снять отметки' : 'Отметить всё'}
                    </Button>
                    <Button disabled={!state.tasks.length} onClick={onDeleteAllTask}>
                        Очистить
                    </Button>
                </div>
            </Paper>
        </div>
    );
}

export default App;
