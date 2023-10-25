import { useContext, useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import { AppContext } from '~/context/AppContext';
import * as orderServices from '~/apiServices/orderServices';
import classNames from 'classnames/bind';
import styles from '~/components/Order/Order.module.scss';
import { mergeOrders } from '~/utils/filters';
const cx = classNames.bind(styles);

function Order() {
    const [page, setPage] = useState(1);
    const [orderList, setOrderList] = useState([]);
    const [hide, setHide] = useState(false);
    useEffect(() => {
        const fetchOrders = async () => {
            const response = await orderServices.getOrders({
                params: {
                    page: page,
                },
            });
            if (response.length > 0) {
                setOrderList([...orderList, ...response]);
            } else {
                setHide(true);
            }
        };
        fetchOrders();
    }, [page]);

    useEffect(() => {
        const ping = async () => {
            const result = await orderServices.ping();
            if (result && result.length > 0) {
                const newOrderList = mergeOrders(result, orderList);
                setOrderList(newOrderList);
            }
        };
        const interval = setInterval(() => {
            ping();
        }, 1000 * 5);
        return () => clearInterval(interval);
    }, [orderList]);

    const handleLoadMore = () => {
        setPage(page + 1);
    };

    const handleUpdate = (detailId) => {
        setOrderList((prevOrderList) => {
            const newOrderList = prevOrderList.map((obj) => {
                if (obj.detail_id === detailId) {
                    obj.status = 'done';
                }
                return obj;
            });
            return newOrderList;
        });
    };
    return (
        <>
            <div className={cx('order-row')}>
                {orderList.map((order, index) => {
                    return <OrderItem key={index} order={order} onUpdate={handleUpdate} />;
                })}
                {hide === false ? (
                    <button className="load-more" onClick={handleLoadMore}>
                        Loadmore
                    </button>
                ) : (
                    ''
                )}
            </div>
        </>
    );
}

export default Order;
