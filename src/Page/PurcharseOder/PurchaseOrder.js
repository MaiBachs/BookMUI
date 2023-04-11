import classNames from 'classnames/bind';
import styles from './PurchaseOrder.module.scss';
import { useState } from 'react';
import DefaultLayout from '../../Layout/DefaultLayout/DefaultLayout';
import Button from 'react-bootstrap/Button';
import { HiOutlinePlusSm } from 'react-icons/hi';
import OrderDetails from './OrderDetails.js';
import { BsTrash3 } from 'react-icons/bs';
import axios from 'axios';

const cx = classNames.bind(styles);

function PurchaseOrder() {
    const [modalShow, setModalShow] = useState(false);
    const [order, setOrder] = useState([]);

    const handleOrder = (event) => {
        if (order.length < 1) {
            return alert('Chưa có thông tin về hóa đơn nhập hàng');
        }
        order.forEach((data) => {
            const token = localStorage.getItem('token');
            axios
                .post('http://localhost:8082/purchaseorder', data, { headers: { Authorization: `Bearer ${token}` } })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
        setOrder([]);
    };

    return (
        <div className={cx('wrapper')}>
            <DefaultLayout>
                <div className={cx('top')}>
                    <h3>Phiếu nhập hàng</h3>
                    <Button variant="primary" onClick={() => setModalShow(true)}>
                        <HiOutlinePlusSm className={cx('plus')} />
                        Thêm sách
                    </Button>
                    <OrderDetails
                        setOrder={setOrder}
                        order={order}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        setModalShow={setModalShow}
                    />
                </div>
                <div className={cx('mid')}>
                    <div className={cx('wrapper-table')}>
                        <table className={cx('table')}>
                            <thead>
                                <tr>
                                    <th>Tên sách</th>
                                    <th>Tác giả</th>
                                    <th>Thể loai</th>
                                    <th>Số lượng</th>
                                    <th>Đơn giá</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className={cx('tbody')}>
                                {order.map((item) => {
                                    return (
                                        <tr key={item.id} className={cx('tr')}>
                                            <td>{item.bookName}</td>
                                            <td>{item.bookAuthor}</td>
                                            <td>{item.bookCategory}</td>
                                            <td>{item.bookQuatity}</td>
                                            <td>{item.bookPrice}</td>
                                            <td>
                                                <BsTrash3 />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={cx('botton')}>
                    <Button onClick={handleOrder}>Lập phiếu nhập hàng</Button>
                </div>
            </DefaultLayout>
        </div>
    );
}

export default PurchaseOrder;
