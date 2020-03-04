import React from 'react';

import './assets/scss/main.scss';
import './App.scss';

import BoardsState from './context/boards/BoardsState';
import ColumnsState from './context/columns/ColumnsState';
import CardsState from './context/cards/CardsState';

import { Layout } from './views//layout/Layout';

function App() {
    return (
        <BoardsState>
            <ColumnsState>
                <CardsState>
                    <Layout />
                </CardsState>
            </ColumnsState>
        </BoardsState>
    );
}

export default App;
