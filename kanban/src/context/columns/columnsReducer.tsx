import { State, Action } from './columnTypes';

export default (state: State, action: Action) => {
    switch (action.type) {
        case 'ADD_COLUMN':
            return { ...state, columns: [...state.columns, action.payload] };
        case 'UPDATE_COLUMN':
            return {
                ...state,
                columns: state.columns.map((column) =>
                    column.id === action.payload.id ? action.payload : column,
                ),
            };
        case 'DELETE_COLUMN':
            return {
                ...state,
                columns: state.columns.filter(
                    (column) => column.id !== action.payload,
                ),
            };
        default:
            // throw new Error(`Type of ${action.type} is not reconized`);
            return state;
    }
};
