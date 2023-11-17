import classNames from 'classnames/bind';
import styles from '../Bbq.module.scss';
const cx = classNames.bind(styles);
import moment from 'moment';

function BbqInfo({ info }) {
    return (
        <div className="bbq-info">
            <p>
                <span className={cx('bbq-label')}>Họ và Tên:</span> <strong>{info.name}</strong>
            </p>
            <p>
                <span className={cx('bbq-label')}>SĐT:</span> <strong>{info.phone}</strong>
            </p>
            <p>
                <span className={cx('bbq-label')}>Người lớn:</span> <strong>{info.adt}</strong>
            </p>
            <p>
                <span className={cx('bbq-label')}>Trẻ em:</span> <strong>{info.chd}</strong>
            </p>
            <p>
                <span className={cx('bbq-label')}>Ngày:</span> <strong>{moment(info.date).format('DD-MM-YYYY')}</strong>
            </p>
            <p>
                <span className={cx('bbq-label')}>Thời gian:</span>{' '}
                <strong>
                    {info.hour}:{info.minute}
                </strong>
            </p>
        </div>
    );
}

export default BbqInfo;
