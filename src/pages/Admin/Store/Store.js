import classNames from 'classnames/bind';
import styles from './Store.module.scss';
import { dateNow, formatPrice } from '~/utils/filters';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faFilter } from '@fortawesome/free-solid-svg-icons';
import * as adminServices from '~/apiServices/adminServices';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import vi from 'date-fns/locale/vi';
registerLocale('vi', vi);

const cx = classNames.bind(styles);
function Store() {
    const dateNow = new Date();
    const [startDate, setStartDate] = useState(dateNow);

    const [endDate, setEndDate] = useState(dateNow);
    const [stores, setStores] = useState([]);

    const fetchStores = async () => {
        const response = await adminServices.getStores();
        if (response) {
            setStores(response);
        }
    };
    useEffect(() => {
        fetchStores();
    }, []);

    return (
        <>
            <div className={cx('home')}>
                <h2 className="page-title">Kho</h2>
            </div>
            <div className={cx('admin-body')}>
                <table>
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th className="text-center">Tổng SL</th>
                            <th className="text-center">Đã Bán</th>
                            <th className="text-center">Tồn Kho</th>
                            <th className="text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {stores?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.product_name}</td>
                                    <td className="text-center">
                                        <span className={cx('quantity')}>{item.total_quantity}</span>
                                    </td>
                                    <td className="text-center">
                                        <span className={cx('quantity')}>{item.total_used}</span>
                                    </td>
                                    <td className="text-center">
                                        <span className={cx('quantity')}>{item.total_available}</span>
                                    </td>
                                    <td className="text-center">
                                        <button>
                                            <FontAwesomeIcon icon={faAdd} />
                                        </button>
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

export default Store;
