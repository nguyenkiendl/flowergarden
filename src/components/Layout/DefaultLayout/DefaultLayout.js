import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/components/Layout/components/Header';
import Sidebar from './Sidebar';
import CustomerSide from './CustomerSide';
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
            {/* <CustomerSide /> */}
        </div>
    );
}

export default DefaultLayout;
