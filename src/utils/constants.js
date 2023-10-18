// export const CUSTOMER_TYPE = Object.freeze({
//     flower: 'Khách Vường hoa',
//     hotel: 'Khách Khách Sạn',
// });

export const CUSTOMER_TYPE = [
    { key: 'flower', value: 'flower', label: 'Khách Vường hoa' },
    { key: 'hotel', value: 'hotel', label: 'Khách Khách Sạn' },
];

export const CUSTOMER_TAB = [
    {
        key: 'new',
        label: 'NEW',
        active: true,
    },
    {
        key: 'ordering',
        label: 'ORDERING',
        active: false,
    },
    {
        key: 'ordered',
        label: 'ORDERED',
        active: false,
    },
];

export const ORDERS_TAB = [
    {
        key: 'orders',
        label: 'ORDER LIST',
        active: true,
    },
    {
        key: 'discounts',
        label: 'DISCOUNTS',
        active: false,
    },
];

export const SERVICES_TAB = [
    {
        key: 'water',
        label: 'WATERS',
        active: true,
    },
    {
        key: 'food',
        label: 'FOODS',
        active: false,
    },
];
