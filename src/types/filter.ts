export type FilterType = 'all' | 'active' | 'completed';

export interface setFilterAction {
    type: 'SET_FILTER';
    payload: FilterType;
}
