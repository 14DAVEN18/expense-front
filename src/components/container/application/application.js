import
{
    CloseOutlined,
    EyeOutlined,
    PlusOutlined
} from '@ant-design/icons';

import { Menu } from 'antd';
import { Link, Outlet, useNavigate } from "react-router-dom";

import React, { useEffect , useRef, useState} from 'react';

import 'antd/dist/antd.css';
import './application.css';

function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
}

function logOut() {
    localStorage.clear();
}

const items = [
    getItem(<Link to='/application/register-transaction'>Registrar hechos económicos</Link>, '1', <PlusOutlined />),
    getItem(<Link to='/application/list-transactions'>Ver hechos económicos</Link>, '2', <EyeOutlined />),
    getItem(<Link to='/login' onClick={logOut}>Cerrar sesión</Link>, '3', <CloseOutlined />)
];

export default function Application() {

    const ref = useRef(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const navigation = useNavigate();

    

    useEffect(() => {
        setHeight(ref.current.offsetHeight);
        setWidth(ref.current.offsetWidth);
        if(localStorage.getItem("user_id") === null)
            navigation("/login")
    }, [])

    return (
        <div 
            id="applications" 
            className="application" 
            ref={ref}
        >
            <div className='menu'>
                <div
                    style={{
                        width: "100%",
                    }}
                >
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"
                        items={items}
                    />
                </div>
            </div>
            <div className='section'>
                <Outlet/>
            </div>
        </div>
    );
}