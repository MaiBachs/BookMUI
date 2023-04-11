import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { VscFolderLibrary } from 'react-icons/vsc';
import { AiFillHome, AiOutlineFileSearch, AiFillNotification } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { RiBillFill } from 'react-icons/ri';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { BiImport } from 'react-icons/bi';
import { TbLogout } from 'react-icons/tb';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <h1>
                    <VscFolderLibrary className={cx('book-logo')} />
                    BookM
                </h1>
            </div>
            <div className={cx('content')}>
                <ul className={cx('ul')}>
                    <li>
                        <AiFillHome className={cx('home')} />
                        <Link to="/home" className={cx('link')}>
                            Trang chính
                        </Link>
                    </li>
                    <li>
                        <AiOutlineFileSearch className={cx('search')} />
                        <Link to="/getbook" className={cx('link')}>
                            Tra cứu sách
                        </Link>
                    </li>
                    <li>
                        <RiBillFill className={cx('bill')} />
                        <Link to="/bill" className={cx('link')}>
                            Lập hóa đơn
                        </Link>
                    </li>
                    <li>
                        <FaRegMoneyBillAlt className={cx('ari')} />
                        <Link to="/ari" className={cx('link')}>
                            Phiếu thu tiền nợ
                        </Link>
                    </li>
                    <li>
                        <BiImport className={cx('import')} />
                        <Link to="/purchaseoder" className={cx('link')}>
                            Phiếu nhập hàng
                        </Link>
                    </li>
                    <li>
                        <AiFillNotification className={cx('Rules')} />
                        <Link to="/rule" className={cx('link')}>
                            Quy định
                        </Link>
                    </li>
                    <li>
                        <TbLogout className={cx('logout')} />
                        <Link className={cx('link')}>Đăng xuất</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
