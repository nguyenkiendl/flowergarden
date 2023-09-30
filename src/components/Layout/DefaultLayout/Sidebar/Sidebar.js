import { Link } from 'react-router-dom';
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
                    <Link to="/" className="nav-link">
                        <FontAwesomeIcon icon={faHouse} />
                        <strong>Home</strong>
                    </Link>
                </li>
                <li>
                    <Link to="/tickets" className="nav-link">
                        <FontAwesomeIcon icon={faTicket} />
                        <strong>Tickets</strong>
                    </Link>
                </li>
                <li>
                    <Link to="/drinking-water" className="nav-link">
                        <FontAwesomeIcon icon={faMugSaucer} />
                        <strong>Drinking water</strong>
                    </Link>
                </li>
                <li>
                    <Link to="/foods" className="nav-link">
                        <FontAwesomeIcon icon={faBurger} />
                        <strong>Foods</strong>
                    </Link>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
