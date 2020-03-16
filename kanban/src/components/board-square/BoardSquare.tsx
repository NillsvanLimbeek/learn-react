import React from 'react';

import './BoardSquare.scss';

type Props = {
    color: string;
    favorite: boolean;
    makeFavorite: (favorite: boolean) => void;
};

export const BoardSquare = ({ color, favorite, makeFavorite }: Props) => {
    return (
        <div
            className="board-square"
            onClick={() => makeFavorite(!favorite)}
            style={{
                backgroundColor: `${color}`,
                boxShadow: `2px 2px 7px 2px ${color}4d`,
            }}
        >
            {favorite && <i className="board-square__star fas fa-star" />}
        </div>
    );
};
