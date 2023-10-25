import classNames from 'classnames/bind';
import styles from '~/components/Layout/DefaultLayout/DefaultLayout.module.scss';
import ProductList from './ProductList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '~/context/AppContext';
import { useParams } from 'react-router-dom';
import * as orderServices from '~/apiServices/orderServices';

const cx = classNames.bind(styles);

function ProductSide() {
    const { orderId } = useParams();
    const [carts, setCarts] = useState([]);
    const { addOrders, productSide, setProductSide } = useContext(AppContext);
    const handleCloseService = () => {
        setProductSide(false);
    };

    const handleChangeProduct = (product) => {
        const exist = carts.some((obj) => obj.product_id === product.product_id);
        if (exist) {
            setCarts((prevCarts) => {
                return prevCarts.map((obj) => {
                    if (obj.product_id === product.product_id) {
                        const newQuantity = product.quantity;
                        return { ...obj, quantity: newQuantity };
                    }
                    return obj;
                });
            });
        } else {
            setCarts([...carts, product]);
        }
    };

    const handleOk = () => {
        setProductSide(false);
        addOrders({
            order_id: Number(orderId),
            datas: carts,
        });

        //setIsReset(true);
    };

    /**
     * Hook that alerts clicks outside of the passed ref
     */
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setProductSide(false);
                }
            }
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref]);
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
        <>
            <div ref={wrapperRef} className={cx('right-sides', { show: productSide })}>
                <div className={cx('header')}>
                    <h3>Thêm Món</h3>
                    <button onClick={handleCloseService} className={cx('btn-close')}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
                <div className={cx('body')}>
                    <ProductList onChange={handleChangeProduct} />
                </div>
                <div className={cx('footer')}>
                    <button className={cx('btn-back')} onClick={() => setProductSide(false)}>
                        Quay lại
                    </button>
                    <button className={cx('btn-yes')} onClick={handleOk}>
                        Đồng ý
                    </button>
                </div>
            </div>
        </>
    );
}

export default ProductSide;
