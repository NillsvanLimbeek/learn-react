export default (state, action) => {
    switch (action.type) {
        case 'ADD_CARD':
            return { ...state, cards: [...state.cards, action.payload] };
        default:
            return state;
    }
};
