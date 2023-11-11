import classNames from 'classnames/bind';
import styles from './Bbq.module.scss';
import { BbqProvider } from '~/context/BbqContext';
import BbqStep from './BbqStep';
import BbqContent from './BbqContent';

const cx = classNames.bind(styles);
function Bbq() {
    return (
        <div className={cx('home')}>
            <h2 className="page-title">Đặt Bàn BBQ</h2>
            <BbqProvider>
                <BbqStep />
                <BbqContent />
            </BbqProvider>
        </div>
    );
}

export default Bbq;
