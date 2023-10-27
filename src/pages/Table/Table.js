import classNames from 'classnames/bind';
import styles from '~/pages/Table/Table.module.scss';
const cx = classNames.bind(styles);
import TableList from '~/components/Table';

function Customer() {
    return (
        <div className={cx('order')}>
            <h2 className="page-title">Sơ Đồ Bàn</h2>
            <TableList />
        </div>
    );
}

export default Customer;
