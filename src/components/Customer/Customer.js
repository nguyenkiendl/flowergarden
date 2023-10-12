import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '~/context/AppContext';
import { customerType } from '~/utils/filters';
import customerServices from '~/apiServices/customerServices';
import classNames from 'classnames/bind';
import styles from './Customer.module.scss';
const cx = classNames.bind(styles);
function Customer() {
    const { customerList, setCustomerList } = useContext(AppContext) || [];
    const handleClick = (customerId) => {
        // setCustomerList((prevCustomerList) => {
        //     prevCustomerList.map((obj) => {
        //         if (obj.customer_id === Number(customerId)) {
        //             return { ...obj, customer_status: 'ording' };
        //         }
        //         return obj;
        //     });
        // });
        const updateCustomerStatus = async () => {
            const result = await customerServices.updateCustomerStatus(customerId, 'ording');
        };

        updateCustomerStatus();
    };
    return (
        <>
            <div>
                <div className={cx('customer')}>
                    {customerList.map((item, index) => {
                        let type = customerType(item.customer_type);
                        return (
                            <div key={index} className={cx('customer-item', item.customer_status)}>
                                <div className={cx('number')}>{item.customer_number}</div>
                                <div className={'customer-group'}>
                                    <div className={cx('code')}>{item.customer_code}</div>
                                    <div className={cx('type')}>{type.label}</div>
                                </div>
                                <div className={cx('date')}>{item.created_at}</div>
                                <Link
                                    onClick={() => handleClick(item.customer_id)}
                                    to={`/customer/${item.customer_id}`}
                                    className={cx('btn-detail')}
                                >
                                    Xem
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Customer;
