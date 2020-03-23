import React, { useState, useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import './CardList.scss';

import { ICard } from '../../data/types/Card';

import { Card } from '../card/Card';

type Props = {
    cards: ICard[];
    columnId: string;
};

export const CardList = ({ cards, columnId }: Props) => {
    const [filteredCards, setFilteredCards] = useState<ICard[]>([]);

    // find cards
    useEffect(() => {
        const filteredCards = cards.filter(
            (card) => card.columnId === columnId,
        );

        if (filteredCards.length) {
            setFilteredCards(filteredCards);
        }

        return () => {
            setFilteredCards([]);
        };
    }, [columnId, cards]);

    return (
        <Droppable droppableId={columnId}>
            {(provided) => (
                <div
                    className="card-list__list"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {filteredCards.map((card, index) => (
                        <Card card={card} key={card.id} index={index} />
                    ))}

                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};
