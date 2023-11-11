import classNames from 'classnames/bind';
import styles from '../Bbq.module.scss';
const cx = classNames.bind(styles);
import * as bbqServices from '~/apiServices/bbqServices';
import { useContext, useEffect, useState } from 'react';
import { WATERS } from '~/utils/constants';
import BbqOrders from '../BbqOrders';
import { BbqContext } from '~/context/BbqContext';

function BbqProducts() {
    const [dataList, setDataList] = useState([]);
    const { orders, setOrders } = useContext(BbqContext);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await bbqServices.getBbqProducts();
            if (result) setDataList(result);
        };
        fetchApi();
    }, []);

    const headTitle = (type) => {
        return WATERS.find((obj) => {
            return obj.key === type;
        })?.label;
    };

    const handleAddOrder = (product) => {
        const existOrder = orders.some((obj) => obj.product_id === product.product_id);
        if (existOrder) {
            setOrders((prevOrders) => {
                const newOrders = prevOrders.map((obj) => {
                    if (obj.product_id === product.product_id) {
                        const newQuantity = obj.quantity + 1;
                        return { ...obj, quantity: newQuantity };
                    }
                    return obj;
                });
                return newOrders;
            });
        } else {
            const newOrderItem = {
                ...product,
                id: orders.length + 1,
                quantity: 1,
            };
            setOrders([...orders, newOrderItem]);
        }
    };

    return (
        <>
            <div className={cx('bbqs')}>
                <div className={cx('product-section')}>
                    <BbqOrders dataList={dataList} setDataList={setDataList} />
                    {/* {Object.keys(dataList)?.map((keyName) => {
                        const products = dataList[keyName];
                        return (
                            <div key={keyName} k={keyName} className={cx('product-row')}>
                                <h4>{headTitle(keyName)}</h4>
                                {products.map((item) => {
                                    return (
                                        <div
                                            k={item.product_id}
                                            key={item.product_id}
                                            className={cx('product-item')}
                                            onClick={() => handleAddOrder(item)}
                                        >
                                            <div className={cx('thumbnail')}>
                                                <img src={`/assets/images/${item.thumbnail}`} alt={'thumnail'} />
                                                <span className={cx('name')}>{item.product_name}</span>
                                                <span className={cx('price')}>{item.display_price}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })} */}
                </div>
            </div>
        </>
    );
}

export default BbqProducts;
