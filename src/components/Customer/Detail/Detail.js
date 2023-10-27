import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '~/components/Customer/Customer.module.scss';
import { customerType, dateFormat, formatPrice, timeAgo } from '~/utils/filters';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '~/context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileEdit, faRemove } from '@fortawesome/free-solid-svg-icons';
import * as orderServices from '~/apiServices/orderServices';
import * as customerServices from '~/apiServices/customerServices';
import NavBar from '~/components/NavBar';
import imagedefault from '~/assets/images/cocacola.jpg';
const cx = classNames.bind(styles);
function Detail() {
    let { customerId, orderId } = useParams();
    const [activeTab, setActiveTab] = useState('orders');
    const { customer, setCustomer, orderSide, setOrderSide } = useContext(AppContext);
    useEffect(() => {
        const customer = async () => {
            const response = await customerServices.getCustomer({
                params: {
                    customer_id: Number(customerId),
                    order_id: Number(orderId),
                },
            });
            if (response) setCustomer(response);
        };
        customer();
    }, [customerId]);

    if (Object.keys(customer).length === 0) return;
    console.log(customer);
    const handleOrderEdit = () => {
        setOrderSide(!orderSide);
    };

    const handleOrderRemove = (orderId) => {
        const apiRemove = async () => {
            const response = await orderServices.removeOrder({
                order_id: Number(orderId),
            });
        };
        apiRemove();
    };

    let totalPrice = customer.orders?.reduce((total, item) => total + item.quantity * item.product_price, 0);
    return (
        <>
            <div className={cx('customer')}>
                <div className={cx('order-item')}>
                    <div className={cx('order-group')}>
                        <div className={cx('order-id')}>
                            ĐƠN HÀNG: <strong>{customer.order_id}</strong>
                        </div>
                        <div className={cx('order-payment')}>{customer.ticket_payment}</div>
                        <div className={cx('time-ago')}>{timeAgo(customer.created_at)}</div>
                    </div>
                    <div className={cx('date')}>
                        <span className={cx('date-at')}>{dateFormat(customer.created_at)}</span>
                        <br />
                    </div>
                </div>
                <nav className={cx('head')}>
                    <div className={cx('tabs')}>
                        <span className={cx('tab-item')}>THỰC ĐƠN</span>
                    </div>
                </nav>
                <div id="order-list" className={cx('tab-content', { active: activeTab === 'orders' })}>
                    <div className={cx('order-row')}>
                        {customer.orders.map((item, index) => {
                            return (
                                <div key={index} className={cx('order-item')}>
                                    <div className={cx('thumbnail')}>
                                        <img src={imagedefault} alt={'thumnail'} />
                                    </div>
                                    <div className={cx('name')}>
                                        <h4>{item.product_name}</h4>
                                        <span className={cx('quantity')}>{item.quantity}</span> <span>x </span>
                                        <span className={cx('unit')}>{item.product_unit}</span>
                                    </div>
                                    <div className={cx('status', item.status)}>{item.status}</div>
                                    <div className={cx('price')}>{formatPrice(item.product_price)}đ</div>
                                    <button
                                        onClick={() => handleOrderRemove(item.order_id)}
                                        className={cx('btn-remove')}
                                        disabled={item.status !== 'new'}
                                    >
                                        <FontAwesomeIcon icon={faRemove} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <NavBar />
            </div>
        </>
    );
}

export default Detail;
