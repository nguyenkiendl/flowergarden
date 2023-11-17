import classNames from 'classnames/bind';
import styles from './NavMain.module.scss';
const cx = classNames.bind(styles);
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger, faSitemap } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function NavMain() {
    const [active, setActive] = useState('bbq');
    const navigate = useNavigate();

    const handleChangeNav = (active) => {
        setActive(active);
        navigate(active);
    };
    return (
        <>
            <div className={cx('navmain')}>
                <div className={cx('navmain-row')}>
                    <button className={cx('btn-bbq', { active: active === '/' })} onClick={() => handleChangeNav('/')}>
                        <span>
                            <FontAwesomeIcon icon={faBurger} />
                        </span>
                        <span>BBQ</span>
                    </button>
                    <button
                        className={cx('btn-table-map', { active: active === '/table-plan' })}
                        onClick={() => handleChangeNav('/table-plan')}
                    >
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
