import React from 'react';
import { TextField, Button, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Task } from '../types/tasks';

interface AddFieldProps {
    onAdd: (newTask: Omit<Task, 'id'>) => void;
}

export const AddField = ({ onAdd }: AddFieldProps) => {
    const [newTask, setNewTask] = React.useState({ text: '', completed: false });

    const handleClick = () => {
        onAdd(newTask);
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
