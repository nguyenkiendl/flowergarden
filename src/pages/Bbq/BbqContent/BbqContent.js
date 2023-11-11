import classNames from 'classnames/bind';
import styles from '../Bbq.module.scss';
const cx = classNames.bind(styles);
import { useContext, useEffect, useState } from 'react';
import { BbqContext } from '~/context/BbqContext';
import BbqAdd from '../BbqAdd';
import * as bbqServices from '~/apiServices/bbqServices';
import BbqProducts from '../BbqProducts';
import BbqConfirm from '../BbqConfirm';
import BbqNav from '../BbqNav';

function BbqContent() {
    const { step, setStep } = useContext(BbqContext);
    const [dataList, setDataList] = useState([]);

    const fetchDatas = async () => {
        const response = await bbqServices.getBbqs();
        if (response) {
            setDataList([...dataList, ...response]);
        }
    };

    useEffect(() => {
        fetchDatas();
    }, []);

    const handleBbqCancel = (bbqId) => {
        const updated = async () => {
            const res = await bbqServices.updateBbqStatus({
                bbq_id: bbqId,
                status: 3,
            });
            if (res.status) {
                setDataList((preDataList) => {
                    const newDataList = preDataList.map((obj) => {
                        if (obj.bbq_id === bbqId) {
                            obj.status === 3;
                        }
                        return obj;
                    });

                    return newDataList;
                });
            } else {
                alert(res.message);
            }
        };
        updated();
    };

    const renderHtml = () => {
        if (step === 1) {
            return <BbqAdd />;
        } else if (step === 2) {
            return (
                <>
                    <BbqProducts />
                </>
            );
        } else if (step === 3) {
            return (
                <>
                    <BbqConfirm />
                    <BbqNav />
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
