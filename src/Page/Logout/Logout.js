import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Logout.module.scss';

const cx = classNames.bind(styles);

function Logout() {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('text')}>
                Xin trân trọng và cảm ơn quý khách đã ghé thăm cửa hàng sách, chúc quý khách có những phút giây thư giãn
                và tìm được sách ưng ý tại của hàng, có gì thắc mắc hãy nhờ nhân viên tư vấn để được giải đáp
            </div>
            <br></br>
            <Button variant="primary" onClick={handleLogin}>
                Đăng nhập
            </Button>{' '}
        </div>
    );
}

export default Logout;
