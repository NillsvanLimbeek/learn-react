import React, { useEffect, useState } from 'react';

import './Column.scss';

import { generateGuid } from '../../utils/guid';

import { Card } from '../card/Card';

export const Column = ({ column, cards, addCard }) => {
    const [filteredCards, setFilteredCards] = useState([]);

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
        const updatedColumn = {
            ...column,
            cardIds: [...column.cardIds, cardId],
        };
        const card = { title: 'Card', id: cardId, columnId: column.id };

        addCard({ updatedColumn, card });
    };

    return (
        <div className="column">
            <div className="column__header">
                <div className="column__title">
                    <i className="far fa-circle" />
                    <h4>{column.title}</h4>
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
