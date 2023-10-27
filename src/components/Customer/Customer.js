import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '~/context/AppContext';
import { customerType, dateFormat, formatPrice, mergeCustomers, timeAgo } from '~/utils/filters';
import * as customerServices from '~/apiServices/customerServices';
import classNames from 'classnames/bind';
import styles from './Customer.module.scss';
import { CUSTOMER_TAB } from '~/utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import CustomerItem from './CustomerItem';
const cx = classNames.bind(styles);

function Customer({ showButton = true }) {
    const navigate = useNavigate();
    const refInputSearch = useRef(null);
    const [page, setPage] = useState(1);
    const [customerList, setCustomerList] = useState([]);
    const { searchCustomer, filters, filterCustomer } = useContext(AppContext) || [];
    const [q, setQ] = useState('');

    // useEffect(() => {
    //     const timeOutId = setTimeout(() => {
    //         searchCustomer(q);
    //         refInputSearch.current.focus();
    //     }, 700);
    //     return () => clearTimeout(timeOutId);
    // }, [q]);

    const fetchCustomers = async () => {
        const response = await customerServices.getCustomers({
            params: {
                page: page,
            },
        });
        if (response) {
            setCustomerList([...customerList, ...response]);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, [page]);

    useEffect(() => {
        const ping = async () => {
            const result = await customerServices.ping();
            if (result && result.length > 0) {
                const newCustomerList = mergeCustomers(result, customerList);
                setCustomerList(newCustomerList);
            }
        };
        const interval = setInterval(() => {
            ping();
        }, 1000 * 5);
        return () => clearInterval(interval);
    }, [customerList]);

    const handleLoadMore = () => {
        setPage(page + 1);
    };

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
            <div className={cx('customers')}>
                <div className={cx('customer')}>
                    {customerList?.map((item, index) => {
                        return <CustomerItem key={index} item={item} showButton={showButton} />;
                    })}
                    <button className="load-more" onClick={handleLoadMore}>
                        Loadmore
                    </button>
                </div>
            </div>
        </>
    );
}

export default Customer;
