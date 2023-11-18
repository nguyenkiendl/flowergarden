import classNames from 'classnames/bind';
import styles from '../ProductList.module.scss';
import { BookContext } from '~/context/BookContext';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import * as productServices from '~/apiServices/productServices';
const cx = classNames.bind(styles);
function Product({ item, onClick }) {
    const { show, setShow } = useContext(BookContext);
    const [note, setNote] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await productServices.productOptions();
            setOptions(result);
        };
        if (options.length === 0) fetchApi();
    }, []);

    const handleClose = () => {
        setShow(false);
    };

    const handleNoteChange = (note) => {
        setNote(note);
    };
    console.log(options);
    return (
        <>
            <div className={cx('product-side', { show: show })}>
                <div className={cx('thumbnail')}>
                    <button onClick={handleClose} className={cx('btn-close')}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                    <img src={`/assets/images/${item.thumbnail}`} alt={'thumnail'} />
                </div>
                <div className={cx('header')}>
                    <h3>
                        <span className={cx('name')}>{item.product_name}</span>
                        <span className={cx('price')}>{item.display_price}</span>
                    </h3>
                </div>
                <div className={cx('body')}>
                    <div className={cx('product')} onClick={() => onClick(item)}>
                        <div className={cx('options')}>
                            <h3></h3>
                            {options.map((option, index) => {
                                return (
                                    <div key={index} className={cx('option-item')}>
                                        <label>
                                            <input type="checkbox" value={option.option_id} />{' '}
                                            <span>{option.option_name}</span>
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={cx('note')}>
                            <label className="col">
                                <span className={cx('input-label')}>Ghi chú:</span>
                                <textarea
                                    rows={3}
                                    cols={4}
                                    defaultValue={note}
                                    onChange={(e) => handleNoteChange(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className={cx('quantity')}></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;
