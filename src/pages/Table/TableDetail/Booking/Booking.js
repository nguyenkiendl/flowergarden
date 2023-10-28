import classNames from 'classnames/bind';
import styles from '~/pages/Table/Table.module.scss';
const cx = classNames.bind(styles);
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import * as tableServices from '~/apiServices/tableServices';
import NavBar from '~/components/NavBar';
import { dateNow } from '~/utils/filters';
import ProductList from '~/components/ProductList';
import * as cartServices from '~/apiServices/cartServices';
import { AppContext } from '~/context/AppContext';
import CartSide from '~/components/Layout/DefaultLayout/CartSide';
function Booking() {
    const { tableId, orderId } = useParams();
    const [detail, setDetail] = useState({});
    const [carts, setCarts] = useState([]);
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

    useEffect(() => {
        const apiFetchCart = async () => {
            const res = await cartServices.getCarts({
                params: {
                    order_id: Number(orderId),
                },
            });
            if (res !== undefined) {
                const datas = res.map( (obj, index) => {
                    return {...obj, id: index + 1}
                })
                setCarts(datas);
            }
        };
        if (orderId) apiFetchCart();
    }, [orderId]);

    const cartCount = carts.reduce((total, item) => total + item.quantity, 0);

    const handleClickAdd = (product) => {
        // const addToCart = async () => {
        //     const res = await cartServices.addToCart({
        //         order_id: Number(orderId),
        //         product_id: Number(productId),
        //     });
        //     if (res.status) {
        //         const count = res.data;
        //         setCartCount(count);
        //     }
        // };
        // addToCart();
        
        const existCart = carts.some( obj => obj.product_id === product.product_id);
        if(existCart) {
            setCarts( prevCart => {
                const newCarts = prevCart.map( obj => {
                    if (obj.product_id === product.product_id) {
                        const newQuantity = obj.quantity + 1;
                        return {...obj, quantity: newQuantity}
                    }
                    return obj;
                })
                return newCarts;
            })
            
        } else {
            const newCarItem = {
                ...product,
                id: carts.length + 1,
                quantity: 1
            }
            setCarts([...carts, newCarItem]);
        }
        
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
            <CartSide carts={carts} setCarts={setCarts}/>
            <NavBar cartCount={cartCount} />
        </div>
    );
}

export default Booking;
