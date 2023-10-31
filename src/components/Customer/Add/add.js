import classNames from 'classnames/bind';
import styles from '~/components/Customer/Customer.module.scss';
const cx = classNames.bind(styles);
import { useState } from 'react';
import Input from '~/components/Form/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import * as customerServices from '~/apiServices/customerServices';
function CusomerAdd({ onAddNew }) {
    const [number, setNumber] = useState(1);
    const [customer, setCustomer] = useState(0);
    const [phone, setPhone] = useState('');
    const [showPhone, setShowPhone] = useState(false);

    const numberSelects = () => {
        const arrays = [];
        for (let i = 1; i <= 20; i++) {
            const n = 5 * i;
            arrays.push(n);
        }
        return arrays;
    };

    const handleNumberChange = (number) => {
        setNumber(number);
    };

    const handlePhoneChange = (phone) => {
        setPhone(phone);
    };

    const handleAddCustomer = () => {
        const Add = async () => {
            const res = await customerServices.addCustomer({
                number: number,
                phone: phone,
            });
            if (res.status) {
                const data = res.data;
                onAddNew(data);
                setCustomer(data);
                setTimeout(() => {
                    handlePrint();
                }, 200);
            } else {
                alert(res.message);
            }
        };
        Add();
    };

    const handlePrint = () => {
        const f = document.frames ? document.frames[id] : document.getElementById('iframe-ticket');
        const w = f.contentWindow || f;
        w.postMessage({ action: 'print-ticket' }, f.src);
    };

    const handleShowPhone = () => {
        setShowPhone(!showPhone);
    };
    return (
        <div>
            {customer ? (
                <iframe
                    id="iframe-ticket"
                    src={`/print-ticket/${customer?.customer_id}`}
                    style={{ display: 'none' }}
                    title="PRINT TICKET"
                />
            ) : (
                ''
            )}

            <div className={cx('body')}>
                <div className="form-row">
                    <label className="col">
                        <div className={cx('input-field')}>
                            <span className={cx('input-icon')}>
                                <FontAwesomeIcon icon={faUsers} />
                            </span>
                            <span className={cx('input-label')}>Số lượng:</span>
                            <span className={cx('input-value')}>
                                <Input
                                    id="customer-number"
                                    className="customer-number"
                                    type="number"
                                    min="1"
                                    value={number}
                                    onChange={handleNumberChange}
                                />
                            </span>
                        </div>
                        <div className={cx('number-selects')}>
                            {numberSelects().map((n, index) => {
                                return (
                                    <span key={index} className={cx('number-item')} onClick={() => setNumber(n)}>
                                        {n}
                                    </span>
                                );
                            })}
                        </div>
                    </label>
                    <button className={cx('btn-show')} onClick={handleShowPhone}>
                        {showPhone ? 'Ẩn SĐT' : 'Hiện SĐT'}
                    </button>
                </div>

                <div className={cx('form-row')} hidden={!showPhone}>
                    <label className="col">
                        <div className={cx('input-field')}>
                            <span className={cx('input-icon')}>
                                <FontAwesomeIcon icon={faUsers} />
                            </span>
                            <span className={cx('input-label')}>SĐT:</span>
                            <span className={cx('input-value')}>
                                <Input
                                    id="customer-phone"
                                    className="customer-phone"
                                    type="phone"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                />
                            </span>
                        </div>
                    </label>
                </div>
                <div className="form-row">
                    <div className="col">
                        <button className="btn-primary" onClick={handleAddCustomer}>
                            Thêm Và In Vé
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CusomerAdd;
