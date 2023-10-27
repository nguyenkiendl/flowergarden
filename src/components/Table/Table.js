import { useEffect, useState } from 'react';
import TableItem from './TableItem';
import * as tableServices from '~/apiServices/tableServices';
import classNames from 'classnames/bind';
import styles from '~/components/Table/Table.module.scss';
const cx = classNames.bind(styles);

function Table() {
    const [tableList, setTableList] = useState([]);
    useEffect(() => {
        const fetchTables = async () => {
            const response = await tableServices.getTables();
            if (response.length > 0) {
                setTableList([...tableList, ...response]);
            }
        };
        fetchTables();
    }, []);

    const handleUpdate = (detailId) => {
        setOrderList((prevOrderList) => {
            const newOrderList = prevOrderList.map((obj) => {
                if (obj.detail_id === detailId) {
                    obj.status = 'done';
                }
                return obj;
            });
            return newOrderList;
        });
    };
    return (
        <>
            <div className={cx('table-row')}>
                {tableList.map((item, index) => {
                    return <TableItem key={index} item={item} />;
                })}
            </div>
        </>
    );
}

export default Table;
