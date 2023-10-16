import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '~/context/AppContext';
import { customerType, formatPrice } from '~/utils/filters';
import * as customerServices from '~/apiServices/customerServices';
import classNames from 'classnames/bind';
import styles from './Customer.module.scss';
import { CUSTOMER_TAB } from '~/utils/constants';
const cx = classNames.bind(styles);

function Customer() {
    const { customerList, customerCouter, setCustomerCouter } = useContext(AppContext) || [];
    const [q, setQ] = useState('');
    const [searchParam] = useState(['customer_code']);
    const [filterParam, setFilterParam] = useState('new');
    function search(items) {
        return items.filter((item) => {
            if (item.customer_status === filterParam) {
                return searchParam.some((code) => {
                    return item[code].toString().toLowerCase().indexOf(q.toLowerCase()) > -1;
                });
            } else if (filterParam === 'ALL') {
                return searchParam.some((code) => {
                    return item[code].toString().toLowerCase().indexOf(q.toLowerCase()) > -1;
                });
            } else {
                return false;
            }
        });
    }
    const handleClick = (customerId) => {
        const updateCustomerStatus = async () => {
            await customerServices.updateCustomerStatus({
                customer_id: customerId,
                customer_status: 'ordering',
            });
        };
        updateCustomerStatus();
        setCustomerCouter(customerCouter + 1);
    };
    return (
        <>
            <div className={cx('customers')}>
                <nav className={cx('head')}>
                    <div className={cx('customer-search')}>
                        <input
                            type="search"
                            name="search-form"
                            id="search-form"
                            className={cx('search-input')}
                            placeholder="Search for..."
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                    </div>
                    <div className={cx('tabs')}>
                        {CUSTOMER_TAB.map((tab) => {
                            return (
                                <span
                                    key={tab.key}
                                    className={cx('tab-item', { active: tab.key === filterParam })}
                                    onClick={(e) => {
                                        setFilterParam(tab.key);
                                    }}
                                >
                                    {tab.label}
                                </span>
                            );
                        })}
                    </div>
                </nav>
                <div className={cx('customer')}>
                    {search(customerList).map((item, index) => {
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
                                <div className={cx('price')}>{formatPrice(item.ticket_price)}đ</div>
                                <div className={cx('customer-action')}>
                                    <div className={cx('customer-services')}>
                                        {Object.keys(item.services).map((i) => {
                                            return (
                                                <span key={i} className={cx('service')}>
                                                    {Number(i) + 1}
                                                </span>
                                            );
                                        })}
                                    </div>
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
