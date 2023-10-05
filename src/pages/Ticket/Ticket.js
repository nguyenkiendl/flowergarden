import classNames from 'classnames';
import styles from './Ticket.module.scss';

const cx = classNames.bind(styles);
function Ticket() {
    return (
        <>
            <div className={cx('ticket')}></div>
        </>
    );
}

export default Ticket;
