import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import * as customerServices from '~/apiServices/customerServices';
import { useContext, useEffect, useState } from 'react';
import CustomerList from '~/components/Customer';
import { AppContext } from '~/context/AppContext';
import Add from '~/components/Customer/Add';

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
