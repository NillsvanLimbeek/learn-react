import { ICard } from '../../data/types/Card';

export type Action =
    | { type: 'ADD_CARD'; payload: ICard }
    | { type: 'REMOVE_CARD'; payload: string };
export type State = { cards: ICard[] };
export type Dispatch = (action: Action) => void;
export type Props = { children: React.ReactNode };
