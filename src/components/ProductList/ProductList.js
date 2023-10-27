import classNames from 'classnames/bind';
import styles from './ProductList.module.scss';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '~/context/AppContext';
import * as productServices from '~/apiServices/productServices';
import { PRODUCTS, WATERS } from '~/utils/constants';
import ProductItem from './ProductItem';

const cx = classNames.bind(styles);
function ProductList({ onClick }) {
    const [activeTab, setActiveTab] = useState('water');
    const [productList, setProductList] = useState([]);
    const [isReset, setIsReset] = useState(false);
    const { productSide } = useContext(AppContext);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await productServices.products();
            setProductList(result);
        };
        fetchApi();
    }, []);

    const handleTabControl = (tab) => {
        setActiveTab(tab);
    };

    const tabContent = (type) => {
        return productList.filter((obj) => {
            return obj.product_type === type;
        });
    };
    const subHeadTitle = (type) => {
        return WATERS.find((obj) => {
            return obj.key === type;
        })?.label;
    };

    return (
        <>
            <div className={cx('product-list')}>
                <nav className={cx('head')}>
                    <div className={cx('tabs')}>
                        {PRODUCTS.map((tab, index) => {
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
                <div className={cx('tab-content', { active: 'water' === activeTab })}>
                    {WATERS.map((obj) => {
                        return (
                            <div key={obj.key} className={cx('product-section')}>
                                <h4>{subHeadTitle(obj.key)}</h4>
                                <div className={cx('product-row')}>
                                    {tabContent(obj.key).map((item) => {
                                        return (
                                            <ProductItem
                                                key={item.product_id}
                                                item={item}
                                                isReset={isReset}
                                                onClick={onClick}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default ProductList;
