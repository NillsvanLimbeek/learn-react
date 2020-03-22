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
        const { source, destination, draggableId } = result;

        if (board && destination) {
            // new columnIds
            const newColumnIds = Array.from(board.columnIds);
            newColumnIds.splice(source.index, 1);
            newColumnIds.splice(destination?.index, 0, draggableId);

            //
            const filteredColumns: any = newColumnIds.map((id) => {
                return columns.find((column) => column.id === id);
            });

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
