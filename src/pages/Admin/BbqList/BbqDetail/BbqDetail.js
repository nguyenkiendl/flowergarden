import classNames from 'classnames/bind';
import styles from '../BbqList.module.scss';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const cx = classNames.bind(styles);
import * as bbqServices from '~/apiServices/bbqServices';
import * as tableServices from '~/apiServices/tableServices';
import { formatPrice } from '~/utils/filters';
import { BBQ_STATUS, WATERS } from '~/utils/constants';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCancel,
    faChevronLeft,
    faCreditCard,
    faEdit,
    faPenToSquare,
    faPrint,
    faSave,
    faTableList,
} from '@fortawesome/free-solid-svg-icons';

function BbqDetail() {
    const navigate = useNavigate();
    const { bbqId } = useParams();
    const [info, setInfo] = useState({});
    const [datas, setDatas] = useState([]);
    const [editNote, setEditNote] = useState(false);
    const [note, setNote] = useState('');

    const [addTable, setAddTable] = useState(false);
    const [table, setTable] = useState(1);
    const [tableList, setTableList] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await bbqServices.getBbq({
                params: {
                    bbq_id: bbqId,
                },
            });
            if (result) {
                setInfo(result.info);
                setDatas(result.datas);
            }
        };
        if (Object.keys(info).length === 0) fetchApi();
    }, []);

    useEffect(() => {
        const fetchTables = async () => {
            const response = await tableServices.getTables();
            if (response.length > 0) {
                setTableList(response);
            }
        };
        if (addTable && tableList.length === 0) fetchTables();
    }, [addTable]);

    const headTitle = (type) => {
        return WATERS.find((obj) => {
            return obj.key === type;
        })?.label;
    };

    const totalOrder = (orders) => {
        let total = 0;
        for (let keyName in orders) {
            const products = orders[keyName];
            for (let i in products) {
                const item = products[i];
                total += item.product_price * item.quantity;
            }
        }

        return total;
    };

    const updateBbqStatus = (status) => {
        const apiUpdate = async () => {
            const res = await bbqServices.update({
                action: 'status',
                bbq_id: info.bbq_id,
                status: status,
            });
            if (res.status) {
                setInfo({ ...info, status: res.data });
            } else {
                alert(res.message);
            }
        };
        apiUpdate();
    };

    const handleEdit = () => {
        navigate(`/super-admin/bbq-edit/${bbqId}/${info.edit}`);
    };

    const handleDeposit = () => {
        updateBbqStatus(1);
        //navigate(`/super-admin/bbqs`);
    };

    const handlePayment = () => {
        updateBbqStatus(2);
        //navigate(`/super-admin/bbqs`);
    };

    const handleCancel = () => {
        updateBbqStatus(3);
        //navigate(`/super-admin/bbqs`);
    };

    const handleBbqProcessing = () => {
        const f = document.frames ? document.frames[id] : document.getElementById('iframe-bbq-processing');
        const w = f.contentWindow || f;
        w.postMessage({ action: 'bbq-print-processing' }, f.src);
    };

    const handleEditNote = () => {
        setEditNote(!editNote);
    };

    const handleUpdateNote = () => {
        const apiUpdate = async () => {
            const res = await bbqServices.update({
                action: 'note',
                bbq_id: info.bbq_id,
                note: note,
            });
            if (res.status) {
                setInfo({ ...info, note: note });
            } else {
                alert(res.message);
            }
        };
        if (note !== '') apiUpdate();
        setEditNote(false);
    };

    const handleAddTable = () => {
        const apiUpdate = async () => {
            const res = await bbqServices.update({
                action: 'table',
                bbq_id: info.bbq_id,
                table_id: table,
            });
            if (res.status) {
                setInfo({ ...info, table: res.data });
            } else {
                alert(res.message);
            }
        };
        apiUpdate();
        setAddTable(false);
    };

    const total = totalOrder(datas[1]);
    const deposit = info.deposit;
    const remaining = total - deposit;

    return (
        <>
            <div className={cx('bbqs')}>
                <h3 className={cx('page-title')}>Chi tiết đặt bàn BBQ</h3>
                <div className={cx('bbq-content')}>
                    <div className={cx('bbq-info')}>
                        <p>
                            <span className={cx('bbq-label')}>Trạng Thái:</span>
                            <strong className={cx('status', `status-${info.status}`)}>{BBQ_STATUS[info.status]}</strong>
                        </p>
                        <p>
                            <span className={cx('bbq-label')}>Chỉnh Sửa:</span>{' '}
                            <strong className={cx('bbq-edit')}>
                                <span className={cx('number')}>{info.edit}</span> lần
                            </strong>
                        </p>
                        <p>
                            <span className={cx('bbq-label')}>Họ và Tên:</span> <strong>{info.name}</strong>
                        </p>
                        <p>
                            <span className={cx('bbq-label')}>SĐT:</span> <strong>{info.phone}</strong>
                        </p>
                        <p>
                            <span className={cx('bbq-label')}>Người lớn:</span> <strong>{info.adt}</strong>
                        </p>
                        <p>
                            <span className={cx('bbq-label')}>Trẻ em:</span> <strong>{info.chd}</strong>
                        </p>
                        <p>
                            <span className={cx('bbq-label')}>Ngày:</span>
                            <strong>{moment(info.date).format('DD-MM-YYYY')}</strong>
                        </p>
                        <p>
                            <span className={cx('bbq-label')}>Thời gian:</span>
                            <strong>
                                {info.hour}:{info.minute}
                            </strong>
                        </p>
                        <p>
                            <span className={cx('bbq-label')}>Chọn bàn:</span>
                            <strong className={cx('bbq-table', { hide: addTable })}>
                                <FontAwesomeIcon icon={faPenToSquare} onClick={() => setAddTable(!addTable)} />{' '}
                                {info.table}
                            </strong>
                            <span className={cx('edit-row', { hide: !addTable })}>
                                <select value={table} onChange={(e) => setTable(e.target.value)}>
                                    {tableList.map((t) => (
                                        <option key={t.table_id} value={t.table_id}>
                                            {t.table_name}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={handleAddTable}>
                                    <FontAwesomeIcon icon={faSave} />
                                </button>
                            </span>
                        </p>
                        <p>
                            <span className={cx('bbq-label')}>Ghi chú:</span>
                            <strong className={cx('bbq-note', { hide: editNote })}>
                                <FontAwesomeIcon icon={faPenToSquare} onClick={handleEditNote} /> {info.note}
                            </strong>
                            <span className={cx('edit-row', { hide: !editNote })}>
                                <textarea rows={2} defaultValue={info.note} onChange={(e) => setNote(e.target.value)} />
                                <button onClick={handleUpdateNote}>
                                    <FontAwesomeIcon icon={faSave} />
                                </button>
                            </span>
                        </p>
                    </div>
                    <div className={cx('btn-group')}>
                        <button className={cx('btn-deposit', { hide: info.status >= 1 })} onClick={handleDeposit}>
                            Đã Cọc
                        </button>
                        <button className={cx('btn-payment', { hide: info.status >= 2 })} onClick={handlePayment}>
                            Đã Thanh Toán
                        </button>
                        <button className={cx('btn-cancel', { hide: info.status >= 3 })} onClick={handleCancel}>
                            Hủy Bàn
                        </button>
                    </div>
                    <div className={cx('order-list')}>
                        {Object.keys(datas).map((i) => {
                            const orders = datas[i];
                            const title = i == 0 ? 'Danh sách cũ' : 'Danh sách hiện tại';
                            return (
                                <div key={i} className={cx('order-item')}>
                                    <h3>
                                        <FontAwesomeIcon icon={faTableList} />
                                        {title}
                                    </h3>
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
                                                        <tr
                                                            className={cx('trhead')}
                                                            hidden={
                                                                products.filter((p) => p.quantity !== 0).length === 0
                                                            }
                                                        >
                                                            <td colSpan={3}>{headTitle(keyName)}</td>
                                                        </tr>
                                                        {products?.map((item, index) => {
                                                            return (
                                                                <tr
                                                                    key={index}
                                                                    className={cx('tr')}
                                                                    hidden={item.quantity === 0}
                                                                >
                                                                    <td width={150}>{item.product_name}</td>
                                                                    <td width={50} className="text-center">
                                                                        <span
                                                                            className={cx('quantity', {
                                                                                show: item.quantity >= 0,
                                                                            })}
                                                                        >
                                                                            {item.quantity}
                                                                        </span>
                                                                    </td>
                                                                    <td width={150} className="text-right">
                                                                        <span className={cx('price')}>
                                                                            {item.display_price}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </Fragment>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            );
                        })}
                        <table>
                            <tbody>
                                <tr>
                                    <td colSpan={2}>
                                        <strong>Tổng: </strong>
                                    </td>
                                    <td width={150} className="text-right">
                                        <span className={cx('total')}>{formatPrice(total)}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <strong>Cọc: </strong>
                                    </td>
                                    <td width={150} className="text-right">
                                        <span className={cx('total')}>{formatPrice(deposit)}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <strong>Còn lại: </strong>
                                    </td>
                                    <td width={150} className="text-right">
                                        <span className={cx('total')}>{formatPrice(remaining)}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br></br>
                        <br></br>
                    </div>

                    <iframe
                        id="iframe-bbq-processing"
                        src={`/super-admin/bbq-print-processing/${bbqId}`}
                        style={{ display: 'none' }}
                        title="BBQ PRINT PROCESSING"
                    />
                    <div className={cx('navbar')}>
                        <div className={cx('navbar-row')}>
                            <button className={cx('btn-back')} onClick={() => navigate('/super-admin/bbqs')}>
                                <span>
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </span>
                            </button>
                            <button className={cx('btn-edit', { hide: info.status === 2 })} onClick={handleEdit}>
                                <span>
                                    <FontAwesomeIcon icon={faEdit} />
                                </span>
                                Chỉnh sửa
                            </button>
                            <button
                                className={cx('btn-print', { hide: info.status !== 2 })}
                                onClick={handleBbqProcessing}
                            >
                                <span>
                                    <FontAwesomeIcon icon={faPrint} />
                                </span>
                                <span>IN Chế Biến</span>
                            </button>
                        </div>
                        <br></br>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BbqDetail;
