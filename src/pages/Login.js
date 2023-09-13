import React from 'react'
import { Button, Form, Input, message } from 'antd';

import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../Redux/alertsSlice';
import "./login.css"

function Login() {
    const navigate = useNavigate();
    const dispatch =useDispatch();
    const onFinish=async(values)=>{
        try {
            dispatch(showLoading())
            const response = await axios.post("/api/user/login",values);
            dispatch(hideLoading())
            if (response.data.success)
            {message.success(response.data.message);
                localStorage.setItem("token",response.data.data)
                navigate("/")
            }else{
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading())
            message.error(error.message)
            
        }
    }
    return (
        <div className='bg'> 
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            

            <Form layout="vertical"onFinish={onFinish}>
            <h1> <img src={require('../assets/logo.png')} alt="Logo Description" /></h1>
            
                <div className='container'>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                >
                    <Input style={{ width: '300px' }} />

                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password style={{ width: '300px' }} />
                </Form.Item>
                <div className='d-flex justify-content-between'>
                    <Link to ="/Register">Click here to Register</Link>
                    <Button type="primary" htmlType="Login">
                        Login
                    </Button>
                </div>
                </div>
            </Form>

        </div>

        </div>

    )
}
export default Login