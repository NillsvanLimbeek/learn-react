import React, { useState, useEffect } from 'react';

import './Search.scss';

export const Search = ({ search }) => {
    const [active, setActive] = useState(false);
    const [searchValue, setSearchValue] = useState(search);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        searchValue.length > 0 ? setModal(true) : setModal(false);
    }, [searchValue]);

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

            {modal && (
                <div className="search__modal">
                    <div className="search__modal-body">Test</div>
                    <div className="search__modal-background" />
                </div>
            )}
        </div>
    );
};
