import classNames from 'classnames/bind';
import styles from './Service.module.scss';
import Drink from '~/components/Drink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AppContext } from '~/context/AppContext';

const cx = classNames.bind(styles);

function Service() {
    const { openService, setOpenService } = useContext(AppContext);
    const handleCloseService = () => {
        setOpenService(false);
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
                    <Drink />
                </div>
            </div>
        </>
    );
}

export default Service;
