export default (state, action) => {
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
        default:
            return new Error(`${action.type} is not reconized`);
    }
};
