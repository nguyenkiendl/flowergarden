import classNames from 'classnames/bind';
import styles from './Drink.module.scss';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '~/context/AppContext';
import { useParams } from 'react-router-dom';
import { formatPrice } from '~/utils/filters';

const cx = classNames.bind(styles);
function Drink() {
    let { customerId } = useParams();
    const [services, setServices] = useState([]);
    const { setCustomerList, setOpenService } = useContext(AppContext);
    useEffect(() => {
        let serviceDatas = [
            {
                id: 1,
                type: 'drink',
                unit: 'lon',
                name: 'Coca Cola',
                price: 15000,
                store: 2,
                quantity: 0,
            },
            {
                id: 2,
                type: 'drink',
                unit: 'lon',
                name: 'Pepsi',
                price: 15000,
                store: 5,
                quantity: 0,
            },
        ];
        setServices(serviceDatas);
    }, []);

    const handleAddServiceToCart = (service) => {
        let newService = { ...service };
        const existService = services.find((s) => {
            return s.id === newService.id;
        });
        if (existService) {
            setServices((prevServices) => {
                return prevServices.map((obj) => {
                    if (obj.id === newService.id) {
                        let newQuantity = obj.quantity + 1;
                        let newStore = obj.store - 1;
                        return { ...obj, quantity: newQuantity, store: newStore };
                    }
                    return obj;
                });
            });
        } else {
            setServices((prevServices) => {
                return [...prevServices, newService];
            });
        }
    };
    let totalPrice = services.reduce((total, item) => total + item.quantity * item.price, 0);

    const handleAddToServices = () => {
        setCustomerList((prevCustomerList) => {
            const newCustomerList = prevCustomerList.map((obj) => {
                if (obj.id === Number(customerId)) {
                    obj.services = services;
                }
                return obj;
            });
            return newCustomerList;
        });
        setOpenService(false);
    };
    return (
        <>
            <div className={cx('drinks')}>
                <table>
                    <thead>
                        <tr>
                            <th width="20"></th>
                            <th>SL</th>
                            <th>Tên</th>
                            <th>Giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td width="20">
                                        <button
                                            onClick={() => handleAddServiceToCart(item)}
                                            className={cx('btn-add-service-to-cart')}
                                            disabled={item.store === 0}
                                        >
                                            <FontAwesomeIcon icon={faAdd} />
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleAddServiceToCart(item)}
                                            className={cx('btn-add-service-to-cart')}
                                            disabled={item.store === 0}
                                        >
                                            <FontAwesomeIcon icon={faAdd} />
                                        </button>
                                        {item.quantity} {item.unit}
                                    </td>
                                    <td>
                                        {item.name} ({item.store})
                                    </td>
                                    <td>{formatPrice(item.price)}đ</td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Tổng</td>
                            <td colSpan={3}>{formatPrice(totalPrice)}đ</td>
                        </tr>
                    </tfoot>
                </table>
                <button onClick={() => handleAddToServices()} className={cx('btn-add-to-services')}>
                    Thực hiện
                </button>
            </div>
        </>
    );
}

export default Drink;
