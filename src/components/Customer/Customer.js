import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '~/context/AppContext';
import { customerType, formatPrice } from '~/utils/filters';
import * as customerServices from '~/apiServices/customerServices';
import classNames from 'classnames/bind';
import styles from './Customer.module.scss';
import { CUSTOMER_TAB } from '~/utils/constants';
const cx = classNames.bind(styles);

function Customer() {
    const refInputSearch = useRef(null);
    const { customerList, searchCustomer, filters, filterCustomer } = useContext(AppContext) || [];
    const [q, setQ] = useState('');
    const handleClick = (customerId) => {
        const updateCustomerStatus = async () => {
            await customerServices.updateCustomerStatus({
                customer_id: customerId,
                customer_status: 'ordering',
            });
        };
        updateCustomerStatus();
    };

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            searchCustomer(q);
            refInputSearch.current.focus();
        }, 700);
        return () => clearTimeout(timeOutId);
    }, [q]);

    const handleFilterStatus = (status) => {
        filterCustomer({ status });
    };

    const handleFocus = (event) => {
        event.target.select();
    };

    return (
        <>
            <div className={cx('customers')}>
                <nav className={cx('head')}>
                    <div className={cx('customer-search')}>
                        <input
                            type="search"
                            className={cx('search-input')}
                            placeholder="Search for..."
                            ref={refInputSearch}
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            onFocus={handleFocus}
                        />
                    </div>
                    <div className={cx('tabs')}>
                        {CUSTOMER_TAB.map((tab) => {
                            return (
                                <span
                                    key={tab.key}
                                    className={cx('tab-item', { active: tab.key === filters['status'] })}
                                    onClick={(e) => {
                                        handleFilterStatus(tab.key);
                                    }}
                                >
                                    {tab.label}
                                </span>
                            );
                        })}
                    </div>
                </nav>
                <div className={cx('customer')}>
                    {customerList.map((item, index) => {
                        let type = customerType(item.customer_type);
                        return (
                            <div key={index} className={cx('customer-item', item.customer_status)}>
                                <div className={cx('number')}>{item.customer_number}</div>
                                <div className={'customer-group'}>
                                    <div className={cx('code')}>{item.customer_code}</div>
                                    <div className={cx('type')}>{type.label}</div>
                                    <div className={cx('status', item.customer_status)}>{item.customer_status}</div>
                                </div>
                                <div className={cx('date')}>{item.created_at}</div>
                                <div className={cx('price')}>
                                    {formatPrice(item.ticket_price * item.customer_number)}đ
                                </div>
                                <div className={cx('customer-action')}>
                                    {item.orders > 0 ? (
                                        <div className={cx('customer-services')}>
                                            <span className={cx('service')}>{item.orders}</span>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                    <Link
                                        onClick={() => handleClick(item.customer_id)}
                                        to={`/customer/${item.customer_id}`}
                                        className={cx('btn-detail')}
                                    >
                                        Gọi món
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Customer;
