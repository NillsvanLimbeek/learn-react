import React from 'react';

import './assets/scss/main.scss';
import './App.scss';

import Navbar from './components/navbar/Navbar';
import { BoardCard } from './components/board-card/BoardCard';

function App() {
    const state = {
        boards: [
            {
                title: 'Board #1',
                color: 'Red',
            },
            {
                title: 'Board #2',
                color: 'Blue',
            },
            {
                title: 'Board #3',
                color: 'Green',
            },
        ],
    };

    return (
        <div className="app">
            <Navbar />

            <div className="app__boards">
                {state.boards.map((board) => (
                    <BoardCard board={board} key={board.title} />
                ))}
            </div>
        </div>
    );
}

export default App;
