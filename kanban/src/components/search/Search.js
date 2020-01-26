import React, { useState } from 'react';

import './Search.scss';

export const Search = ({ search }) => {
    const [active, setActive] = useState(false);
    const [searchValue, setSearchValue] = useState(search);

    const onChange = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <div className="search">
            <label
                className={`search__icon ${
                    active ? 'search__icon--active' : ''
                }`}
                htmlFor="search"
            >
                <i className="fas fa-search" />
            </label>

            <input
                className="search__input"
                type="text"
                name="search"
                placeholder="Search..."
                value={searchValue}
                onFocus={() => setActive(true)}
                onBlur={() => setActive(false)}
                onChange={onChange}
            />
        </div>
    );
};
