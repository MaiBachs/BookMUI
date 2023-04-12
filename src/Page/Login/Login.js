import React from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import './Login.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const navigate = useNavigate();
    const [account, setAccount] = useState({
        userName: '',
        password: '',
        rememberPassword: localStorage.getItem('remember') === 'true',
    });

    const handleChechbox = (e) => {
        localStorage.setItem('remember', e.target.checked);
        console.log(e.target.checked);
        setAccount({ ...account, rememberPassword: localStorage.getItem('remember') });
    };

    const handleAccount = (event) => {
        setAccount({
            ...account,
            [event.target.name]: event.target.value,
        });
    };

    const handleLogin = () => {
        axios
            .post('https://host.up.railway.app/api/v1/auth/login', {
                userName: account.userName,
                password: account.password,
            })
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                navigate('/home');
                alert('Login successful!');
            })
            .catch((error) => alert('Đăng nhập thất bại'));

        if (localStorage.getItem('remember') === 'false') {
            console.log('Bach');
            setAccount({
                ...account,
                password: '',
            });
        }
    };

    return (
        <MDBContainer fluid className="p-3 my-5 h-custom">
            <ToastContainer />
            <MDBRow>
                <MDBCol col="10" md="6">
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        class="img-fluid"
                        alt="Sample image"
                    />
                </MDBCol>

                <MDBCol col="4" md="6">
                    <div className="d-flex flex-row align-items-center justify-content-center">
                        <p className="lead fw-normal mb-0 me-3">Sign in with</p>

                        <MDBBtn floating size="md" tag="a" className="me-2">
                            <MDBIcon fab icon="facebook-f" />
                        </MDBBtn>

                        <MDBBtn floating size="md" tag="a" className="me-2">
                            <MDBIcon fab icon="twitter" />
                        </MDBBtn>

                        <MDBBtn floating size="md" tag="a" className="me-2">
                            <MDBIcon fab icon="linkedin-in" />
                        </MDBBtn>
                    </div>

                    <div className="divider d-flex align-items-center my-4">
                        <p className="text-center fw-bold mx-3 mb-0">Or</p>
                    </div>

                    <MDBInput
                        wrapperClass="mb-4"
                        label="Email address"
                        id="formControlLg"
                        type="email"
                        size="lg"
                        name="userName"
                        value={account.userName}
                        onChange={handleAccount}
                    />
                    <MDBInput
                        wrapperClass="mb-4"
                        label="Password"
                        id="formControlLg"
                        type="password"
                        size="lg"
                        name="password"
                        value={account.password}
                        onChange={handleAccount}
                    />

                    <div className="d-flex justify-content-between mb-4">
                        <div class="form-check">
                            <input
                                onChange={handleChechbox}
                                class="form-check-input"
                                type="checkbox"
                                checked={account.rememberPassword}
                                id="flexCheckCheckedDisabled"
                            />
                            <label class="form-check-label" for="flexCheckCheckedDisabled">
                                Remember me
                            </label>
                        </div>
                        <a href="!#">Forgot password?</a>
                    </div>

                    <div className="text-center text-md-start mt-4 pt-2">
                        <Button className="mb-0" size="lg" onClick={handleLogin}>
                            Login
                        </Button>
                        <p className="small fw-bold mt-2 pt-1 mb-2">
                            Don't have an account?{' '}
                            <a href="#!" className="link-danger">
                                Register
                            </a>
                        </p>
                    </div>
                </MDBCol>
            </MDBRow>

            <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                <div className="text-white mb-3 mb-md-0">Login Bookmanagerment</div>

                <div>
                    <MDBBtn tag="a" color="none" className="mx-3" style={{ color: 'white' }}>
                        <MDBIcon fab icon="facebook-f" size="md" />
                    </MDBBtn>

                    <MDBBtn tag="a" color="none" className="mx-3" style={{ color: 'white' }}>
                        <MDBIcon fab icon="twitter" size="md" />
                    </MDBBtn>

                    <MDBBtn tag="a" color="none" className="mx-3" style={{ color: 'white' }}>
                        <MDBIcon fab icon="google" size="md" />
                    </MDBBtn>

                    <MDBBtn tag="a" color="none" className="mx-3" style={{ color: 'white' }}>
                        <MDBIcon fab icon="linkedin-in" size="md" />
                    </MDBBtn>
                </div>
            </div>
        </MDBContainer>
    );
}

export default Login;
