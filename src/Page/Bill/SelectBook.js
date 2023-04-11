import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import classNames from 'classnames/bind';
import styles from './SelectBook.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BsSearch } from 'react-icons/bs';

const cx = classNames.bind(styles);

function SelectBook(props) {
    const [bookList, setBookList] = useState([]);
    const [input, setInput] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            let rep;
            if (input == null || input == '') {
                rep = await axios.get('http://localhost:8082/getAllBook', {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                rep = await axios.post(
                    'http://localhost:8082/getBookByName',
                    { bookName: input },
                    { headers: { Authorization: `Bearer ${token}` } },
                );
            }
            for (let i = 0; i < rep.data.length; i++) {
                rep.data[i].quatity = Number;
            }
            setBookList(rep.data);
            props.setSelectedBooks(bookList);
        };
        fetchData();
    }, [input]);

    const handleSearch = (event) => {
        setInput(event.target.value);
    };

    const handleSelectedBooks = (event, bookName) => {
        for (let i = 0; i < bookList.length; i++) {
            if (bookList[i].bookName == bookName) {
                bookList[i].quatity = Number(event.target.value);
            }
        }
    };

    const handleOk = () => {
        props.setSelectedBooks(bookList);
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <div className={cx('Modal')}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body className={cx('Modal-body')}>
                    <div className={cx('wrapper')}>
                        <div className={cx('search-box')}>
                            <input
                                className={cx('search')}
                                placeholder="Tìm kiếm theo tên"
                                value={input}
                                onChange={(event) => {
                                    handleSearch(event);
                                }}
                            ></input>
                            <button className={cx('button-search')} onClick={() => {}}>
                                <BsSearch className={cx('icon-search')} />
                            </button>
                        </div>
                        <div className={cx('wrapper-table')}>
                            <table className={cx('table')}>
                                <thead>
                                    <tr>
                                        <th>Tên sách</th>
                                        <th>Tác giả</th>
                                        <th>Thể loai</th>
                                        <th>Giá sách</th>
                                        <th>Lượng tồn</th>
                                        <th>Nhập số lượng</th>
                                    </tr>
                                </thead>
                                <tbody className={cx('tbody')}>
                                    {bookList.map((item) => {
                                        return (
                                            <tr key={item.id} className={cx('tr')}>
                                                <td>{item.bookName}</td>
                                                <td>{item.bookAuthor}</td>
                                                <td>{item.bookCategory}</td>
                                                <td>{item.bookPrice}</td>
                                                <td>{item.bookInventory}</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className={cx('quatity')}
                                                        onChange={(event) => {
                                                            handleSelectedBooks(event, item.bookName);
                                                        }}
                                                    ></input>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className={cx('Modal-Footer')}>
                    <Button
                        onClick={() => {
                            props.onHide();
                            handleOk();
                        }}
                    >
                        Ok
                    </Button>
                </Modal.Footer>
            </div>
        </Modal>
    );
}

export default SelectBook;
