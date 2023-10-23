import classNames from 'classnames/bind';
import styles from './Print.module.scss';
import { useContext, useEffect, useState } from 'react';
const cx = classNames.bind(styles);
import * as customerServices from '~/apiServices/customerServices';
import { useParams } from 'react-router-dom';
import { customerType, dateFormat, formatPrice } from '~/utils/filters';
import { AppContext } from '~/context/AppContext';
function Print() {
    const { customerId } = useParams();
    const [customer, setCustomer] = useState({ orders: [] });
    //const { customer } = useContext(AppContext);
    if (Object.keys(customer).length === 0) return;
    useEffect(() => {
        const fetchApi = async () => {
            const response = await customerServices.getCustomer({
                params: {
                    customer_id: Number(customerId),
                },
            });
            setCustomer(response);
        };
        fetchApi();
    }, []);
    console.log('customer', customer);
    let totalPrice = customer.orders?.reduce((total, item) => total + item.quantity * item.product_price, 0);
    return (
        <>
            <div className={cx('print-header')}>
                <h3>Hóa đơn bán hàng</h3>
            </div>
            <div className={cx('print-body')}>
                <div className={cx('customer')}>
                    <div className={cx('customer-row')}>
                        <span>
                            Khách: <strong>{customer.customer_code}</strong>
                        </span>
                        <span>
                            Loại: <strong>{customerType(customer.customer_type)?.label}</strong>
                        </span>
                    </div>
                    <div className={cx('customer-row')}>
                        <span>
                            Số Khách: <strong>{customer.customer_number}</strong>
                        </span>
                        <span>
                            Ngày: <strong>{dateFormat(customer.created_at)}</strong>
                        </span>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className="text-center">STT</th>
                            <th>Tên món</th>
                            <th>SL</th>
                            <th>Đ.Giá</th>
                            <th>T.Tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customer.orders.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td width={20} className="text-center">
                                        {index + 1}
                                    </td>
                                    <td>{item.product_name}</td>
                                    <td width={20} className="text-center">
                                        <span className={cx('quantity')}>{item.quantity}</span>
                                    </td>
                                    <td width={100}>
                                        <span className={cx('price')}>{formatPrice(item.product_price)}đ</span>
                                    </td>
                                    <td width={100} className="text-right">
                                        <strong className={cx('price')}>
                                            {formatPrice(item.quantity * item.product_price)}đ
                                        </strong>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3}></td>
                            <td>Tổng</td>
                            <td className="text-right">
                                <strong className={cx('total')}>{formatPrice(totalPrice)}đ</strong>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className={cx('print-footer')}></div>
        </>
    );
}

export default Print;
