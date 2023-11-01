import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import * as customerServices from '~/apiServices/customerServices';
import CustomerList from '~/components/Customer';
import Add from '~/components/Customer/Add';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);
function Home() {
    const [customerList, setCustomerList] = useState([]);
    const fetchCustomers = async () => {
        const response = await customerServices.getCustomers();
        if (response) {
            setCustomerList([...customerList, ...response]);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);
    const handleAddNew = (newCustomer) => {
        console.log(newCustomer);
        setCustomerList([newCustomer, ...customerList]);
    };
    return (
        <div className={cx('home')}>
            <h2 className="page-title">Bán Vé</h2>
            <Add onAddNew={handleAddNew} />
            <CustomerList customerList={customerList} />
        </div>
    );
}

export default Home;
