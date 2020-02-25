import React, { useReducer } from 'react';

import BoardsContext from './boardsContext';
import BoardsReducer from './boardsReducer';

export const BoardState = (props) => {
    const initalState = {
        boards: [
            {
                title: 'Board 1',
                color: '#4860ff',
                favorite: false,
                id: '30165652-87a1-d438-6c08-7c14a5b7c5ae',
            },
            {
                title: 'Board 2',
                color: '#fb617f',
                favorite: false,
                id: '88c8033c-7a34-4c73-b9f0-6120a82a82f5',
            },
            {
                title: 'Board 3',
                color: '#fed64d',
                favorite: false,
                id: '83a1d38c-122f-4f8e-aa02-de0ffb3b283f',
            },
        ],
    };

    const [state, dispatch] = useReducer(BoardsReducer, initalState);

    const addBoard = (board) => {
        dispatch({
            type: 'ADD_BOARD',
            payload: board,
        });
    };

    const removeBoard = (id) => {
        dispatch({
            type: 'REMOVE_BOARD',
            payload: id,
        });
    };

    const favoriteBoard = (id) => {
        dispatch({
            type: 'FAVORITE_BOARD',
            payload: id,
        });
    };

    return (
        <BoardsContext.Provider
            value={{
                boards: state.boards,
                addBoard,
                removeBoard,
                favoriteBoard,
            }}
        >
            {props.children}
        </BoardsContext.Provider>
    );
};

export default BoardState;
