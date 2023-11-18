import classNames from 'classnames/bind';
import styles from '../ProductList.module.scss';
const cx = classNames.bind(styles);
function ProductItem({ item, onClick }) {
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
