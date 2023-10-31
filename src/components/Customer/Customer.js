import React from 'react';
import classNames from 'classnames/bind';
import styles from './Customer.module.scss';
import CustomerItem from './CustomerItem';
const cx = classNames.bind(styles);

function Customer({ customerList }) {
    return (
        <>
            <div className={cx('customers')}>
                <div className={cx('customer')}>
                    {customerList?.map((item, index) => {
                        return <CustomerItem key={index} item={item} />;
                    })}
                </div>
            </div>
        </>
    );
}

export default Customer;
