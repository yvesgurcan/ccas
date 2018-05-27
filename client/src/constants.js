export const suppliersList = [
    {
        value: 'acme',
        label: 'ACME Autos',
    },
    {
        value: 'rainier',
        label: 'Rainier Transportation Solutions',
    },
];

export const makesList = [
    {
        value: 'fastcarsco',
        label: 'Fast Cars Company',
    },
    {
        value: 'inspiringbrandname',
        label: 'Inspiring Brand Name',
    },
];

export const modelsList = [
    {
        value: 'anvil',
        label: 'Anvil',
        make: makesList[0].value,
        supplier: suppliersList[0].value,
    },
    {
        value: 'pugetsound',
        label: 'Puget Sound',
        make: makesList[1].value,
        supplier: suppliersList[1].value,
    },
    {
        value: 'olympic',
        label: 'Olympic',
        make: makesList[0].value,
        supplier: suppliersList[1].value,
    },
    {
        value: 'roadrunner',
        label: 'Roadrunner',
        make: makesList[0].value,
        supplier: suppliersList[0].value,
    },
    {
        value: 'wile',
        label: 'Wile',
        make: makesList[1].value,
        supplier: suppliersList[0].value,
    },
];
