import React, { useReducer, createContext, useContext } from 'react';

import BoardsReducer from './boardsReducer';
import { State, Dispatch, Props } from './boardTypes';

// state
const initalState: State = {
    boards: [
        {
            title: 'Board 1',
            color: '#4860ff',
            favorite: false,
            id: '30165652-87a1-d438-6c08-7c14a5b7c5ae',
            columnIds: [
                'fd97350a-3875-45ad-822a-74a5c59ff0e9',
                'b3f095aa-f4a7-4978-b614-c5406376ed72',
            ],
        },
        {
            title: 'Board 2',
            color: '#fb617f',
            favorite: false,
            id: '88c8033c-7a34-4c73-b9f0-6120a82a82f5',
            columnIds: ['6ff65853-d111-448f-baa9-1070bed254e4'],
        },
        {
            title: 'Board 3',
            color: '#fed64d',
            favorite: false,
            id: '83a1d38c-122f-4f8e-aa02-de0ffb3b283f',
            columnIds: [],
        },
    ],
};

// create state and dispatch
const BoardsStateContext = createContext<State | undefined>(undefined);
const BoardsDispatchContext = createContext<Dispatch | undefined>(undefined);

function BoardsProvider({ children }: Props) {
    const [state, dispatch] = useReducer(BoardsReducer, initalState);

    return (
        <BoardsStateContext.Provider value={{ boards: state.boards }}>
            <BoardsDispatchContext.Provider value={dispatch}>
                {children}
            </BoardsDispatchContext.Provider>
        </BoardsStateContext.Provider>
    );
}

function useBoardsState() {
    const context = useContext(BoardsStateContext);

    if (context === undefined) {
        throw new Error('useBoardsState must be used within a BoardsProvider');
    }
    return context;
}

function useBoardsDispatch() {
    const context = useContext(BoardsDispatchContext);

    if (context === undefined) {
        throw new Error(
            'useBoardsDispatch must be used within a BoardsProvider',
        );
    }
    return context;
}

export { BoardsProvider, useBoardsState, useBoardsDispatch };
