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
import { SERVICES_TAB } from '~/utils/constants';

const cx = classNames.bind(styles);
function Service() {
    let { customerId } = useParams();
    const [activeTab, setActiveTab] = useState('water');
    const [services, setServices] = useState([]);
    const { addService, openService } = useContext(AppContext);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await productServices.products();
            setServices(result);
        };
        fetchApi();
    }, [openService]);

    const handleAddService = (productId) => {
        addService({
            customerId: Number(customerId),
            productId: productId,
        });
        setServices((prevServices) => {
            return prevServices.map((obj) => {
                if (obj.product_id === productId) {
                    let newStore = obj.product_store - 1;
                    return { ...obj, product_store: newStore };
                }
                return obj;
            });
        });
    };

    const handleTabControl = (tab) => {
        setActiveTab(tab);
    };

    const tabContent = (type) => {
        return services.filter((obj) => {
            return obj.product_type === type;
        });
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
                                <div key={index} className={cx('service-item')}>
                                    <div className={cx('thumbnail')}>
                                        <img src={imagedefault} alt={'thumnail'} />
                                        <div className={cx('btn-group')}>
                                            <button
                                                onClick={() => handleAddService(item.product_id)}
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
                </div>
                <div className={cx('tab-content', { active: activeTab === 'food' })}>
                    <div className={cx('service-row')}>
                        {tabContent('food').map((item, index) => {
                            return (
                                <div key={index} className={cx('service-item')}>
                                    <div className={cx('thumbnail')}>
                                        <img src={imagedefault} alt={'thumnail'} />
                                        <div className={cx('btn-group')}>
                                            <button
                                                onClick={() => handleAddService(item.product_id)}
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
                </div>
            </div>
        </>
    );
}

export default Service;
