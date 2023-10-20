import classNames from 'classnames/bind';
import styles from './CustomerSide.module.css';
import Input from '~/components/Form/Input';
import Select from '~/components/Form/Select';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '~/context/AppContext';
import { CUSTOMER_TYPE } from '~/utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function CustomerSide() {
    const [type, setType] = useState('flower');
    const [number, setNumber] = useState(1);
    let optionsType = CUSTOMER_TYPE;

    const handleTypeChange = (type) => {
        setType(type);
    };
    const handleNumberChange = (number) => {
        setNumber(number);
    };

    const { customerSide, setCustomerSide, addCustomerItem } = useContext(AppContext);
    const handleAddCustomer = () => {
        addCustomerItem({ type, number });
        setCustomerSide(false);
    };

    const handleCloseCustomerSide = () => {
        setCustomerSide(!customerSide);
    };

    /**
     * Hook that alerts clicks outside of the passed ref
     */
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setCustomerSide(false);
                }
            }
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref]);
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    return (
        <>
            <div ref={wrapperRef} className={cx('right-sides', { show: customerSide })}>
                <div className={cx('header')}>
                    <h3>Thêm Khách Hàng</h3>
                    <button onClick={handleCloseCustomerSide} className={cx('btn-close')}>
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

export default CustomerSide;
