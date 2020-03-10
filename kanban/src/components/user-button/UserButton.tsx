import React from 'react';

import './UserButton.scss';

export const UserButton = () => {
    return (
        <div className="user-button">
            <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="UserAvatar"
            />

            <p className="user-button__text">Hello Nills!</p>
        </div>
    );
};
