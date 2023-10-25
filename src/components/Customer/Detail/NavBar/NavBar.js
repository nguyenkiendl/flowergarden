import classNames from 'classnames/bind';
import styles from './NavBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faFolderPlus, faPlus, faPrint, faSave, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import * as orderServices from '~/apiServices/orderServices';
import { AppContext } from '~/context/AppContext';
import Modal from '~/components/Modal';
import Menu from '~/components/Menu';
import MenuItem from '~/components/Menu/MenuItem';

const cx = classNames.bind(styles);

function NavBar() {
    const navigate = useNavigate();
    const { customerId, orderId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const { customer, setProductSide, setOpenModal } = useContext(AppContext);

    // const handleMessage = (event) => {
    //     console.log(event.data.action);
    //     if (event.data.action === 'receipt-loaded') {
    //         setIsLoading(false);
    //     }
    // };
    if (Object.keys(customer).length === 0) return;
    useEffect(() => {
        console.log(customer);
    });
    const printIframe = (id) => {
        const iframe = document.frames ? document.frames[id] : document.getElementById(id);
        const iframeWindow = iframe.contentWindow || iframe;

        iframe.focus();
        iframeWindow.print();
        //parent.postMessage({ action: 'receipt-loaded' });

        return false;
    };
    useEffect(() => {
        console.log(customer);
        // window.addEventListener('message', handleMessage);
        // return () => {
        //     window.removeEventListener('message', handleMessage);
        // };
    }, []);

    const handleChangeProcessing = () => {
        // update status
        const apiUpdate = async () => {
            const response = await orderServices.updateOrderStatus({
                order_id: Number(orderId),
                status: 'processing',
            });
            if (response) setOpenModal(false);
            //window.location.reload(false);
        };
        apiUpdate();
    };
    // const handleSaveInvoice = () => {
    //     console.log('order add');
    // };
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
            <iframe id="printInvoice" src={`/print/${customerId}`} style={{ display: 'none' }} title="PRINT INVOICE" />
            <Modal title={'Chức Năng'}>
                <Menu className={'menu-list'}>
                    <MenuItem
                        show={customer.customer_status === 'ordering'}
                        classes={'btn-change-processing'}
                        icon={faPrint}
                        label={'CHẾ BIẾN'}
                        onClick={handleChangeProcessing}
                    />
                    <MenuItem
                        show={customer.customer_status === 'ordering'}
                        classes={'btn-print-invoice'}
                        icon={faPrint}
                        label={'IN HÓA ĐƠN'}
                        onClick={() => printIframe('printInvoice')}
                    />
                    {/* <MenuItem
                        classes={'btn-save-invoice'}
                        icon={faSave}
                        label={'LƯU HÓA ĐƠN'}
                        onClick={handleSaveInvoice}
                    /> */}
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
