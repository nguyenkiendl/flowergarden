import { useContext, useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import { AppContext } from '~/context/AppContext';
import * as orderServices from '~/apiServices/orderServices';
import classNames from 'classnames/bind';
import styles from '~/components/Customer/OrderList/OrderList.module.scss';
import { mergeOrders } from '~/utils/filters';
import { useNavigate, useParams } from 'react-router-dom';
const cx = classNames.bind(styles);

function OrderList() {
    const navigate = useNavigate();
    const { customerId } = useParams();
    const [customer, setCustomer] = useState({ orders: [] });
    useEffect(() => {
        const fetchCustomer = async () => {
            const response = await orderServices.getOrdersBy({
                params: {
                    customer_id: Number(customerId),
                },
            });
            if (response) {
                console.log(response);
                setCustomer(response);
            }
        };
        fetchCustomer();
    }, []);

    // useEffect(() => {
    //     const ping = async () => {
    //         const result = await orderServices.ping();
    //         if (result && result.length > 0) {
    //             const newOrderList = mergeOrders(result, orderList);
    //             setOrderList(newOrderList);
    //         }
    //     };
    //     const interval = setInterval(() => {
    //         ping();
    //     }, 1000 * 5);
    //     return () => clearInterval(interval);
    // }, [orderList]);

    // const handleUpdate = (orderId) => {
    //     setOrderList((prevOrderList) => {
    //         const newOrderList = prevOrderList.map((obj) => {
    //             if (obj.order_id === orderId) {
    //                 obj.status = 'done';
    //             }
    //             return obj;
    //         });
    //         return newOrderList;
    //     });
    // };

    const handleAddNewOrder = () => {
        const apiAdd = async () => {
            const response = await orderServices.addNewOrder({
                customer_id: Number(customerId),
            });
            if (response) navigate(`/customer/${customerId}`);
        };
        apiAdd();
    };
    return (
        <>
            <div className={cx('orders')}>
                <div className={cx('customer-row')}>
                    <p>
                        KHÁCH HÀNG: <strong>{customer.customer_id}</strong>
                    </p>
                    <p>
                        LOẠI KHÁCH: <strong>{customer.ticket_name}</strong>
                    </p>
                    <p>
                        SỐ LƯỢNG: <strong>{customer.customer_number}</strong>
                    </p>
                    <button className={cx('btn-add')} onClick={handleAddNewOrder}>
                        THÊM ORDER MỚI
                    </button>
                </div>
                <div className={cx('order-row')}>
                    {customer.orders.map((order, index) => {
                        return <OrderItem key={index} order={order} />;
                    })}
                </div>
            </div>
        </>
    );
}

export default OrderList;
