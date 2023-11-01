import classNames from 'classnames/bind';
import styles from './NavMain.module.scss';
const cx = classNames.bind(styles);
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSitemap, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function NavMain() {
    const [active, setActive] = useState('customers');
    const navigate = useNavigate();
    const handleCustomers = () => {
        setActive('customers');
        navigate('/');
    };

    const handleTableMap = () => {
        setActive('tables');
        navigate('/tables');
    };
    return (
        <>
            <div className={cx('navmain')}>
                <div className={cx('navmain-row')}>
                    <button
                        className={cx('btn-customers', { active: active === 'customers' })}
                        onClick={handleCustomers}
                    >
                        <span>
                            <FontAwesomeIcon icon={faUsers} />
                        </span>
                        <span>Khách Hàng</span>
                    </button>
                    <button className={cx('btn-table-map', { active: active === 'tables' })} onClick={handleTableMap}>
                        <span>
                            <FontAwesomeIcon icon={faSitemap} />
                        </span>
                        <span>Sơ Đồ Bàn</span>
                    </button>
                </div>
                <br></br>
            </div>
        </>
    );
}

export default NavMain;
