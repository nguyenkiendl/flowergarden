import React from 'react';
import { dateFormat, formatPrice, timeAgo } from '~/utils/filters';
import classNames from 'classnames/bind';
import styles from '~/components/Customer/Customer.module.scss';
const cx = classNames.bind(styles);

function CustomerItem({ item }) {
    return (
        <>
            <div className={cx('customer-item', item.customer_status)}>
                <div className={cx('number')}>{item.customer_number}</div>
                <div className={'customer-group'}>
                    <div className={cx('code')}>{item.customer_id}</div>
                    <div className={cx('type')}>{item.ticket_name}</div>
                </div>
                <div className={cx('date')}>
                    {dateFormat(item.created_at)} <span className={cx('time-ago')}>{timeAgo(item.created_at)}</span>
                </div>
                <div className={cx('price')}>{formatPrice(item.ticket_price * item.customer_number)}đ</div>
            </div>
        </>
    );
}

export default CustomerItem;
