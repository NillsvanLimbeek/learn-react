import React, { useReducer, createContext, useContext } from 'react';

import CardsReducer from './cardsReducer';
import { State, Dispatch, Props } from './cardTypes';

// state
const initialState: State = {
    cards: [
        {
            title: 'Card 1',
            id: '67061e04-da50-49da-b61c-46be7ee1eb1f',
            columnId: 'fd97350a-3875-45ad-822a-74a5c59ff0e9',
            labels: ['red', 'blue', 'yellow'],
        },
        {
            title: 'Card 2',
            id: 'fd4ae017-f106-4f8a-bf10-a8a7ce09c342',
            columnId: 'fd97350a-3875-45ad-822a-74a5c59ff0e9',
            labels: ['blue'],
        },
        {
            title: 'Card 3',
            id: 'a8425a2f-1138-4a6f-9d86-1efa8f9432fe',
            columnId: 'b3f095aa-f4a7-4978-b614-c5406376ed72',
            labels: ['yellow'],
        },
    ],
};

// create state and dispatch
const CardsStateContext = createContext<State | undefined>(undefined);
const CardsDispatchContext = createContext<Dispatch | undefined>(undefined);

function CardsProvider({ children }: Props) {
    const [state, dispatch] = useReducer(CardsReducer, initialState);

    return (
        <CardsStateContext.Provider value={{ cards: state.cards }}>
            <CardsDispatchContext.Provider value={dispatch}>
                {children}
            </CardsDispatchContext.Provider>
        </CardsStateContext.Provider>
    );
}

function useCardsState() {
    const context = useContext(CardsStateContext);

    if (context === undefined) {
        throw new Error('useCardsState must be used within a CardsProvider');
    }
    return context;
}

function useCardsDispatch() {
    const context = useContext(CardsDispatchContext);

    if (context === undefined) {
        throw new Error('useCardsDispatch must be used within a CardsProvider');
    }
    return context;
}

export { CardsProvider, useCardsState, useCardsDispatch };
