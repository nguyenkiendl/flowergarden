import classNames from 'classnames/bind';
import styles from './Drink.module.scss';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '~/context/AppContext';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);
function Drink() {
    let { customerId } = useParams();
    const [drinks, setDrinks] = useState([]);
    const { setCustomerList } = useContext(AppContext);
    useEffect(() => {
        let drinkData = [
            {
                id: 1,
                name: 'Coca Cola',
                price: 15000,
                store: 2,
                quantity: 1,
            },
            {
                id: 2,
                name: 'Pepsi',
                price: 15000,
                store: 5,
                quantity: 1,
            },
        ];
        setDrinks(drinkData);
    }, []);

    const handleAddToServices = (service) => {
        const newService = { ...service, quantity: 1 };

        setCustomerList((prevCustomerList) => {
            const newCustomerList = prevCustomerList.map((obj) => {
                if (obj.id === Number(customerId)) {
                    //uodate to service
                    let servicesList = [...obj.services];

                    const found = servicesList.find((s) => {
                        return s.id === newService.id;
                    });
                    console.log(found);
                    if (found) {
                        obj.services = servicesList.map((obj) => {
                            if (obj.id === newService.id) {
                                let newQuantity = newService.quantity + 1;
                                return { ...obj, quantity: newQuantity };
                            }
                            return obj;
                        });
                    } else {
                        obj.services = [...servicesList, newService];
                    }
                }
                return obj;
            });
            console.log(newCustomerList);
            return newCustomerList;
        });
    };
    return (
        <>
            <div className={cx('drinks')}>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Giá</th>
                            <th>Kho</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {drinks.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.store}</td>
                                    <td>
                                        <button
                                            onClick={() => handleAddToServices(item)}
                                            className={cx('btn-add-to-services')}
                                        >
                                            <FontAwesomeIcon icon={faAdd} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Drink;
