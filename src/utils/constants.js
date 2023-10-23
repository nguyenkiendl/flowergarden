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
        label: 'MỚI',
        active: true,
    },
    {
        key: 'ordering',
        label: 'ĐANG ORDER',
        active: false,
    },
    {
        key: 'processing',
        label: 'CHẾ BIẾN',
        active: false,
    },
    {
        key: 'return',
        label: 'TRẢ MÓN',
        active: false,
    },
    {
        key: 'complete',
        label: 'HOÀN TẤT',
        active: false,
    },
];

export const ORDERS_TAB = [
    {
        key: 'orders',
        label: 'THỰC ĐƠN',
        active: true,
    },
    {
        key: 'discounts',
        label: 'DISCOUNTS',
        active: false,
    },
];

export const PRODUCTS_TAB = [
    {
        key: 'water',
        label: 'NƯỚC',
        active: true,
    },
    {
        key: 'food',
        label: 'THỨC ĂN',
        active: false,
    },
];
