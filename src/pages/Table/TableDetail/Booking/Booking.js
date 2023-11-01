import classNames from 'classnames/bind';
import styles from '~/pages/Table/Table.module.scss';
const cx = classNames.bind(styles);
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import * as tableServices from '~/apiServices/tableServices';
import NavBar from '~/components/NavBar';
import { dateNow, formatPrice } from '~/utils/filters';
import ProductList from '~/components/ProductList';
import * as cartServices from '~/apiServices/cartServices';
import CartSide from '~/components/Layout/DefaultLayout/CartSide';
import { BookProvider } from '~/context/BookContext';
function Booking() {
    const { tableId, orderId } = useParams();
    const [detail, setDetail] = useState({});
    const [carts, setCarts] = useState([]);
    useEffect(() => {
        const apiFetch = async () => {
            const response = await tableServices.getTableOrders({
                params: {
                    table_id: Number(tableId),
                    order_id: Number(orderId),
                },
            });
            if (response) setDetail(response);
        };
        apiFetch();
    }, []);

    useEffect(() => {
        const apiFetchCart = async () => {
            const res = await cartServices.getCarts({
                params: {
                    order_id: Number(orderId),
                },
            });
            if (res !== undefined) {
                const datas = res.map((obj, index) => {
                    return { ...obj, id: index + 1 };
                });
                setCarts(datas);
            }
        };
        if (orderId) apiFetchCart();
    }, [orderId]);

    const cartCount = carts.reduce((total, item) => total + item.quantity, 0);

    const handleClickAdd = (product) => {
        // const addToCart = async () => {
        //     const res = await cartServices.addToCart({
        //         order_id: Number(orderId),
        //         product_id: Number(productId),
        //     });
        //     if (res.status) {
        //         const count = res.data;
        //         setCartCount(count);
        //     }
        // };
        // addToCart();

        const existCart = carts.some((obj) => obj.product_id === product.product_id);
        if (existCart) {
            setCarts((prevCart) => {
                const newCarts = prevCart.map((obj) => {
                    if (obj.product_id === product.product_id) {
                        const newQuantity = obj.quantity + 1;
                        return { ...obj, quantity: newQuantity };
                    }
                    return obj;
                });
                return newCarts;
            });
        } else {
            const newCarItem = {
                ...product,
                id: carts.length + 1,
                quantity: 1,
            };
            setCarts([...carts, newCarItem]);
        }
    };

    let cartPrice = carts?.reduce((total, item) => total + item.quantity * item.product_price, 0);
    return (
        <div className="table-detail">
            <div className="page-title">
                <div className={cx('group-title')}>
                    <h3 className={cx('title')}>ĐƠN {detail.order_id}</h3>
                    <span className={cx('sub-title')}>{detail.table_name}</span>
                </div>
                <div className={cx('time')}>{dateNow()}</div>
                <div className={cx('cart-price')}>
                    <span>Tổng: </span>
                    <strong>{formatPrice(cartPrice)}đ</strong>
                </div>
            </div>
            <BookProvider>
                <ProductList onClick={handleClickAdd} />
                <CartSide carts={carts} setCarts={setCarts} />
                <NavBar cartCount={cartCount} />
            </BookProvider>
        </div>
    );
}

export default Booking;
