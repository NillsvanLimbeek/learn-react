import React from 'react';

import './SideMenu.scss';

export const SideMenu = ({ children, closeSideMenu }) => {
    return (
        <div className="side-menu">
            <div className="side-menu__body">
                <i
                    className="side-menu__close fas fa-times"
                    onClick={() => closeSideMenu()}
                />
                {children}
            </div>

            <div className="side-menu__background" />
        </div>
    );
};
