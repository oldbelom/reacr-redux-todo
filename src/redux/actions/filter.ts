import { FilterType, setFilterAction } from '../../types/filter';

export const setFilter = (status: FilterType): setFilterAction => {
    return { type: 'SET_FILTER', payload: status };
};
