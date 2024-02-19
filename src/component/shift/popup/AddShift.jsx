import React, { useState } from 'react';
import { Modal, Form, Select, Button, Input, Space, Switch, Alert, notification } from 'antd';
import ShiftService from '../../../redux/service/ShiftService';


const AddShift = ({ isOpen, onCancel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  

  const handleCancel = () => {
    setIsModalOpen(false);
    // You can call the onCancel function here if needed
    if (onCancel) {
      onCancel();
    }
  };


  const onFinish = (values) => {
    ShiftService.addNewShift(values).then((res) => {
      setIsModalOpen(false);
      showNotification();
      handleCancel(); // You may want to set this to true after the form is successfully submitted.
    })
    .catch((error) => {
      console.log("Error:", error);
      // Handle error as needed
    });
  };
  const showNotification = () => {
    notification.info({
      message: `add new Shift successfully`,
      description: 'Hello, Ant Design!!',
      placement: 'topRight',
    });
  };
  return (

    <div>
      <Modal title="Add New Shift" visible={isOpen} onCancel={handleCancel} footer={null}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Shift"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your Shift name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input your description!',
              },
            ]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="default" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AddShift;
