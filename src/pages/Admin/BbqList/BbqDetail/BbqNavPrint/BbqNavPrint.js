import classNames from 'classnames/bind';
import styles from './NavPrint.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPrint } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
const cx = classNames.bind(styles);

function BbqNavPrint() {
    const navigate = useNavigate();
    const { tableId, orderId } = useParams();
    const handleBack = () => {
        navigate(`/table/${tableId}/`);
    };

    const handleProcessing = () => {
        const f = document.frames ? document.frames[id] : document.getElementById('iframe-processing');
        const w = f.contentWindow || f;
        w.postMessage({ action: 'print-processing' }, f.src);
    };

    const handlePrint = () => {
        const f = document.getElementById('iframe-bill');
        const w = f.contentWindow;
        w.postMessage({ action: 'print-bill' }, f.src);
    };

    return (
        <>
            <iframe id="iframe-bill" src={`/print-bill/${orderId}`} style={{ display: 'none' }} title="PRINT BILL" />
            <iframe
                id="iframe-processing"
                src={`/print-processing/${orderId}`}
                style={{ display: 'none' }}
                title="PRINT PROCESSING"
            />
            <div className={cx('navprint')}>
                <div className={cx('navprint-row')}>
                    <button className={cx('btn-back')} onClick={handleBack}>
                        <span>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </span>
                    </button>
                    <button className={cx('btn-processing')} onClick={handleProcessing}>
                        <span>
                            <FontAwesomeIcon icon={faPrint} />
                        </span>
                        <span>IN Chế Biến</span>
                    </button>
                    <button className={cx('btn-print')} onClick={handlePrint}>
                        <span>
                            <FontAwesomeIcon icon={faPrint} />
                        </span>
                        <span>IN BILL</span>
                    </button>
                </div>
                <br></br>
            </div>
        </>
    );
}

export default BbqNavPrint;
