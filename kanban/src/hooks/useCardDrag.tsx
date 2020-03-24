import { DropResult } from 'react-beautiful-dnd';

import { IColumn } from '../data/types/Column';
import { ICard } from '../data/types/Card';

export const useCardDrag = () => {
    const updateDraggedCards = (
        column: IColumn,
        cards: ICard[],
        result: DropResult,
    ) => {
        const { source, destination, draggableId } = result;

        // drop in the same column
        if (source.droppableId === destination?.droppableId) {
            // new columnIds
            const newCardIds = Array.from(column.cardIds);
            newCardIds.splice(source.index, 1);
            newCardIds.splice(destination.index, 0, draggableId);

            // new columns order
            const filteredCards: any = newCardIds.map((id) => {
                return cards.find((card) => card.id === id);
            });

            return filteredCards;
        }

        // drop in different column
        console.log('different column');
    };

    // new column
    const updateDraggedColumn = (column: IColumn, result: DropResult) => {
        const { source, destination, draggableId } = result;

        if (destination) {
            // new columnIds
            const newCardIds = Array.from(column.cardIds);
            newCardIds.splice(source.index, 1);
            newCardIds.splice(destination.index, 0, draggableId);

            const newColumn: IColumn = { ...column, cardIds: newCardIds };
            return newColumn;
        }
    };

    return { updateDraggedCards, updateDraggedColumn };
};
