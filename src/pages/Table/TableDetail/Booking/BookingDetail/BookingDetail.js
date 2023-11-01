import { useEffect, useState } from 'react';
import * as tableServices from '~/apiServices/tableServices';
import { dateNow, formatPrice } from '~/utils/filters';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '~/pages/Table/Table.module.scss';
import NavPrint from './NavPrint';
const cx = classNames.bind(styles);
function BookingDetail() {
    const { tableId, orderId } = useParams();
    const [detail, setDetail] = useState({});
    useEffect(() => {
        const apiFetch = async () => {
            const response = await tableServices.getTableOrders({
                params: {
                    table_id: Number(tableId),
                    order_id: Number(orderId),
                },
            });
            if (response) setDetail(response);
        };
        apiFetch();
    }, []);
    let totalPrice = detail.orders?.reduce((total, item) => total + item.quantity * item.product_price, 0);
    return (
        <>
            <div className="booking-detail">
                <div className="page-title">
                    <div>
                        <h3>{detail.table_name}</h3>
                        <span>Đơn: {detail.order_id}</span>
                    </div>

                    <div>{dateNow()}</div>
                </div>
                <div className={cx('order-list')}>
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
                            {detail.orders?.map((item, index) => {
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
                <NavPrint />
            </div>
        </>
    );
}

export default BookingDetail;
