import classNames from 'classnames/bind';
import styles from './BbqList.module.scss';
import { formatPrice } from '~/utils/filters';
import { faCancel, faComment, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as adminServices from '~/apiServices/adminServices';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BBQ_STATUS } from '~/utils/constants';
const cx = classNames.bind(styles);
function BbqList() {
    const navigate = useNavigate();
    const [dataList, setDataList] = useState([]);
    const fetchBbqs = async () => {
        const response = await adminServices.getBbqs();
        if (response) {
            setDataList([...dataList, ...response]);
        }
    };

    useEffect(() => {
        fetchBbqs();
    }, []);

    const handleGoDetail = (bbqId) => {
        navigate(`/super-admin/bbq/${bbqId}`);
    };
    return (
        <>
            <div className={cx('bbqs')}>
                <h2 className="page-title">Danh sách đặt bàn BBQ</h2>
                <div className={cx('bbq-content')}>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Thông tin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataList?.map((item, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className={cx('tr-border')}
                                        onClick={() => handleGoDetail(item.bbq_id)}
                                    >
                                        <td className="text-center">#{item.bbq_id}</td>
                                        <td>
                                            <div className={cx('info')}>
                                                <div className={cx('data-group')}>
                                                    <div>
                                                        <strong>{item.table_name}</strong>
                                                        <br></br>
                                                        <strong style={{ color: 'var(--bg-primary)' }}>
                                                            {item.name}
                                                        </strong>
                                                        <p hidden={item.status === 0}>
                                                            <span className="label">
                                                                <FontAwesomeIcon icon={faMoneyBillTransfer} />
                                                            </span>
                                                            <span style={{ color: '#ff5722' }}>
                                                                {formatPrice(item.deposit)}đ
                                                            </span>
                                                        </p>
                                                        <p hidden={item.status !== 2}>
                                                            <span className="label">
                                                                <FontAwesomeIcon icon={faMoneyBillTransfer} />
                                                            </span>
                                                            <span style={{ color: '#ff5722' }}>
                                                                {formatPrice(item.total)}đ
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <span className={cx('datetime')}>
                                                        <span>{moment(item.date).format('DD-MM-YYYY')}</span>
                                                        <i style={{ color: '#ff5722' }}>{item.time}</i>
                                                        <strong className={cx('status', `status-${item.status}`)}>
                                                            {BBQ_STATUS[item.status]}
                                                        </strong>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className={cx('note')}>
                                                <span className="label">
                                                    <FontAwesomeIcon icon={faComment} />
                                                </span>
                                                <span>{item.note}</span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default BbqList;
