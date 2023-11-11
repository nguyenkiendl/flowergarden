import classNames from 'classnames/bind';
import styles from '../Bbq.module.scss';
const cx = classNames.bind(styles);
import { useContext } from 'react';
import { BbqContext } from '~/context/BbqContext';

function BbqStep() {
    const { step, setStep } = useContext(BbqContext);
    console.log(step);
    const handleChangeStep = (s) => {
        setStep(s);
    };
    return (
        <>
            <div className={cx('bbq-step')}>
                <div className={cx('step-row')}>
                    <button className={cx('step step-1', { active: step === 1 })} onClick={() => handleChangeStep(1)}>
                        <span className={cx('step-number')}>1</span>
                        <span className={cx('step-text')}>Thông Tin</span>
                    </button>
                    <span className={cx('bar')}></span>
                    <button className={cx('step step-2', { active: step === 2 })} onClick={() => handleChangeStep(2)}>
                        <span className={cx('step-number')}>2</span>
                        <span className={cx('step-text')}>Đồ Ăn</span>
                    </button>
                    <span className={cx('bar')}></span>
                    <button className={cx('step step-3', { active: step === 3 })} onClick={() => handleChangeStep(3)}>
                        <span className={cx('step-number')}>3</span>
                        <span className={cx('step-text')}>Xác Nhận</span>
                    </button>
                </div>
                <br></br>
            </div>
        </>
    );
}

export default BbqStep;
