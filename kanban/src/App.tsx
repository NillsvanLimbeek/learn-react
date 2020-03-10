import React from 'react';

import './assets/scss/main.scss';
import './App.scss';

import { BoardsProvider } from './context/boards/boardsContext';
import { ColumnsProvider } from './context/columns/columnsContext';
import { CardsProvider } from './context/cards/cardsContext';

import { Layout } from './views//layout/Layout';

function App() {
    return (
        <BoardsProvider>
            <ColumnsProvider>
                <CardsProvider>
                    <Layout />
                </CardsProvider>
            </ColumnsProvider>
        </BoardsProvider>
    );
}

export default App;
