import classNames from 'classnames/bind';
import styles from '~/components/Layout/DefaultLayout/DefaultLayout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useRef, useState } from 'react';
import * as orderServices from '~/apiServices/orderServices';
import { AppContext } from '~/context/AppContext';
import OrderList from './OrderList';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function OrderSide() {
    const { customerId } = useParams();
    const [carts, setCarts] = useState([]);
    const { updateOrders, orderSide, setOrderSide } = useContext(AppContext);
    const handleCloseService = () => {
        setOrderSide(false);
    };

    const handleChangeOrder = (datas) => {
        setCarts(datas);
    };

    const handleOk = () => {
        setOrderSide(false);
        updateOrders({
            customer_id: Number(customerId),
            datas: carts,
        });
    };

    /**
     * Hook that alerts clicks outside of the passed ref
     */
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setOrderSide(false);
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
            <div ref={wrapperRef} className={cx('right-sides', { show: orderSide })}>
                <div className={cx('header')}>
                    <h3>Sửa Thực Đơn</h3>
                    <button onClick={handleCloseService} className={cx('btn-close')}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
                <div className={cx('body')}>
                    <OrderList sendDatas={handleChangeOrder} />
                </div>
                <div className={cx('footer')}>
                    <button className={cx('btn-back')} onClick={() => setOrderSide(false)}>
                        Quay lại
                    </button>
                    <button className={cx('btn-yes')} onClick={handleOk}>
                        Cập nhật
                    </button>
                </div>
            </div>
        </>
    );
}

export default OrderSide;
