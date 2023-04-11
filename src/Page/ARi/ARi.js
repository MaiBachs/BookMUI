import styles from './ARi.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import DefaultLayout from '../../Layout/DefaultLayout/DefaultLayout';
import axios from 'axios';
import { BsSearch } from 'react-icons/bs';
import { RiBillLine } from 'react-icons/ri';
import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import ARiBill from './ARiBill.js';

const cx = classNames.bind(styles);

function ARi() {
    const [customers, setCustomers] = useState([]);
    const [choiceCustomer, setChoiceCustomer] = useState({});
    const [input, setInput] = useState('');
    const [modalShow, setModalShow] = React.useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            let rep;
            if (input === null || input === '') {
                rep = await axios.get('http://localhost:8082/getAllCustomer', {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                let a = customers.filter(
                    (customer) => customer.arInvoiceEntityList.length > 0 && customer.customerPhone === input,
                );
                if (Object.keys(a).length > 0) {
                    setCustomers(a);
                }
            }
            setCustomers(rep.data);
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
                        placeholder="Tìm kiếm theo SDT"
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
                                <th>Họ tên</th>
                                <th>Địa chỉ</th>
                                <th>SDT</th>
                                <th>Email</th>
                                <th>Tổng nợ</th>
                            </tr>
                        </thead>
                        <tbody className={cx('tbody')}>
                            {customers.map((customer) => {
                                if (customer.arInvoiceEntityList.length > 0) {
                                    return (
                                        <tr className={cx('tr')}>
                                            <td>{customer.customerName}</td>
                                            <td>{customer.customerAdress}</td>
                                            <td>{customer.customerPhone}</td>
                                            <td>{customer.customerEmail}</td>
                                            <td>
                                                <div className={cx('tob')}>
                                                    {customer.arInvoiceEntityList[0].tob}
                                                    <Button
                                                        className={cx('ari-bill')}
                                                        variant="primary"
                                                        onClick={() => {
                                                            setModalShow(true);
                                                            setChoiceCustomer(customer);
                                                        }}
                                                    >
                                                        <RiBillLine className={cx('icon')} />
                                                    </Button>

                                                    <ARiBill
                                                        setCustomers={setCustomers}
                                                        setChoiceCustomer={setChoiceCustomer}
                                                        choiceCustomer={choiceCustomer}
                                                        show={modalShow}
                                                        onHide={() => setModalShow(false)}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default ARi;
