import classNames from 'classnames/bind';
import styles from '~/components/Layout/DefaultLayout/DefaultLayout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faClose } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '~/context/AppContext';
import Cart from '~/components/Cart';
const cx = classNames.bind(styles);

function BbqSide({ bbq, setBbq }) {
    const { cartSide, setCartSide } = useContext(AppContext);
    const handleCloseService = () => {
        setCartSide(false);
    };

    return (
        <>
            <div ref={wrapperRef} className={cx('right-sides', { show: bbqSide })}>
                <div className={cx('header')}>
                    <h3>BBQ</h3>
                    <button onClick={handleCloseService} className={cx('btn-close')}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
                <div className={cx('body')}>
                    <Cart carts={carts} setCarts={setCarts} />
                </div>
            </div>
        </>
    );
}

export default BbqSide;
