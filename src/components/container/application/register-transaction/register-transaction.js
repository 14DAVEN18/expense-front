import React, { useEffect , useRef, useState} from 'react';

import { Button, Form, Input, InputNumber, Select } from 'antd';

import 'antd/dist/antd.css';
import './register-transaction.css';

export default function RegisterTransaction() {

    const ref = useRef(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setHeight(ref.current.offsetHeight);
        setWidth(ref.current.offsetWidth);
    }, [])

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div 
            id="register-applications" 
            className="register-application" 
            ref={ref}
        >
            <h1>Registrar hecho económico</h1>
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