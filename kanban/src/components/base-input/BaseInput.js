import React, { useState, useEffect } from 'react';

import './BaseInput.scss';

export const BaseInput = ({
    value,
    onInput,
    id,
    label = null,
    placeholder = null,
}) => {
    const [focus, setFocus] = useState(false);

    useEffect(() => {
        return value.length > 0 || focus ? setFocus(true) : setFocus(false);
    }, [value, focus]);

    const onChange = (e) => {
        onInput(e.target.value);
    };

    return (
        <div className="base-input">
            {label && (
                <label
                    htmlFor="input"
                    className={
                        focus
                            ? 'base-input__label base-input__label--active'
                            : 'base-input__label'
                    }
                >
                    {label}
                </label>
            )}
            <input
                type="text"
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
        </div>
    );
};
