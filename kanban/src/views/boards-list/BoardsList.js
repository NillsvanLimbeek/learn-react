import React, { useContext, useEffect, useState, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './BoardsList.scss';

import BoardsContext from '../../context/boards/boardsContext';

import { BoardCard } from '../../components/board-card/BoardCard';
import { Modal } from '../../components/modal/Modal';
import { ModalCenter } from '../../components/modal/ModalCenter';
import { AddBoard } from '../../components/forms/AddBoard';

export const BoardsList = () => {
    const { boards } = useContext(BoardsContext);

    const [favorite, setFavorite] = useState(false);
    const [modal, setModal] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if (boards.filter((board) => board.favorite).length) {
            setFavorite(true);
        }

        return () => setFavorite(false);
    }, [boards]);

    const redirectToBoard = (board) => {
        history.push(`board/${board.id}`);
    };

    return (
        <div className="boards-list">
            {favorite && (
                <Fragment>
                    <h3>Favorite Boards</h3>

                    <div className="boards-list__list">
                        {boards.map((board) =>
                            board.favorite ? (
                                <BoardCard board={board} key={board.id} />
                            ) : null,
                        )}
                    </div>
                </Fragment>
            )}

            <Fragment>
                <h3>Personal Boards</h3>

                <div className="boards-list__list">
                    {boards.map((board) => (
                        <Link to={`/board/${board.id}`} key={board.id}>
                            <BoardCard board={board} key={board.id} />
                        </Link>
                    ))}

                    <div
                        className="boards-list__add"
                        onClick={() => setModal(true)}
                    >
                        <p>Add Board</p>
                    </div>
                </div>
            </Fragment>

            {modal && (
                <Modal>
                    <ModalCenter closeModal={() => setModal(false)}>
                        <AddBoard onAddBoard={redirectToBoard} />
                    </ModalCenter>
                </Modal>
            )}
        </div>
    );
};
