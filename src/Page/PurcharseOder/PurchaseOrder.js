import classNames from 'classnames/bind';
import styles from './PurchaseOrder.module.scss';
import { useState } from 'react';
import DefaultLayout from '../../Layout/DefaultLayout/DefaultLayout';
import Button from 'react-bootstrap/Button';
import { HiOutlinePlusSm } from 'react-icons/hi';
import OrderDetails from './OrderDetails.js';
import { BsTrash3 } from 'react-icons/bs';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                .post('https://host.up.railway.app/purchaseorder', data, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    alert('Nhập hàng thành công');
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
                        <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Tên sách</th>
                                    <th scope="col">Tác giả</th>
                                    <th scope="col">Thể loai</th>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col">Đơn giá</th>
                                    <th scope="col">Xóa</th>
                                </tr>
                            </thead>
                            <tbody className="body">
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
