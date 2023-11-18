import classNames from 'classnames/bind';
import styles from './ProductList.module.scss';
import { useContext, useEffect, useState } from 'react';
import * as productServices from '~/apiServices/productServices';
import { WATERS } from '~/utils/constants';
import ProductItem from './ProductItem';
import { BookContext } from '~/context/BookContext';
import Product from './Product/Product';
const cx = classNames.bind(styles);
function ProductList({ onClick }) {
    const [activeTab, setActiveTab] = useState('water');
    const { setShow, productList, setProductList } = useContext(BookContext);
    const [product, setProduct] = useState({});
    useEffect(() => {
        const fetchApi = async () => {
            const result = await productServices.products();
            setProductList(result);
        };
        if (productList.length === 0) fetchApi();
    }, []);

    const handleTabControl = (tab) => {
        setActiveTab(tab);
    };

    const tabControl = () => {
        const newTabs =
            productList?.map((obj) => {
                return {
                    key: obj.category_key,
                    label: obj.category_name,
                };
            }) || [];
        return newTabs;
    };

    const subHeadTitle = (type) => {
        return WATERS.find((obj) => {
            return obj.key === type;
        })?.label;
    };

    const handleClick = (product) => {
        if (activeTab === 'water') {
            setShow(true);
            setProduct(product);
        } else {
            onClick(product);
        }
    };
    return (
        <>
            <div className={cx('product-list')}>
                <nav className={cx('head')}>
                    <div className={cx('tabs')}>
                        {tabControl().map((tab, index) => {
                            return (
                                <span
                                    key={index}
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
                {productList.map((obj) => {
                    return (
                        <div
                            key={obj.category_key}
                            className={cx('tab-content', { active: obj.category_key === activeTab })}
                        >
                            <div className={cx('product-section')}>
                                {Object.keys(obj.products).map((keyName) => {
                                    const subProducts = obj.products[keyName];
                                    return (
                                        <div key={keyName} className={cx('product-row')}>
                                            <h4>{subHeadTitle(keyName)}</h4>
                                            {subProducts.map((item) => {
                                                return (
                                                    <ProductItem
                                                        key={item.product_id}
                                                        item={item}
                                                        onClick={() => handleClick(item)}
                                                    />
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
            <Product item={product} />
            <div className={cx('fragment')}></div>
        </>
    );
}

export default ProductList;
