import React, { useState, useRef, useEffect } from 'react';

import './InlineEdit.scss';

type Props = {
    value: string;
    onBlur: (e: string) => void;
};

export const InlineEdit = ({ value, onBlur }: Props) => {
    const [localValue, setLocalValue] = useState(value);
    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
        input?.current?.focus();
        input?.current?.select();

        return () => {
            input?.current?.blur();
        };
    }, []);

    const submitOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onBlur(localValue);
        }
    };

    return (
        <input
            ref={input}
            className="inline-edit"
            type="text"
            value={localValue}
            onChange={(e) => setLocalValue(e.currentTarget.value)}
            onBlur={() => onBlur(localValue)}
            onKeyUp={submitOnEnter}
        />
    );
};
