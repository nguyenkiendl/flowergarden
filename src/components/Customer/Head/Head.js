import classNames from 'classnames/bind';

import styles from '~/components/Customer/Customer.module.scss';

const cx = classNames.bind(styles);

function Head() {
    return (
        <>
            <div className={cx('head')}></div>
        </>
    );
}

export default Head;
