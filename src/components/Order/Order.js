import classNames from 'classnames/bind';
import styles from '~/components/Order/Order.module.scss';
const cx = classNames.bind(styles);
import OrderItem from './OrderItem';

function Order({ datas }) {
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

    console.log(datas);

    return (
        <>
            <div className={cx('orders')}>
                <div className={cx('order-row')}>
                    {datas.map((order, index) => {
                        return <OrderItem key={index} order={order} onUpdate={handleUpdate} />;
                    })}
                </div>
            </div>
        </>
    );
}

export default Order;
