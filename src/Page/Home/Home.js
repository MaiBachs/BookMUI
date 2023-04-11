import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import DefaultLayout from '../../Layout/DefaultLayout/DefaultLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { AiFillDollarCircle } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const cx = classNames.bind(styles);
function Home() {
    const [Home, setHome] = useState({});
    const data = {
        labels: ['Biểu đồ tình trạng của hàng'],
        datasets: [
            {
                label: 'Số lượng sách',
                data: [Home.totalDebtBook],
                backgroundColor: 'red',
                borderColor: 'green',
                borderWidth: 1,
                borderSkipped: 'bottom',
            },
            {
                label: 'Số lượng khách hàng nợ',
                data: [Home.totalDebtCustomer],
                backgroundColor: 'yellow',
                borderColor: 'green',
                borderWidth: 1,
            },
        ],
    };
    const options = {
        plugins: {
            legend: {
                position: 'bottom',
                display: true,
                align: 'start',
                labels: {
                    color: '#ffffff',
                    boxWidth: 20,
                    usePointStyle: true,
                    font: {
                        size: 16,
                    },
                },
            },
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            let rep = await axios.get('http://localhost:8082/pagebusiness', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setHome(rep.data[0]);
        };
        fetchData();
    }, []);

    return (
        <DefaultLayout>
            <div className={cx('wrapper')}>
                <div className={cx('business')}>
                    <div className={cx('revenue')}>
                        <span>Doanh Thu</span>
                        <p>
                            <AiFillDollarCircle className={cx('dola')} />
                            {Home.revenue}
                        </p>
                    </div>
                    <div className={cx('profit')}>
                        <span>Lợi Nhuận</span>
                        <p>
                            <AiFillDollarCircle className={cx('dola')} />
                            {Home.profit}
                        </p>
                    </div>
                    <div className={cx('customerNumber')}>
                        <span>Lượng Khách</span>
                        <p>
                            <FaUserFriends className={cx('dola')} />
                            {Home.customerNumber}
                        </p>
                    </div>
                </div>
                <Bar className={cx('bar')} data={data} options={options}></Bar>
            </div>
        </DefaultLayout>
    );
}

export default Home;
