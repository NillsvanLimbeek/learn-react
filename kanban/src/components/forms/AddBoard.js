import React, { useState, useContext } from 'react';

import './AddBoard.scss';

import BoardsContext from '../../context/boards/boardsContext';

import { generateGuid } from '../../utils/guid';

import { BaseInput } from '../base-input/BaseInput';

export const AddBoard = ({ onAddBoard }) => {
    const { addBoard } = useContext(BoardsContext);

    const [board, setBoard] = useState({
        title: '',
        color: '',
        favorite: false,
        id: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();

        addBoard(board);
        onAddBoard(board);
    };

    const setInput = (e) => {
        setBoard({
            ...board,
            [e.target.name]: e.target.value,
            favorite: false,
            id: generateGuid(),
        });
    };

    return (
        <div className="add-board">
            <h3>Add Board</h3>

            <form onSubmit={onSubmit}>
                <BaseInput
                    name="title"
                    label="Board Name"
                    value={board.title}
                    onInput={setInput}
                />
                <BaseInput
                    name="color"
                    label="Color"
                    value={board.color}
                    onInput={setInput}
                />

                <button>Submit</button>
            </form>
        </div>
    );
};
