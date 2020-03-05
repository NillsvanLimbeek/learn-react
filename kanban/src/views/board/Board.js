import React, { useContext, useEffect, useState } from 'react';

import BoardsContext from '../../context/boards/boardsContext';
import ColumnsContext from '../../context/columns/columnsContext';
import CardsContext from '../../context/cards/cardsContext';

import './Board.scss';

import { generateGuid } from '../../utils/guid';

import { Column } from '../../components/column/Column';

export const Board = ({ match }) => {
    const { boards } = useContext(BoardsContext);
    const { columns, addColumn, updateColumn } = useContext(ColumnsContext);
    const { cards, addCard } = useContext(CardsContext);

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

    const onAddColumn = () => {
        addColumn({
            title: '',
            id: generateGuid(),
            boardId: board.id,
            cardIds: [],
        });
    };

    const onAddCard = ({ updatedColumn, card }) => {
        updateColumn(updatedColumn);
        addCard(card);
    };

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
                {filteredColumns.map((column) => (
                    <Column
                        column={column}
                        cards={cards}
                        addCard={onAddCard}
                        key={column.id}
                    />
                ))}

                <div className="board__add" onClick={onAddColumn}>
                    Add Column
                </div>
            </div>
        </div>
    );
};
