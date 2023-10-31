import classNames from 'classnames/bind';
import styles from '../Print.module.scss';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);
import * as orderServices from '~/apiServices/orderServices';
import { useParams } from 'react-router-dom';
import PrintHead from '../PrintHead';
function PrintProcessing() {
    const { orderId } = useParams();
    const [print, setPrint] = useState({ orders: [] });
    useEffect(() => {
        const fetchApi = async () => {
            const response = await orderServices.printOrder({
                params: {
                    order_id: Number(orderId),
                },
            });
            setPrint(response);
        };
        fetchApi();
    }, []);

    const handleMessage = (event) => {
        if (event.data.action === 'print-processing') {
            window.focus();
            window.print();
        }
    };

    useEffect(() => {
        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);
    return (
        <>
            <PrintHead
                tableKey={print.table_key}
                orderId={print.order_id}
                time={print.created_at}
                title={'PHIẾU CHẾ BIẾN'}
            />
            <div className={cx('print-body')}>
                <table>
                    <thead>
                        <tr>
                            <th width={20} className="text-center">
                                STT
                            </th>
                            <th>Tên</th>
                            <th className="text-center">SL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {print.orders?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>{item.product_name}</td>
                                    <td className="text-center">
                                        <span className={cx('quantity')}>{item.quantity}</span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default PrintProcessing;
