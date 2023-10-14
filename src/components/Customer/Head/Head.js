import classNames from 'classnames/bind';

import styles from '~/components/Customer/Customer.module.scss';
import { CUSTOMER_TAB } from '~/utils/constants';

const cx = classNames.bind(styles);

function Head() {
    return (
        <>
            <nav className={cx('head')}>
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
