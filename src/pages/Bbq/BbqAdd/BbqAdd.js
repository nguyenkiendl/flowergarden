import classNames from 'classnames/bind';
import styles from '../Bbq.module.scss';
const cx = classNames.bind(styles);
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarDay,
    faChildren,
    faClock,
    faPeopleGroup,
    faPhone,
    faSignature,
} from '@fortawesome/free-solid-svg-icons';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import vi from 'date-fns/locale/vi';
import { BbqContext } from '~/context/BbqContext';
registerLocale('vi', vi);
function BbqAdd() {
    const { setStep, bbq, setBbqInfo } = useContext(BbqContext);
    const { info } = bbq;
    const [adt, setAdt] = useState(1);
    const [chd, setChd] = useState(0);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const dateNow = new Date();
    const [date, setDate] = useState(dateNow);
    const [selectedHour, setSelectedHour] = useState('00');
    const [selectedMinute, setSelectedMinute] = useState('00');
    useEffect(() => {
        setPhone(info.phone);
        setAdt(info.adt);
        setChd(info.chd);
        setName(info.name);
        setDate(info.date);
        setSelectedHour(info.hour);
        setSelectedMinute(info.minute);
    }, []);

    const handleAdtChange = (adt) => {
        setAdt(adt);
    };

    const handleChdChange = (chd) => {
        setChd(chd);
    };

    const handleNameChange = (name) => {
        setName(name);
    };

    const handlePhoneChange = (phone) => {
        setPhone(phone);
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

    const handleHourChange = (hour) => {
        setSelectedHour(hour);
    };

    const handleMinuteChange = (minute) => {
        setSelectedMinute(minute);
    };

    const handleAddBbq = () => {
        if (name.length === 0) {
            alert('Chưa nhập Họ và Tên');
            return;
        }

        if (phone.length === 0) {
            alert('Chưa nhập Số Điện Thoại');
            return;
        }

        if (phone.length < 10) {
            alert('Số Điện Thoại không đúng định dạng');
            return;
        }

        setBbqInfo({
            name: name,
            phone: phone,
            adt: adt,
            chd: chd,
            date: date,
            hour: `${selectedHour}`,
            minute: `${selectedMinute}`,
        });
        setStep(2);
    };
    return (
        <div className={cx('form')}>
            <div className="form-row">
                <label className="col">
                    <div className={cx('input-field', { unvalid: name.length === 0 })}>
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
                    <div className={cx('input-field', { unvalid: phone.length < 10 })}>
                        <span className={cx('input-icon')}>
                            <FontAwesomeIcon icon={faPhone} />
                        </span>
                        <span className={cx('input-label')}>Số điện thoại:</span>
                        <span className={cx('input-value')}>
                            <input type="text" value={phone} onChange={(e) => handlePhoneChange(e.target.value)} />
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
                                <select value={selectedHour} onChange={(e) => handleHourChange(e.target.value)}>
                                    {hours.map((hour) => (
                                        <option key={hour} value={hour}>
                                            {hour}
                                        </option>
                                    ))}
                                </select>
                                <span> :</span>
                                <select value={selectedMinute} onChange={(e) => handleMinuteChange(e.target.value)}>
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
                <div className="col">
                    <button className="btn-primary" onClick={handleAddBbq}>
                        Tiếp Tục
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BbqAdd;
