import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import { BaseInput } from './BaseInput';

export default {
    component: BaseInput,
    title: 'Base Input',
    decorators: [withKnobs],
};

export const Input = () => (
    <BaseInput value={text('value', 'Test')} label={text('label', 'Label')} />
);
