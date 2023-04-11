import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div>
            <Button variant="primary" onClick={handleLogin}>
                Đăng nhập
            </Button>{' '}
        </div>
    );
}

export default Logout;
