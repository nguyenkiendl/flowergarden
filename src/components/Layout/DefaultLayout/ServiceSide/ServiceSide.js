import classNames from 'classnames/bind';
import styles from './ServiceSide.module.scss';
import Service from '~/components/Customer/Detail/Service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useRef } from 'react';
import { AppContext } from '~/context/AppContext';

const cx = classNames.bind(styles);

function ServiceSide() {
    const { openService, setOpenService } = useContext(AppContext);
    const handleCloseService = () => {
        setOpenService(false);
    };

    /**
     * Hook that alerts clicks outside of the passed ref
     */
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setOpenService(false);
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
            <div ref={wrapperRef} className={cx('services', { show: openService })}>
                <div className={cx('header')}>
                    <h3>Dịch vụ</h3>
                    <button onClick={handleCloseService} className={cx('btn-close')}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
                <div className={cx('body')}>
                    <Service />
                </div>
            </div>
        </>
    );
}

export default ServiceSide;
