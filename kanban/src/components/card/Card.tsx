import React, { useState, Fragment } from 'react';

import './Card.scss';

import { ICard } from '../../data/types/Card';

import { Modal } from '../modal/Modal';
import { ModalCenter } from '../modal/ModalCenter';
import { CardModal } from '../forms/card/CardModal';

type Props = {
    card: ICard;
};

export const Card = ({ card }: Props) => {
    const [modal, setModal] = useState(false);

    return (
        <Fragment>
            <div className="card" onClick={() => setModal(true)}>
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

            {modal && (
                <Modal>
                    <ModalCenter closeModal={() => setModal(false)}>
                        <CardModal id={card.id} />
                        {/* Test */}
                    </ModalCenter>
                </Modal>
            )}
        </Fragment>
    );
};
