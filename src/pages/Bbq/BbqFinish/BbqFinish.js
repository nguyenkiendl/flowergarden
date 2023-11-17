import classNames from 'classnames/bind';
import styles from '../Bbq.module.scss';
import { Fragment, useEffect, useState } from 'react';
import BbqInfo from '../BbqInfo';
import { useNavigate, useParams } from 'react-router-dom';
const cx = classNames.bind(styles);
import * as bbqServices from '~/apiServices/bbqServices';
import { formatPrice } from '~/utils/filters';
import { BBQ_PAYMENT_PERCENT, WATERS } from '~/utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faHome, faTableList } from '@fortawesome/free-solid-svg-icons';

function BbqFinish() {
    const navigate = useNavigate();
    const { bbqId } = useParams();
    const [info, setInfo] = useState({});
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await bbqServices.getBbq({
                params: {
                    bbq_id: bbqId,
                },
            });
            if (result) {
                setInfo(result.info);
                setOrders(result.datas[1]);
            }
        };
        if (Object.keys(info).length === 0) fetchApi();
    }, []);

    const headTitle = (type) => {
        return WATERS.find((obj) => {
            return obj.key === type;
        })?.label;
    };

    const totalOrder = () => {
        let total = 0;
        for (let keyName in orders) {
            const products = orders[keyName];
            for (let i in products) {
                const item = products[i];
                total += item.product_price * item.quantity;
            }
        }

        return total;
    };
    const total = totalOrder();
    const deposit = total * BBQ_PAYMENT_PERCENT;
    const remaining = total - deposit;
    return (
        <>
            <div className={cx('bbqs')}>
                <h3 className={cx('page-title')}>Đặt bàn BBQ</h3>
                <div className={cx('title-success')}>Thành công</div>
                <div className={cx('bbq-content')}>
                    <h3>
                        <FontAwesomeIcon icon={faFileLines} />
                        Thông tin đặt Bàn
                    </h3>
                    <BbqInfo info={info} />
                    <p>
                        <span className={cx('bbq-label')}>Ghi chú:</span> <strong>{info.note}</strong>
                    </p>
                    <h3>
                        <FontAwesomeIcon icon={faTableList} />
                        Danh sách BBQ
                    </h3>
                    <div id="order-list" className={cx('order-list')}>
                        <table>
                            <thead>
                                <tr>
                                    <th>TÊN</th>
                                    <th className="text-center">SL</th>
                                    <th className="text-right">GIÁ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(orders)?.map((keyName) => {
                                    const products = orders[keyName];
                                    return (
                                        <Fragment key={keyName}>
                                            <tr
                                                className={cx('trhead')}
                                                hidden={products.filter((p) => p.quantity !== 0).length === 0}
                                            >
                                                <td colSpan={3}>{headTitle(keyName)}</td>
                                            </tr>
                                            {products?.map((item, index) => {
                                                return (
                                                    <tr key={index} className={cx('tr')} hidden={item.quantity === 0}>
                                                        <td width={150}>{item.product_name}</td>
                                                        <td width={50} className="text-center">
                                                            <span
                                                                className={cx('quantity', { show: item.quantity >= 0 })}
                                                            >
                                                                {item.quantity}
                                                            </span>
                                                        </td>
                                                        <td width={150} className="text-right">
                                                            <span className={cx('price')}>{item.display_price}</span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </Fragment>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={2}>
                                        <strong>Tổng: </strong>
                                    </td>
                                    <td width={150} className="text-right">
                                        <span className={cx('total')}>{formatPrice(total)}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <strong>Cọc: </strong>
                                    </td>
                                    <td width={150} className="text-right">
                                        <span className={cx('total')}>{formatPrice(deposit)}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <strong>Còn lại: </strong>
                                    </td>
                                    <td width={150} className="text-right">
                                        <span className={cx('total')}>{formatPrice(remaining)}</span>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        <br></br>
                        <br></br>
                    </div>
                    <div className={cx('btn-gohome')}>
                        <button onClick={() => navigate('/')}>
                            <FontAwesomeIcon icon={faHome} />
                            <span> Trang Chủ</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BbqFinish;
