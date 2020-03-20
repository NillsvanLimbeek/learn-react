import React, { useState, useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';

import { Item } from './Item';

const Container = styled.div`
    display: flex;
    flex-direction: column;

    margin-right: 15px;
    border: 1px solid lightgrey;
    padding: 8px;
    width: 250px;
    min-height: 100px;
`;

const Title = styled.h3`
    text-align: center;
`;

const ItemList = styled.div`
    min-height: 100px;
`;

export const Column = ({ column, items }) => {
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        const filteredItems = column.items.map((id) => {
            return items.find((item) => item.id === id);
        });

        if (filteredItems) {
            setFilteredItems(filteredItems);
        }

        return () => {
            setFilteredItems([]);
        };
    }, [column, items]);

    return (
        <Container>
            <Title>{column.title}</Title>

            <Droppable droppableId={column.id}>
                {(provided) => (
                    <ItemList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {filteredItems.map((item, index) => (
                            <Item item={item} key={item.id} index={index} />
                        ))}

                        {provided.placeholder}
                    </ItemList>
                )}
            </Droppable>
        </Container>
    );
};
