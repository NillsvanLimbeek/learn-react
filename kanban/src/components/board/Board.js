import React, { useContext, useEffect, useState } from 'react';

import BoardsContext from '../../context/boardsContext';

export const Board = (props) => {
    const [board, setBoard] = useState({});

    const { boards } = useContext(BoardsContext);

    useEffect(() => {
        const board = boards.find(
            (board) => board.id === parseFloat(props.match.params.id),
        );

        if (board) {
            setBoard(board);
        }
    }, [props, boards]);

    return <div>{board.title}</div>;
};
