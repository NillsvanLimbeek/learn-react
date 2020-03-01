import React, { useContext, useEffect, useState } from 'react';

import './Column.scss';

import ColumnsContext from '../../context/columns/columnsContext';
import CardsContext from '../../context/cards/cardsContext';

import { generateGuid } from '../../utils/guid';

export const Column = ({ column }) => {
    const { updateColumn } = useContext(ColumnsContext);
    const { cards, addCard } = useContext(CardsContext);

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
        const id = generateGuid();
        const card = { title: 'Card', id, columnId: column.id };
        const newColumn = { ...column, cards: [...column.cards, id] };

        addCard(card);
        updateColumn(newColumn);
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
                    // TODO card component
                    <p key={card.id}>{card.title}</p>
                ))}

                <p className="column__add" onClick={onAddCard}>
                    Add Card
                </p>
            </div>
        </div>
    );
};
