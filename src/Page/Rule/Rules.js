import styles from './Rules.scss';
import { useState, useEffect } from 'react';

import * as React from 'react';
import axios from 'axios';
import DefaultLayout from '../../Layout/DefaultLayout/DefaultLayout';

function Rules() {
    const [rules, setRules] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        axios
            .get('https://host.up.railway.app/findAllRule', { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => setRules(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <DefaultLayout>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Tên quy định</th>
                        <th scope="col">Mô tả quy định</th>
                    </tr>
                </thead>
                <tbody className="body">
                    {rules.map((rule) => {
                        return (
                            <tr key={rule.id}>
                                <td>{rule.id}</td>
                                <td>{rule.ruleName}</td>
                                <td>{rule.ruleDesciption}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </DefaultLayout>
    );
}

export default Rules;
