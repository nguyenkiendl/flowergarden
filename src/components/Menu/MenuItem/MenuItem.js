import classNames from 'classnames/bind';
import styles from '../Menu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(styles);
function MenuItem({ icon, label, onClick, classes }) {
    return (
        <>
            <button className={cx(classes)} onClick={onClick}>
                <FontAwesomeIcon icon={icon} /> {label}
            </button>
        </>
    );
}

export default MenuItem;
