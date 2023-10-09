import classNames from 'classnames/bind';
import styles from './RightSide.module.css';
import Input from '~/components/Form/Input';
import Select from '~/components/Form/Select';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '~/context/AppContext';
import { CUSTOMER_TYPE } from '~/utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import * as customerServices from '~/apiServices/customerServices';

const cx = classNames.bind(styles);

function RightSide() {
    const navigate = useNavigate();

    const [type, setType] = useState('flower');
    const [number, setNumber] = useState(1);

    let optionsType = CUSTOMER_TYPE;

    const handleTypeChange = (type) => {
        setType(type);
    };
    const handleNumberChange = (number) => {
        setNumber(number);
    };

    const { openSide, setOpenSide, setCustomerList } = useContext(AppContext);
    const handleAddCustomer = () => {
        const addCustomer = async () => {
            const item = await customerServices.addCustomer({ type, number });
            setCustomerList((prevDataList) => {
                const newDataList = [item, ...prevDataList];
                return newDataList;
            });
        };
        addCustomer();
        setType('flower');
        setNumber(1);
        setOpenSide(false);
        navigate('/', { replace: true });
    };

    const handleCloseRightSide = () => {
        setOpenSide(!openSide);
    };

    return (
        <>
            <div className={cx('right-side', { show: openSide })}>
                <div className={cx('header')}>
                    <h3>Thêm Khách Hàng</h3>
                    <button onClick={handleCloseRightSide} className={cx('btn-close')}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
                <div className={cx('body')}>
                    <div className="form-row">
                        <label className="col">
                            Loại khách:
                            <Select
                                id="customer-type"
                                className="customer-type"
                                options={optionsType}
                                value={type}
                                onChange={handleTypeChange}
                            />
                        </label>
                    </div>
                    <div className="form-row">
                        <label className="col">
                            Số lượng:
                            <Input
                                id="customer-number"
                                className="customer-number"
                                type="number"
                                min="1"
                                value={number}
                                onChange={handleNumberChange}
                            />
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
        </>
    );
}

export default RightSide;
