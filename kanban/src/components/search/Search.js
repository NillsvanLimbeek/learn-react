import React, { useState, useEffect } from 'react';

import './Search.scss';

export const Search = ({ search, withModal = false }) => {
    const [searchValue, setSearchValue] = useState(search);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        searchValue.length > 0 ? setShowModal(true) : setShowModal(false);
    }, [searchValue]);

    const onChange = (e) => {
        setSearchValue(e.target.value);
    };

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
                value={searchValue}
                onChange={onChange}
            />

            {withModal && showModal && (
                <div className="search__modal">
                    <div className="search__modal-body">Test</div>
                    <div className="search__modal-background" />
                </div>
            )}
        </div>
    );
};
