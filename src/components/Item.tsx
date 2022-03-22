import React from 'react';
import { IconButton, Checkbox, ListItem, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TaskItem } from '../types';

export const Item = ({ text, completed, id, onDelete }: TaskItem) => {
    const [check, setCheck] = React.useState(completed);
    return (
        <ListItem>
            <div className="d-flex item">
                <Checkbox
                    checked={check}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<CheckCircleIcon />}
                    onChange={() => setCheck((prev) => !prev)}
                />
                <Typography className="item-text">{text}</Typography>
                <div className="item-buttons d-flex">
                    <IconButton>
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
