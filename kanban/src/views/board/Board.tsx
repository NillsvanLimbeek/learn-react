import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import './Board.scss';

import { useBoardsState } from '../../context/boards/boardsContext';
import {
    useColumnsState,
    useColumnsDispatch,
} from '../../context/columns/columnsContext';
import {
    useCardsState,
    useCardsDispatch,
} from '../../context/cards/cardsContext';

import { generateGuid } from '../../utils/guid';

import { IBoard } from '../../data/types/Board';
import { IColumn } from '../../data/types/Column';
import { ICard } from '../../data/types/Card';

import { Column } from '../../components/column/Column';

type RouteInfo = {
    id: string;
};

export const Board = ({ match }: RouteComponentProps<RouteInfo>) => {
    // boards context
    const { boards } = useBoardsState();

    // columns context
    const { columns } = useColumnsState();
    const columnsDispatch = useColumnsDispatch();

    // cards context
    const { cards } = useCardsState();
    const cardsDispatch = useCardsDispatch();

    // state
    const [board, setBoard] = useState<IBoard | null>(null);
    const [filteredColumns, setFilteredColumns] = useState<IColumn[] | null>(
        null,
    );
    const [onAddColumn, setOnAddColumn] = useState(false);

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

    const addColumn = () => {
        if (board) {
            const column = {
                title: '',
                id: generateGuid(),
                boardId: board.id,
                cardIds: [],
            };
            columnsDispatch({ type: 'ADD_COLUMN', payload: column });
            setOnAddColumn(true);
        }
    };

    const updateColumn = (column: IColumn) => {
        columnsDispatch({ type: 'UPDATE_COLUMN', payload: column });
        setOnAddColumn(false);
    };

    const deleteColumn = (id: string) => {
        columnsDispatch({ type: 'DELETE_COLUMN', payload: id });
        setOnAddColumn(false);
    };

    const addCard = ({
        updatedColumn,
        card,
    }: {
        updatedColumn: IColumn;
        card: ICard;
    }) => {
        columnsDispatch({ type: 'UPDATE_COLUMN', payload: updatedColumn });
        cardsDispatch({ type: 'ADD_CARD', payload: card });
    };

    return (
        <div className="board">
            {board && (
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
            )}

            <div className="board__columns">
                {filteredColumns?.map((column) => (
                    <Column
                        column={column}
                        cards={cards}
                        addCard={addCard}
                        updateColumn={updateColumn}
                        deleteColumn={deleteColumn}
                        key={column.id}
                    />
                ))}

                {!onAddColumn && (
                    <div className="board__add" onClick={addColumn}>
                        Add Column
                    </div>
                )}
            </div>
        </div>
    );
};
