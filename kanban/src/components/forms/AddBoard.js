import React, { useState } from 'react';

import './AddBoard.scss';

import { BaseInput } from '../base-input/BaseInput';

export const AddBoard = () => {
    const [boardName, setBoardName] = useState('');
    const [boardColor, setBoardColor] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        console.log({ boardName, boardColor });
    };

    return (
        <div className="add-board">
            <h3>Add Board</h3>

            <form onSubmit={onSubmit}>
                <BaseInput
                    id="name"
                    label="Board Name"
                    value={boardName}
                    onInput={setBoardName}
                />
                <BaseInput
                    id="color"
                    label="Color"
                    value={boardColor}
                    onInput={setBoardColor}
                />

                <button>Submit</button>
            </form>
        </div>
    );
};
