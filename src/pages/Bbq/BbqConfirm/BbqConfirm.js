import classNames from 'classnames/bind';
import styles from '../Bbq.module.scss';
const cx = classNames.bind(styles);
import { formatPrice } from '~/utils/filters';
import { Fragment, useContext } from 'react';
import { BbqContext } from '~/context/BbqContext';
import { WATERS } from '~/utils/constants';

function BbqConfirm() {
    const { step, info, orders } = useContext(BbqContext);

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

    const handleContinues = () => {
        setStep(3);
    };
    console.log(info, orders);
    return (
        <div className="bbq-confirm">
            <p>Bàn : {info.table}</p>
            <p>Họ và Tên: {info.name}</p>
            <p>Người lớn: {info.adt}</p>
            <p>Trẻ em: {info.chd}</p>
            <p>Đã cọc: {info.deposit}</p>
            <p>
                Ngày: {info.date} Giờ : {info.time}
            </p>
            <p> Ghi chú: {info.note}</p>
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
                                    <tr className={cx('trhead')}>
                                        <td colSpan={3}>{headTitle(keyName)}</td>
                                    </tr>
                                    {products?.map((item, index) => {
                                        return (
                                            <tr key={index} className={cx('tr')} data-id={item.id}>
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
                            <td colSpan={2}></td>
                            <td className="text-right">Tổng: {formatPrice(totalOrder())}đ</td>
                        </tr>
                    </tfoot>
                </table>
                <div className="form-row">
                    <div className="col">
                        <button className="btn-primary" onClick={handleContinues} disabled={totalOrder() === 0}>
                            Tiếp Tục
                        </button>
                    </div>
                </div>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}

export default BbqConfirm;
