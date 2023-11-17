import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import styles from '~/components/Table/Table.module.scss';
const cx = classNames.bind(styles);
function TableItem({ item }) {
    const naviate = useNavigate();
    const handleClickDetail = (tableId) => {
        naviate(`/table/${tableId}`);
    };
    return (
        <>
            <div
                className={cx('table-item', `status-${item.table_status}`)}
                onClick={() => handleClickDetail(item.table_id)}
            >
                <div className={cx('table-name')}>{item.table_name}</div>
                <ul className={cx('order-list')}>
                    {item.orders?.map((order, index) => {
                        return (
                            <li key={index}>
                                {order.time} - {order.name}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}

export default TableItem;
