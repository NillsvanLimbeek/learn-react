import { State, Action } from './cardTypes';

export default (state: State, action: Action) => {
    switch (action.type) {
        case 'ADD_CARD':
            return { ...state, cards: [...state.cards, action.payload] };
        default:
            throw new Error(`Type of ${action.type} is not reconized`);
    }
};
