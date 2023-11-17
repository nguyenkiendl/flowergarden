import classNames from 'classnames/bind';
import styles from '../Bbq.module.scss';
const cx = classNames.bind(styles);
import { useContext } from 'react';
import { BbqContext } from '~/context/BbqContext';
import BbqAdd from '../BbqAdd';
import BbqConfirm from '../BbqConfirm';
import BbqOrders from '../BbqOrders';

function BbqContent() {
    const { step } = useContext(BbqContext);

    const renderHtml = () => {
        if (step === 1) {
            return <BbqAdd />;
        } else if (step === 2) {
            return (
                <>
                    <BbqOrders />
                </>
            );
        } else if (step === 3) {
            return (
                <>
                    <BbqConfirm />
                </>
            );
        } else {
            return '';
        }
    };
    return (
        <>
            <div className={cx('bbq-content')}>{renderHtml()}</div>
        </>
    );
}

export default BbqContent;
