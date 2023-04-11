import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Bill.module.scss';
import DefaultLayout from '../../Layout/DefaultLayout/DefaultLayout';
import { HiOutlinePlusSm } from 'react-icons/hi';
import Button from 'react-bootstrap/Button';
import SelectBook from './SelectBook.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const cx = classNames.bind(styles);

function Bill() {
    const [modalShow, setModalShow] = useState(false);
    let [selectedBooks, setSelectedBooks] = useState([]);
    const token = localStorage.getItem('token');
    const [form, setForm] = useState({
        name: '',
        adress: '',
        phone: '',
        email: '',
    });
    // sách sau khi được lọc để đưa vào bill
    const handleSetForm = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handlePayments = () => {
        const checkNull = Object.values(form).every((value) => value !== '');
        const books = selectedBooks.filter((book) => book.quatity > 0);
        if (checkNull === false || books.length < 1) {
            return alert('Vui lòng nhập đầy đủ dữ liệu');
        }
        let booksListInBill = [];
        books.forEach((book) => {
            booksListInBill = [
                ...booksListInBill,
                {
                    nameBook: book.bookName,
                    quatity: book.quatity,
                    totalPrice: book.quatity * book.bookPrice,
                },
            ];
        });
        const payments = books.reduce((acc, value) => {
            return acc + value.bookPrice * value.quatity;
        }, 0);
        axios
            .post(
                'http://localhost:8082/bill',
                {
                    ...form,
                    payments: payments,
                    bookListInBillsEntity: booksListInBill,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            )
            .then((response) => {
                setForm({
                    name: '',
                    adress: '',
                    phone: '',
                    email: '',
                });
                setSelectedBooks([]);
                alert('Thanh toán thành công');
            })
            .catch((error) => console.log(error.message));
    };
    const handleDebit = () => {
        const checkNull = Object.values(form).every((value) => value !== '');
        const books = selectedBooks.filter((book) => book.quatity > 0);
        if (checkNull === false || books.length < 1) {
            return alert('Vui lòng nhập đầy đủ dữ liệu');
        }
        let booksListInBill = [];
        books.forEach((book) => {
            booksListInBill = [
                ...booksListInBill,
                {
                    nameBook: book.bookName,
                    quatity: book.quatity,
                    totalPrice: book.quatity * book.bookPrice,
                },
            ];
        });
        const tob = books.reduce((acc, value) => {
            return acc + value.bookPrice * value.quatity;
        }, 0);
        if (tob > 500000) {
            return alert('Giá trị đơn hàng nợ không vượt quá 500.000đ');
        }
        axios
            .post(
                'http://localhost:8082/bill',
                {
                    ...form,
                    tob: tob,
                    bookListInBillsEntity: booksListInBill,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            )
            .then((response) => {
                setForm({
                    name: '',
                    adress: '',
                    phone: '',
                    email: '',
                });
                setSelectedBooks([]);
                if (Object.keys(response.data).length === 0) {
                    alert('Vui lòng thanh toán cho hóa đơn lần trước');
                } else {
                    alert('Ghị nợ thành công');
                }
            })
            .catch((error) => console.log(error.message));
    };

    return (
        <DefaultLayout>
            <div className={cx('wrapper')}>
                <div className={cx('info-customer')}>
                    <div className={cx('title')}>Thông tin khách hàng</div>
                    <div className={cx('input-info')}>
                        <div className={cx('div1')}>
                            <div className={cx('name-box')}>
                                <span>Tên khách hàng</span>
                                <input
                                    className={cx('name')}
                                    name="name"
                                    onChange={handleSetForm}
                                    value={form.name}
                                ></input>
                            </div>
                            <div className={cx('adress-box')}>
                                <span>Địa chỉ</span>
                                <input
                                    className={cx('adress')}
                                    name="adress"
                                    onChange={handleSetForm}
                                    value={form.adress}
                                ></input>
                            </div>
                        </div>
                        <div className={cx('div2')}>
                            <div className={cx('phone-number-box')}>
                                <span>Số điện thoại</span>
                                <input
                                    className={cx('phone-number')}
                                    onChange={handleSetForm}
                                    value={form.phone}
                                    name="phone"
                                ></input>
                            </div>
                            <div className={cx('email-box')}>
                                <span>Email</span>
                                <input
                                    type="email"
                                    className={cx('email')}
                                    onChange={handleSetForm}
                                    value={form.email}
                                    name="email"
                                ></input>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('button')}>
                    <Button className={cx('payment')} onClick={handlePayments}>
                        Thanh toán
                    </Button>
                    <Button className={cx('debit')} onClick={handleDebit}>
                        Ghi nợ
                    </Button>
                    <Button variant="primary" onClick={() => setModalShow(true)}>
                        <HiOutlinePlusSm className={cx('plus')} />
                        Thêm sách
                    </Button>
                </div>

                <SelectBook
                    selectedBooks={selectedBooks}
                    setSelectedBooks={setSelectedBooks}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                <div className={cx('wrapper-table-selected')}>
                    <table className={cx('table')}>
                        <thead>
                            <tr>
                                <th>Tên sách</th>
                                <th>Tác giả</th>
                                <th>Thể loai</th>
                                <th>Giá sách</th>
                                <th>Số lượng</th>
                            </tr>
                        </thead>
                        <tbody className={cx('tbody')}>
                            {selectedBooks.map((item) => {
                                if (item.quatity > 0) {
                                    return (
                                        <tr key={item.id} className={cx('tr')}>
                                            <td>{item.bookName}</td>
                                            <td>{item.bookAuthor}</td>
                                            <td>{item.bookCategory}</td>
                                            <td>{item.bookPrice}</td>
                                            <td>{item.quatity}</td>
                                        </tr>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Bill;
