import React from 'react';
import { TextField, Button, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const AddField = ({ dispatch }: any) => {
    const [newTask, setNewTask] = React.useState({ text: '', completed: false });

    const handleClick = () => {
        dispatch({ type: 'ADD_TASK', payload: newTask });
        setNewTask({ text: '', completed: false });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask((prev) => {
            return { ...prev, text: e.target.value };
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask((prev) => {
            return { ...prev, completed: e.target.checked };
        });
    };

    return (
        <div className="field">
            <Checkbox
                className="checkbox"
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
                onChange={handleCheckboxChange}
                checked={newTask.completed}
            />
            <TextField
                onChange={handleInputChange}
                value={newTask.text}
                placeholder="Введите текст задачи..."
                variant="standard"
                fullWidth
            />
            <Button onClick={handleClick}>
                <AddIcon />
            </Button>
        </div>
    );
};
