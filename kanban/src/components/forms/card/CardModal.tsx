import React, { useEffect, useState } from 'react';

import './CardModal.scss';

import {
    useCardsState,
    // useCardsDispatch,
} from '../../../context/cards/cardsContext';
import { useColumnsState } from '../../../context/columns/columnsContext';

import { ICard } from '../../../data/types/Card';
import { IColumn } from '../../../data/types/Column';

type Props = {
    id: string;
};

export const CardModal = ({ id }: Props) => {
    const { columns } = useColumnsState();
    const { cards } = useCardsState();

    const [card, setCard] = useState<ICard | null>(null);
    const [column, setColumn] = useState<IColumn | null>(null);

    // find card
    useEffect(() => {
        const card = cards.find((card) => card.id === id);

        if (card) {
            setCard(card);

            // find column
            const column = columns.find(
                (column) => column.id === card.columnId,
            );
            column ? setColumn(column) : setColumn(null);
        }

        return () => {
            setCard(null);
            setColumn(null);
        };
    }, [columns, cards, id]);

    return (
        <div className="card-modal">
            {card && column && (
                <div className="">
                    <h3>{card.title}</h3>
                    <p>{column.title}</p>
                </div>
            )}
        </div>
    );
};
