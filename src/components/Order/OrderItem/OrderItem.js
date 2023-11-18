import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from '~/components/Order/Order.module.scss';
import { dateFormat, formatPrice, timeAgo } from '~/utils/filters';
import { ORDER_STATUS } from '~/utils/constants';
import { useNavigate, useParams } from 'react-router-dom';
const cx = classNames.bind(styles);
function OrderItem({ order, onUpdate }) {
    const navigate = useNavigate();
    const { tableId } = useParams();

    const handleBooking = (orderId) => {
        navigate(`/table/${tableId}/${orderId}`);
    };

    const totalPrice = order.details?.reduce((total, item) => total + item.product_price * item.quantity, 0);
    return (
        <>
            <div className={cx('order-item')}>
                <span
                    className={cx('order-edit')}
                    onClick={() => {
                        handleBooking(order.order_id);
                    }}
                >
                    <FontAwesomeIcon icon={faEdit} /> #<strong>{order.order_id}</strong>
                </span>
                <div className={cx('date')}>
                    <span className={cx('date-at')}>{dateFormat(order.created_at)}</span>
                    <br />
                    <span className={cx('time-ago')}>{timeAgo(order.created_at)}</span>
                </div>

                <div className={cx('details')}>
                    <ul>
                        {order.details?.map((detail, index) => {
                            return (
                                <li key={index}>
                                    <span>{detail.product_name}</span>{' '}
                                    <span className={cx('quantity')}>x {detail.quantity}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className={cx('btn-group', { hide: order.order_status === 0 })}>
                    <span className={cx('status', `status-${order.order_status}`)}>
                        {ORDER_STATUS[order.order_status]}
                    </span>
                    <strong className={cx('price')}>
                        <span> {formatPrice(totalPrice)}</span>
                    </strong>
                </div>
            </div>
        </>
    );
}

export default OrderItem;
