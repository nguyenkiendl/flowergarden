import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
const cx = classNames.bind(styles);
import NavBar from '~/components/NavBar';
import { formatPrice } from '~/utils/filters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import * as cartServices from '~/apiServices/cartServices';
import { AppContext } from '~/context/AppContext';
function Cart({ orderId }) {
    const [carts, setCarts] = useState([]);
    const { cartCount, setCartCount } = useContext(AppContext);
    const handleMinus = (event, item) => {
        if (quantity === 0) event.currentTarget.disabled = true;
        let newQuantity = quantity - 1;
        setQuantity(newQuantity);
        onChange({
            product_id: item.product_id,
            quantity: newQuantity,
        });
    };
    const handleAdd = (event, item) => {
        if (quantity > item.product_store) event.currentTarget.disabled = true;

        let newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onChange({
            product_id: item.product_id,
            quantity: newQuantity,
        });
    };

    useEffect(() => {
        const apiFetchCart = async () => {
            const res = await cartServices.getCarts({
                params: {
                    order_id: Number(orderId),
                },
            });
            if (res) {
                setCarts(res);
                setCartCount(res?.reduce((total, item) => total + item.quantity, 0));
            }
        };
        if (orderId) apiFetchCart();
    }, [orderId, cartCount]);
    return (
        <div className="carts">
            <div id="order-list" className={cx('order-list')}>
                <table>
                    <thead>
                        <tr>
                            <th className="text-center">STT</th>
                            <th>TÊN</th>
                            <th className="text-center">IMG</th>
                            <th className="text-center">SL</th>
                            <th>ĐƠN VỊ</th>
                            <th>GIÁ</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td width={20} className="text-center">
                                        #{index + 1}
                                    </td>
                                    <td width={100}>{item.product_name}</td>
                                    <td width={20} className="text-center">
                                        <span className={cx('thumbnail')}>
                                            <img src={`/assets/images/${item.thumbnail}`} alt={'thumnail'} />
                                        </span>
                                    </td>
                                    <td width={50} className="text-center">
                                        <span className={cx('quantity')}>{item.quantity}</span>
                                    </td>
                                    <td width={150}>
                                        <span className={cx('unit')}>{item.product_unit}</span>
                                    </td>
                                    <td width={150}>
                                        <span className={cx('price')}>{formatPrice(item.product_price)}đ</span>
                                    </td>
                                    <td width={100} className="text-right">
                                        <button
                                            onClick={() => handleOrderRemove(item.order_id)}
                                            className={cx('btn-remove')}
                                            disabled={item.status !== 'new'}
                                        >
                                            <FontAwesomeIcon icon={faRemove} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Cart;
