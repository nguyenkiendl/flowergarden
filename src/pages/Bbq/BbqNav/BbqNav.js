import classNames from 'classnames/bind';
import styles from '../Bbq.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAnglesRight, faCartPlus, faChevronLeft, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { BbqContext } from '~/context/BbqContext';
const cx = classNames.bind(styles);

function BbqNav({ onNext, countOrders }) {
    const navigate = useNavigate();
    const { step, setStep } = useContext(BbqContext);

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleContinues = () => {
        onNext();
    };
    console.log(countOrders);
    return (
        <>
            <div className={cx('navbar')}>
                <div className={cx('navbar-row')}>
                    <button className={cx('btn-back', { hide: step === 1 })} onClick={handleBack}>
                        <span>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </span>
                    </button>
                    <button className={cx('btn-next')} onClick={handleContinues} disabled={countOrders === 0}>
                        <span>
                            <FontAwesomeIcon icon={faAnglesRight} />
                        </span>
                        <span>Tiếp Tục</span>
                    </button>
                </div>
                <br></br>
            </div>
        </>
    );
}

export default BbqNav;
