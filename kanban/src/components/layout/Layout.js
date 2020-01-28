import React from 'react';

import './Layout.scss';

import { Navbar } from '../navbar/Navbar';
import { BoardCard } from '../board-card/BoardCard';

export const Layout = () => {
    const state = {
        boards: [
            {
                title: 'Board 1',
                color: '#4860ff',
            },
            {
                title: 'Board 2',
                color: '#fb617f',
            },
            {
                title: 'Board 3',
                color: '#fed64d',
            },
        ],
    };

    return (
        <div className="layout">
            <Navbar boards={state.boards} />

            <main>
                {state.boards.map((board) => (
                    <BoardCard board={board} key={board.title} />
                ))}
            </main>
        </div>
    );
};
