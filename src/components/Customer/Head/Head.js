import classNames from 'classnames/bind';
import { useContext, useState } from 'react';

import styles from '~/components/Customer/Customer.module.scss';
import { AppContext } from '~/context/AppContext';
import { CUSTOMER_TAB } from '~/utils/constants';

const cx = classNames.bind(styles);

function Head() {
    const [q, setQ] = useState('');
    const [searchParam] = useState(['customer_type', 'customer_code']);
    const { custometList } = useContext(AppContext);
    const search = () => {
        return custometList.filter((item) => {
            return searchParam.some((newItem) => {
                return item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1;
            });
        });
    };
    return (
        <>
            <nav className={cx('head')}>
                <div className={cx('customer-search')}>
                    <input
                        type="search"
                        name="search-form"
                        id="search-form"
                        className={cx('search-input')}
                        placeholder="Search for..."
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                    />
                </div>
                <div className={cx('tabs')}>
                    {CUSTOMER_TAB.map((tab) => {
                        return (
                            <span key={tab.key} className={cx('tab-item', { active: tab.active })}>
                                {tab.label}
                            </span>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}

export default Head;
