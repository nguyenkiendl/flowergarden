import classNames from 'classnames/bind';
import styles from '~/pages/Print/Print.module.scss';
const cx = classNames.bind(styles);
import { useEffect, useState } from 'react';
import * as bbqServices from '~/apiServices/bbqServices';
import { useParams } from 'react-router-dom';
import { timePrint } from '~/utils/filters';
import moment from 'moment';
function BbqPrintProcessing() {
    const { bbqId } = useParams();
    const [print, setPrint] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await bbqServices.getBbqPrintProcessing({
                params: {
                    bbq_id: bbqId,
                },
            });
            if (result) {
                setPrint(result);
            }
        };
        if (Object.keys(print).length === 0) fetchApi();
    }, []);

    const handleMessage = (event) => {
        if (event.data.action === 'bbq-print-processing') {
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
            <div className={cx('print-header')}>
                <h1>
                    VIET UC <br></br>FLOWER GARDEN
                </h1>
                <p>08 Huỳnh Thúc Kháng, Măng Đen, Kon Plông, Kon Tum.</p>
                <div className={cx('print-info')}>
                    <span className={cx('table-number')}>{print.table_key}</span>
                    <span className={cx('table-title')}>
                        <h3>Phiếu Chế Biến BBQ</h3>
                        <span>{bbqId}</span>
                    </span>
                </div>
                <div className={cx('print-row')}>
                    <span> Họ và Tên: {print.name} </span>
                    <span> SĐT: {print.phone} </span>
                </div>

                <div className={cx('print-row')}>
                    <span>
                        Thời gian: {moment(print.date).format('DD-MM-YYYY')} {print.time}
                    </span>
                    <span>Giờ in: {timePrint()}</span>
                </div>
            </div>
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
                                        <span className="quantity">{item.quantity}</span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className={cx('print-row')}>
                    <span> Ghi chú: {print.note} </span>
                </div>
            </div>
        </>
    );
}

export default BbqPrintProcessing;
