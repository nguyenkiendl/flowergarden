import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

import Add from '~/pages/Home/add';

const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('home')}>
            <h2>Home page</h2>
            <div className={cx('btn-user-add')}>
                <FontAwesomeIcon icon={faUserPlus} />
                <strong>Thêm Khách Hàng</strong>
            </div>
            <Add />
        </div>
    );
}

export default Home;
