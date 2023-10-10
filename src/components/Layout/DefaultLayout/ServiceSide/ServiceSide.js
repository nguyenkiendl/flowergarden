import classNames from 'classnames/bind';
import styles from './ServiceSide.module.scss';
import Service from '~/components/Customer/Detail/Service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { AppContext } from '~/context/AppContext';

const cx = classNames.bind(styles);

function ServiceSide() {
    const { openService, setOpenService } = useContext(AppContext);
    const [counter, setCounter] = useState(0);
    const handleCloseService = () => {
        setOpenService(false);
        setCounter(counter + 1);
    };
    return (
        <>
            <div className={cx('services', { show: openService })}>
                <div className={cx('header')}>
                    <h3>Dịch vụ</h3>
                    <button onClick={handleCloseService} className={cx('btn-close')}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
                <div className={cx('body')}>
                    <Service isChanged={counter} />
                </div>
            </div>
        </>
    );
}

export default ServiceSide;
