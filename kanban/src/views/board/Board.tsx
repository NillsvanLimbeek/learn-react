import React, { useEffect, useState, Fragment } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import './Board.scss';

import {
    useBoardsState,
    useBoardsDispatch,
} from '../../context/boards/boardsContext';
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
import { BoardSquare } from '../../components/board-square/BoardSquare';

type RouteInfo = {
    id: string;
};

export const Board = ({ match }: RouteComponentProps<RouteInfo>) => {
    // boards context
    const { boards } = useBoardsState();
    const boardsDispatch = useBoardsDispatch();

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

        board ? setBoard(board) : setBoard(null);

        // find columns
        const filteredColumns: any = board?.columnIds.map((id) => {
            return columns.find((column) => column.id === id);
        });

        if (filteredColumns) {
            setFilteredColumns(filteredColumns);
        }

        return () => {
            setFilteredColumns([]);
        };
    }, [match, boards, columns]);

    const makeFavorite = (favorite: boolean) => {
        if (board) {
            boardsDispatch({
                type: 'UPDATE_BOARD',
                payload: { ...board, favorite },
            });
        }
    };

    const addColumn = () => {
        if (board) {
            const id = generateGuid();

            const column = {
                title: '',
                id,
                boardId: board.id,
                cardIds: [],
            };

            const newBoard = { ...board, columnIds: [...board.columnIds, id] };

            columnsDispatch({ type: 'ADD_COLUMN', payload: column });
            boardsDispatch({ type: 'UPDATE_BOARD', payload: newBoard });
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

    const onDragEnd = (result: DropResult) => {
        result.type === 'column' ? columnDrag(result) : cardDrag(result);
    };

    const columnDrag = (result: DropResult) => {
        const { source, destination, draggableId } = result;

        if (board && destination) {
            // new columnIds
            const newColumnIds = Array.from(board.columnIds);
            newColumnIds.splice(source.index, 1);
            newColumnIds.splice(destination.index, 0, draggableId);

            // new columns order
            const filteredColumns: any = newColumnIds.map((id) => {
                return columns.find((column) => column.id === id);
            });

            // update local columns order
            if (filteredColumns) {
                setFilteredColumns(filteredColumns);
            }

            // new board
            const newBoard = { ...board, columnIds: newColumnIds };

            // update board
            // timeout for ui flicker
            setTimeout(() => {
                boardsDispatch({ type: 'UPDATE_BOARD', payload: newBoard });
            }, 250);
        }
    };

    const cardDrag = (result: DropResult) => {
        const { source, destination, draggableId } = result;

        // drag between the same column
        if (source.droppableId === destination?.droppableId) {
            const column = columns.find(
                (column) => column.id === source.droppableId,
            );

            if (column) {
                // new cardIds
                const newCardIds = Array.from(column.cardIds);
                newCardIds.splice(source.index, 1);
                newCardIds.splice(destination.index, 0, draggableId);

                // new column
                if (filteredColumns) {
                    const newColumn = { ...column, cardIds: newCardIds };
                    const newColumnIndex = filteredColumns
                        .map((column) => column.id)
                        .indexOf(newColumn.id);

                    // update local state
                    const newColumns = Array.from(filteredColumns);
                    newColumns.splice(newColumnIndex, 1, newColumn);

                    setFilteredColumns(newColumns);

                    // update column
                    setTimeout(() => {
                        columnsDispatch({
                            type: 'UPDATE_COLUMN',
                            payload: newColumn,
                        });
                    }, 250);
                }

                return;
            }
        }

        // drag between different columns
        const origin = columns.find(
            (column) => column.id === source.droppableId,
        );
        const dest = columns.find(
            (column) => column.id === destination?.droppableId,
        );

        if (filteredColumns && destination && origin && dest) {
            // new origin column
            const originCardIds = Array.from(origin.cardIds);
            originCardIds.splice(source.index, 1);

            const newOrigin: IColumn = { ...origin, cardIds: originCardIds };
            const newOriginIndex = filteredColumns
                .map((column) => column.id)
                .indexOf(newOrigin.id);

            // new dest column
            const destCardIds = Array.from(dest.cardIds);
            destCardIds.splice(destination.index, 0, draggableId);

            const newDest: IColumn = { ...dest, cardIds: destCardIds };
            const newDestIndex = filteredColumns
                .map((column) => column.id)
                .indexOf(newDest.id);

            // update local state
            const newColumns = Array.from(filteredColumns);
            newColumns.splice(newDestIndex, 1, newDest);
            newColumns.splice(newOriginIndex, 1, newOrigin);

            setFilteredColumns(newColumns);

            // update columns
            setTimeout(() => {
                columnsDispatch({
                    type: 'UPDATE_COLUMN',
                    payload: newOrigin,
                });

                columnsDispatch({
                    type: 'UPDATE_COLUMN',
                    payload: newDest,
                });
            }, 0);
        }
    };

    return (
        <div className="board">
            {board && (
                <Fragment>
                    <div className="board__header">
                        <BoardSquare
                            color={board.color}
                            favorite={board.favorite}
                            makeFavorite={makeFavorite}
                        />

                        <div className="board__info">
                            <h3>{board.title}</h3>
                            <p>Nills</p>
                        </div>
                    </div>

                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="board__columns">
                            <Droppable
                                droppableId={board.id}
                                direction={'horizontal'}
                                type="column"
                            >
                                {(provided) => (
                                    <div
                                        className="board__columns"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {filteredColumns?.map(
                                            (column, index) => (
                                                <Column
                                                    column={column}
                                                    cards={cards}
                                                    addCard={addCard}
                                                    updateColumn={updateColumn}
                                                    deleteColumn={deleteColumn}
                                                    key={column.id}
                                                    index={index}
                                                />
                                            ),
                                        )}

                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>

                            {!onAddColumn && (
                                <div className="board__add" onClick={addColumn}>
                                    Add Column
                                </div>
                            )}
                        </div>
                    </DragDropContext>
                </Fragment>
            )}
        </div>
    );
};
