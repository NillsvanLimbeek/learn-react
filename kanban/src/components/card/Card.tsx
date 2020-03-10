import React from 'react';

import './Card.scss';

import { ICard } from '../../data/types/Card';

type Props = {
    card: ICard;
};

export const Card = ({ card }: Props) => {
    return <p>{card.title}</p>;
};
