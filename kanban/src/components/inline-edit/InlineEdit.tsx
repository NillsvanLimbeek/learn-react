import React, { useState } from 'react';

type Props = {
    value: string;
    onBlur: (e: any) => void;
};

export const InlineEdit = ({ value, onBlur }: Props) => {
    const [localValue, setLocalValue] = useState(value);

    return (
        <input
            type="text"
            value={localValue}
            onChange={(e) => setLocalValue(e.currentTarget.value)}
            onBlur={() => onBlur(localValue)}
        />
    );
};
