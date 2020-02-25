import React from 'react';

import './Column.scss';

export const Column = ({ column }) => {
    return (
        <div className="column">
            <div className="column__header">
                <div className="column__title">
                    <i className="far fa-circle" />
                    <h4>{column.title}</h4>
                </div>

                <i className="fas fa-ellipsis-h" />
            </div>
        </div>
    );
};
