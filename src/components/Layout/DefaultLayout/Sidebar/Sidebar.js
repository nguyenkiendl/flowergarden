import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger, faHouse, faMugSaucer, faTicket } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useRef } from 'react';
import { AppContext } from '~/context/AppContext';

const cx = classNames.bind(styles);
function Sidebar() {
    const { openBar, setOpenBar } = useContext(AppContext);

    const handleNavClick = () => {
        setOpenBar(false);
    };
    /**
     * Hook that alerts clicks outside of the passed ref
     */
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setOpenBar(false);
                }
            }
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref]);
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    return (
        <aside ref={wrapperRef} className={cx('sidebar', { show: openBar })}>
            <ul>
                <li>
                    <NavLink to="/" className="nav-link" onClick={handleNavClick}>
                        <FontAwesomeIcon icon={faHouse} />
                        <strong>Home</strong>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/tickets" className="nav-link" onClick={handleNavClick}>
                        <FontAwesomeIcon icon={faTicket} />
                        <strong>NV BÁN VÉ</strong>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/customers" className="nav-link" onClick={handleNavClick}>
                        <FontAwesomeIcon icon={faBurger} />
                        <strong>NV ORDER</strong>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/bartenders" className="nav-link" onClick={handleNavClick}>
                        <FontAwesomeIcon icon={faMugSaucer} />
                        <strong>NV PHA CHẾ</strong>
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
