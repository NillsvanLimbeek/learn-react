import React, { useReducer } from 'react';

import CardsContext from './cardsContext';
import CardsReducer from './cardsReducer';

export const CardsState = (props) => {
    const initialState = {
        cards: [
            {
                title: 'Card 1',
                id: '67061e04-da50-49da-b61c-46be7ee1eb1f',
                columnId: 'fd97350a-3875-45ad-822a-74a5c59ff0e9',
                // TODO
                // labels
                // description
                // attachments
            },
            {
                title: 'Card 2',
                id: 'fd4ae017-f106-4f8a-bf10-a8a7ce09c342',
                columnId: 'fd97350a-3875-45ad-822a-74a5c59ff0e9',
            },
            {
                title: 'Card 3',
                id: 'a8425a2f-1138-4a6f-9d86-1efa8f9432fe',
                columnId: 'b3f095aa-f4a7-4978-b614-c5406376ed72',
            },
        ],
    };

    const [state, dispatch] = useReducer(CardsReducer, initialState);

    const addCard = (card) => {
        dispatch({
            type: 'ADD_CARD',
            payload: card,
        });
    };

    return (
        <CardsContext.Provider value={{ cards: state.cards, addCard }}>
            {props.children}
        </CardsContext.Provider>
    );
};

export default CardsState;
