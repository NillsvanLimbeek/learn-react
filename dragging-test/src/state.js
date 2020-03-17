const stateColumns = [
    {
        id: 'column-1',
        title: 'Column 1',
        items: ['item-1', 'item-2', 'item-3', 'item-4'],
    },
    { id: 'column-2', title: 'Column 2', items: [] },
];

const stateItems = [
    { id: 'item-1', title: 'Item 1', columnId: 'column-1' },
    { id: 'item-2', title: 'Item 2', columnId: 'column-1' },
    { id: 'item-3', title: 'Item 3', columnId: 'column-1' },
    { id: 'item-4', title: 'Item 4', columnId: 'column-1' },
];

export { stateColumns, stateItems };
