import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function Header() {
    return (
        <header className={cx('header')}>
            <div className={cx('inner')}>
                <div className={cx('menu')}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <div className={cx('page-title')}>
                    <h1>FLOWER GARDEN</h1>
                </div>
            </div>
        </header>
    );
}

export default Header;
