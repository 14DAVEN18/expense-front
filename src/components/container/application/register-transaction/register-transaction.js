import React, { useEffect , useRef, useState} from 'react';

import { Button, Form, Input, InputNumber, Select } from 'antd';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { CREATE_TRANSACTION, TRANSACTION_SUCCESSFULLY_REGISTERED } from '../../../../constants/constants';

import 'antd/dist/antd.css';
import './register-transaction.css';

export default function RegisterTransaction() {

    const ref = useRef(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [message, setMessage] = useState("")
    const [created, setCreated] = useState(false);
    const navigation = useNavigate();

    useEffect(() => {
        setHeight(ref.current.offsetHeight);
        setWidth(ref.current.offsetWidth);
        if(localStorage.getItem("user_id") === null)
            navigation("/login")
    }, [])

    function capitalizeFirstLetter(string) {
        let lowerCase = string.toLowerCase();
        let firstLetter = lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
        return firstLetter;
    }

    const onFinish = (values, event) => {
        if(localStorage.getItem("user_id") === null)
            navigation("/login")
        let concept = capitalizeFirstLetter(values.concept);
        try {
            axios.post (
                CREATE_TRANSACTION,
                {
                    values
                },
                {
                    headers: 
                    {
                        'Content-Type': 'application/json',
                        withCredentials: true,
                        key: 3,
                        type: values.type,
                        concept: concept,
                        amount: values.amount,
                        user: localStorage.getItem("user_id")
                    }
                })
                .then(({data}) => {
                    setMessage(TRANSACTION_SUCCESSFULLY_REGISTERED)
                    setCreated(data.created)
                })
                .catch(error => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div 
            id="register-applications" 
            className="register-application" 
            ref={ref}
        >
            <h1>Registrar hecho económico</h1>
            {   
                created && 
                    (
                        <div className='confirmation-message'  onClick={() => setCreated(false)}>
                            <p>{message}</p>
                        </div>
                    )
            }
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
                    name="concept"
                    rules={[
                        {
                            type: 'string',
                            message: 'El dato ingresado no es valido'
                        },
                        {
                            required: true,
                            message: 'Por ingrese un concepto para el hecho económico'
                        }
                    ]}
                >
                    <Input placeholder="Ingrese un concepto"/>
                </Form.Item>

                <Form.Item
                    name="amount"
                    rules={[
                        {
                            type: 'number',
                            message: 'El dato ingresado no es valido'
                        },
                        {
                            required: true,
                            message: 'Por ingrese un valor para el hecho económico'
                        }
                    ]}
                >
                    <InputNumber placeholder="Ingrese un valor"/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        AGREGAR
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}