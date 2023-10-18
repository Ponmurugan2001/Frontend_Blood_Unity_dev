import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Form, Input, Select, Button, message } from "antd";
import "./donarprofile.css"

const { Option } = Select;

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
  "Virudhunagar",
];

function DonorProfile() {
  const [form] = Form.useForm();
  const { user } = useSelector((state) => state.user);

  const handleModalSubmit = async (values) => {
    try {
      const { bloodGroup, phoneNumber, Age, location, Availability } = values;
      if (!bloodGroup || !phoneNumber || !Age || !location || !Availability) {
        message.error("Please Provide All Fields");
        return;
      }
      
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL+ "/api/user/profile/create-Donor-Profile",
        {
          donor: user?._id,
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
      message.error(error.response.data.message || "An error occurred");
      console.error(error);
    }
  };

  return (
    <div className="donorprofile" >
      <h1>Create Donor Profile</h1>
      <Form
        form={form}
        onFinish={handleModalSubmit}
        initialValues={{
          bloodGroup: "",
          phoneNumber: "",
          Age: "",
          location: "",
          Availability: "",
        }}
      >
        <Form.Item
          label="Name"
          name="Name"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email Id"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your Phone Number!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Blood Group"
          name="bloodGroup"
          rules={[{ required: true, message: "Please select Blood Group!" }]}
        >
          {/* Replace with Bootstrap select */}
          <select className="form-select">
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </Form.Item>

        <Form.Item
          label="Age"
          name="Age"
          rules={[{ required: true, message: "Please input your Age!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please select your Location!" }]}
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

        <Form.Item
          label="Availability"
          name="Availability"
          rules={[
            { required: true, message: "Please select your Availability!" },
          ]}
        >
          <Select>
            <Select.Option value="Available">Available</Select.Option>
            <Select.Option value="NotAvailable">Not Available</Select.Option>
          </Select>
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

export default DonorProfile;
