import classNames from 'classnames/bind';
import styles from '../Print.module.scss';
import { timeIn, timePrint } from '~/utils/filters';
const cx = classNames.bind(styles);
function PrintHead({ tableKey, orderId, time, title }) {
    return (
        <>
            <div className={cx('print-header')}>
                <h1>
                    VIET UC <br></br>FLOWER GARDEN
                </h1>
                <p>08 Huỳnh Thúc Kháng, Măng Đen, Kon Plông, Kon Tum.</p>
                <div className={cx('print-info')}>
                    <span className={cx('table-number')}>{tableKey}</span>
                    <span className={cx('table-title')}>
                        <h3>{title}</h3>
                        <span>{orderId}</span>
                    </span>
                </div>
                <div className={cx('print-row')}>
                    <span> Giờ vào: {timeIn(time)}</span> <span>Giờ in: {timePrint()}</span>
                </div>
            </div>
        </>
    );
}

export default PrintHead;
