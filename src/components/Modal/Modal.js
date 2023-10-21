import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { useContext, useEffect, useRef } from 'react';
import { AppContext } from '~/context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function Modal({ title, children }) {
    const { openModal, setOpenModal } = useContext(AppContext);

    /**
     * Hook that alerts clicks outside of the passed ref
     */
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setOpenModal(false);
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
            <div className={cx('modal', { show: openModal })}>
                <div ref={wrapperRef} className={cx('modal-container')}>
                    <div className={cx('modal-head')}>
                        <h3>{title}</h3>
                        <button onClick={() => setOpenModal(false)} className={cx('btn-close')}>
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                    </div>
                    <div className={cx('modal-body')}>{children}</div>
                </div>
            </div>
        </>
    );
}

export default Modal;
