// export const CUSTOMER_TYPE = Object.freeze({
//     flower: 'Khách Vường hoa',
//     hotel: 'Khách Khách Sạn',
// });

export const CUSTOMER_TYPE = [
    { key: 'hotel', value: 'hotel', label: 'Khách lẻ' },
    { key: 'flower', value: 'flower', label: 'Khách Vườn hoa' },
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

export const PRODUCTS = [
    {
        key: 'water',
        label: 'NƯỚC',
        active: true,
    },
    {
        key: 'food',
        label: 'ĐỒ ĂN',
        active: false,
    },
];

export const WATERS = [
    {
        key: 'tea',
        label: 'TRÀ',
        active: true,
    },
    {
        key: 'coffee',
        label: 'Coffee',
        active: false,
    },
    {
        key: 'beer',
        label: 'Bia & rượu',
        active: false,
    },
    {
        key: 'cream',
        label: 'Kem',
        active: false,
    },
    {
        key: 'juice',
        label: 'Nước ép',
        active: false,
    },
    {
        key: 'soda',
        label: 'Nước ngọt',
        active: false,
    },
    {
        key: 'forest',
        label: 'Đặc sản rừng',
        active: false,
    },
    {
        key: 'sea',
        label: 'Hải sản',
        active: false,
    },
    {
        key: 'vegetable',
        label: 'Rau củ',
        active: false,
    },
    {
        key: 'combo',
        label: 'Combo BBQ',
        active: false,
    },
];

export const CART_STATUS = {
    0: 'Mới',
    1: 'Pha chế',
    2: 'Đã Pha xong',
};

export const ORDER_STATUS = {
    0: 'Mở bàn',
    1: 'Đóng bàn',
};

export const PAYMENT_STATUS = {
    paid: 'Đã Thanh Toán',
    unpaid: 'Chưa Thanh Toán',
};

export const TABLE_STATUS = {
    0: 'Bàn Trống',
    1: 'Đang Có Khách',
};
