import classNames from 'classnames/bind';
import styles from '~/components/Layout/DefaultLayout/DefaultLayout.module.scss';
import Input from '~/components/Form/Input';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '~/context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import * as customerServices from '~/apiServices/customerServices';
const cx = classNames.bind(styles);

function CustomerSide() {
    const navigate = useNavigate();
    const [number, setNumber] = useState(1);
    const [customerId, setCustomerId] = useState(0);
    const [phone, setPhone] = useState('');

    const handleNumberChange = (number) => {
        setNumber(number);
    };

    const handlePhoneChange = (phone) => {
        setPhone(phone);
    };

    const { customerSide, setCustomerSide, addCustomerItem } = useContext(AppContext);

    const handleAddCustomer = () => {
        //addCustomerItem({ number, phone }).then(() => {});
        const Add = async () => {
            const res = await customerServices.addCustomer({
                number: number,
                phone: phone,
            });
            if (res.status) {
                const data = res.data;
                setCustomerId(data.customer_id);
                //handlePrintContent(data.customer_id);
                setCustomerSide(false);
                setTimeout(() => {
                    handlePrint();
                }, 500);
            } else {
                alert(res.message);
            }
            navigate('/');
        };
        Add();

        //window.location.reload(false);
    };

    const handlePrint = () => {
        const f = document.frames ? document.frames[id] : document.getElementById('iframe-ticket');
        const w = f.contentWindow || f;
        w.postMessage({ action: 'print-ticket' }, f.src);
    };
    const handlePrintContent = (customerId) => {
        const apiFetchPrint = async () => {
            const response = await customerServices.printCustomerTicket({
                params: {
                    customer_id: customerId,
                },
            });
            if (response) {
                const w = window.open(window.location.href, '_blank');
                w.document.open();
                w.document.write(response);
                w.document.close();
                w.window.print();
                w.window.close();
            }
        };
        apiFetchPrint();
    };

    const handleCloseCustomerSide = () => {
        setCustomerSide(false);
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
                <iframe
                    id="iframe-ticket"
                    src={`${process.env.REACT_APP_BASEURL}/prints/ticket.php?customer_id=${customerId}`}
                    style={{ display: 'none' }}
                    title="PRINT TICKET"
                />
                <div className={cx('header')}>
                    <h3>Thêm Khách Hàng</h3>
                    <button onClick={handleCloseCustomerSide} className={cx('btn-close')}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
                <div className={cx('body')}>
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
                        <label className="col">
                            SĐT:
                            <Input
                                id="customer-phone"
                                className="customer-phone"
                                type="phone"
                                value={phone}
                                onChange={handlePhoneChange}
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
