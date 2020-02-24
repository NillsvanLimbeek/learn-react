import React, { useContext, useEffect, useState } from 'react';

import BoardsContext from '../../context/boardsContext';

import './Board.scss';

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

    return (
        <div className="board">
            <div
                className="board__square"
                style={{
                    backgroundColor: `${board.color}`,
                    boxShadow: `2px 2px 7px 2px ${board.color}4d`,
                }}
            />

            <div className="board__info">
                <h3>{board.title}</h3>
                <p>Nills</p>
            </div>
        </div>
    );
};
