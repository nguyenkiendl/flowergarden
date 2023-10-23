import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '~/context/AppContext';
import { customerType, formatPrice } from '~/utils/filters';
import * as customerServices from '~/apiServices/customerServices';
import classNames from 'classnames/bind';
import styles from './Customer.module.scss';
import { CUSTOMER_TAB } from '~/utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
const cx = classNames.bind(styles);

function Customer() {
    const navigate = useNavigate();
    const refInputSearch = useRef(null);
    const { customerList, searchCustomer, filters, filterCustomer } = useContext(AppContext) || [];
    const [q, setQ] = useState('');

    // useEffect(() => {
    //     const timeOutId = setTimeout(() => {
    //         searchCustomer(q);
    //         refInputSearch.current.focus();
    //     }, 700);
    //     return () => clearTimeout(timeOutId);
    // }, [q]);

    const handleFilterStatus = (status) => {
        filterCustomer({ status });
    };

    const handleFocus = (event) => {
        event.target.select();
    };

    const handleSearch = () => {
        searchCustomer(q);
    };

    const handleClickNew = (customerId) => {
        const apiUpdate = async () => {
            const response = await customerServices.updateCustomerStatus({
                customer_id: customerId,
                customer_status: 'ordering',
            });
            if (response) navigate(`/customer/${customerId}`);
        };
        apiUpdate();
    };

    const handleClickOrdering = (customerId) => {
        navigate(`/customer/${customerId}`);
    };

    const btnAction = (customerId, status) => {
        switch (status) {
            case 'new':
                return <Button onClick={() => handleClickNew(customerId)} text={'Gọi món'} />;
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
                        <button className={cx('btn-search')} onClick={handleSearch}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
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
                                    {btnAction(item.customer_id, item.customer_status)}
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
