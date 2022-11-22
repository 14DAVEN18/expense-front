import { Button, Form, Input } from 'antd';
import { CREATE_USER } from '../../../constants/constants';

import React, { useEffect , useRef, useState} from 'react';
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import 'antd/dist/antd.css';
import './register.css';

export default function Register() {

    const ref = useRef(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const navigation = useNavigate();

    useEffect(() => {
        setHeight(ref.current.offsetHeight);
        setWidth(ref.current.offsetWidth);
    }, [])

    const formItemLayout = {
    labelCol: {
        xs: { span: 500 },
        sm: { span: 0 },
    },
    wrapperCol: {
       span: 0
    },
    };
    const tailFormItemLayout = {
    wrapperCol: {
        span: 24
    },
    };

    const [form] = Form.useForm();

    const onFinish = (values) => {
        try {
            axios.post (
                CREATE_USER,
                {
                    values
                },
                {
                    headers: 
                    {
                        'Content-Type': 'application/json',
                        withCredentials: true,
                        key: 1,
                        email: values.email,
                        username: values.username,
                        password: values.password
                    }
                })
                .then(({data}) => 
                {
                    localStorage.setItem("message" , data.message)
                    if (data.created) {
                        navigation("/login");
                    } 
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
            id="register" 
            className="register" 
            ref={ref}
        >
            <div className='top'>
                <img src={process.env.PUBLIC_URL + "/Expense-Tracker-Logo-192.png"} alt="Expense tracker logo"/>
            </div>
            <div className='bottom'>
                <div className='frame'>
                    <h1>Crear cuenta</h1>
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="email"
                            rules={[
                            {
                                type: 'email',
                                message: 'El correo ingresado no es válido',
                            },
                            {
                                required: true,
                                message: 'Por favor ingrese su correo eléctronico',
                            },
                            ]}
                        >
                            <Input placeholder='Correo eléctronico'/>
                        </Form.Item>

                        <Form.Item
                            name="username"
                            tooltip="Ingresa cualquier nombre de usuario que desees"
                            rules={[
                                {
                                    required: true,
                                    message: 'El nombre de usuario debe tener entre 8 y 16 caracteres',
                                    whitespace: true,
                                    min: 8,
                                    max: 15
                                }
                            ]}
                        >
                            <Input placeholder='Nombre de usuario'/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            tooltip="Ingresa cualquier nombre de usuario que desees"
                            rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su contraseña',
                                min: 8,
                                max: 15
                            },
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder='Contraseña'/>
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                            REGISTRAR
                            </Button>
                        </Form.Item>
                    </Form>
                    <Form.Item>
                        <p>
                            <Link to="/login">Iniciar sesión</Link>
                        </p>
                    </Form.Item>
                </div>
            </div>
        </div>
    );
}