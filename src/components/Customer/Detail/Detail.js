import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '~/components/Customer/Customer.module.scss';
import { customerType } from '~/utils/filters';
const cx = classNames.bind(styles);
function Detail() {
    let { customerId } = useParams();
    const item = {
        id: customerId,
        code: '00002',
        type: 'flower',
        number: 1,
        date: '03-10-2023',
    };
    let type = customerType(item.type);
    return (
        <>
            <div className={cx('detail')}>
                <div className={cx('customer-item')}>
                    <div className={cx('number')}>{item.number}</div>
                    <div className={'customer-group'}>
                        <div className={cx('code')}>{item.code}</div>
                        <div className={cx('type')}>{type.label}</div>
                    </div>
                    <div className={cx('date')}>{item.date}</div>
                    <button className={cx('btn-detail')}>In vé</button>
                </div>
            </div>
        </>
    );
}

export default Detail;
