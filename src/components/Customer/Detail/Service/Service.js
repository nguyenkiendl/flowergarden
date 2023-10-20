import classNames from 'classnames/bind';
import styles from './Service.module.scss';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '~/context/AppContext';
import { useParams } from 'react-router-dom';

import * as productServices from '~/apiServices/productServices';
import { SERVICES_TAB } from '~/utils/constants';
import ServiceItem from './ServiceItem';

const cx = classNames.bind(styles);
function Service() {
    let { customerId } = useParams();
    const [activeTab, setActiveTab] = useState('water');
    const [services, setServices] = useState([]);
    const [carts, setCarts] = useState([]);
    const [isReset, setIsReset] = useState(false);
    const { addOrders, productSide, setProductSide } = useContext(AppContext);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await productServices.products();
            setServices(result);
        };
        fetchApi();
    }, [productSide]);

    const handleTabControl = (tab) => {
        setActiveTab(tab);
    };

    const tabContent = (type) => {
        return services.filter((obj) => {
            return obj.product_type === type;
        });
    };

    const handleOk = () => {
        setProductSide(false);
        addOrders({
            customer_id: Number(customerId),
            services: carts,
        });
        setIsReset(true);
    };

    const handleAddServiceItem = (service) => {
        const exist = carts.some((obj) => obj.product_id === service.product_id);
        if (exist) {
            setCarts((prevCarts) => {
                return prevCarts.map((obj) => {
                    if (obj.product_id === service.product_id) {
                        const newQuantity = service.quantity;
                        return { ...obj, quantity: newQuantity };
                    }
                    return obj;
                });
            });
        } else {
            setCarts([...carts, service]);
        }
    };
    return (
        <>
            <div className={cx('services')}>
                <nav className={cx('head')}>
                    <div className={cx('tabs')}>
                        {SERVICES_TAB.map((tab) => {
                            return (
                                <span
                                    key={tab.key}
                                    className={cx('tab-item', { active: tab.key === activeTab })}
                                    onClick={(e) => {
                                        handleTabControl(tab.key);
                                    }}
                                >
                                    {tab.label}
                                </span>
                            );
                        })}
                    </div>
                </nav>
                <div className={cx('tab-content', { active: activeTab === 'water' })}>
                    <div className={cx('service-row')}>
                        {tabContent('water').map((item, index) => {
                            return (
                                <ServiceItem
                                    key={index}
                                    item={item}
                                    isReset={isReset}
                                    onAddService={handleAddServiceItem}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className={cx('tab-content', { active: activeTab === 'food' })}>
                    <div className={cx('service-row')}>
                        {tabContent('food').map((item, index) => {
                            return (
                                <ServiceItem
                                    key={index}
                                    item={item}
                                    isReset={isReset}
                                    onAddService={handleAddServiceItem}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className={cx('bottom-actions')}>
                    <button className={cx('btn-back')} onClick={() => setOpenService(false)}>
                        Quay lại
                    </button>
                    <button className={cx('btn-yes')} onClick={handleOk}>
                        Đồng ý
                    </button>
                </div>
            </div>
        </>
    );
}

export default Service;
