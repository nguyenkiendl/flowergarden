import classNames from 'classnames/bind';
import styles from './Service.module.scss';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faMinus } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '~/context/AppContext';
import { useParams } from 'react-router-dom';
import { formatPrice } from '~/utils/filters';
import * as productServices from '~/apiServices/productServices';

import imagedefault from '~/assets/images/cocacola.jpg';

const cx = classNames.bind(styles);
function Service() {
    let { customerId } = useParams();
    const [services, setServices] = useState([]);
    const { setCustomerList, setOpenService } = useContext(AppContext);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await productServices.products();
            setServices(result);
        };

        fetchApi();
    }, []);

    const handleAddService = (service) => {
        let newService = { ...service };
        const existService = services.find((s) => {
            return s.product_id === newService.product_id;
        });
        if (existService) {
            setServices((prevServices) => {
                return prevServices.map((obj) => {
                    if (obj.product_id === newService.product_id) {
                        let newQuantity = obj.quantity + 1;
                        let newStore = obj.product_store - 1;
                        return { ...obj, quantity: newQuantity, product_store: newStore };
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
    const handleMinusService = (service) => {
        let newService = { ...service };
        const existService = services.find((s) => {
            return s.product_id === newService.product_id;
        });
        if (existService) {
            setServices((prevServices) => {
                return prevServices.map((obj) => {
                    if (obj.product_id === newService.product_id) {
                        let newQuantity = obj.quantity - 1;
                        let newStore = obj.product_store + 1;
                        return { ...obj, quantity: newQuantity, product_store: newStore };
                    }
                    return obj;
                });
            });
        }
    };

    let totalPrice = services.reduce((total, item) => total + item.quantity * item.price, 0);

    const handleAddToServices = () => {
        setCustomerList((prevCustomerList) => {
            const newCustomerList = prevCustomerList.map((obj) => {
                if (obj.id === Number(customerId)) {
                    obj.services = services.filter((service) => {
                        return service.quantity > 0;
                    });
                }
                return obj;
            });
            return newCustomerList;
        });
        setOpenService(false);
    };
    return (
        <>
            <div className={cx('services')}>
                {services.map((item, index) => {
                    return (
                        <div key={index} className={cx('service-item')}>
                            <div className={cx('thumbnail')}>
                                <img src={imagedefault} alt={'thumnail'} />
                                <div className={cx('btn-group')}>
                                    <button
                                        onClick={() => handleMinusService(item)}
                                        className={cx('btn-minus-service', { show: item.quantity > 0 })}
                                        disabled={item.quantity === 0}
                                    >
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                    <span className={cx('quantity', { show: item.quantity > 0 })}>{item.quantity}</span>
                                    <button
                                        onClick={() => handleAddService(item)}
                                        className={cx('btn-add-service')}
                                        disabled={item.product_store === 0}
                                    >
                                        <FontAwesomeIcon icon={faAdd} />
                                    </button>
                                </div>
                            </div>
                            <div className={cx('name')}>
                                {item.product_name} ({item.product_store})
                            </div>
                            <div className={cx('price')}>{formatPrice(item.product_price)}đ</div>
                        </div>
                    );
                })}
            </div>
            <p>Tổng: {formatPrice(totalPrice)}đ</p>
            <button onClick={() => handleAddToServices()} className={cx('btn-add-to-services')}>
                Thực hiện
            </button>
        </>
    );
}

export default Service;
