import classNames from 'classnames/bind';
import styles from './NavBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faChevronLeft, faLock, faPrint } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '~/context/AppContext';
import * as orderServices from '~/apiServices/orderServices';
import { BookContext } from '~/context/BookContext';
const cx = classNames.bind(styles);

function NavBar({ cartCount }) {
    const navigate = useNavigate();
    const { tableId, orderId } = useParams();
    const { setCartSide } = useContext(AppContext);
    const { saveCart } = useContext(BookContext);

    const handleBack = () => {
        navigate(`/table/${tableId}`);
    };

    const handleProcessing = () => {
        const f = document.frames ? document.frames[id] : document.getElementById('iframe-processing');
        const w = f.contentWindow || f;
        w.postMessage({ action: 'print-processing' }, f.src);
    };
    return (
        <>
            <iframe
                key={saveCart}
                id="iframe-processing"
                src={`/print-processing/${orderId}`}
                style={{ display: 'none' }}
                title="PRINT PROCESSING"
            />
            <div className={cx('navbar')}>
                <div className={cx('navbar-row')}>
                    <button className={cx('btn-back')} onClick={handleBack}>
                        <span>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </span>
                    </button>
                    <button className={cx('btn-processing')} onClick={handleProcessing}>
                        <span>
                            <FontAwesomeIcon icon={faPrint} />
                        </span>
                        <span>IN Chế Biến</span>
                    </button>
                    <button
                        className={cx('btn-order-add')}
                        onClick={() => setCartSide(true)}
                        disabled={cartCount === 0}
                    >
                        <span>
                            <FontAwesomeIcon icon={faCartPlus} />
                            {cartCount}
                        </span>
                        <span>Giỏ Hàng</span>
                    </button>
                </div>
                <br></br>
            </div>
        </>
    );
}

export default NavBar;
