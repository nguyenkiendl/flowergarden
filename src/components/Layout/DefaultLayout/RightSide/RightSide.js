import classNames from 'classnames/bind';
import styles from './RightSide.module.css';
import Input from '~/components/Form/Input';
import Select from '~/components/Form/Select';
import { useContext, useState } from 'react';
import { AppContext } from '~/context/AppContext';
import { CUSTOMER_TYPE } from '~/utils/constants';

const cx = classNames.bind(styles);

function RightSide() {
    const [type, setType] = useState('flower');
    const [number, setNumber] = useState(1);

    let optionsType = CUSTOMER_TYPE;

    const handleTypeChange = (type) => {
        setType(type);
    };
    const handleNumberChange = (number) => {
        setNumber(number);
    };

    const { customerList, setCustomerList } = useContext(AppContext);

    const handleClick = () => {
        let id = customerList.length + 1;
        const item = {
            id: id,
            code: '00002',
            type: type,
            number: number,
            date: '03-10-2023',
        };
        setCustomerList((prevDataList) => {
            const newDataList = [...prevDataList, item];
            return newDataList;
        });
        setType('flower');
        setNumber(1);
    };
    return (
        <>
            <div className={cx('right-side')}>
                <h3>Thêm Khách Hàng</h3>

                <div className="form-row">
                    <label className="col">
                        Loại khách:
                        <Select
                            datas={{
                                id: 'customer-type',
                                class: 'customer-type',
                                options: optionsType,
                                value: type,
                            }}
                            onChange={handleTypeChange}
                        />
                    </label>
                </div>
                <div className="form-row">
                    <label className="col">
                        Số lượng:
                        <Input type={'number'} value={number} onChange={handleNumberChange} />
                    </label>
                </div>
                <div className="form-row">
                    <div className="col">
                        <button onClick={handleClick}>Thêm</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RightSide;
