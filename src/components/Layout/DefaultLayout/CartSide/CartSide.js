import classNames from 'classnames/bind';
import styles from '~/components/Layout/DefaultLayout/DefaultLayout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faClose } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '~/context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import Cart from '~/components/Cart';
const cx = classNames.bind(styles);

function CartSide( {carts, setCarts} ) {
    const { orderId } = useParams();
    const { cartSide, setCartSide } = useContext(AppContext);
    const handleCloseService = () => {
        setCartSide(false);
    };
    /**
     * Hook that alerts clicks outside of the passed ref
     */
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setCartSide(false);
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
            <div ref={wrapperRef} className={cx('right-sides', { show: cartSide })}>
                
                <div className={cx('header')}>
                    <h3>Giỏ Hàng</h3>
                    <button onClick={handleCloseService} className={cx('btn-close')}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
                <div className={cx('body')}>
                    <Cart carts={carts} setCarts={setCarts}/>
                </div>
            </div>
        </>
    );
}

export default CartSide;
