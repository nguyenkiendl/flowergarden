import classNames from 'classnames/bind';
import styles from '~/pages/Table/Table.module.scss';
const cx = classNames.bind(styles);
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import * as tableServices from '~/apiServices/tableServices';
import NavBar from '~/components/NavBar';
import imagedefault from '~/assets/images/cocacola.jpg';
import { dateNow, formatPrice } from '~/utils/filters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import ProductList from '~/components/ProductList';
import * as cartServices from '~/apiServices/cartServices';
import { AppContext } from '~/context/AppContext';
function Booking() {
    const { tableId, orderId } = useParams();
    const [detail, setDetail] = useState({});
    const { cartCount, setCartCount } = useContext(AppContext);
    useEffect(() => {
        const apiFetch = async () => {
            const response = await tableServices.getTableOrders({
                params: {
                    table_id: Number(tableId),
                    order_id: Number(orderId),
                },
            });
            if (response) setDetail(response);
        };
        apiFetch();
    }, []);

    const handleClickAdd = (productId) => {
        const addToCart = async () => {
            const res = await cartServices.addToCart({
                order_id: Number(orderId),
                product_id: Number(productId),
            });
            if (res.status) {
                const count = res.data;
                setCartCount(count);
            }
        };
        addToCart();
    };
    return (
        <div className="table-detail">
            <div className="page-title">
                <div>
                    <h3>{detail.table_name}</h3>
                    <span>Đơn: {detail.order_id}</span>
                </div>

                <div>{dateNow()}</div>
            </div>
            <ProductList onClick={handleClickAdd} />
            <NavBar detail={detail} />
        </div>
    );
}

export default Booking;
