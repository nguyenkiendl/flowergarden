import classNames from 'classnames/bind';
import styles from '~/components/Layout/DefaultLayout/DefaultLayout.module.scss';
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

    const handleCloseTable = () => {
        const apiUpdate = async () => {
            const response = await orderServices.bookingEnd({
                table_id: Number(tableId),
                order_id: Number(orderId),
            });
            if (response) {
                setProductSide(false);
                navigate(`/table/${tableId}/`);
            }
        };
        apiUpdate();
    };

    const handleProcessing = () => {
        const f = document.frames ? document.frames[id] : document.getElementById('iframe-processing');
        const w = f.contentWindow || f;
        w.postMessage({ action: 'print-processing' }, f.src);
        const apiUpdate = async () => {
            await orderServices.updateOrderStatus({
                order_id: Number(orderId),
                status: 1,
            });
        };
        setTimeout(() => {
            apiUpdate();
        }, 1000);
    };

    const handlePrint = () => {
        // const apiFetchPrint = async () => {
        //     const response = await orderServices.printOrderBill({
        //         params: {
        //             order_id: Number(orderId),
        //         },
        //     });
        //     if (response) {
        //         const w = window.open(window.location.href, '_blank');
        //         w.document.open();
        //         w.document.write(response);
        //         //w.document.getElementById('qrcode-payment').src = qrcodePayent;
        //         w.document.close();
        //         setTimeout(() => {
        //             w.window.print();
        //             w.window.close();
        //         }, 50);
        //         // w.window.print();

        //         //setProductSide(false);

        //     }
        // };
        // apiFetchPrint();
        const f = document.frames ? document.frames[id] : document.getElementById('iframe-bill');
        const w = f.contentWindow || f;
        w.postMessage({ action: 'print-bill' }, f.src);
    };

    const handleBack = () => {
        setProductSide(false);
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
                <iframe
                    id="iframe-bill"
                    src={`${process.env.REACT_APP_BASEURL}/prints/bill.php?order_id=${orderId}&time=${Date.now()}`}
                    style={{ display: 'none' }}
                    title="PRINT BILL"
                />
                <iframe
                    id="iframe-processing"
                    src={`${
                        process.env.REACT_APP_BASEURL
                    }/prints/processing.php?order_id=${orderId}&time=${Date.now()}`}
                    style={{ display: 'none' }}
                    title="PRINT BILL"
                />
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
                    <button className={cx('btn-back')} onClick={() => handleBack()}>
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
