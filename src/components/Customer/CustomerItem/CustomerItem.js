import React from 'react';
import { useNavigate } from 'react-router-dom';
import { dateFormat, formatPrice, timeAgo } from '~/utils/filters';
import classNames from 'classnames/bind';
import styles from '~/components/Customer/Customer.module.scss';
import Button from '~/components/Customer/Button';
const cx = classNames.bind(styles);

function CustomerItem({ item, showButton = true }) {
    const navigate = useNavigate();
    const handleClickNew = (customerId) => {
        // const apiUpdate = async () => {
        //     const response = await customerServices.updateCustomerStatus({
        //         customer_id: customerId,
        //         customer_status: 'ordering',
        //     });
        //     if (response) navigate(`/customer/${customerId}`);
        // };
        // apiUpdate();
        navigate(`/customer/${customerId}`);
    };

    const handleClickOrdering = (customerId) => {
        navigate(`/customer/${customerId}`);
    };

    const btnAction = (customerId, status) => {
        switch (status) {
            case 'new':
                return <Button onClick={() => handleClickNew(customerId)} text={'Chi tiết'} />;
            case 'ordering':
                return <Button onClick={() => handleClickOrdering(customerId)} text={'xem'} />;
            case 'processing':
                return <Button onClick={() => handleClickOrdering(customerId)} text={'xem'} />;
            case 'return':
                return <Button onClick={() => handleClickOrdering(customerId)} text={'xem'} />;
            case 'complete':
                return <Button onClick={() => handleClickOrdering(customerId)} text={'xem'} />;
            default:
                return '';
        }
    };
    return (
        <>
            <div className={cx('customer-item', item.customer_status)}>
                <div className={cx('number')}>{item.customer_number}</div>
                <div className={'customer-group'}>
                    <div className={cx('code')}>{item.customer_id}</div>
                    <div className={cx('type')}>{item.ticket_name}</div>
                    <div className={cx('status', item.customer_status)}>{item.customer_status}</div>
                </div>
                <div className={cx('date')}>
                    {dateFormat(item.created_at)} <span className={cx('time-ago')}>{timeAgo(item.created_at)}</span>
                </div>
                <div className={cx('price')}>{formatPrice(item.ticket_price * item.customer_number)}đ</div>
                <div className={cx('customer-action')}>
                    {showButton ? btnAction(item.customer_id, item.customer_status) : ''}
                </div>
            </div>
        </>
    );
}

export default CustomerItem;
