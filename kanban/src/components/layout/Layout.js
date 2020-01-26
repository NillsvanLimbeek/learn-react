import React from 'react';

import './Layout.scss';

import { Navbar } from '../navbar/Navbar';
import { BoardCard } from '../board-card/BoardCard';

export const Layout = () => {
    const state = {
        boards: [
            {
                title: 'Board 1',
                color: 'blue',
            },
            {
                title: 'Board 2',
                color: 'red',
            },
            {
                title: 'Board 3',
                color: 'green',
            },
        ],
    };

    return (
        <div className="layout">
            <Navbar />

            <main>
                {state.boards.map((board) => (
                    <BoardCard board={board} key={board.title} />
                ))}
            </main>
        </div>
    );
};
