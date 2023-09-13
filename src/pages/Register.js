import React from 'react'
import { Button, Form, Input, message ,Radio} from 'antd';

import { Link } from 'react-router-dom';
import axios from "axios"
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../Redux/alertsSlice';
import { useState } from 'react';





function Register() {
    const dispatch = useDispatch();
    const [selectedRole, setSelectedRole] = useState('recipient');
  
    const onFinish = async (values) => {
      try {
        dispatch(showLoading());
        const response = await axios.post("/api/user/register", values);
        dispatch(hideLoading());
        if (response.data.success) {
          message.success(response.data.message);
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        dispatch(hideLoading());
      }
    };
  
    const handleRoleChange = (e) => {
      setSelectedRole(e.target.value);
    };
  
    return (
      <div className='bg'> 
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Form layout="vertical" onFinish={onFinish}>
        <h1> <img src={require('../assets/logo.png')} alt="Logo Description" /></h1>
        <div className='container'>
          <Form.Item
            
            name="role"
            initialValue={selectedRole}
            rules={[
              {
                required: true,
                message: 'Please select your role!',
              },
            ]}
          >
            <Radio.Group onChange={handleRoleChange}>
              <Radio value="recipient">Recipient</Radio>
              <Radio value="donor">Donor</Radio>
              <Radio value="organisation">Organisation</Radio>
            </Radio.Group>
          </Form.Item>
  
          {selectedRole === 'organisation' ? (
            <Form.Item
              label="Organisation Name"
              name="organisationName"
              labelCol={{ style: { color: 'white' } }}
              rules={[
                {
                  required: true,
                  message: 'Please input your organisation name!',
                },
              ]}
            >
              <Input style={{ width: '300px' }} />
            </Form.Item>
          ) : (
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input style={{ width: '300px' }} />
            </Form.Item>
          )}
  
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
            <Link to="/Login">Click here to Login</Link>
            <Button type="primary" htmlType="Register">
              Register
            </Button>
          </div>
          </div>
        </Form>
      </div>
      </div>
    );
  }
  
  export default Register;