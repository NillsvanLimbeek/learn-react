import React, { useContext, useEffect, useState } from 'react';

import BoardsContext from '../../context/boards/boardsContext';
import ColumnsContext from '../../context/columns/columnsContext';

import './Board.scss';

import { Column } from '../column/Column';

export const Board = ({ match }) => {
    const { boards } = useContext(BoardsContext);
    const { columns } = useContext(ColumnsContext);

    const [board, setBoard] = useState({});
    const [filteredColumns, setFilteredColumns] = useState([]);

    useEffect(() => {
        // find board
        const board = boards.find((board) => board.id === match.params.id);

        if (board) {
            setBoard(board);

            // find columns
            const filteredColumns = columns.filter(
                (column) => column.boardId === board.id,
            );

            if (filteredColumns.length) {
                setFilteredColumns(filteredColumns);
            }
        }

        return () => {
            setFilteredColumns([]);
        };
    }, [match, boards, columns]);

    return (
        // TODO loading if board is being fetched
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
                {filteredColumns.map((column) => (
                    <Column column={column} key={column.id} />
                ))}

                <div className="board__add">Add Column</div>
            </div>
        </div>
    );
};
