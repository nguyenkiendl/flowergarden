import { useState } from 'react';
import CusomerAdd from './Customer.add';
import CustomerList from '~/components/Customer';
function Customer() {
    const [customerList, setCustomerList] = useState([]);

    let customerDatas = [
        {
            id: 1,
            code: '00001',
            type: 'flower',
            number: 1,
            date: '03-10-2023',
        },
        {
            id: 2,
            code: '00002',
            type: 'hotel',
            number: 1,
            date: '03-10-2023',
        },
    ];
    const handleSubmit = (item) => {
        item.id = customerDatas.length + 1;
        setCustomerList((prevDataList) => {
            const newDataList = [...prevDataList, item];
            return newDataList;
        });
    };
    return (
        <div>
            <h2>Customer</h2>
            <CusomerAdd />
            <CustomerList datas={customerList} onSubmit={handleSubmit} />
        </div>
    );
}

export default Customer;
