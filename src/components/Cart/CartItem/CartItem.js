import classNames from 'classnames/bind';
import styles from '../Cart.module.scss';
import { CART_STATUS } from '~/utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faMinus, faRemove } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import * as cartServices from '~/apiServices/cartServices';
import { AppContext } from '~/context/AppContext';
const cx = classNames.bind(styles);
function CartItem({ item, onChange, onRemove }) {
    const [quantity, setQuantity] = useState(0);
    const { productSide } = useContext(AppContext);

    useEffect(() => {
        if (productSide === true) {
            setQuantity(item.quantity);
        }
    }, [productSide, item.quantity]);

    const handleMinus = (event, item) => {
        if (quantity === 0) event.currentTarget.disabled = true;
        let newQuantity = item.quantity - 1;
        setQuantity(newQuantity);
        onChange(item.detail_id, newQuantity);
    };
    const handleAdd = (event, item) => {
        let newQuantity = item.quantity + 1;
        setQuantity(newQuantity);
        onChange(item.detail_id, newQuantity);
    };

    const handleRemoveCartItem = (detailId) => {
        onRemove(detailId);
    };
    return (
        <>
            <tr>
                <td width={100}>{item.product_name}</td>
                <td width={50} className="text-center">
                    <div className={cx('btn-group')}>
                        <button
                            onClick={(event) => handleMinus(event, item)}
                            className={cx('btn-minus', { show: quantity > 0 })}
                        >
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className={cx('quantity', { show: quantity > 0 })}>{quantity}</span>
                        <button
                            onClick={(event) => handleAdd(event, item)}
                            className={cx('btn-add', { show: quantity > 0 })}
                        >
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
                        onClick={() => handleRemoveCartItem(item.detail_id)}
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
