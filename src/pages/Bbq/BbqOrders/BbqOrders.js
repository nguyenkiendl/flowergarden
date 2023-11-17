import classNames from 'classnames/bind';
import styles from '../Bbq.module.scss';
const cx = classNames.bind(styles);
import { formatPrice } from '~/utils/filters';
import { Fragment, useContext, useEffect } from 'react';
import { BbqContext } from '~/context/BbqContext';
import BbqOrderItem from './BbqOrderItem';
import { WATERS } from '~/utils/constants';
import BbqNav from '../BbqNav';
import * as bbqServices from '~/apiServices/bbqServices';

function BbqOrders() {
    const { setStep, bbq, setBbqOrders } = useContext(BbqContext);
    const { orders } = bbq;
    useEffect(() => {
        const fetchApi = async () => {
            const result = await bbqServices.getBbqProducts();
            if (result) {
                setBbqOrders(result.orders);
            }
        };
        if (Object.keys(orders).length === 0) fetchApi();
    }, []);
    const handleUpdate = (productId, quantity) => {
        const newDataList = {};
        Object.keys(orders).map((keyName) => {
            const products = orders[keyName];
            const newProducts = products.map((obj) => {
                if (obj.product_id === productId) {
                    return { ...obj, quantity: quantity };
                }
                return obj;
            });
            newDataList[keyName] = newProducts;
        });
        setBbqOrders(newDataList);
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

    const handleContinues = () => {
        setBbqOrders(orders);
        setStep(3);
    };

    return (
        <div className={cx('bbqs')}>
            <div className={cx('product-section')}>
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
                                {Object.keys(orders)?.map((keyName) => {
                                    const products = orders[keyName];
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
                        <br></br>
                        <br></br>
                    </div>
                    <BbqNav onNext={handleContinues} isDisable={totalOrder() === 0} />
                </div>
            </div>
        </div>
    );
}

export default BbqOrders;
