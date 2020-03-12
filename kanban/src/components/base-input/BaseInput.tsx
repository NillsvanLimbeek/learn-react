import React, { useState, useEffect } from 'react';

import './BaseInput.scss';

type Props = {
    value: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    name: string;
    label?: string;
    placeholder?: string;
    className?: string;
};

export const BaseInput = ({
    value,
    onChange,
    name,
    label,
    placeholder,
    className,
}: Props) => {
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
                className={className}
                onChange={onChange}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
        </div>
    );
};
