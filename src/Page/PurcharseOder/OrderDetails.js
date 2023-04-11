import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import classNames from 'classnames/bind';
import styles from './OrderDetails.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function OrderDetails(props) {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);

    const [form, setForm] = useState({
        bookName: '',
        bookAuthor: '',
        bookCategory: '',
        bookDescription: '',
        bookQuatity: '',
        bookPrice: '',
        receivedDate: formattedDate,
        coverBook: '',
    });

    const handleSetform = (event) => {
        if (!isNaN(event.target.value) && event.target.value !== '') {
            setForm({
                ...form,
                [event.target.name]: Number(event.target.value),
            });
        } else {
            setForm({
                ...form,
                [event.target.name]: event.target.value,
            });
        }
    };

    const handleConfirm = () => {
        let check = Object.values(form).every((value) => value !== '');
        if (check === false) {
            alert('Vui lòng nhập đầy đủ thông tin');
            return props.setModalShow(true);
        }
        props.setOrder([
            ...props.order,
            {
                ...form,
                payments: form.bookPrice * form.bookQuatity,
            },
        ]);
        setForm({
            bookName: '',
            bookAuthor: '',
            bookCategory: '',
            bookDescription: '',
            bookQuatity: '',
            bookPrice: '',
            receivedDate: formattedDate,
            coverBook: '',
        });
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body className={cx('modal-body')}>
                <table>
                    <tbody>
                        <tr>
                            <td className={cx('lable')}>Tên sách</td>
                            <td className={cx('value')}>
                                <input onChange={handleSetform} name="bookName" value={form.bookName}></input>
                            </td>
                        </tr>
                        <tr>
                            <td className={cx('lable')}>Tác giả</td>
                            <td className={cx('value')}>
                                <input onChange={handleSetform} name="bookAuthor" value={form.bookAuthor}></input>
                            </td>
                        </tr>
                        <tr>
                            <td className={cx('lable')}>Thể loại</td>
                            <td className={cx('value')}>
                                <input onChange={handleSetform} name="bookCategory" value={form.bookCategory}></input>
                            </td>
                        </tr>
                        <tr>
                            <td className={cx('lable')}>Link cover</td>
                            <td className={cx('value')}>
                                <input onChange={handleSetform} name="coverBook" value={form.coverBook}></input>
                            </td>
                        </tr>
                        <tr>
                            <td className={cx('lable')}>Số lượng</td>
                            <td className={cx('value')}>
                                <input
                                    type="number"
                                    onChange={handleSetform}
                                    name="bookQuatity"
                                    value={form.bookQuatity}
                                ></input>
                            </td>
                            <td className={cx('lable')}>Đơn giá</td>
                            <td className={cx('value')}>
                                <input
                                    type="number"
                                    onChange={handleSetform}
                                    name="bookPrice"
                                    value={form.bookPrice}
                                ></input>
                            </td>
                        </tr>
                        <tr className={cx('shortd')}>
                            <td className={cx('lable')}>Mô tả ngắn</td>
                            <td className={cx('valued')}>
                                <textarea
                                    onChange={handleSetform}
                                    name="bookDescription"
                                    value={form.bookDescription}
                                    size="50"
                                ></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <input
                    type="date"
                    name="receivedDate"
                    className={cx('date')}
                    value={form.receivedDate}
                    onChange={handleSetform}
                ></input>
                <Button
                    onClick={() => {
                        handleConfirm();
                        props.onHide();
                    }}
                >
                    Confirm{' '}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default OrderDetails;
