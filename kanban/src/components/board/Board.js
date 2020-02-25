import React, { useContext, useEffect, useState } from 'react';

import BoardsContext from '../../context/boards/boardsContext';
import ColumnsContext from '../../context/columns/columnsContext';

import './Board.scss';

import { Column } from '../column/Column';

export const Board = ({ match }) => {
    const [board, setBoard] = useState({});

    const { boards } = useContext(BoardsContext);
    const { columns } = useContext(ColumnsContext);

    useEffect(() => {
        const board = boards.find((board) => board.id === match.params.id);

        if (board) {
            setBoard(board);
        }
    }, [match, boards]);

    return (
        <div className="board">
            <div className="board__header">
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

            <div className="board__columns">
                {columns.map((column) => (
                    <Column column={column} key={column.id} />
                ))}
            </div>
        </div>
    );
};
