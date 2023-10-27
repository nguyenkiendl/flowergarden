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
            </div>
        </>
    );
}

export default TableItem;
