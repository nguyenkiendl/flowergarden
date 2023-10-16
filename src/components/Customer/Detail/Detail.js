import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '~/components/Customer/Customer.module.scss';
import { customerType, formatPrice } from '~/utils/filters';
import { useContext } from 'react';
import { AppContext } from '~/context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faFileCirclePlus, faMinus, faPrint, faRemove } from '@fortawesome/free-solid-svg-icons';
import * as customerServices from '~/apiServices/customerServices';

const cx = classNames.bind(styles);
function Detail() {
    let routeParams = useParams();
    const { customerList, setCustomerList, openService, setOpenService } = useContext(AppContext);
    const customerId = routeParams.customerId;
    const customer = customerList?.find((c) => {
        return c.customer_id === Number(customerId);
    });
    if (customer === undefined) return;
    const handlePrintTicket = () => {
        console.log('print ticket');
    };

    const handleServiceAdd = () => {
        setOpenService(!openService);
    };

    const handleMinus = (service) => {
        if (customer.services.some((item) => item.product_id === service.product_id)) {
            setCustomerList((prevCustomerList) => {
                const newCustomerList = prevCustomerList.map((obj) => {
                    if (obj.customer_id === Number(customerId)) {
                        let newServices = obj.services.map((s) => {
                            if (s.product_id === service.product_id) {
                                return { ...s, quantity: service.quantity - 1 };
                            }
                            return s;
                        });
                        obj.services = newServices;
                    }
                    return obj;
                });
                return newCustomerList;
            });
        }
    };

    const handleAdd = (service) => {
        if (customer.services.some((item) => item.product_id === service.product_id)) {
            setCustomerList((prevCustomerList) => {
                const newCustomerList = prevCustomerList.map((obj) => {
                    if (obj.customer_id === Number(customerId)) {
                        let newServices = obj.services.map((s) => {
                            if (s.product_id === service.product_id) {
                                return { ...s, quantity: service.quantity + 1 };
                            }
                            return s;
                        });
                        obj.services = newServices;
                    }
                    return obj;
                });
                return newCustomerList;
            });
        }
    };

    const handleEdit = (service) => {};

    const handleRemove = (service) => {
        const removeService = async () => {
            const result = await customerServices.removeService(service);
            if (result) {
                setCustomerList((prevCustomerList) => {
                    const newCustomerList = prevCustomerList.map((obj) => {
                        if (obj.customer_id === Number(customerId)) {
                            let newServices = obj.services.filter((s) => {
                                return s.product_id !== service.product_id;
                            });
                            obj.services = newServices;
                        }
                        return obj;
                    });
                    return newCustomerList;
                });
            }
        };
        removeService();
    };

    let type = customerType(customer.customer_type);
    let totalPrice = customer.services.reduce((total, item) => total + item.quantity * item.product_price, 0);
    return (
        <>
            <div className={cx('customer')}>
                <div className={cx('customer-item')}>
                    <div className={cx('number')}>{customer.customer_number}</div>
                    <div className={'customer-group'}>
                        <div className={cx('code')}>{customer.customer_code}</div>
                        <div className={cx('type')}>{type.label}</div>
                    </div>
                    <div className={cx('date')}>{customer.created_at}</div>
                    <div className={cx('price')}>{formatPrice(customer.ticket_price)}đ</div>
                    <div className={cx('btn-action')}>
                        <button onClick={handlePrintTicket} className={cx('btn-print-ticket')}>
                            <FontAwesomeIcon icon={faPrint} />
                        </button>
                        <button onClick={handleServiceAdd} className={cx('btn-service-add')}>
                            <FontAwesomeIcon icon={faFileCirclePlus} />
                        </button>
                    </div>
                </div>
                <div className={cx('drinks')}>
                    <table>
                        <thead>
                            <tr>
                                <th className="text-center">#</th>
                                <th>Tên</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                                <th colSpan={2}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {customer.services.map((service, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="text-center">{index + 1}</td>
                                        <td>{service.product_name}</td>
                                        <td>
                                            <div className={cx('btn-group')}>
                                                <button
                                                    onClick={() => handleMinus(service)}
                                                    className={cx('btn-minus')}
                                                    disabled={service.quantity === 0}
                                                >
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </button>
                                                <span className={cx('quantity')}>{service.quantity}</span>
                                                <button
                                                    onClick={() => handleAdd(service)}
                                                    className={cx('btn-add')}
                                                    disabled={service.product_store === 0}
                                                >
                                                    <FontAwesomeIcon icon={faAdd} />
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="price">{formatPrice(service.product_price)}đ</span>
                                        </td>
                                        <td className="text-center">
                                            <button onClick={() => handleEdit()} className={cx('btn-edit')}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                        </td>
                                        <td className="text-center">
                                            <button onClick={() => handleRemove(service)} className={cx('btn-remove')}>
                                                <FontAwesomeIcon icon={faRemove} />
                                            </button>
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
