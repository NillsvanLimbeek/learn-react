import { DropResult } from 'react-beautiful-dnd';

import { IBoard } from '../data/types/Board';
import { IColumn } from '../data/types/Column';

export const useColumnDrag = () => {
    const updateColumns = (
        board: IBoard,
        columns: IColumn[],
        result: DropResult,
    ) => {
        const { source, destination, draggableId } = result;

        if (destination) {
            // new columnIds
            const newColumnIds = Array.from(board.columnIds);
            newColumnIds.splice(source.index, 1);
            newColumnIds.splice(destination.index, 0, draggableId);

            // new columns order
            const filteredColumns: any = newColumnIds.map((id) => {
                return columns.find((column) => column.id === id);
            });

            return filteredColumns;
        }
    };

    // new board
    const updateBoard = (board: IBoard, result: DropResult) => {
        const { source, destination, draggableId } = result;

        if (destination) {
            // new columnIds
            const newColumnIds = Array.from(board.columnIds);
            newColumnIds.splice(source.index, 1);
            newColumnIds.splice(destination.index, 0, draggableId);

            const newBoard: IBoard = { ...board, columnIds: newColumnIds };
            return newBoard;
        }
    };

    return { updateColumns, updateBoard };
};
