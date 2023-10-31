import classNames from 'classnames/bind';
import styles from '~/pages/Table/Table.module.scss';
const cx = classNames.bind(styles);
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as tableServices from '~/apiServices/tableServices';
import * as orderServices from '~/apiServices/orderServices';
import { ORDER_STATUS, TABLE_STATUS } from '~/utils/constants';
import { dateNow, timeAgo } from '~/utils/filters';
function TableDetail() {
    const navigate = useNavigate();
    const { tableId } = useParams();
    const [detail, setDetail] = useState({});
    useEffect(() => {
        const apiFetch = async () => {
            const response = await tableServices.getTable({
                params: {
                    table_id: Number(tableId),
                },
            });
            if (response) setDetail(response);
        };
        apiFetch();
    }, []);

    const handleBeginOrder = () => {
        const apiUpdate = async () => {
            const response = await orderServices.bookingBegin({
                table_id: Number(tableId),
                type: 'hotel',
            });
            if (response) navigate(`/table/${tableId}/${response.order_id}`);
        };
        apiUpdate();
    };

    const handleBooking = (orderId) => {
        navigate(`/table/${tableId}/${orderId}`);
    };

    const handleCloseTable = (tableId, orderId) => {
        const apiUpdate = async () => {
            const response = await orderServices.bookingEnd({
                table_id: Number(tableId),
                order_id: Number(orderId),
            });
            if (response) {
                const newOrder = detail.orders.map((obj) => {
                    if (obj.order_id === orderId) {
                        obj.order_status = 1;
                    }
                    return obj;
                });
                setDetail({ ...detail, orders: newOrder });
            }
        };
        apiUpdate();
    };
    return (
        <div className="table-detail">
            <div className="page-title">
                <div>
                    <h3>{detail.table_name}</h3>
                    <span className="table-status">{TABLE_STATUS[detail.table_status]}</span>
                </div>
                <div>{dateNow()}</div>
            </div>

            <div>
                <div className={cx('btn-wrapper')}>
                    <button className={cx('btn-booking-begin')} onClick={handleBeginOrder}>
                        Mở bàn
                    </button>
                </div>
            </div>
            <div id="order-list" className={cx('order-list')}>
                <table>
                    <thead>
                        <tr>
                            <th className="text-center">STT</th>
                            <th className="text-center">ORDER</th>
                            <th className="text-center">T.Thái</th>
                            <th>T.Gian</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {detail.orders?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="text-center">#{index + 1}</td>
                                    <td className="text-center">{item.order_id}</td>
                                    <td className="text-center">
                                        <span className={cx('status', `status-${item.order_status}`)}>
                                            {ORDER_STATUS[item.order_status]}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={cx('time-ago')}>{timeAgo(item.created_at)}</div>
                                    </td>
                                    <td className="text-right">
                                        <div className={cx('btn-group')}>
                                            <button
                                                className={cx('btn-detail')}
                                                onClick={() => {
                                                    handleBooking(item.order_id);
                                                }}
                                            >
                                                Chi tiết
                                            </button>
                                            <button
                                                className={cx('btn-close')}
                                                onClick={() => {
                                                    handleCloseTable(item.table_id, item.order_id);
                                                }}
                                            >
                                                Đóng Bàn
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TableDetail;
