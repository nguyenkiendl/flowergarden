import classNames from 'classnames/bind';
import styles from '../Print.module.scss';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);
import * as customerServices from '~/apiServices/customerServices';
import { useParams } from 'react-router-dom';
import PrintHead from '../PrintHead';
import PrintFoot from '../PrintFoot';
import { formatPrice } from '~/utils/filters';
function PrintTicket() {
    const { customerId } = useParams();
    const [customer, setCustomer] = useState({});
    useEffect(() => {
        const fetchApi = async () => {
            const response = await customerServices.printCustomerTicket({
                params: {
                    customer_id: Number(customerId),
                },
            });
            setCustomer(response);
        };
        fetchApi();
    }, []);
    let totalPrice = customer.customer_number * customer.ticket_price;

    const handleMessage = (event) => {
        if (event.data.action === 'print-ticket') {
            window.focus();
            window.print();
        }
    };

    useEffect(() => {
        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);
    return (
        <>
            <PrintHead tableKey={customer.customer_id} orderId={''} time={customer.created_at} title={'VÉ THAM QUAN'} />
            <div className={cx('print-body')}>
                <table>
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th className="text-center">SL</th>
                            <th>Đ.Giá</th>
                            <th className="text-right">T.Tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Vé Tham Quan Vườn Hoa</td>
                            <td className="text-center">
                                <span className={cx('quantity')}>{customer.customer_number}</span>
                            </td>
                            <td className="text-right">
                                <strong className={cx('price')}>{formatPrice(customer.ticket_price)}</strong>
                            </td>
                            <td className="text-right">
                                <strong className={cx('price')}>
                                    {formatPrice(customer.customer_number * customer.ticket_price)}
                                </strong>
                            </td>
                        </tr>
                        <tr style={{ borderTop: '2px solid var(--primary)' }}>
                            <td colSpan={3}>Tổng tiền vé:</td>
                            <td className="text-right">
                                <strong className={cx('total')}>{formatPrice(totalPrice)}</strong>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>Chiết khấu:</td>
                            <td className="text-right">
                                <strong className={cx('total')}>0</strong>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <b>Tổng Cộng:</b>
                            </td>
                            <td className="text-right">
                                <strong className={cx('total')}>{formatPrice(totalPrice)}</strong>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <PrintFoot />
        </>
    );
}

export default PrintTicket;
