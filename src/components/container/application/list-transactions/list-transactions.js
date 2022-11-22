import React, { useEffect , useRef, useState} from 'react';
import { Button, Form, Select } from 'antd';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { months, years, GET_TRANSACTIONS, NO_TRANSACTIONS_LISTED } from '../../../../constants/constants';

import 'antd/dist/antd.css';
import './list-transactions.css';

export default function ListTransactions() {

    const ref = useRef(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const navigation = useNavigate();
    const [message, setMessage] = useState("")
    const [empty, setEmpty] = useState(false);

    const [transactions, setTransactions] = useState()

    useEffect(() => {
        setHeight(ref.current.offsetHeight);
        setWidth(ref.current.offsetWidth);
        if(localStorage.getItem("user_id") === null)
            navigation("/login")
    }, [])

    const onFinish = (values) => {
        setEmpty(false)
        setTransactions(undefined)
        if(localStorage.getItem("user_id") === null)
            navigation("/login")
        if (values.type == 'saving') {
            try {
                axios.get (
                    GET_TRANSACTIONS, {
                    params: {
                        user: localStorage.getItem("user_id"),
                        type: values.type
                    }}
                    )
                    .then(({data}) => {
                        setTransactions(data)
                        if (data.length === 0) {
                            setEmpty(true)
                            setMessage(NO_TRANSACTIONS_LISTED)
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                axios.get (
                    GET_TRANSACTIONS, {
                    params: {
                        user: localStorage.getItem("user_id"),
                        type: values.type,
                        year: values.year,
                        month: values.month
                    }}
                    )
                    .then(({data}) => {
                        setTransactions(data)
                        if (data.length === 0) {
                            setEmpty(true)
                            setMessage(NO_TRANSACTIONS_LISTED)
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            } catch (error) {
                console.log(error);
            }
        }
        
    };

    return (
        <div 
            id="list-transaction" 
            className="list-transactions" 
            ref={ref}
        >
            <div className="search">
                <Form
                    labelCol={{ span: 0 }}
                    wrapperCol={{ span: 0 }}
                    layout="horizontal"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="type"
                        rules={[
                            {
                                message: 'El tipo seleccionado no es válido',
                            },
                            {
                                required: true,
                                message: 'Por favor seleccione un tipo',
                            },
                        ]}
                    >
                        <Select placeholder="Seleccione un tipo">
                            <Select.Option value="income">Ingreso</Select.Option>
                            <Select.Option value="expense">Egreso</Select.Option>
                            <Select.Option value="saving">Ahorro</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        shouldUpdate = {(prevValues, currentValues) => prevValues.type !== currentValues.type}
                    >
                        {({ getFieldValue }) => 
                            getFieldValue('type') === 'income' || getFieldValue('type') === 'expense' ? (   
                                <Form.Item
                                    name="year"
                                    rules={[
                                        {
                                            message: 'El año seleccionado no es válido',
                                        },
                                        {
                                            required: true,
                                            message: 'Por favor seleccione un año',
                                        }
                                    ]}
                                >
                                    <Select placeholder="Seleccione un año">
                                        {
                                            years.map((year, index) => {
                                                return <Select.Option key={`year${index}`} value={year}>{year}</Select.Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            ) : null
                        }  
                    </Form.Item>

                    <Form.Item
                        shouldUpdate = {(prevValues, currentValues) => prevValues.type !== currentValues.type }
                    >
                        {({ getFieldValue }) =>
                            getFieldValue('type') === 'income' || getFieldValue('type') === 'expense' ? (
                                <Form.Item
                                    name="month"
                                    rules={[
                                        {
                                            message: 'El mes seleccionado no es válido',
                                        },
                                        {
                                            required: true,
                                            message: 'Por favor seleccione un mes',
                                        },
                                    ]}
                                >
                                    <Select  placeholder="Seleccione un mes">
                                        {
                                            months?.map( month => (
                                                <Select.Option key={month.key} value={month.key}>{month.month}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            ) : null
                        }
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            CONSULTAR
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className='results'>
                {   
                    empty && 
                        (
                            <div className='info-message'  onClick={() => setEmpty(false)}>
                                <p>{message}</p>
                            </div>
                        )
                }
                <table className='list'>
                    <thead className='list-header'>
                        <tr>
                            <th>Concepto</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            transactions?.map( e => (
                                <tr key={ e.trns_id } className='list-item'>
                                    <td> { e.trns_concept }</td>
                                    <td> $ { e.trns_amount }</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}