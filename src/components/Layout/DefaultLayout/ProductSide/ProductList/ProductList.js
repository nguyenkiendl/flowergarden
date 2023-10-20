import classNames from 'classnames/bind';
import styles from './ProductList.module.scss';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '~/context/AppContext';
import { useParams } from 'react-router-dom';
import * as productServices from '~/apiServices/productServices';
import { PRODUCTS_TAB } from '~/utils/constants';
import ProductItem from './ProductItem';

const cx = classNames.bind(styles);
function ProductList({ onChange }) {
    const [activeTab, setActiveTab] = useState('water');
    const [productList, setProductList] = useState([]);
    const [isReset, setIsReset] = useState(false);
    const { productSide } = useContext(AppContext);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await productServices.products();
            setProductList(result);
        };
        if (productSide === true) fetchApi();
    }, [productSide]);

    const handleTabControl = (tab) => {
        setActiveTab(tab);
    };

    const tabContent = (type) => {
        return productList.filter((obj) => {
            return obj.product_type === type;
        });
    };

    return (
        <>
            <div className={cx('product-list')}>
                <nav className={cx('head')}>
                    <div className={cx('tabs')}>
                        {PRODUCTS_TAB.map((tab) => {
                            return (
                                <span
                                    key={tab.key}
                                    className={cx('tab-item', { active: tab.key === activeTab })}
                                    onClick={(e) => {
                                        handleTabControl(tab.key);
                                    }}
                                >
                                    {tab.label}
                                </span>
                            );
                        })}
                    </div>
                </nav>
                <div className={cx('tab-content', { active: activeTab === 'water' })}>
                    <div className={cx('product-row')}>
                        {tabContent('water').map((item, index) => {
                            return <ProductItem key={index} item={item} isReset={isReset} onChange={onChange} />;
                        })}
                    </div>
                </div>
                <div className={cx('tab-content', { active: activeTab === 'food' })}>
                    <div className={cx('product-row')}>
                        {tabContent('food').map((item, index) => {
                            return <ProductItem key={index} item={item} isReset={isReset} onChange={onChange} />;
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductList;
