import React, { useState } from 'react';

import './Card.scss';

import { ICard } from '../../data/types/Card';

import { Modal } from '../modal/Modal';
import { ModalCenter } from '../modal/ModalCenter';

type Props = {
    card: ICard;
};

export const Card = ({ card }: Props) => {
    const [modal, setModal] = useState(false);

    return (
        <div className="card">
            <div onClick={() => setModal(true)}>
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
                        Card Modal
                    </ModalCenter>
                </Modal>
            )}
        </div>
    );
};
