import { customerType } from '~/utils/filters';
import classNames from 'classnames/bind';
import styles from './Customer.module.scss';
const cx = classNames.bind(styles);
function Customer({ datas }) {
    return (
        <>
            {datas.map((item, index) => {
                let type = customerType(item.type);
                console.log(type);
                return (
                    <div key={index} className={cx('customer-item')}>
                        <div className={cx('number')}>{item.number}</div>
                        <div className={'customer-group'}>
                            <div className={cx('code')}>{item.code}</div>
                            <div className={cx('type')}>{type.label}</div>
                        </div>
                        <div className={cx('date')}>{item.date}</div>
                        <button className={cx('btn-detail')}>Xem</button>
                    </div>
                );
            })}
        </>
    );
}

export default Customer;
