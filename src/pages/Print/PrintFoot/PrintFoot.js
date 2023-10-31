import classNames from 'classnames/bind';
import styles from '../Print.module.scss';
import qrcodePayment from '~/assets/qrcode/qrcode-payment.png';
const cx = classNames.bind(styles);
function PrintFoot({ tableKey, orderId, time }) {
    return (
        <>
            <div className={cx('print-qrcode')}>
                <img id="qrcode-payment" src={qrcodePayment} width={300} />
            </div>
            <div className={cx('print-footer')}>
                <p>
                    <b>NGUYEN HAN PHONG</b>
                </p>
                <p>
                    Tài khoản <b>8282 3738 39</b> - TechcomBank{' '}
                </p>
                <p>
                    <b>Cảm ơn quý khách và hẹn gặp lại !!!</b>
                </p>
            </div>
        </>
    );
}

export default PrintFoot;
