import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect } from 'react';
import { AppContext } from '~/context/AppContext';
const cx = classNames.bind(styles);
function Header() {
    const navigate = useNavigate();
    const { openBar, setOpenBar, customerSide, setCustomerSide } = useContext(AppContext);
    const handleClick = (e) => {
        navigate('/');
    };

    const handleClickBar = () => {
        setOpenBar(!openBar);
    };
    return (
        <header className={cx('header')}>
            <div className={cx('inner')}>
                <div onClick={handleClickBar} className={cx('menu')}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <Link to="/" className={cx('page-title')}>
                    <h1>FLOWER GARDEN</h1>
                </Link>
                <button onClick={handleClick} className={cx('btn-new')}>
                    <FontAwesomeIcon icon={faPlusCircle} />
                </button>
            </div>
        </header>
    );
}

export default Header;
