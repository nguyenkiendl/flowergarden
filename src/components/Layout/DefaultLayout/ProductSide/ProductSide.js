import classNames from 'classnames/bind';
import styles from '~/components/Layout/DefaultLayout/DefaultLayout.module.scss';
import ProductList from './ProductList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faClose } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '~/context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import * as orderServices from '~/apiServices/orderServices';
import Cart from '~/components/Cart';

const cx = classNames.bind(styles);

function ProductSide() {
    const { tableId, orderId } = useParams();
    const navigate = useNavigate();
    const { productSide, setProductSide } = useContext(AppContext);
    const handleCloseService = () => {
        setProductSide(false);
    };

    // const handleChangeCart = (product) => {
    //     const exist = carts.some((obj) => obj.product_id === product.product_id);
    //     if (exist) {
    //         setCarts((prevCarts) => {
    //             return prevCarts.map((obj) => {
    //                 if (obj.product_id === product.product_id) {
    //                     const newQuantity = product.quantity;
    //                     return { ...obj, quantity: newQuantity };
    //                 }
    //                 return obj;
    //             });
    //         });
    //     } else {
    //         setCarts([...carts, product]);
    //     }
    // };

    const handleCloseTable = () => {
        const apiUpdate = async () => {
            const response = await orderServices.bookingEnd({
                table_id: Number(tableId),
            });
            if (response) {
                setProductSide(false);
                navigate(`/table/${tableId}/`);
            }
        };
        apiUpdate();
    };

    const handleProcessing = () => {
        const apiFetchPrint = async () => {
            const response = await orderServices.printOrderProcessing({
                params: {
                    order_id: Number(orderId),
                },
            });
            if (response) {
                const w = window.open(window.location.href, '_blank');
                w.document.open();
                w.document.write(response);
                w.document.close();
                w.window.print();
                w.window.close();
                //setProductSide(false);
            }
        };
        apiFetchPrint();
    };

    const handlePrint = () => {
        const apiFetchPrint = async () => {
            const response = await orderServices.printOrderBill({
                params: {
                    order_id: Number(orderId),
                },
            });
            if (response) {
                const w = window.open(window.location.href, '_blank');
                w.document.open();
                w.document.write(response);
                w.document.close();
                w.window.print();
                w.window.close();
                //setProductSide(false);
            }
        };
        apiFetchPrint();
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
                    <h3>Giỏ Hàng</h3>
                    <button onClick={handleCloseService} className={cx('btn-close')}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
                <div className={cx('body')}>
                    <Cart orderId={orderId} />
                </div>
                <div className={cx('footer')}>
                    <button className={cx('btn-back')} onClick={() => setProductSide(false)}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button className={cx('btn-processing')} onClick={handleProcessing}>
                        IN Chế Biến
                    </button>
                    <button className={cx('btn-print')} onClick={handlePrint}>
                        IN BILL
                    </button>
                    <button className={cx('btn-close')} onClick={handleCloseTable}>
                        Đóng Bàn
                    </button>
                </div>
            </div>
        </>
    );
}

export default ProductSide;
