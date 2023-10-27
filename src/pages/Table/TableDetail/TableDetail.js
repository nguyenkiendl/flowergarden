import classNames from 'classnames/bind';
import styles from '~/pages/Table/Table.module.scss';
const cx = classNames.bind(styles);
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as tableServices from '~/apiServices/tableServices';
import * as orderServices from '~/apiServices/orderServices';
import { CUSTOMER_TYPE, ORDER_STATUS, PAYMENT_STATUS, TABLE_STATUS } from '~/utils/constants';
import Select from '~/components/Form/Select';
import { dateFormat, dateNow, timeAgo } from '~/utils/filters';
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
                            <th className="text-center">ID</th>
                            <th className="text-center">TT</th>
                            <th>Ngày</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {detail.orders?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td width={20} className="text-center">
                                        #{index + 1}
                                    </td>
                                    <td width={20} className="text-center">
                                        {item.order_id}
                                    </td>
                                    <td width={50} className="text-center">
                                        {ORDER_STATUS[item.status]}
                                    </td>
                                    <td width={150}>
                                        <div className={cx('time-ago')}>{timeAgo(item.created_at)}</div>
                                    </td>
                                    <td width={100} className="text-right">
                                        <button
                                            className="btn-detail"
                                            onClick={() => {
                                                handleBooking(item.order_id);
                                            }}
                                        >
                                            Chi tiết
                                        </button>
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
