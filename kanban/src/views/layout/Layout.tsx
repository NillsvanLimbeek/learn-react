import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './Layout.scss';

import { Navbar } from '../../components/navbar/Navbar';

import { BoardsList } from '../boards-list/BoardsList';
import { Board } from '../board/Board';

export const Layout = () => {
    return (
        <Router>
            <div className="layout">
                <Navbar />

                <main>
                    <Switch>
                        <Route path="/" exact component={BoardsList} />
                        <Route path="/board/:id" component={Board} />
                    </Switch>
                </main>
            </div>
        </Router>
    );
};
