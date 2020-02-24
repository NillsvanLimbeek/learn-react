import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './Layout.scss';

import BoardState from '../../context/boards/BoardsState';

import { Navbar } from '../navbar/Navbar';
import { BoardsList } from '../boards-list/BoardsList';
import { Board } from '../board/Board';

export const Layout = () => {
    return (
        <Router>
            <BoardState>
                <div className="layout">
                    <Navbar />

                    <main>
                        <Switch>
                            <Route path="/" exact component={BoardsList} />
                            <Route path="/board/:id" component={Board} />
                        </Switch>
                    </main>
                </div>
            </BoardState>
        </Router>
    );
};
