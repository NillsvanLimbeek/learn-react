import React, { useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import './Column.scss';

import {
    useBoardsState,
    useBoardsDispatch,
} from '../../../context/boards/boardsContext';
import { useColumnsDispatch } from '../../../context/columns/columnsContext';
import { useCardsDispatch } from '../../../context/cards/cardsContext';

import { generateGuid } from '../../../utils/guid';

import { IColumn } from '../../../data/types/Column';
import { ICard } from '../../../data/types/Card';

import { InlineEdit } from '../../../components/inline-edit/InlineEdit';
import { Card } from '../../../components/card/Card';
import { IBoard } from '../../../data/types/Board';

type Props = {
    column: IColumn;
    cards: ICard[];
    index: number;
    setNewColumn: (e: boolean) => void;
};

export const Column = ({ column, cards, index, setNewColumn }: Props) => {
    // context
    const { boards } = useBoardsState();
    const boardsDispatch = useBoardsDispatch();
    const columnsDispatch = useColumnsDispatch();
    const cardsDispatch = useCardsDispatch();

    // state
    const [columnCards, setColumnCards] = useState<ICard[] | null>(null);
    const [editTitle, setEditTitle] = useState(false);

    // find cards
    useEffect(() => {
        const columnCards: any = column.cardIds.map((id) => {
            return cards.find((card) => card.id === id);
        });

        if (columnCards) {
            setColumnCards(columnCards);
        }

        return () => {
            setColumnCards(null);
        };
    }, [column, cards]);

    const addCard = () => {
        const cardId = generateGuid();
        const updatedColumn: IColumn = {
            ...column,
            cardIds: [...column.cardIds, cardId],
        };
        const card: ICard = {
            title: 'Card',
            id: cardId,
            columnId: column.id,
            labels: [],
        };

        cardsDispatch({ type: 'ADD_CARD', payload: card });
        columnsDispatch({ type: 'UPDATE_COLUMN', payload: updatedColumn });
    };

    const setColumnTitle = (title: string) => {
        const previousTitle = column.title;

        // leave old title on empty
        if (title.length === 0 && previousTitle) {
            setEditTitle(false);
            return;
        }

        // update title
        if (title.length) {
            columnsDispatch({
                type: 'UPDATE_COLUMN',
                payload: { ...column, title },
            });

            // TODO
            setEditTitle(false);
            setNewColumn(false);
            return;
        }

        // delete if there is no title
        const board = boards.find((board) => board.id === column.boardId);

        if (board) {
            const newBoard: IBoard = {
                ...board,
                columnIds: board.columnIds.filter((id) => id !== column.id),
            };

            boardsDispatch({ type: 'UPDATE_BOARD', payload: newBoard });
            columnsDispatch({ type: 'DELETE_COLUMN', payload: column.id });
            setNewColumn(false);
        }
    };

    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided) => (
                <div
                    className="column"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <div
                        className="column__header"
                        {...provided.dragHandleProps}
                    >
                        <div className="column__title">
                            <i className="far fa-circle" />

                            {column.title.length && !editTitle ? (
                                <h4 onClick={() => setEditTitle(true)}>
                                    {column.title}
                                </h4>
                            ) : (
                                <InlineEdit
                                    value={column.title}
                                    onBlur={setColumnTitle}
                                />
                            )}
                        </div>

                        <i className="fas fa-ellipsis-h" />
                    </div>

                    <Droppable droppableId={column.id} type="card">
                        {(provided) => (
                            <div
                                className="column__card-list"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {columnCards?.map((card, index) => (
                                    <Card
                                        card={card}
                                        key={card.id}
                                        index={index}
                                    />
                                ))}

                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <p className="column__add" onClick={addCard}>
                        Add Card
                    </p>
                </div>
            )}
        </Draggable>
    );
};
