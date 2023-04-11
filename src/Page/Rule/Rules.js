import classNames from 'classnames/bind';
import styles from './Rules.module.scss';
import { useState, useEffect } from 'react';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import DefaultLayout from '../../Layout/DefaultLayout/DefaultLayout';

const cx = classNames.bind(styles);

function Rules() {
    const [rules, setRules] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        axios
            .get('http://localhost:8082/findAllRule', { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => setRules(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <DefaultLayout>
            <div className={cx('wrapper')}>
                <TableContainer className={cx('table')} component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={cx('th')} align="right">
                                    STT
                                </TableCell>
                                <TableCell className={cx('th')} align="right">
                                    Tên quy định
                                </TableCell>
                                <TableCell className={cx('th')} align="right">
                                    Mô tả quy định
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rules.map((rule) => (
                                <TableRow key={rule.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell className={cx('td')} align="right">
                                        {rule.id}
                                    </TableCell>
                                    <TableCell className={cx('td')} align="right">
                                        {rule.ruleName}
                                    </TableCell>
                                    <TableCell className={cx('td')} align="right">
                                        {rule.ruleDesciption}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </DefaultLayout>
    );
}

export default Rules;
