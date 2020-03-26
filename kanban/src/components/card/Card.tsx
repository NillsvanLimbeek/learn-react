import React, { useState, Fragment } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import './Card.scss';

import { ICard } from '../../data/types/Card';

import { Modal } from '../modal/Modal';
import { ModalCenter } from '../modal/ModalCenter';
import { CardModal } from '../forms/card/CardModal';

type Props = {
    card: ICard;
    index: number;
};

export const Card = ({ card, index }: Props) => {
    const [modal, setModal] = useState(false);

    return (
        <Fragment>
            <Draggable draggableId={card.id} index={index}>
                {(provided) => (
                    <div
                        className="card"
                        onClick={() => setModal(true)}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <div className="card__labels">
                            {card.labels.length > 0 &&
                                card.labels.map((label) => (
                                    <div
                                        className="card__label"
                                        style={{
                                            backgroundColor: `var(--color-${label})`,
                                        }}
                                        key={label}
                                    />
                                ))}
                        </div>

                        <p className="card__title">{card.title}</p>
                    </div>
                )}
            </Draggable>

            {modal && (
                <Modal>
                    <ModalCenter closeModal={() => setModal(false)}>
                        <CardModal id={card.id} />
                    </ModalCenter>
                </Modal>
            )}
        </Fragment>
    );
};
