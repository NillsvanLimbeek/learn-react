import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from '@emotion/styled';

import { stateColumns, stateItems } from './state';

import { Column } from './Column';

const Container = styled.div`
    display: flex;
`;

function App() {
    const [columns, setColumns] = useState(stateColumns);
    const [items, setItems] = useState(stateItems);

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

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
