import React, { useReducer } from 'react';

import ColumnsContext from './columnsContext';
import ColumnsReducer from './columnsReducer';

export const ColumnsState = (props) => {
    const initialState = {
        columns: [
            {
                title: 'Column 1',
                // TODO guid
                id: 'testId',
                // TODO guid
                boardId: 'Board 1',
                // TODO guid[]
                cards: ['Card 1', 'Card 1'],
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

    return (
        <ColumnsContext.Provider value={{ columns: state.columns, addColumn }}>
            {props.children}
        </ColumnsContext.Provider>
    );
};
