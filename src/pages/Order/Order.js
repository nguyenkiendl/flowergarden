import classNames from 'classnames';
import styles from '~/components/Customer/Customer.module.scss';
import OrderList from '~/components/Customer/OrderList';
import Filter from '~/components/Customer/Head/Filter';
import Search from '~/components/Customer/Head/Search';
import { useContext, useEffect } from 'react';
import { AppContext } from '~/context/AppContext';

const cx = classNames.bind(styles);
function Order() {
    const { fetchCustomers } = useContext(AppContext);
    useEffect(() => {
        //fetchCustomers();
    }, []);
    return (
        <>
            <div className={cx('order')}>
                <h2 className="page-title">Nhân Viên Order</h2>
                <OrderList />
            </div>
        </>
    );
}

export default Order;
