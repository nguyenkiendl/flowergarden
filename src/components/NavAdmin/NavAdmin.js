import classNames from 'classnames/bind';
import styles from './NavAdmin.module.scss';
const cx = classNames.bind(styles);
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger, faChartLine, faStore } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function NavAdmin() {
    const [active, setActive] = useState('/super-admin');
    const navigate = useNavigate();

    const handleChangeNav = (active) => {
        setActive(active);
        navigate(active);
    };
    return (
        <>
            <div className={cx('navadmin')}>
                <div className={cx('navadmin-row')}>
                    <button
                        className={cx('btn-admin', { active: active === '/super-admin' })}
                        onClick={() => handleChangeNav('/super-admin')}
                    >
                        <span>
                            <FontAwesomeIcon icon={faChartLine} />
                        </span>
                        <span>ADMIN</span>
                    </button>
                    <button
                        className={cx('btn-bbq', { active: active === '/super-admin/bbqs' })}
                        onClick={() => handleChangeNav('/super-admin/bbqs')}
                    >
                        <span>
                            <FontAwesomeIcon icon={faBurger} />
                        </span>
                        <span>BBQ</span>
                    </button>
                    <button
                        className={cx('btn-table-map', { active: active === '/super-admin/stores' })}
                        onClick={() => handleChangeNav('/super-admin/stores')}
                    >
                        <span>
                            <FontAwesomeIcon icon={faStore} />
                        </span>
                        <span>KHO</span>
                    </button>
                </div>
                <br></br>
            </div>
        </>
    );
}

export default NavAdmin;
