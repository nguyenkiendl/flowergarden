import classNames from 'classnames/bind';
import styles from '../BbqList.module.scss';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const cx = classNames.bind(styles);
import * as bbqServices from '~/apiServices/bbqServices';
import { WATERS } from '~/utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faSave, faTableList } from '@fortawesome/free-solid-svg-icons';
import BbqOrderItem from '~/pages/Bbq/BbqOrders/BbqOrderItem';

function BbqEdit() {
    const navigate = useNavigate();
    const { bbqId, edit } = useParams();
    const [info, setInfo] = useState({});
    const [orders, setOrders] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            const result = await bbqServices.getBbqProducts({
                params: {
                    bbq_id: bbqId,
                    edit: edit,
                },
            });
            if (result) {
                setInfo(result.info);
                setOrders(result.orders);
            }
        };
        if (Object.keys(orders).length === 0) fetchApi();
    }, []);

    const handleUpdate = (productId, quantity) => {
        const newDataList = {};
        Object.keys(orders).map((keyName) => {
            const products = orders[keyName];
            const newProducts = products.map((obj) => {
                if (obj.product_id === productId) {
                    return { ...obj, quantity: quantity };
                }
                return obj;
            });
            newDataList[keyName] = newProducts;
        });
        setOrders(newDataList);
    };

    const headTitle = (type) => {
        return WATERS.find((obj) => {
            return obj.key === type;
        })?.label;
    };

    const handleEditOrders = () => {
        const datas = [];
        for (let keyName in orders) {
            const products = orders[keyName];
            for (let i in products) {
                const item = products[i];
                if (item.quantity !== 0) datas.push(item);
            }
        }
        const apiEditBbq = async () => {
            const res = await bbqServices.editBbqOrders({
                bbq_id: Number(bbqId),
                edit: Number(edit),
                orders: datas,
            });
            if (res.status) {
                navigate(`/super-admin/bbq/${bbqId}`);
            } else {
                alert(res.message);
            }
        };
        apiEditBbq();
    };
    return (
        <>
            <div className={cx('bbqs')}>
                <h3 className={cx('page-title')}>
                    Chỉnh sửa - {info.table} - {info.name}
                </h3>
                <div className={cx('bbq-content')}>
                    <h3>
                        <FontAwesomeIcon icon={faTableList} />
                        Thay đổi
                    </h3>
                    <div className={cx('orders-change')}>
                        <table>
                            <thead>
                                <tr>
                                    <th>TÊN</th>
                                    <th className="text-center">SL</th>
                                    <th className="text-right">GIÁ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(orders)?.map((keyName) => {
                                    const products = orders[keyName];
                                    return (
                                        <Fragment key={keyName}>
                                            <tr className={cx('trhead')}>
                                                <td colSpan={3}>{headTitle(keyName)}</td>
                                            </tr>
                                            {products?.map((item, index) => {
                                                return <BbqOrderItem key={index} item={item} onChange={handleUpdate} />;
                                            })}
                                        </Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                        <br></br>
                    </div>
                    <div className={cx('navbar')}>
                        <div className={cx('navbar-row')}>
                            <button className={cx('btn-back')} onClick={() => navigate(-1)}>
                                <span>
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </span>
                            </button>
                            <button className={cx('btn-payment')} onClick={handleEditOrders}>
                                <span>
                                    <FontAwesomeIcon icon={faSave} />
                                </span>
                                <span>Cập Nhật</span>
                            </button>
                        </div>
                        <br></br>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BbqEdit;
