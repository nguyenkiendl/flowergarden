import classNames from 'classnames/bind';
import styles from '../Print.module.scss';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);
import * as orderServices from '~/apiServices/orderServices';
import { useParams } from 'react-router-dom';
import { formatPrice, timeIn, timePrint } from '~/utils/filters';
import PrintHead from '../PrintHead';
import PrintFoot from '../PrintFoot';
function PrintBill() {
    const { orderId } = useParams();
    const [print, setPrint] = useState({ orders: [] });
    useEffect(() => {
        const fetchApi = async () => {
            const response = await orderServices.printOrder({
                params: {
                    order_id: Number(orderId),
                },
            });
            setPrint(response);
        };
        fetchApi();
    }, []);

    const handleMessage = (event) => {
        if (event.data.action === 'print-bill') {
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

    let totalPrice = print.orders?.reduce((total, item) => total + item.quantity * item.product_price, 0);
    return (
        <>
            <PrintHead
                tableKey={print.table_key}
                orderId={print.order_id}
                time={print.created_at}
                title={'PHIẾU TẠM TÍNH'}
            />
            <div className={cx('print-body')}>
                <table>
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Đ.Giá</th>
                            <th width={20} className="text-center">
                                SL
                            </th>
                            <th className="text-right">T.Tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {print.orders?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.product_name}</td>
                                    <td>
                                        <div className={cx('group-row')}>
                                            <span className={cx('price')}>{formatPrice(item.product_price)}</span>
                                            <span className={cx('mark')}>&nbsp; x</span>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <span className={cx('quantity')}>{item.quantity}</span>
                                    </td>
                                    <td className="text-right">
                                        <strong className={cx('price')}>
                                            {formatPrice(item.quantity * item.product_price)}
                                        </strong>
                                    </td>
                                </tr>
                            );
                        })}
                        <tr style={{ borderTop: '2px solid var(--primary)' }}>
                            <td colSpan={3}>Tổng tiền hàng:</td>
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

export default PrintBill;
