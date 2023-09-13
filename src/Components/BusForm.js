import React from "react";
import { Modal, Row, message } from "antd";
import { DatePicker } from "antd";
import moment from "moment";
import { Form, Input, Button, Col } from "antd";
import { useDispatch } from "react-redux";
import axios from "axios";
import { axiosInstance } from "../helpers/axiosInstance";
import { showLoading, hideLoading } from "../Redux/alertsSlice";

const dateFormat = "YYYY/MM/DD";

function BusForm({ showBusForm, setshowBusForm, type = "add" }) {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());

      let response = null;
      if (type === "add") {
        response = await axiosInstance.post("/api/buses/add-Bus", values);
        if (response && response.data.success) {
          message.success(response.data.message);
        } else {
          message.error(response?.data.message || "An error occurred");
        }
      }

      dispatch(hideLoading());
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Modal
      width={800}
      title="Add Bus"
      open={showBusForm}
      onCancel={() => setshowBusForm(false)}
      footer={false}
    >
      <Form layout="vertical"onFinish={onFinish}>
        <Row>
          <Col span={24}>
            <Form.Item
              label="Busname"
              name="Name"
              rules={[
                { required: true, message: "Please Enter the bus Name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Bus Number"
              name="Bus Number"
              rules={[
                { required: true, message: "Please Enter the bus Number!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Capacity"
              name="Capacity"
              rules={[
                { required: true, message: "Please Enter the bus Capacity!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="From"
              name="From"
              rules={[
                { required: true, message: "Please Enter Starting point" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="To"
              name="To"
              rules={[
                { required: true, message: "Please Enter the Destination" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Date"
              name="date"
              initialValue={moment("2023/01/01", dateFormat)}
              rules={[{ required: true, message: "Please select a date" }]}
            >
              <DatePicker
                style={{ width: "100%" }} // Set the width to 100%
                format={dateFormat}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Departure Time"
              name="Departure"
              rules={[
                { required: true, message: "Please enter the Departure Time" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Arival Time"
              name="Arival"
              rules={[
                { required: true, message: "Please enter the ending point" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Type"
              name="Type"
              rules={[
                { required: true, message: "Please Enter the bus Type!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Fare"
              name="Fare"
              rules={[
                { required: true, message: "Please Enter the bus Fare!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default BusForm;
