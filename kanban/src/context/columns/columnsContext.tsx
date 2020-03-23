import React, { useReducer, createContext, useContext } from 'react';

import ColumnsReducer from './columnsReducer';
import { State, Dispatch, Props } from './columnTypes';

// state
const initialState: State = {
    columns: [
        {
            title: 'Column 1',
            id: 'fd97350a-3875-45ad-822a-74a5c59ff0e9',
            boardId: '30165652-87a1-d438-6c08-7c14a5b7c5ae',
            cardIds: [
                '67061e04-da50-49da-b61c-46be7ee1eb1f',
                'fd4ae017-f106-4f8a-bf10-a8a7ce09c342',
            ],
        },
        {
            title: 'Column 2',
            id: 'b3f095aa-f4a7-4978-b614-c5406376ed72',
            boardId: '30165652-87a1-d438-6c08-7c14a5b7c5ae',
            cardIds: ['a8425a2f-1138-4a6f-9d86-1efa8f9432fe'],
        },
        {
            title: 'Column 3',
            id: '6ff65853-d111-448f-baa9-1070bed254e4',
            boardId: '88c8033c-7a34-4c73-b9f0-6120a82a82f5',
            cardIds: [],
        },
    ],
};

// create state and dispatch
const ColumnsStateContext = createContext<State | undefined>(undefined);
const ColumnsDispatchContext = createContext<Dispatch | undefined>(undefined);

function ColumnsProvider({ children }: Props) {
    const [state, dispatch] = useReducer(ColumnsReducer, initialState);

    return (
        <ColumnsStateContext.Provider value={{ columns: state.columns }}>
            <ColumnsDispatchContext.Provider value={dispatch}>
                {children}
            </ColumnsDispatchContext.Provider>
        </ColumnsStateContext.Provider>
    );
}

function useColumnsState() {
    const context = useContext(ColumnsStateContext);

    if (context === undefined) {
        throw new Error(
            'useColumnsState must be used within a ColumnsProvider',
        );
    }
    return context;
}

function useColumnsDispatch() {
    const context = useContext(ColumnsDispatchContext);

    if (context === undefined) {
        throw new Error(
            'useColumnsDispatch must be used within a ColumnsProvider',
        );
    }
    return context;
}

export { ColumnsProvider, useColumnsState, useColumnsDispatch };
