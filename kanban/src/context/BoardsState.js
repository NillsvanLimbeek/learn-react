import React, { useReducer } from 'react';

import BoardsContext from './boardsContext';
import BoardsReducer from './boardsReducer';

const BoardState = (props) => {
    const initalState = {
        boards: [
            {
                title: 'Board 1',
                color: '#4860ff',
            },
            {
                title: 'Board 2',
                color: '#fb617f',
            },
            {
                title: 'Board 3',
                color: '#fed64d',
            },
        ],
        search: '',
    };

    // TODO
    // eslint-disable-next-line
    const [state, dispatch] = useReducer(BoardsReducer, initalState);

    return (
        <BoardsContext.Provider
            value={{
                boards: state.boards,
                search: state.search,
            }}
        >
            {props.children}
        </BoardsContext.Provider>
    );
};

export default BoardState;
