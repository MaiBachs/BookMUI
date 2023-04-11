import Sidebar from '../../Component/Sidebar/Sidebar.js';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Sidebar1 from '../../Component/Sidebar/Sidebar1.js';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <Sidebar1 />
            </div>
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default DefaultLayout;
