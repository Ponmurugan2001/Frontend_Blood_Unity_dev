import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Form, Input, Select, Button, message } from "antd";

const { Option } = Select;

const locationOptions = [
  "Ariyalur",
  "Chengalpattu",
  "Chennai",
  // ... (other location options)
  "Virudhunagar",
];

function OrganisationProfile() {
  const [form] = Form.useForm();
  const { user } = useSelector((state) => state.user);

  const handleModalSubmit = async (values) => {
    try {
      const { OrganisationName, phoneNumber, email, Address, location } = values;
      if (!OrganisationName || !phoneNumber || !email || !Address || !location) {
        message.error("Please Provide All Fields");
        return;
      }
      
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "/api/user/inventory/create-inventory-profile",
        {
          OrganisationId: user?._id,
          ...values,
        },
        
      );
      console.log(values)

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
    <div>
      <h1>Create Inventory Profile</h1>
      <Form
        form={form}
        onFinish={handleModalSubmit}
        initialValues={{
          OrganisationName: "",
          phoneNumber: "",
          email: "",
          Address: "",
          location: "",
        }}
      >
        <Form.Item
          label="Organization Name"
          name="OrganisationName"
          rules={[{ required: true, message: "Please input Organization Name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input Phone Number!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input Email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="Address"
          rules={[{ required: true, message: "Please input Address!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please select Location!" }]}
        >
          <Select>
            <Option value="">Select Location</Option>
            {locationOptions.map((location) => (
              <Option key={location} value={location}>
                {location}
              </Option>
            ))}
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

export default OrganisationProfile;
