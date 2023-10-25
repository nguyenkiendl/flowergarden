import classNames from 'classnames/bind';
import styles from './OrderList.module.scss';
import { useContext, useEffect, useState } from 'react';
import * as orderServices from '~/apiServices/orderServices';
import OrderListItem from './OrderListItem';
import { useParams } from 'react-router-dom';
import { AppContext } from '~/context/AppContext';

const cx = classNames.bind(styles);
function OrderList({ sendDatas }) {
    const { customerId } = useParams();
    const [orderList, setOrderList] = useState([]);
    const { orderSide } = useContext(AppContext);
    useEffect(() => {
        const fetchApi = async () => {
            const response = await orderServices.getOrdersBy({
                params: {
                    customer_id: customerId,
                },
            });
            setOrderList(response);
        };
        if (orderSide === true) fetchApi();
    }, [orderSide]);

    const handleChange = (order) => {
        const datas = orderList.map((obj) => {
            if (obj.order_id === order.order_id) {
                obj.quantity = order.quantity;
            }
            return {
                order_id: obj.order_id,
                quantity: obj.quantity,
            };
        });
        sendDatas(datas);
    };
    return (
        <>
            <div className={cx('order-lists')}>
                <div className={cx('order-row')}>
                    {orderList.map((item, index) => {
                        return <OrderListItem key={index} item={item} onChange={handleChange} />;
                    })}
                </div>
            </div>
        </>
    );
}

export default OrderList;
