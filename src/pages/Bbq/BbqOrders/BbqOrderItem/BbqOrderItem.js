import classNames from 'classnames/bind';
import styles from '../../Bbq.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faMinus, faRemove } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { WATERS } from '~/utils/constants';

const cx = classNames.bind(styles);
function BbqOrderItem({ item, onChange }) {
    const [quantity, setQuantity] = useState(item.quantity);

    // useEffect(() => {
    //     setQuantity(0);
    // }, [quantity]);

    const handleMinus = (item) => {
        let newQuantity = quantity - 1;
        setQuantity(newQuantity);
        onChange(item.product_id, newQuantity);
    };
    const handleAdd = (item) => {
        let newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onChange(item.product_id, newQuantity);
    };

    return (
        <>
            <tr className={cx('tr')} data-id={item.id}>
                <td width={150}>{item.product_name}</td>
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
                <td width={150} className="text-right">
                    <span className={cx('price')}>{item.display_price}</span>
                </td>
            </tr>
        </>
    );
}

export default BbqOrderItem;
