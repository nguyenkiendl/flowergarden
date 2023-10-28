import classNames from 'classnames/bind';
import styles from './NavBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartPlus,
    faChevronLeft,
    faFolderPlus,
    faPlus,
    faPrint,
    faSave,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import * as orderServices from '~/apiServices/orderServices';
import { AppContext } from '~/context/AppContext';
import Modal from '~/components/Modal';
import Menu from '~/components/Menu';
import MenuItem from '~/components/Menu/MenuItem';
const cx = classNames.bind(styles);

function NavBar({ detail }) {
    const navigate = useNavigate();
    const { tableId } = useParams();
    const { cartCount, setProductSide, setOpenModal } = useContext(AppContext);

    if (Object.keys(detail).length === 0) return;

    const handleChangeProcessing = () => {
        // update status
        const apiUpdate = async () => {
            const response = await orderServices.updateOrderStatus({
                table_id: Number(tableId),
                status: 'processing',
            });
            if (response) setOpenModal(false);
            //window.location.reload(false);
        };
        apiUpdate();
    };
    const handleBack = () => {
        navigate(`/table/${tableId}`);
    };
    return (
        <>
            <div className={cx('navbar')}>
                <button className={cx('btn-back')} onClick={handleBack}>
                    <FontAwesomeIcon icon={faChevronLeft} /> Quay lại
                </button>
                {/* <button className={cx('btn-services')} onClick={() => setOpenModal(true)}>
                    <FontAwesomeIcon icon={faFolderPlus} /> Chức Năng
                </button> */}
                <button className={cx('btn-order-add')} onClick={() => setProductSide(true)}>
                    <FontAwesomeIcon icon={faCartPlus} /> Giỏ Hàng {cartCount}
                </button>
            </div>
            <Modal title={'Chức Năng'}>
                <Menu className={'menu-list'}>
                    <MenuItem
                        classes={'btn-change-processing'}
                        icon={faPrint}
                        label={'CHẾ BIẾN'}
                        onClick={handleChangeProcessing}
                    />
                    <MenuItem
                        classes={'btn-print-invoice'}
                        icon={faPrint}
                        label={'IN HÓA ĐƠN'}
                        onClick={() => printIframe('printInvoice')}
                    />
                    <MenuItem
                        classes={'btn-sign-out'}
                        icon={faSignOut}
                        label={'THOÁT'}
                        onClick={() => setOpenModal(false)}
                    />
                </Menu>
            </Modal>
        </>
    );
}

export default NavBar;
