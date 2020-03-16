import { IBoard } from '../../data/types/Board';

export type Action =
    | { type: 'ADD_BOARD'; payload: IBoard }
    | { type: 'REMOVE_BOARD'; payload: string }
    | { type: 'UPDATE_BOARD'; payload: IBoard };
export type State = { boards: IBoard[] };
export type Dispatch = (action: Action) => void;
export type Props = { children: React.ReactNode };
