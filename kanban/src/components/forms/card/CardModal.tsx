import React, { useEffect, useState } from 'react';

import './CardModal.scss';

import {
    useCardsState,
    // useCardsDispatch,
} from '../../../context/cards/cardsContext';
import { ICard } from '../../../data/types/Card';

type Props = {
    id: string;
};

export const CardModal = ({ id }: Props) => {
    const { cards } = useCardsState();

    const [card, setCard] = useState<ICard | null>(null);

    // find card
    useEffect(() => {
        const card = cards.find((card) => card.id === id);

        card ? setCard(card) : setCard(null);

        return () => {
            setCard(null);
        };
    }, [cards, id]);

    return <div className="card-modal">{card && <h3>{card.title}</h3>}</div>;
};
