import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import { dateNow, formatPrice } from '~/utils/filters';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import * as adminServices from '~/apiServices/adminServices';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import vi from 'date-fns/locale/vi';
registerLocale('vi', vi);

const cx = classNames.bind(styles);
function Admin() {
    const dateNow = new Date();
    const [startDate, setStartDate] = useState(dateNow);

    const [endDate, setEndDate] = useState(dateNow);
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const response = await adminServices.getOrders({
            params: {
                start: startDate,
                end: endDate,
            },
        });
        if (response) {
            setOrders(response);
        }
    };
    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleFilter = () => {
        const filterOrders = async () => {
            const response = await adminServices.getOrders({
                params: {
                    start: moment(startDate).format('YYYY-MM-DD'),
                    end: moment(endDate).format('YYYY-MM-DD'),
                },
            });
            if (response) {
                setOrders(response);
            }
        };
        filterOrders();
    };

    let totalPrice = orders?.reduce((total, item) => total + item.quantity * item.product_price, 0);
    let totalQuantity = orders?.reduce((quantity, item) => quantity + item.quantity, 0);
    return (
        <>
            <div className={cx('home')}>
                <h2 className="page-title">
                    Thống kê
                    <span>
                        {moment(startDate).format('DD/MM/YY')} - {moment(endDate).format('DD/MM/YY')}
                    </span>
                </h2>
            </div>
            <div className={cx('admin-head')}>
                <div className={cx('filter-row')}>
                    <label>
                        <div className={cx('input-field')}>
                            <span className={cx('filter-label')}>Từ ngày</span>
                            <div className={cx('input-value')}>
                                <DatePicker
                                    dateFormat="dd-MM-yyyy"
                                    selected={startDate}
                                    onChange={handleStartDateChange}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    placeholderText="Ngày bắt đầu"
                                    locale="vi"
                                />
                            </div>
                        </div>
                    </label>
                    <label>
                        <div className={cx('input-field')}>
                            <span className={cx('filter-label')}>Tới ngày</span>
                            <div className={cx('input-value')}>
                                <DatePicker
                                    dateFormat="dd-MM-yyyy"
                                    selected={endDate}
                                    onChange={handleEndDateChange}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    placeholderText="Ngày kết thúc"
                                    locale="vi"
                                />
                            </div>
                        </div>
                    </label>
                    <button className={cx('btn-filter')} onClick={handleFilter}>
                        <FontAwesomeIcon icon={faFilter} />
                        <span> Lọc</span>
                    </button>
                </div>
            </div>
            <div className={cx('admin-body')}>
                <table>
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Đ.Giá</th>
                            <th width={20} className="text-center">
                                SL
                            </th>
                            <th className="text-right">T.Tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.product_name}</td>
                                    <td>
                                        <div className={cx('group-row')}>
                                            <span className={cx('price')}>{formatPrice(item.product_price)}</span>
                                            <span className={cx('mark')}>&nbsp; x</span>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <span className={cx('quantity')}>{item.quantity}</span>
                                    </td>
                                    <td className="text-right">
                                        <strong className={cx('price')}>
                                            {formatPrice(item.quantity * item.product_price)}
                                        </strong>
                                    </td>
                                </tr>
                            );
                        })}
                        <tr>
                            <td colSpan={2}>
                                <b>Tổng Cộng:</b>
                            </td>
                            <td className="text-center">
                                <strong className={cx('total')}>{totalQuantity}</strong>
                            </td>
                            <td className="text-right">
                                <strong className={cx('total')}>{formatPrice(totalPrice)}</strong>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Admin;
