import classNames from 'classnames/bind';
import styles from '../Bbq.module.scss';
const cx = classNames.bind(styles);
import { formatPrice } from '~/utils/filters';
import { Fragment, useContext, useState } from 'react';
import { BbqContext } from '~/context/BbqContext';
import { BBQ_PAYMENT_PERCENT, WATERS } from '~/utils/constants';
import moment from 'moment';
import BbqNav from '../BbqNav';
import * as bbqServices from '~/apiServices/bbqServices';
import BbqInfo from '../BbqInfo';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faTableList } from '@fortawesome/free-solid-svg-icons';

function BbqConfirm() {
    const navigate = useNavigate();
    const [note, setNote] = useState('');
    const { bbq } = useContext(BbqContext);
    const { info, orders } = bbq;

    const handleNoteChange = (text) => {
        setNote(text);
    };

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

    const handleContinues = () => {
        const input = {};
        input.info = {
            name: info.name,
            phone: info.phone,
            adt: info.adt,
            chd: info.chd,
            deposit: deposit,
            note: note,
            date: moment(info.date).format('YYYY-MM-DD'),
            hour: `${info.hour}`,
            minute: `${info.minute}`,
        };
        const datas = [];
        for (let keyName in orders) {
            const products = orders[keyName];
            for (let i in products) {
                const item = products[i];
                if (item.quantity !== 0) datas.push(item);
            }
        }
        input.orders = datas;
        const apiAddBbq = async () => {
            const res = await bbqServices.addBbq(input);
            if (res.status) {
                navigate(`/bbq/${res.data}`);
            } else {
                alert(res.message);
            }
        };
        apiAddBbq();
    };

    return (
        <div className="bbq-confirm">
            <h3>
                <FontAwesomeIcon icon={faFileLines} />
                Thông tin đặt Bàn
            </h3>
            <BbqInfo info={info} />
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
                                                    <span className={cx('quantity', { show: item.quantity >= 0 })}>
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
            </div>
            <div className="note">
                <label className="col">
                    <span className={cx('input-label')}>Ghi chú:</span>
                    <textarea
                        rows={3}
                        cols={4}
                        defaultValue={note}
                        onChange={(e) => handleNoteChange(e.target.value)}
                    />
                </label>
            </div>
            <br></br>
            <br></br>
            <BbqNav onNext={handleContinues} isDisable={info.name.length === 0} />
        </div>
    );
}

export default BbqConfirm;
