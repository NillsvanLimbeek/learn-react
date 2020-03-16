import { State, Action } from './boardTypes';

export default (state: State, action: Action) => {
    switch (action.type) {
        case 'ADD_BOARD':
            return { ...state, boards: [...state.boards, action.payload] };
        case 'REMOVE_BOARD':
            return {
                ...state,
                boards: state.boards.filter(
                    (board) => board.id !== action.payload,
                ),
            };
        case 'UPDATE_BOARD':
            return {
                ...state,
                boards: state.boards.map((board) =>
                    board.id === action.payload.id ? action.payload : board,
                ),
            };
        default:
            return state;
    }
};
