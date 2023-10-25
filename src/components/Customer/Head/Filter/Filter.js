import classNames from 'classnames/bind';
import { useContext, useState } from 'react';
import styles from '~/components/Customer/Customer.module.scss';
import { AppContext } from '~/context/AppContext';

const cx = classNames.bind(styles);

function Filter({ tabs, active }) {
    const { filterCustomer } = useContext(AppContext);
    console.log(tabs);
    const handleFilterStatus = (status) => {
        filterCustomer({ status });
    };
    return (
        <>
            <div className={cx('tabs')}>
                {tabs.map((tab) => {
                    return (
                        <span
                            key={tab.key}
                            className={cx('tab-item', { active: tab.key === active })}
                            onClick={(e) => {
                                handleFilterStatus(tab.key);
                            }}
                        >
                            {tab.label}
                        </span>
                    );
                })}
            </div>
        </>
    );
}

export default Filter;
