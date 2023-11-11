import classNames from 'classnames/bind';
import styles from '../Bbq.module.scss';
const cx = classNames.bind(styles);
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarDay,
    faChildren,
    faClock,
    faComment,
    faMoneyBillTransfer,
    faPeopleGroup,
    faSignature,
} from '@fortawesome/free-solid-svg-icons';
import * as bbqServices from '~/apiServices/bbqServices';
import * as tableServices from '~/apiServices/tableServices';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import vi from 'date-fns/locale/vi';
import moment from 'moment';
import { BbqContext } from '~/context/BbqContext';
registerLocale('vi', vi);
function BbqAdd({ onAddNew }) {
    const { step, setStep, info, setInfo } = useContext(BbqContext);
    const [table, setTable] = useState(1);

    const [adt, setAdt] = useState(1);
    const [chd, setChd] = useState(0);
    const [name, setName] = useState('');
    const [deposit, setDeposit] = useState(0);
    const [note, setNote] = useState('');
    const dateNow = new Date();
    const [date, setDate] = useState(dateNow);
    const [selectedHour, setSelectedHour] = useState('00');
    const [selectedMinute, setSelectedMinute] = useState('00');
    const [disable, setDisable] = useState(true);

    const [tableList, setTableList] = useState([]);

    useEffect(() => {
        const fetchTables = async () => {
            const response = await tableServices.getTables();
            if (response.length > 0) {
                setTableList(response);
            }
        };
        fetchTables();
    }, []);

    const handleTableChange = (e) => {
        setTable(e.target.value);
    };

    const handleAdtChange = (e) => {
        setAdt(e.target.value);
    };

    const handleChdChange = (e) => {
        setChd(e.target.value);
    };

    const handleNameChange = (name) => {
        setName(name);
        if (name.length > 0) {
            setDisable(false);
        }
    };

    const handleDepositChange = (number) => {
        setDeposit(number);
    };

    const handleNoteChange = (text) => {
        setNote(text);
    };

    const handleDateChange = (date) => {
        setDate(date);
    };

    const hours = [];
    const minutes = [];

    // Tạo danh sách các giờ từ 00 đến 23
    for (let i = 0; i < 24; i++) {
        const hour = i.toString().padStart(2, '0');
        hours.push(hour);
    }

    // Tạo danh sách các phút từ 00 đến 59 với khoảng cách 30 phút
    for (let i = 0; i < 60; i += 30) {
        const minute = i.toString().padStart(2, '0');
        minutes.push(minute);
    }

    const handleHourChange = (e) => {
        setSelectedHour(e.target.value);
    };

    const handleMinuteChange = (e) => {
        setSelectedMinute(e.target.value);
    };

    // const handleAddBbq = () => {
    //     const Add = async () => {
    //         const res = await bbqServices.addBbq({
    //             name: name,
    //             adt: adt,
    //             chd: chd,
    //             deposit: deposit,
    //             note: note,
    //             date: moment(date).format('YYYY-MM-DD'),
    //             time: `${selectedHour}:${selectedMinute}`,
    //         });
    //         if (res.status) {
    //             const data = res.data;
    //             onAddNew(data);
    //         } else {
    //             alert(res.message);
    //         }
    //     };
    //     Add();
    // };
    const handleAddBbq = () => {
        setInfo({
            table: table,
            name: name,
            adt: adt,
            chd: chd,
            deposit: deposit,
            note: note,
            date: moment(date).format('YYYY-MM-DD'),
            time: `${selectedHour}:${selectedMinute}`,
        });
        setStep(2);
    };
    return (
        <div className={cx('form')}>
            <div className="form-row">
                <label className="col">
                    <div className={cx('input-field')}>
                        <span className={cx('input-icon')}>
                            <FontAwesomeIcon icon={faSignature} />
                        </span>
                        <span className={cx('input-label')}>Chọn bàn:</span>
                        <span className={cx('input-value')}>
                            <select value={table} onChange={handleTableChange}>
                                {tableList.map((t) => (
                                    <option key={t.table_id} value={t.table_id}>
                                        {t.table_name}
                                    </option>
                                ))}
                            </select>
                        </span>
                    </div>
                </label>
            </div>
            <div className="form-row">
                <label className="col">
                    <div className={cx('input-field')}>
                        <span className={cx('input-icon')}>
                            <FontAwesomeIcon icon={faSignature} />
                        </span>
                        <span className={cx('input-label')}>Họ và Tên:</span>
                        <span className={cx('input-value')}>
                            <input type="text" value={name} onChange={(e) => handleNameChange(e.target.value)} />
                        </span>
                    </div>
                </label>
            </div>
            <div className="form-row">
                <label className="col">
                    <div className={cx('input-field')}>
                        <span className={cx('input-icon')}>
                            <FontAwesomeIcon icon={faPeopleGroup} />
                        </span>
                        <span className={cx('input-label')}>Người lớn:</span>
                        <span className={cx('input-value')}>
                            <div className={cx('input-row')}>
                                <input type="text" value={adt} onChange={(e) => handleAdtChange(e.target.value)} />
                            </div>
                        </span>
                    </div>
                </label>
                <label className="col">
                    <div className={cx('input-field')}>
                        <span className={cx('input-icon')}>
                            <FontAwesomeIcon icon={faChildren} />
                        </span>
                        <span className={cx('input-label')}>Trẻ em:</span>
                        <span className={cx('input-value')}>
                            <div className={cx('input-row')}>
                                <input type="text" value={chd} onChange={(e) => handleChdChange(e.target.value)} />
                            </div>
                        </span>
                    </div>
                </label>
            </div>
            <div className="form-row">
                <label className="col">
                    <div className={cx('input-field')}>
                        <span className={cx('input-icon')}>
                            <FontAwesomeIcon icon={faMoneyBillTransfer} />
                        </span>
                        <span className={cx('input-label')}>Đã Cọc:</span>
                        <span className={cx('input-value')}>
                            <input
                                type="number"
                                value={deposit}
                                onChange={(e) => handleDepositChange(e.target.value)}
                            />
                        </span>
                    </div>
                </label>
            </div>
            <div className="form-row">
                <label>
                    <div className={cx('input-field')}>
                        <span className={cx('input-icon')}>
                            <FontAwesomeIcon icon={faCalendarDay} />
                        </span>
                        <span className={cx('input-label')}>Ngày:</span>
                        <span className={cx('input-value')}>
                            <DatePicker
                                dateFormat="dd-MM-yyyy"
                                selected={date}
                                onChange={handleDateChange}
                                selectsStart
                                startDate={date}
                                placeholderText="Ngày đặt"
                                locale="vi"
                            />
                        </span>
                    </div>
                </label>
                <label>
                    <div className={cx('input-field')}>
                        <span className={cx('input-icon')}>
                            <FontAwesomeIcon icon={faClock} />
                        </span>
                        <span className={cx('input-label')}>Thời Gian:</span>
                        <span className={cx('input-value')}>
                            <div className={cx('input-row')}>
                                <select value={selectedHour} onChange={handleHourChange}>
                                    {hours.map((hour) => (
                                        <option key={hour} value={hour}>
                                            {hour}
                                        </option>
                                    ))}
                                </select>
                                <span> :</span>
                                <select value={selectedMinute} onChange={handleMinuteChange}>
                                    {minutes.map((minute) => (
                                        <option key={minute} value={minute}>
                                            {minute}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </span>
                    </div>
                </label>
            </div>
            <div className="form-row">
                <label className="col">
                    <div className={cx('input-field')}>
                        <span className={cx('input-icon')}>
                            <FontAwesomeIcon icon={faComment} />
                        </span>
                        <span className={cx('input-label')}>Ghi chú:</span>
                        <span className={cx('input-value')}>
                            <textarea defaultValue={note} onChange={(e) => handleNoteChange(e.target.value)} />
                        </span>
                    </div>
                </label>
            </div>
            <div className="form-row">
                <div className="col">
                    <button className="btn-primary" onClick={handleAddBbq} disabled={disable}>
                        Tiếp Tục
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BbqAdd;
