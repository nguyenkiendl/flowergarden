import classNames from 'classnames/bind';
import styles from '~/pages/Table/Table.module.scss';
const cx = classNames.bind(styles);
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as tableServices from '~/apiServices/tableServices';
import * as orderServices from '~/apiServices/orderServices';
import { dateNow } from '~/utils/filters';
import Order from '~/components/Order';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
function TableDetail() {
    const navigate = useNavigate();
    const { tableId, orderId } = useParams();
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

    const handleEndOrder = () => {
        const apiUpdate = async () => {
            const response = await orderServices.bookingEnd({
                table_id: Number(tableId),
            });
            if (response) {
                const newOrder = detail.orders.map((obj) => {
                    if (obj.order_id === orderId) {
                        obj.order_status = 1;
                    }
                    return obj;
                });
                setDetail({ ...detail, orders: newOrder });
                navigate(`/tables`);
            }
        };
        apiUpdate();
    };
    return (
        <div className="table-detail">
            <div className="page-title">
                <div className={cx('group-title')}>
                    <h3 className={cx('title')}>{detail.table_key}</h3>
                    <span className={cx('sub-title')}>{detail.table_name}</span>
                </div>
                <div className={cx('time')}>{dateNow()}</div>
                <div className={cx('btn-group')}>
                    <button className={cx('btn-booking-begin')} onClick={handleBeginOrder}>
                        <FontAwesomeIcon icon={faPlusCircle} />
                    </button>

                    <button className={cx('btn-booking-end')} onClick={handleEndOrder}>
                        Đóng bàn
                    </button>
                </div>
            </div>
            <Order datas={detail.orders || []} />
        </div>
    );
}

export default TableDetail;
