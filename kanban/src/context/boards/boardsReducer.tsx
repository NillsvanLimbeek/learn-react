import { State, Action } from './boardTypes';

export default (state: State, action: Action) => {
    switch (action.type) {
        case 'ADD_BOARD':
            return { ...state, boards: [...state.boards, action.payload] };
        case 'REMOVE_BOARD':
            return {
                ...state,
                boards: state.boards.filter(
                    (board) => board.title !== action.payload,
                ),
            };
        case 'FAVORITE_BOARD':
            const board = state.boards.find(
                (board) => board.title === action.payload,
            );

            if (board) {
                board.favorite = true;
            }

            return {
                ...state,
                boards: [...state.boards],
            };
        default:
            return state;
    }
};
