import classNames from 'classnames/bind';
import styles from '../OrderList.module.scss';
const cx = classNames.bind(styles);
import imagedefault from '~/assets/images/cocacola.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faMinus } from '@fortawesome/free-solid-svg-icons';
import { formatPrice } from '~/utils/filters';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '~/context/AppContext';
function OrderListItem({ item, onChange }) {
    const [quantity, setQuantity] = useState(0);
    const [store, setStore] = useState(0);
    const { orderSide } = useContext(AppContext);
    useEffect(() => {
        if (orderSide === true) {
            setQuantity(item.quantity);
            setStore(item.product_store);
        }
    }, [orderSide, item.quantity]);

    const handleMinus = (event, item) => {
        if (quantity === 0) event.currentTarget.disabled = true;
        let newQuantity = quantity - 1;
        let newStore = store + 1;
        setQuantity(newQuantity);
        setStore(newStore);
        onChange({
            order_id: item.order_id,
            quantity: newQuantity,
        });
    };
    const handleAdd = (event, item) => {
        if (quantity > item.product_store) event.currentTarget.disabled = true;
        let newQuantity = quantity + 1;
        let newStore = store - 1;
        setQuantity(newQuantity);
        setStore(newStore);
        onChange({
            order_id: item.order_id,
            quantity: newQuantity,
        });
    };
    return (
        <>
            <div className={cx('order-item')}>
                <div className={cx('thumbnail')}>
                    <img src={imagedefault} alt={'thumnail'} />
                </div>
                <div className={cx('name')}>
                    <h4>{item.product_name}</h4>
                    <span>{item.product_unit}</span>
                </div>
                <div className={cx('btn-group')}>
                    <button
                        onClick={(event) => handleMinus(event, item)}
                        className={cx('btn-minus', { show: quantity > 0 })}
                        disabled={quantity === 0}
                    >
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className={cx('quantity', { show: quantity > 0 })}>{quantity}</span>
                    <button
                        onClick={(event) => handleAdd(event, item)}
                        className={cx('btn-add', { show: quantity > 0 })}
                        disabled={store === 0}
                    >
                        <FontAwesomeIcon icon={faAdd} />
                    </button>
                </div>

                <div className={cx('price')}>{formatPrice(item.product_price)}đ</div>
            </div>
        </>
    );
}

export default OrderListItem;
