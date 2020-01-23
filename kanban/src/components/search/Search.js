import React from 'react';

import './Search.scss';

export const Search = () => {
    return (
        <div className="search">
            <label className="search__icon" htmlFor="search">
                <i className="fas fa-search" />
            </label>

            <input
                className="search__input"
                type="text"
                name="search"
                placeholder="Search..."
            />
        </div>
    );
};
