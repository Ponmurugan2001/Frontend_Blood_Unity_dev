import React from 'react'
import { Button, Form, Input, message ,Radio} from 'antd';

import { Link, Navigate } from 'react-router-dom';
import axios from "axios"
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../Redux/alertsSlice';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './login.css'
import logo from "../assets/logo.png";

function Login() {
    const navigate = useNavigate();
    const dispatch =useDispatch();
    const routeChangeSignIn = () => {
        let path = "/register";
        navigate(path);
      };
    

    const REACT_BASE_URL = "https://backend-blood-unity-dev.onrender.com"
    
    
    const onFinish=async(values)=>{
        
        try {
            dispatch(showLoading())
            
            
            const response = await axios.post(process.env.REACT_APP_BASE_URL+"/api/user/login", values);
            console.log("hii")


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
    <div className="bg">
     
      <div className="loginnav">
      <div><img src={logo} alt="logo" /></div>
        <div><a href="/landing">Home</a></div>
      </div>
      

      <div className="menu">
        <div className="logincolumn column1">
          <h1>haven't registered yet! !</h1>
        <p>Create your Blood Unity account and join a community that makes a difference. Start your journey to save lives with us today.</p>
        <button onClick={routeChangeSignIn}>Sign up</button>
        </div>
        <div className="logincolumn column2">
        <h1>Login</h1>
        <Form layout="vertical"onFinish={onFinish}>
           
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
                <Button type="primary" htmlType="Register" style={{ backgroundColor: 'rgb(250, 0, 79)', color: 'white' }}>
  Login
</Button>
              
            </Form>
        </div>
      </div>
    </div>
    
  );
}

export default Login;
