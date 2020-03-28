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
import { useCardsState } from '../../context/cards/cardsContext';

import { useColumnDrag } from '../../hooks/useColumnDrag';
import { useCardDrag } from '../../hooks/useCardDrag';

import { generateGuid } from '../../utils/guid';

import { IBoard } from '../../data/types/Board';
import { IColumn } from '../../data/types/Column';

import { Column } from './column/Column';
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

    // drag hooks
    const { updateColumns, updateBoard } = useColumnDrag();
    const { dragInSameColumn, dragInDifferentColumns } = useCardDrag();

    // state
    const [board, setBoard] = useState<IBoard | null>(null);
    const [boardColumns, setBoardColumns] = useState<IColumn[] | null>(null);
    const [newColumn, setNewColumn] = useState(false);

    useEffect(() => {
        // find board
        const board = boards.find((board) => board.id === match.params.id);

        board ? setBoard(board) : setBoard(null);

        // find columns
        const boardColumns: any = board?.columnIds.map((id) => {
            return columns.find((column) => column.id === id);
        });

        if (boardColumns) {
            setBoardColumns(boardColumns);
        }

        return () => {
            setBoardColumns(null);
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
            setNewColumn(true);
        }
    };

    const onDragEnd = (result: DropResult) => {
        result.type === 'column' ? columnDrag(result) : cardDrag(result);
    };

    const columnDrag = (result: DropResult) => {
        if (board) {
            const newColumns = updateColumns(board, columns, result);
            setBoardColumns(newColumns);

            // update board
            const newBoard = updateBoard(board, result);

            if (newBoard) {
                boardsDispatch({ type: 'UPDATE_BOARD', payload: newBoard });
            }
        }
    };

    // TODO ui flicker
    // has to do with local state of column
    // see columnDrag()
    const cardDrag = (result: DropResult) => {
        const { source, destination } = result;

        // drag in same column
        if (source.droppableId === destination?.droppableId) {
            const column = columns.find(
                (column) => column.id === result.source.droppableId,
            );

            if (column) {
                const newColumn = dragInSameColumn(column, result);

                if (newColumn) {
                    columnsDispatch({
                        type: 'UPDATE_COLUMN',
                        payload: newColumn,
                    });
                }
            }
        } else {
            // drag in different columns
            const newColumns = dragInDifferentColumns(columns, result);

            if (newColumns) {
                newColumns.forEach((column) => {
                    columnsDispatch({
                        type: 'UPDATE_COLUMN',
                        payload: column,
                    });
                });
            }
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
                                        {boardColumns?.map((column, index) => (
                                            <Column
                                                column={column}
                                                cards={cards}
                                                key={column.id}
                                                index={index}
                                                setNewColumn={(e) =>
                                                    setNewColumn(e)
                                                }
                                            />
                                        ))}

                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>

                            {!newColumn && (
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
