import React, { useState, useEffect } from 'react';

import './BaseInput.scss';

import { BaseInputProps } from '../../data/types/BaseInput';

export const BaseInput = ({
    value,
    onChange,
    name,
    label,
    placeholder,
}: BaseInputProps) => {
    const [focus, setFocus] = useState(false);

    useEffect(() => {
        return value.length > 0 || focus ? setFocus(true) : setFocus(false);
    }, [value, focus]);

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
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
        </div>
    );
};
