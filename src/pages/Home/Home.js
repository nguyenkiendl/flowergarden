import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useContext, useState } from 'react';
import CustomerList from '~/components/Customer';
import { AppContext } from '~/context/AppContext';

const cx = classNames.bind(styles);
function Home() {
    const [customerList, setCustomerList] = useState([]);
    const { setCustomerSide } = useContext(AppContext);
    return (
        <div className={cx('home')}>
            <h2 className="page-title">Bán Vé</h2>
            <div className={cx('btn-wrapper')}>
                <button className={cx('btn-user-add')} onClick={() => setCustomerSide(true)}>
                    Thêm Khách Hàng
                </button>
            </div>
            <CustomerList showButton={false} />
        </div>
    );
}

export default Home;
