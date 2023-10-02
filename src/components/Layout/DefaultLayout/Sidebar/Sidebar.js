import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger, faHouse, faMugSaucer, faTicket } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function Sidebar() {
    return (
        <aside className={cx('sidebar')}>
            <ul>
                <li>
                    <NavLink to="/" className={cx('nav-link')}>
                        <FontAwesomeIcon icon={faHouse} />
                        <strong>Home</strong>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/tickets" className={cx('nav-link')}>
                        <FontAwesomeIcon icon={faTicket} />
                        <strong>Tickets</strong>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/drinking-water" className={cx('nav-link')}>
                        <FontAwesomeIcon icon={faMugSaucer} />
                        <strong>Drinking water</strong>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/foods" className={cx('nav-link')}>
                        <FontAwesomeIcon icon={faBurger} />
                        <strong>Foods</strong>
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
