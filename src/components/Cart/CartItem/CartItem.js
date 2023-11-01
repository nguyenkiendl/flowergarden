import classNames from 'classnames/bind';
import styles from '../Cart.module.scss';
import { CART_STATUS } from '~/utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faMinus, faRemove } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '~/context/AppContext';
const cx = classNames.bind(styles);
function CartItem({ item, onChange, onRemove }) {
    const [quantity, setQuantity] = useState(0);
    const { cartSide } = useContext(AppContext);

    useEffect(() => {
        if (cartSide === true) {
            setQuantity(item.quantity);
        }
    }, [cartSide, quantity]);

    const handleMinus = (item) => {
        if (quantity === 1) {
            setQuantity(0);
            onRemove(item.id);
        } else {
            let newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onChange(item.id, newQuantity);
        }
    };
    const handleAdd = (item) => {
        let newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onChange(item.id, newQuantity);
    };

    const handleRemoveCartItem = (item) => {
        setQuantity(0);
        onRemove(item.id);
    };
    return (
        <>
            <tr className={cx('tr')} hidden={quantity === 0} data-id={item.id}>
                <td width={100}>{item.product_name}</td>
                <td width={50} className="text-center">
                    <div className={cx('btn-group')}>
                        <button
                            onClick={() => handleMinus(item)}
                            className={cx('btn-minus', { show: quantity >= 0 })}
                            disabled={quantity === 0}
                        >
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className={cx('quantity', { show: quantity >= 0 })}>{quantity}</span>
                        <button onClick={() => handleAdd(item)} className={cx('btn-add', { show: quantity >= 0 })}>
                            <FontAwesomeIcon icon={faAdd} />
                        </button>
                    </div>
                </td>
                <td width={150} className="text-center">
                    <span className={cx('status')}>{CART_STATUS[item.status]}</span>
                </td>
                <td width={150}>
                    <span className={cx('price')}>{item.display_price}</span>
                </td>
                <td width={100} className="text-right">
                    <button
                        onClick={() => handleRemoveCartItem(item)}
                        className={cx('btn-remove')}
                        // disabled={item.status !== 0}
                    >
                        <FontAwesomeIcon icon={faRemove} />
                    </button>
                </td>
            </tr>
        </>
    );
}

export default CartItem;
