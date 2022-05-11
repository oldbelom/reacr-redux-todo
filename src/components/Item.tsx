import React from 'react';
import { IconButton, Checkbox, ListItem, Typography, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TaskItem } from '../types/tasks';
import { useAppDispatch } from '../redux/hooks';
import { editTask } from '../redux/actions/tasks';

export const Item = ({ text, completed, id, onDelete, onComplete }: TaskItem) => {
    const [isEditable, setIsEditable] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(text);

    const dispatch = useAppDispatch();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const handleInputBlur = (id: number, text: string) => {
        dispatch(editTask(id, text));
        setIsEditable(false);
    };

    return (
        <ListItem>
            <div className="d-flex item">
                <Checkbox
                    checked={completed}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<CheckCircleIcon />}
                    onChange={() => onComplete(id)}
                />
                {!isEditable ? (
                    <Typography className="item-text">{text}</Typography>
                ) : (
                    <TextField
                        className="item-text"
                        inputProps={{ className: 'item-input' }}
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={() => handleInputBlur(id, inputValue)}
                        autoFocus
                    />
                )}
                <div className="item-buttons d-flex">
                    <IconButton onClick={() => setIsEditable(!isEditable)}>
                        <EditIcon style={{ fontSize: 20 }} />
                    </IconButton>
                    <IconButton onClick={() => onDelete(id)}>
                        <DeleteOutlineIcon style={{ fontSize: 20 }} />
                    </IconButton>
                </div>
            </div>
        </ListItem>
    );
};
