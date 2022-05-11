import { Tab } from '@mui/material';
import { Tabs } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setFilter } from '../redux/actions/filter';
import { FilterType } from '../types/filter';

const filterIndex: FilterType[] = ['all', 'active', 'completed'];

export const Filter = () => {
    const filter = useAppSelector((state) => state.filter.filterBy);
    const dispatch = useAppDispatch();

    const handleSetFilter = (_: unknown, newIndex: number) => {
        const status = filterIndex[newIndex];
        dispatch(setFilter(status));
    };

    return (
        <Tabs onChange={handleSetFilter} value={filterIndex.indexOf(`${filter}` as FilterType)}>
            <Tab label="Все" />
            <Tab label="Активные" />
            <Tab label="Завершённые" />
        </Tabs>
    );
};
