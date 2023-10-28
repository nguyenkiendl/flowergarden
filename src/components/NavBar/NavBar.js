import classNames from 'classnames/bind';
import styles from './NavBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext } from '~/context/AppContext';
import * as orderServices from '~/apiServices/orderServices';
const cx = classNames.bind(styles);

function NavBar({ cartCount }) {
    const navigate = useNavigate();
    const { tableId, orderId } = useParams();
    const { setCartSide } = useContext(AppContext);
    const [ iframeSrc, setIframeSrc] = useState('');
    
    const handleBack = () => {
        navigate(`/table/${tableId}`);
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
        const f = document.getElementById('iframe-bill');
        const w = f.contentWindow;
        w.postMessage({ action: 'print-bill' }, f.src);
    };
    return (
        <>
            <iframe
                key={cartCount+ 1}
                id="iframe-bill"
                src={`${process.env.REACT_APP_BASEURL}/prints/bill.php?order_id=${orderId}`}
                style={{ display: 'none' }}
                title="PRINT BILL"
            />
            <iframe
                id="iframe-processing"
                src={`${process.env.REACT_APP_BASEURL}/prints/processing.php?order_id=${orderId}&time=${Date.now()}`}
                style={{ display: 'none' }}
                title="PRINT BILL"
            />
            <div className={cx('navbar')}>
                <button className={cx('btn-back')} onClick={handleBack}>
                    <FontAwesomeIcon icon={faChevronLeft} /> Quay lại
                </button>
                <button className={cx('btn-processing')} onClick={handleProcessing}>
                    IN Chế Biến
                </button>
                <button className={cx('btn-print')} onClick={handlePrint}>
                    IN BILL
                </button>
                <button className={cx('btn-order-add')} onClick={() => setCartSide(true)}>
                    <FontAwesomeIcon icon={faCartPlus} /> Giỏ Hàng {cartCount}
                </button>
            </div>
        </>
    );
}

export default NavBar;
