import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '~/components/Customer/Customer.module.scss';
import { customerType } from '~/utils/filters';
import { useContext } from 'react';
import { AppContext } from '~/context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus, faPrint } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function Detail() {
    let { customerId } = useParams();
    const navigate = useNavigate();
    const { customerList, openService, setOpenService } = useContext(AppContext);
    const customer = customerList.find((c) => {
        return c.id === Number(customerId);
    });

    if (customer === undefined) return navigate('/', { replace: true });
    let type = customerType(customer.type);

    const handlePrintTicket = () => {
        console.log('print ticket');
    };

    const handleServiceAdd = () => {
        setOpenService(!openService);
    };
    return (
        <>
            <div className={cx('detail')}>
                <div className={cx('customer-item')}>
                    <div className={cx('number')}>{customer.number}</div>
                    <div className={'customer-group'}>
                        <div className={cx('code')}>{customer.code}</div>
                        <div className={cx('type')}>{type.label}</div>
                    </div>
                    <div className={cx('date')}>{customer.date}</div>
                    <div className={cx('btn-action')}>
                        <button onClick={handlePrintTicket} className={cx('btn-print-ticket')}>
                            <FontAwesomeIcon icon={faPrint} />
                        </button>
                        <button onClick={handleServiceAdd} className={cx('btn-service-add')}>
                            <FontAwesomeIcon icon={faFileCirclePlus} />
                        </button>
                    </div>
                </div>
                <div className={cx('drinks')}>
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customer.services.map((service, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{service.name}</td>
                                        <td>{service.quantity}</td>
                                        <td>{service.price}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Detail;
