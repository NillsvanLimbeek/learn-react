import { IColumn } from '../../data/types/Column';

export type Action =
    | { type: 'ADD_COLUMN'; payload: IColumn }
    | { type: 'UPDATE_COLUMN'; payload: IColumn }
    | { type: 'DELETE_COLUMN'; payload: string };
export type State = { columns: IColumn[] };
export type Dispatch = (action: Action) => void;
export type Props = { children: React.ReactNode };
