import { FilterType, setFilterAction } from '../../types/filter';

const initialState: { filterBy: FilterType } = {
    filterBy: 'all',
};

export const filterReducer = (state = initialState, action: setFilterAction) => {
    switch (action.type) {
        case 'SET_FILTER':
            return {
                ...state,
                filterBy: action.payload,
            };
        default:
            return state;
    }
};
