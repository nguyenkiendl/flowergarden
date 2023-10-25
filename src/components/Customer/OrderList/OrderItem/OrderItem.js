import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from '~/components/Customer/OrderList/OrderList.module.scss';
import { dateFormat, formatPrice, timeAgo } from '~/utils/filters';
import { useNavigate, useParams } from 'react-router-dom';
const cx = classNames.bind(styles);
function OrderItem({ order }) {
    const { customerId } = useParams();
    const navigate = useNavigate();
    const handleClickOrder = (orderId) => {
        navigate(`/customer/${customerId}/${orderId}`);
    };
    return (
        <>
            <div className={cx('order-item')}>
                <div className={cx('order-group')}>
                    <div className={cx('order-id')}>
                        ĐƠN HÀNG: <strong>{order.order_id}</strong>
                    </div>
                    <div className={cx('order-payment')}>{order.order_payment}</div>
                    <div className={cx('time-ago')}>{timeAgo(order.created_at)}</div>
                </div>
                <div className={cx('date')}>
                    <span className={cx('date-at')}>{dateFormat(order.created_at)}</span>
                    <br />
                </div>
                <div className={cx('order-action')}>
                    <button onClick={() => handleClickOrder(order.order_id)}>
                        <FontAwesomeIcon icon={faArrowCircleRight} /> Chọn món
                    </button>
                </div>
            </div>
        </>
    );
}

export default OrderItem;
