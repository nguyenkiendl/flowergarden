import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '~/components/Customer/Customer.module.scss';
import { customerType, formatPrice } from '~/utils/filters';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '~/context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFileCirclePlus, faFileEdit, faMinus, faPrint, faRemove } from '@fortawesome/free-solid-svg-icons';
import { ORDERS_TAB } from '~/utils/constants';
import * as customerServices from '~/apiServices/customerServices';
const cx = classNames.bind(styles);
function Detail() {
    let { customerId } = useParams();
    const [activeTab, setActiveTab] = useState('orders');
    const { customer, setCustomer, productSide, setProductSide, orderSide, setOrderSide } = useContext(AppContext);
    useEffect(() => {
        setCustomer({ customer_id: Number(customerId) });
        // const fetchApi = async () => {
        //     const result = await customerServices.getCustomer({
        //         params: {
        //             customer_id: Number(customerId),
        //         },
        //     });
        //     setCustomer(result);
        // };
        // if (customerId) fetchApi();
    }, [customerId]);

    if (Object.keys(customer).length === 0) return;

    const handleOrderEdit = () => {
        console.log(customerId);
        setOrderSide(!orderSide);
    };
    const handleServiceAdd = () => {
        setProductSide(!productSide);
    };

    const handleTabControl = (tab) => {
        setActiveTab(tab);
    };

    let totalPrice = customer.services?.reduce((total, item) => total + item.quantity * item.product_price, 0);
    return (
        <>
            <div className={cx('customer')}>
                <div className={cx('customer-item')}>
                    <div className={cx('number')}>{customer.customer_number}</div>
                    <div className={'customer-group'}>
                        <div className={cx('code')}>{customer.customer_code}</div>
                        <div className={cx('type')}>{customerType(customer.customer_type)?.label}</div>
                    </div>
                    <div className={cx('date')}>{customer.created_at}</div>
                    <div className={cx('price')}>{formatPrice(customer.ticket_price * customer.customer_number)}đ</div>
                    <div className={cx('btn-action')}>
                        <button onClick={handleOrderEdit} className={cx('btn-order-edit')}>
                            <FontAwesomeIcon icon={faFileEdit} />
                        </button>
                        <button onClick={handleServiceAdd} className={cx('btn-order-add')}>
                            <FontAwesomeIcon icon={faFileCirclePlus} />
                        </button>
                    </div>
                </div>
                <nav className={cx('head')}>
                    <div className={cx('tabs')}>
                        {ORDERS_TAB.map((tab) => {
                            return (
                                <span
                                    key={tab.key}
                                    className={cx('tab-item', { active: tab.key === activeTab })}
                                    onClick={() => {
                                        handleTabControl(tab.key);
                                    }}
                                >
                                    {tab.label}
                                </span>
                            );
                        })}
                    </div>
                </nav>
                <div id="order-list" className={cx('tab-content', { active: activeTab === 'orders' })}>
                    <table>
                        <thead>
                            <tr>
                                <th className="text-center">#</th>
                                <th>Tên</th>
                                <th>SL</th>
                                <th>Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customer.orders.map((service, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="text-center">{index + 1}</td>
                                        <td>{service.product_name}</td>
                                        <td>
                                            <div className={cx('btn-group')}>
                                                <span className={cx('quantity')}>{service.quantity}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="price">{formatPrice(service.product_price)}đ</span>
                                        </td>
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
                </div>
                <div id="discount-list" className={cx('tab-content', { active: activeTab === 'discounts' })}>
                    <table>
                        <thead>
                            <tr>
                                <th className="text-center">#</th>
                                <th>Tên</th>
                                <th>SL</th>
                                <th>Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customer.discounts.map((service, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="text-center">{index + 1}</td>
                                        <td>{service.product_name}</td>
                                        <td>
                                            <div className={cx('btn-group')}>
                                                <span className={cx('quantity')}>{service.quantity}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="price">{formatPrice(service.product_price)}đ</span>
                                        </td>
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
                </div>
            </div>
        </>
    );
}

export default Detail;
