import React, { useContext, useEffect, useState } from 'react';

import './Column.scss';

import CardsContext from '../../context/cards/cardsContext';

export const Column = ({ column }) => {
    const { cards } = useContext(CardsContext);

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

                <p className="column__add">Add Card</p>
            </div>
        </div>
    );
};
