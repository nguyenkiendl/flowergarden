import classNames from 'classnames';
import styles from './Ticket.module.scss';
import Customer from '~/components/Customer';

const cx = classNames.bind(styles);
function Ticket() {
    return (
        <>
            <div className={cx('ticket')}>
                <h2 className="page-title">Bán Vé</h2>
                <Customer showButton={false} />
            </div>
        </>
    );
}

export default Ticket;
