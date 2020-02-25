import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './Layout.scss';

import BoardsState from '../../context/boards/BoardsState';
import ColumnsState from '../../context/columns/ColumnsState';
import CardsState from '../../context/cards/CardsState';

import { Navbar } from '../navbar/Navbar';
import { BoardsList } from '../boards-list/BoardsList';
import { Board } from '../board/Board';

export const Layout = () => {
    return (
        <Router>
            <BoardsState>
                <ColumnsState>
                    <CardsState>
                        <div className="layout">
                            <Navbar />

                            <main>
                                <Switch>
                                    <Route
                                        path="/"
                                        exact
                                        component={BoardsList}
                                    />
                                    <Route
                                        path="/board/:id"
                                        component={Board}
                                    />
                                </Switch>
                            </main>
                        </div>
                    </CardsState>
                </ColumnsState>
            </BoardsState>
        </Router>
    );
};
