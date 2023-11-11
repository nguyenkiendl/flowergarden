import classNames from 'classnames/bind';
import styles from '../Bbq.module.scss';
const cx = classNames.bind(styles);
import { formatPrice } from '~/utils/filters';
import { Fragment, useContext } from 'react';
import { BbqContext } from '~/context/BbqContext';
import BbqOrderItem from './BbqOrderItem';
import { WATERS } from '~/utils/constants';
import BbqNav from '../BbqNav';

function BbqOrders({ dataList, setDataList }) {
    const { setStep, setOrders } = useContext(BbqContext);

    const handleUpdate = (productId, quantity) => {
        const newDataList = {};
        Object.keys(dataList).map((keyName) => {
            const products = dataList[keyName];
            const newProducts = products.map((obj) => {
                if (obj.product_id === productId) {
                    return { ...obj, quantity: quantity };
                }
                return obj;
            });
            newDataList[keyName] = newProducts;
        });
        setDataList(newDataList);
    };

    const headTitle = (type) => {
        return WATERS.find((obj) => {
            return obj.key === type;
        })?.label;
    };

    const totalOrder = () => {
        let total = 0;
        for (let keyName in dataList) {
            const products = dataList[keyName];
            for (let i in products) {
                const item = products[i];
                total += item.product_price * item.quantity;
            }
        }

        return total;
    };

    const handleContinues = () => {
        const orders = [];
        Object.keys(dataList).map((keyName) => {
            const products = dataList[keyName];
            const newProducts = products.filter((obj) => {
                return obj.quantity !== 0;
            });
            if (newProducts.length) orders.push(newProducts);
        });
        setOrders(orders);
        setStep(3);
    };

    return (
        <div className="orders">
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
                        {Object.keys(dataList)?.map((keyName) => {
                            const products = dataList[keyName];
                            return (
                                <Fragment key={keyName}>
                                    <tr className={cx('trhead')}>
                                        <td colSpan={3}>{headTitle(keyName)}</td>
                                    </tr>
                                    {products?.map((item, index) => {
                                        return <BbqOrderItem key={index} item={item} onChange={handleUpdate} />;
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
            <BbqNav onNext={handleContinues} countOrders={totalOrder()} />
        </div>
    );
}

export default BbqOrders;
