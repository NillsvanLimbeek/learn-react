import React from 'react';

import './Layout.scss';

import BoardState from '../../context/BoardsState';

import { Navbar } from '../navbar/Navbar';
import { BoardsList } from '../boards-list/BoardsList';

export const Layout = () => {
    return (
        <BoardState>
            <div className="layout">
                <Navbar />

                <main>
                    <BoardsList />
                </main>
            </div>
        </BoardState>
    );
};
