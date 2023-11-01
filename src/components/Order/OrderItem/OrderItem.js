import { faArrowCircleRight, faEdit, faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from '~/components/Order/Order.module.scss';
import { dateFormat, formatPrice, timeAgo } from '~/utils/filters';
import * as orderServices from '~/apiServices/orderServices';
import { ORDER_STATUS } from '~/utils/constants';
import { useNavigate, useParams } from 'react-router-dom';
const cx = classNames.bind(styles);
function OrderItem({ order, onUpdate }) {
    const navigate = useNavigate();
    const { tableId } = useParams();
    const handleClick = (detailId) => {
        // update status
        const apiUpdate = async () => {
            const response = await orderServices.updateDetailStatus({
                detail_id: Number(detailId),
                status: 'done',
            });
            if (response) onUpdate(Number(detailId));
        };
        apiUpdate();
    };

    const handleBooking = (orderId) => {
        navigate(`/table/${tableId}/${orderId}`);
    };

    const handlePrint = (orderId) => {
        navigate(`/booking-detail/${tableId}/${orderId}`);
    };
    return (
        <>
            <div className={cx('order-item')}>
                <span className={cx('status', `status-${order.order_status}`)}>{ORDER_STATUS[order.order_status]}</span>
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
                <div className={cx('btn-group', { hide: order.order_status === 0 })}>
                    <button
                        className={cx('btn-print')}
                        onClick={() => {
                            handlePrint(order.order_id);
                        }}
                    >
                        <span>
                            <FontAwesomeIcon icon={faPrint} />
                        </span>
                        <span>IN</span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default OrderItem;
