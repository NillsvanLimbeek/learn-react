import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from '@emotion/styled';

import { stateColumns, stateItems } from './state';

import { Column } from './Column';

const Container = styled.div`
    display: flex;
`;

function App() {
    const [columns, setColumns] = useState(stateColumns);
    const [items] = useState(stateItems);

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        const home = columns.find((column) => column.id === source.droppableId);
        const foreign = columns.find(
            (column) => column.id === destination.droppableId,
        );

        // dragging in the same column
        if (home === foreign) {
            // column
            const column = columns.find(
                (column) => column.id === source.droppableId,
            );

            // new items array
            const newItemIds = [...column.items];
            newItemIds.splice(source.index, 1);
            newItemIds.splice(destination.index, 0, draggableId);

            // update columns
            const newColumn = { ...column, items: newItemIds };
            const newColumns = [...columns];
            newColumns.splice(columns.indexOf(column), 1);
            newColumns.splice(columns.indexOf(column), 0, newColumn);

            setColumns(newColumns);
            return;
        }

        // dragging between columns
        const homeItemIds = [...home.items];
        homeItemIds.splice(source.index, 1);

        const newHome = {
            ...home,
            items: homeItemIds,
        };

        const foreignItemIds = [...foreign.items];
        foreignItemIds.splice(destination.index, 0, draggableId);

        const newForeign = {
            ...foreign,
            items: foreignItemIds,
        };

        // update state
        const newColumns = [...columns];

        // insert new home column
        newColumns.splice(columns.indexOf(home), 1);
        newColumns.splice(columns.indexOf(home), 0, newHome);

        // insert new foreign column
        newColumns.splice(columns.indexOf(foreign), 1);
        newColumns.splice(columns.indexOf(foreign), 0, newForeign);

        setColumns(newColumns);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Container>
                {columns.map((column) => (
                    <Column column={column} items={items} key={column.id} />
                ))}
            </Container>
        </DragDropContext>
    );
}

export default App;
