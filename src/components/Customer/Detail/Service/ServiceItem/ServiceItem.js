import classNames from 'classnames/bind';
import styles from '../Service.module.scss';
const cx = classNames.bind(styles);
import imagedefault from '~/assets/images/cocacola.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faMinus } from '@fortawesome/free-solid-svg-icons';
import { formatPrice } from '~/utils/filters';
import { useState } from 'react';
function ServiceItem({ item, onAddService }) {
    const [quantity, setQuantity] = useState(0);

    const handleMinus = (event, item) => {
        if (quantity === 0) event.currentTarget.disabled = true;
        let newQuantity = quantity - 1;
        setQuantity(newQuantity);
        onAddService({
            product_id: item.product_id,
            quantity: newQuantity,
        });
    };
    const handleAdd = (event, item) => {
        if (quantity > item.product_store) event.currentTarget.disabled = true;

        let newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onAddService({
            product_id: item.product_id,
            quantity: newQuantity,
        });
    };
    return (
        <>
            <div className={cx('service-item')}>
                <div className={cx('thumbnail')}>
                    <img src={imagedefault} alt={'thumnail'} />
                    <span className={cx('store')}>{item.product_store}</span>
                </div>
                <div className={cx('name')}>
                    <h4>{item.product_name}</h4>
                    <span>Lon</span>
                </div>
                <div className={cx('btn-group')}>
                    <button
                        onClick={(event) => handleMinus(event, item)}
                        className={cx('btn-minus-service', { show: quantity > 0 })}
                        disabled={item.product_store === 0}
                    >
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className={cx('quantity', { show: quantity > 0 })}>{quantity}</span>
                    <button
                        onClick={(event) => handleAdd(event, item)}
                        className={cx('btn-add-service', { show: quantity > 0 })}
                        disabled={item.product_store === 0}
                    >
                        <FontAwesomeIcon icon={faAdd} />
                    </button>
                </div>

                <div className={cx('price')}>{formatPrice(item.product_price)}đ</div>
            </div>
        </>
    );
}

export default ServiceItem;
