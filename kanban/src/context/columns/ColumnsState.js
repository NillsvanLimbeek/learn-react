import React, { useReducer } from 'react';

import ColumnsContext from './columnsContext';
import ColumnsReducer from './columnsReducer';

export const ColumnsState = (props) => {
    const initialState = {
        columns: [
            {
                title: 'Column 1',
                id: 'fd97350a-3875-45ad-822a-74a5c59ff0e9',
                boardId: '30165652-87a1-d438-6c08-7c14a5b7c5ae',
                cards: [
                    '8e4a8d3d-23eb-4450-bde7-6c919c3e6e20',
                    'fd4ae017-f106-4f8a-bf10-a8a7ce09c342',
                ],
            },
            {
                title: 'Column 2',
                id: 'b3f095aa-f4a7-4978-b614-c5406376ed72',
                boardId: '30165652-87a1-d438-6c08-7c14a5b7c5ae',
                cards: ['a8425a2f-1138-4a6f-9d86-1efa8f9432fe'],
            },
            {
                title: 'Column 3',
                id: '6ff65853-d111-448f-baa9-1070bed254e4',
                boardId: '88c8033c-7a34-4c73-b9f0-6120a82a82f5',
                cards: [],
            },
        ],
    };

    const [state, dispatch] = useReducer(ColumnsReducer, initialState);

    const addColumn = (column) => {
        dispatch({
            type: 'ADD_COLUMN',
            payload: column,
        });
    };

    const removeColumn = (id) => {
        dispatch({
            type: 'REMOVE_COLUMN',
            payload: id,
        });
    };

    const updateColumn = (column) => {
        dispatch({
            type: 'UPDATE_COLUMN',
            payload: column,
        });
    };

    return (
        <ColumnsContext.Provider
            value={{
                columns: state.columns,
                addColumn,
                removeColumn,
                updateColumn,
            }}
        >
            {props.children}
        </ColumnsContext.Provider>
    );
};

export default ColumnsState;
