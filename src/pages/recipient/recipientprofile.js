import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import "./recipientprofile.css"
const locationOptions = [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kanchipuram",
    "Kanyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar"
];

function RecipientProfile() {
  const [form] = Form.useForm();
  const { user } = useSelector((state) => state.user);

  const handleModalSubmit = async (values) => {
    try {
      const { phoneNumber, Age, location } = values;
      if (!phoneNumber || !Age || !location) {
        message.error("Please Provide All Fields");
        return;
      }
      const REACT_BASE_URL = "https://backend-blood-unity-dev.onrender.com"
      const response = await axios.post(process.env.REACT_APP_BASE_URL+
        "/api/user/recipient/profile/create-Recipient-Profile",
        {
          recipient: user?._id,
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data?.success) {
        message.success("Profile updated");
        form.resetFields();
      }
    } catch (error) {
      message.error(error.response.data.message || 'An error occurred');
      console.error(error);
    }
  };

  return (
    <div className='recipientprofile'>
      <h1>Create Recipient Profile</h1>
      <Form
        form={form}
        onFinish={handleModalSubmit}
        initialValues={{
          phoneNumber: '',
          Age: '',
          location: '',
        }}
      >
        <Form.Item
          label="Name"
          name="Name"
          rules={[{ required: true, message: 'Please input your Name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email Id"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[{ required: true, message: 'Please input your Phone Number!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Age"
          name="Age"
          rules={[{ required: true, message: 'Please input your Age!' }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: 'Please select your Location!' }]}
        >
          {/* Replace with Bootstrap Form.Select */}
          <select className="form-select">
            <option value="">Select Location</option>
            {locationOptions.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RecipientProfile;
