import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from '~/components/Order/Order.module.scss';
import { dateFormat, formatPrice, timeAgo } from '~/utils/filters';
import * as orderServices from '~/apiServices/orderServices';
import imagedefault from '~/assets/images/cocacola.jpg';
const cx = classNames.bind(styles);
function OrderItem({ order, onUpdate }) {
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
    return (
        <>
            <div className={cx('order-item', order.customer_status)}>
                <div className={cx('thumbnail')}>
                    <img src={imagedefault} alt={'thumnail'} />
                </div>
                <span className={cx('status', order.status)}>{order.status}</span>
                <div className={'order-group'}>
                    <div className={cx('code')}>
                        KH: <span>{order.customer_code}</span>
                    </div>
                    <div className={cx('name')}>
                        Tên Món: <span>{order.product_name}</span>
                    </div>
                    <span className={cx('quantity')}>{order.quantity}</span> <span> x </span>
                    <span className={cx('price')}>{formatPrice(order.product_price)}đ</span>
                </div>

                <div className={cx('date')}>
                    <span className={cx('date-at')}>{dateFormat(order.created_at)}</span>
                    <br />
                    <span className={cx('time-ago')}>{timeAgo(order.updated_at)}</span>
                </div>
                <div className={cx('order-action')}>
                    <button onClick={() => handleClick(order.detail_id)}>
                        <FontAwesomeIcon icon={faArrowCircleRight} /> Đã Pha chế
                    </button>
                </div>
            </div>
        </>
    );
}

export default OrderItem;
