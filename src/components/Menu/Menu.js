import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
const cx = classNames.bind(styles);
function Menu({ children }) {
    return (
        <>
            <div className={cx('menu-list')}>{children}</div>
        </>
    );
}

export default Menu;
