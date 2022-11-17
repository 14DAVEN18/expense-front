import React, { useEffect , useRef, useState} from 'react';

import { Button, Form, Select } from 'antd';

import { months, years } from '../../../../constants/constants';

import 'antd/dist/antd.css';
import './list-transactions.css';

export default function ListTransactions() {

    const ref = useRef(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setHeight(ref.current.offsetHeight);
        setWidth(ref.current.offsetWidth);
    }, [])

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
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
                        name="transaction"
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
                        shouldUpdate = {(prevValues, currentValues) => prevValues.transaction !== currentValues.transaction}
                    >
                        {({ getFieldValue }) => 
                            getFieldValue('transaction') === 'income' || getFieldValue('transaction') === 'expense' ? (
                                <Form.Item
                                    name="year"
                                    rules={[
                                        {
                                            message: 'El año seleccionado no es válido',
                                        },
                                        {
                                            required: true,
                                            message: 'Por favor seleccione un año',
                                        },
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
                        shouldUpdate = {(prevValues, currentValues) => prevValues.transaction !== currentValues.transaction }
                    >
                        {({ getFieldValue }) =>
                            getFieldValue('transaction') === 'income' || getFieldValue('transaction') === 'expense' ? (
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
                                            months.map((month, index) => {
                                                return <Select.Option key={`month${index}`} value={month}>{month}</Select.Option>
                                            })
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
                Aqui va la tabla
            </div>
        </div>
    );
}