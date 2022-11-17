import { useEffect, useRef, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import axios from "axios";

import { CREATE_USER } from '../../../constants/constants';

import { Link } from "react-router-dom";

import 'antd/dist/antd.css';
import './login.css';

export default function Login() {

    //const navigate = useNavigate();
  
    const ref = useRef(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});
    const [user, setUser] = useState(null)

    useEffect(() => {
        setHeight(ref.current.offsetHeight);
        setWidth(ref.current.offsetWidth);
    }, [])

    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({});
    }, []);
    
    const onFinish = async (values) => {
        try {
            const response = await axios.post(
                CREATE_USER,
                {
                    values
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        withCredentials: true
                    }
                });
            setUser(response)
        } catch (error) {
            console.log(error);
        }
        console.log('Received values of form: ', values);
        console.log(user)
    };

    return (
        <div 
            id="login" 
            className="login" 
            ref={ref}
        >
            <div className='top'>
                <img src={process.env.PUBLIC_URL + "/Expense-Tracker-Logo-192.png"} alt="Expense tracker logo"/>
            </div>

            <div className='bottom'>
                <div className='frame'>
                    <h1>Inciar sesión</h1>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Por favor ingresa tu usuario!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Usuario" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Por favor ingresa tu contraseña!' }]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Contraseña"
                            />
                        </Form.Item>
                        

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                INICIAR SESIÓN
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <p>
                                <Link to="/register">Crear cuenta</Link>
                            </p>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}