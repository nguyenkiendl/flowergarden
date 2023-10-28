import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
const cx = classNames.bind(styles);
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '~/context/AppContext';
import CartItem from './CartItem';
import { formatPrice } from '~/utils/filters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import * as orderServices from '~/apiServices/orderServices';
import { useNavigate, useParams } from 'react-router-dom';
function Cart({ carts, setCarts }) {
    const navigate = useNavigate();
    const { tableId, orderId } = useParams();
    const { setCartSide } = useContext(AppContext);
    const [counter, setCounter] = useState(0);

    const handleUpdateCart = (id, quantity) => {
        // const apiUpdateCart = async () => {
        //     const res = await cartServices.updateCartQuantity({
        //         detail_id: Number(detailId),
        //         quantity: quantity,
        //     });
        //     if (res !== undefined) setCartCount(res);
        // };
        // apiUpdateCart();
        const cartItemObj = {
            id: id,
            quantity: quantity
        }
        const existCart = carts.some( obj => { obj.id === id});
        if(existCart) {
            setCarts([...carts, cartItemObj]);
        } else {
            setCarts( prevCart => {
                const newCarts = prevCart.map( obj => {
                    if (obj.id === id) {
                        return {...obj, quantity: quantity}
                    }
                    return obj;
                })
                return newCarts;
            })
        }
        setCounter(counter + 1);
    };

    const handleRemoveCart = (id) => {
        // const apiRemoveCartItem = async () => {
        //     const res = await cartServices.removeCartItem({
        //         detail_id: Number(detailId),
        //     });
        //     if (res !== undefined) setCartCount(res);
        // };
        // apiRemoveCartItem();

        setCarts( prevCart => {
            const newCarts = prevCart.map( obj => {
                if (obj.id === id) {
                    return {...obj, quantity: 0}
                }
                return obj;
            })
            return newCarts;
        })
        setCounter(counter + 1);
    };

    const handleCloseTable = () => {
        const apiUpdate = async () => {
            const response = await orderServices.bookingEnd({
                table_id: Number(tableId),
                order_id: Number(orderId),
            });
            if (response) {
                setCartSide(false);
                navigate(`/table/${tableId}/`);
            }
        };
        apiUpdate();
    };

    const apiSaveCart = async () => {
        const datas = carts.map(obj => {
            return {product_id: obj.product_id, quantity: obj.quantity}
        })
        await orderServices.addOrders({
            order_id: Number(orderId),
            datas: datas
        });
    };

    const handleSave = () => {
        apiSaveCart();
        setCartSide(false);
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
            
            <div className={cx('footer')}>
                <button className={cx('btn-back')} onClick={handleSave}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button className={cx('btn-close')} onClick={handleCloseTable}>
                    Đóng Bàn
                </button>
                <button className={cx('btn-save')} onClick={handleSave}>
                    SAVE
                </button>
            </div>
        </div>
    );
}

export default Cart;
