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
            },
            {
                title: 'Board 2',
                color: '#fb617f',
                favorite: false,
            },
            {
                title: 'Board 3',
                color: '#fed64d',
                favorite: false,
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
