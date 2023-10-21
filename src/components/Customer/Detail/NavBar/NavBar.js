import classNames from 'classnames/bind';
import styles from './NavBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faFolderPlus, faPlus, faPrint, faSave, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '~/context/AppContext';
import Modal from '~/components/Modal';
import Menu from '~/components/Menu';
import MenuItem from '~/components/Menu/MenuItem';

const cx = classNames.bind(styles);

function NavBar() {
    const navigate = useNavigate();
    const { customerId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const { setProductSide, setOpenModal } = useContext(AppContext);

    // const handleMessage = (event) => {
    //     if (event.data.action === 'receipt-loaded') {
    //         setIsLoading(false);
    //     }
    // };

    const printIframe = (id) => {
        const iframe = document.frames ? document.frames[id] : document.getElementById(id);
        const iframeWindow = iframe.contentWindow || iframe;

        iframe.focus();
        iframeWindow.print();

        // update status
        const apiUpdate = async () => {
            await customerServices.updateCustomerStatus({
                customer_id: customerId,
                customer_status: 'processing',
            });
        };
        apiUpdate();
        return false;
    };
    // useEffect(() => {
    //     window.addEventListener('message', handleMessage);
    //     return () => {
    //         window.removeEventListener('message', handleMessage);
    //     };
    // }, []);

    const handlePrintReturn = () => {
        console.log('order add');
    };
    const handlePrintInvoice = () => {
        console.log('order add');
    };
    const handleSaveInvoice = () => {
        console.log('order add');
    };
    return (
        <>
            <div className={cx('navbar')}>
                <button className={cx('btn-back')} onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faChevronLeft} /> Quay lại
                </button>
                <button className={cx('btn-services')} onClick={() => setOpenModal(true)}>
                    <FontAwesomeIcon icon={faFolderPlus} /> Chức Năng
                </button>
                <button className={cx('btn-order-add')} onClick={() => setProductSide(true)}>
                    <FontAwesomeIcon icon={faPlus} /> Thêm Món
                </button>
            </div>
            <iframe id="printProcessing" src={`/print/${customerId}`} style={{ display: 'none' }} title="Processing" />
            <Modal title={'Chức Năng'}>
                <Menu className={'menu-list'}>
                    <MenuItem
                        classes={'btn-print-processing'}
                        icon={faPrint}
                        label={'IN CHẾ BIẾN'}
                        onClick={() => printIframe('printProcessing')}
                    />
                    <MenuItem
                        classes={'btn-print-return'}
                        icon={faPrint}
                        label={'IN TRẢ MÓN'}
                        onClick={handlePrintReturn}
                    />
                    <MenuItem
                        classes={'btn-print-invoice'}
                        icon={faPrint}
                        label={'IN HÓA ĐƠN'}
                        onClick={handlePrintInvoice}
                    />
                    <MenuItem
                        classes={'btn-save-invoice'}
                        icon={faSave}
                        label={'LƯU HÓA ĐƠN'}
                        onClick={handleSaveInvoice}
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
