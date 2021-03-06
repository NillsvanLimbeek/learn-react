import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';

const Container = styled.div`
    text-align: center;
    border: 1px solid lightgrey;
    padding: 8px;
    margin-bottom: 8px;
    background: white;
`;

export const Item = ({ item, index }) => {
    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided) => (
                <Container
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {item.title}
                </Container>
            )}
        </Draggable>
    );
};
