import classNames from 'classnames/bind';
import styles from '../ProductList.module.scss';
const cx = classNames.bind(styles);
import imagedefault from '~/assets/images/cocacola.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faMinus } from '@fortawesome/free-solid-svg-icons';
import { formatPrice } from '~/utils/filters';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '~/context/AppContext';
function ProductItem({ item, onClick }) {
    const [quantity, setQuantity] = useState(0);
    const { productSide } = useContext(AppContext);
    useEffect(() => {
        if (productSide === true) setQuantity(0);
    }, [productSide]);

    return (
        <>
            <div className={cx('product-item')} onClick={() => onClick(item)}>
                <div className={cx('thumbnail')}>
                    <img src={`/assets/images/${item.thumbnail}`} alt={'thumnail'} />
                    <span className={cx('name')}>{item.product_name}</span>
                    <span className={cx('price')}>{item.display_price}</span>
                </div>
            </div>
        </>
    );
}

export default ProductItem;
