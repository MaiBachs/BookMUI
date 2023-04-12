import classNames from 'classnames/bind';
import styles from './Book.module.scss';
import DefaultLayout from '../../Layout/DefaultLayout/DefaultLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BsSearch } from 'react-icons/bs';

const cx = classNames.bind(styles);
function Book() {
    const [bookList, setBookList] = useState([]);
    const [input, setInput] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            let rep;
            if (input == null || input === '') {
                rep = await axios.get('https://host.up.railway.app/getAllBook', {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                rep = await axios.post(
                    'https://host.up.railway.app/getBookByName',
                    { bookName: input },
                    { headers: { Authorization: `Bearer ${token}` } },
                );
            }
            setBookList(rep.data);
            console.log(rep.data);
        };
        fetchData();
    }, [input]);

    const handleSearch = (event) => {
        setInput(event.target.value);
    };

    return (
        <DefaultLayout>
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
                            </tr>
                        </thead>
                        <tbody className={cx('tbody')}>
                            {bookList.map((item) => {
                                return (
                                    <tr className={cx('tr')}>
                                        <td>{item.bookName}</td>
                                        <td>{item.bookAuthor}</td>
                                        <td>{item.bookCategory}</td>
                                        <td>{item.bookPrice}</td>
                                        <td>{item.bookInventory}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Book;
