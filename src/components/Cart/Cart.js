import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
const cx = classNames.bind(styles);
import { useContext, useEffect, useState } from 'react';
import * as cartServices from '~/apiServices/cartServices';
import { AppContext } from '~/context/AppContext';
import CartItem from './CartItem';
import { formatPrice } from '~/utils/filters';
function Cart({ orderId }) {
    const [carts, setCarts] = useState([]);
    const { cartCount, setCartCount } = useContext(AppContext);
    useEffect(() => {
        const apiFetchCart = async () => {
            const res = await cartServices.getCarts({
                params: {
                    order_id: Number(orderId),
                },
            });
            if (res !== undefined) {
                setCarts(res);
                setCartCount(res?.reduce((total, item) => total + item.quantity, 0));
            }
        };
        if (orderId) apiFetchCart();
    }, [orderId, cartCount]);

    const handleUpdateCart = (detailId, quantity) => {
        const apiUpdateCart = async () => {
            const res = await cartServices.updateCartQuantity({
                detail_id: Number(detailId),
                quantity: quantity,
            });
            if (res !== undefined) setCartCount(res);
        };
        apiUpdateCart();
    };

    const handleRemoveCart = (detailId) => {
        const apiRemoveCartItem = async () => {
            const res = await cartServices.removeCartItem({
                detail_id: Number(detailId),
            });
            if (res !== undefined) setCartCount(res);
        };
        apiRemoveCartItem();
    };
    const total = carts.reduce((total, item) => total + item.product_price * item.quantity, 0);
    return (
        <div className="carts">
            <div id="order-list" className={cx('order-list')}>
                <table>
                    <thead>
                        <tr>
                            <th>TÊN</th>
                            <th className="text-center">SL</th>
                            <th className="text-center">T.Thái</th>
                            <th>GIÁ</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts?.map((item, index) => {
                            return (
                                <CartItem
                                    key={index}
                                    item={item}
                                    onChange={handleUpdateCart}
                                    onRemove={handleRemoveCart}
                                />
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3}></td>
                            <td>{formatPrice(total)}đ</td>
                        </tr>
                    </tfoot>
                </table>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}

export default Cart;
