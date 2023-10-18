import React from 'react'
import { Button, Form, Input, message ,Radio} from 'antd';

import { Link, Navigate } from 'react-router-dom';
import axios from "axios"
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../Redux/alertsSlice';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./register.css"
import logo from "../assets/logo.png";




function Register() {
    const dispatch = useDispatch();
    const [selectedRole, setSelectedRole] = useState('recipient');
    let navigate = useNavigate();
   
    const routeChangeSignIn = () => {
      let path = "/login";
      navigate(path);
    };
  
    const onFinish = async (values) => {
      try {
        dispatch(showLoading());
        const response = await axios.post(process.env.REACT_APP_BASE_URL+"/api/user/register", values);
        dispatch(hideLoading());
        if (response.data.success) {
          message.success(response.data.message);
          navigate("/login")
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
      <div className="bg">
     
      <div className="loginnav">
      <div><img src={logo} alt="logo" /></div>
        <div><a href="/landing">Home</a></div>
      </div>
      

      <div className="menu">
        <div className="logincolumn column1">
          <h1>Welcome back !</h1>
        <p>Your journey to saving lives continues here. Please sign in to access your personalized dashboard and be a part of our life-saving community.</p>
        <button onClick={routeChangeSignIn}>Sign in</button>
        </div>
        <div className="logincolumn column2">
        <h1>Create Account</h1>
        <Form layout="vertical" onFinish={onFinish}>
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

        
        <Button type="primary" htmlType="Register" style={{ backgroundColor: 'rgb(250, 0, 79)', color: 'white' }}>
  Register
</Button>
     
      
    </Form>
        </div>
      </div>
    </div>
    )

  }
  
 export default Register;

//   <div className='bg'> 
//   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//   <h1> <img src={require('../assets/logo.png')} alt="Logo Description" /></h1>
   
  
//     <div className='container 1'>
//     <Form layout="vertical" onFinish={onFinish}>
//       <Form.Item
        
//         name="role"
//         initialValue={selectedRole}
//         rules={[
//           {
//             required: true,
//             message: 'Please select your role!',
//           },
//         ]}
//       >
//         <Radio.Group onChange={handleRoleChange}>
//           <Radio value="recipient">Recipient</Radio>
//           <Radio value="donor">Donor</Radio>
//           <Radio value="organisation">Organisation</Radio>
//         </Radio.Group>
//       </Form.Item>

//       {selectedRole === 'organisation' ? (
//         <Form.Item
//           label="Organisation Name"
//           name="organisationName"
//           labelCol={{ style: { color: 'white' } }}
//           rules={[
//             {
//               required: true,
//               message: 'Please input your organisation name!',
//             },
//           ]}
//         >
//           <Input style={{ width: '300px' }} />
//         </Form.Item>
//       ) : (
//         <Form.Item
//           label="Name"
//           name="name"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your name!',
//             },
//           ]}
//         >
//           <Input style={{ width: '300px' }} />
//         </Form.Item>
//       )}

//       <Form.Item
//         label="Email"
//         name="email"
//         rules={[
//           {
//             required: true,
//             message: 'Please input your Email!',
//           },
//         ]}
//       >
//         <Input style={{ width: '300px' }} />
//       </Form.Item>

//       <Form.Item
//         label="Password"
//         name="password"
//         rules={[
//           {
//             required: true,
//             message: 'Please input your password!',
//           },
//         ]}
//       >
//         <Input.Password style={{ width: '300px' }} />
//       </Form.Item>

//       <div className='d-flex justify-content-between'>
//         <Link to="/Login">Click here to Login</Link>
//         <Button type="primary" htmlType="Register">
//           Register
//         </Button>
//       </div>
      
//     </Form>
//     </div>
//     <div className='container2'>
//       heloo guyss
//     </div>
//   </div>
//   </div>
// );