import { Button, Form, Input } from 'antd';

import React, { useEffect , useRef, useState} from 'react';

import { Link } from "react-router-dom";

import 'antd/dist/antd.css';
import './register.css';

export default function Register() {

    const ref = useRef(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

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
        console.log('Received values of form: ', values);
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
                            name="nickname"
                            tooltip="Ingresa cualquier nombre de usuario que desees"
                            rules={[{ required: true, message: 'Por favor ingresa tu nombre de usuario', whitespace: true }]}
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