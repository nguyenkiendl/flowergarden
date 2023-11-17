import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faRotate } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function Header() {
    const navigate = useNavigate();

    const handleClickReload = () => {
        window.location.reload(false);
    };
    return (
        <header className={cx('header')}>
            <button className={cx('btn-back')} onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className={cx('inner')}>
                <Link to="/" className={cx('page-title')}>
                    <h1>FLOWER GARDEN</h1>
                </Link>
            </div>
            <button className={cx('btn-reload')} onClick={handleClickReload}>
                <FontAwesomeIcon icon={faRotate} />
            </button>
        </header>
    );
}

export default Header;
