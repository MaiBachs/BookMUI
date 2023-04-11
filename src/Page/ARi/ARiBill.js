import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import classNames from 'classnames/bind';
import styles from './ARiBill.module.scss';
import { useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function ARiBill(props) {
    const [paid, setPaid] = useState();
    const token = localStorage.getItem('token');
    const handlePaid = (event) => {
        setPaid(event.target.value);
    };
    const handleConfirm = () => {
        axios
            .post(
                'http://localhost:8082/arinvoice',
                {
                    id: props.choiceCustomer.arInvoiceEntityList[0].id,
                    paid: paid,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            )
            .then((response) => {
                axios
                    .get('http://localhost:8082/getAllCustomer', {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((response) => {
                        props.setCustomers(response.data);
                    });
                setPaid();
                props.setChoiceCustomer({});
                alert('Trả nợ thành công');
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <div className={cx('Modal')}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Phiếu thu nợ</Modal.Title>
                </Modal.Header>
                <Modal.Body className={cx('Modal-body')}>
                    <div className={cx('wrapper')}>
                        <div className={cx('wrapper-table')}>
                            {Object.keys(props.choiceCustomer).length > 0 && (
                                <table className={cx('table')}>
                                    <tr>
                                        <td>
                                            <h4>Tên khách hàng: </h4>
                                        </td>
                                        <td>{props.choiceCustomer.customerName}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>Địa chỉ: </h4>
                                        </td>
                                        <td>{props.choiceCustomer.customerAdress}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>Điện thoại: </h4>
                                        </td>
                                        <td>{props.choiceCustomer.customerPhone}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>Email: </h4>
                                        </td>
                                        <td>{props.choiceCustomer.customerEmail}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>Số tiền nợ:</h4>
                                        </td>
                                        <td>{props.choiceCustomer.arInvoiceEntityList[0].tob}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>Thanh toán</h4>
                                        </td>
                                        <td>
                                            <input value={paid} onChange={handlePaid}></input>
                                        </td>
                                    </tr>
                                </table>
                            )}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className={cx('Modal-Footer')}>
                    <Button
                        onClick={() => {
                            handleConfirm();
                            props.onHide();
                        }}
                    >
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </div>
        </Modal>
    );
}

export default ARiBill;
