import React, { useEffect, useState } from 'react';

import './Column.scss';

import { generateGuid } from '../../utils/guid';

import { IColumn } from '../../data/types/Column';
import { ICard } from '../../data/types/Card';

import { InlineEdit } from '../inline-edit/InlineEdit';
import { Card } from '../card/Card';

type Props = {
    column: IColumn;
    cards: ICard[];
    addCard: ({
        updatedColumn,
        card,
    }: {
        updatedColumn: IColumn;
        card: ICard;
    }) => void;
};

export const Column = ({ column, cards, addCard }: Props) => {
    const [filteredCards, setFilteredCards] = useState<ICard[]>([]);

    useEffect(() => {
        const filteredCards = cards.filter(
            (card) => card.columnId === column.id,
        );

        if (filteredCards.length) {
            setFilteredCards(filteredCards);
        }

        return () => {
            setFilteredCards([]);
        };
    }, [column, cards]);

    const onAddCard = () => {
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

        addCard({ updatedColumn, card });
    };

    const setColumnTitle = (e: string) => {
        console.log(e);
    };

    return (
        <div className="column">
            <div className="column__header">
                <div className="column__title">
                    <i className="far fa-circle" />
                    {/* <h4>{column.title}</h4> */}
                    <InlineEdit value={column.title} onBlur={setColumnTitle} />
                </div>

                <i className="fas fa-ellipsis-h" />
            </div>

            <div className="column__cards">
                {filteredCards.map((card) => (
                    <Card card={card} key={card.id} />
                ))}

                <p className="column__add" onClick={onAddCard}>
                    Add Card
                </p>
            </div>
        </div>
    );
};
