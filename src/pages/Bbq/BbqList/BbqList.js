import classNames from 'classnames/bind';
import styles from '../Bbq.module.scss';
import { formatPrice } from '~/utils/filters';
import { faCancel, faComment, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(styles);
function BbqList({ dataList, onCancel }) {
    return (
        <>
            <div className={cx('bbqs')}>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Thông tin</th>
                            <th className="text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataList?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="text-center">#{item.bbq_id}</td>
                                    <td>
                                        <div>
                                            <div className={cx('data-group')}>
                                                <div>
                                                    <strong style={{ color: 'var(--bg-primary)' }}>{item.name}</strong>
                                                    <p>
                                                        <span className="label">
                                                            <FontAwesomeIcon icon={faMoneyBillTransfer} />
                                                        </span>
                                                        <span style={{ color: '#ff5722' }}>
                                                            {formatPrice(item.deposit)}đ
                                                        </span>
                                                    </p>
                                                </div>
                                                <span className={cx('datetime')}>
                                                    <span>{moment(item.date).format('DD-MM-YYYY')}</span>
                                                    <i style={{ color: '#ff5722' }}>{item.time}</i>
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <span className="label">
                                                <FontAwesomeIcon icon={faComment} />
                                            </span>
                                            <span>{item.note}</span>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <button onClick={() => onCancel(item.bbq_id)}>
                                            <FontAwesomeIcon icon={faCancel} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default BbqList;
