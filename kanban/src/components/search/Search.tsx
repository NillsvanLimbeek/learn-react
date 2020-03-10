import React, { useState, useEffect } from 'react';

import './Search.scss';

type Props = {
    search: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    withModal?: boolean;
};

export const Search = ({ search, onChange, withModal }: Props) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        return search.length > 0 ? setShowModal(true) : setShowModal(false);
    }, [search]);

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
                value={search}
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
