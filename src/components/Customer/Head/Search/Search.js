import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useContext, useRef, useState } from 'react';
import styles from '~/components/Customer/Customer.module.scss';
import { AppContext } from '~/context/AppContext';

const cx = classNames.bind(styles);

function Search() {
    const refInputSearch = useRef(null);
    const [q, setQ] = useState('');
    const { searchCustomer } = useContext(AppContext);
    const handleFocus = (event) => {
        event.target.select();
    };

    const handleSearch = () => {
        searchCustomer(q);
    };

    return (
        <>
            <div className={cx('customer-search')}>
                <input
                    type="search"
                    className={cx('search-input')}
                    placeholder="Search for..."
                    ref={refInputSearch}
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    onFocus={handleFocus}
                />
                <button className={cx('btn-search')} onClick={handleSearch}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </>
    );
}

export default Search;
