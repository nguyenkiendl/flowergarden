import classNames from 'classnames/bind';
import styles from './NavBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faChevronLeft, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '~/context/AppContext';
import * as orderServices from '~/apiServices/orderServices';
const cx = classNames.bind(styles);

function NavBar({ cartCount }) {
    const navigate = useNavigate();
    const { tableId, orderId } = useParams();
    const { setCartSide } = useContext(AppContext);

    const handleBack = () => {
        navigate(`/table/${tableId}`);
    };
    const handleCloseOrder = () => {
        const apiUpdate = async () => {
            const response = await orderServices.updateOrderStatus({
                order_id: Number(orderId),
                status: 1,
            });
            if (response) navigate(`/booking-detail/${tableId}/${orderId}`);
        };
        apiUpdate();
    };
    return (
        <>
            <div className={cx('navbar')}>
                <div className={cx('navbar-row')}>
                    <button className={cx('btn-back')} onClick={handleBack}>
                        <span>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </span>
                    </button>
                    <button className={cx('btn-processing')} onClick={handleCloseOrder} disabled={cartCount === 0}>
                        <span>
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <span>Chốt Đơn</span>
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
