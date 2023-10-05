import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import Customer from '~/components/Customer';

const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('home')}>
            <h2>Home page</h2>
            <Customer />
        </div>
    );
}

export default Home;
