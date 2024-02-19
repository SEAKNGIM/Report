import { useState } from 'react';
import React from 'react';
import { Modal, Button, Form, Input, Select, Space } from 'antd';
import ShiftService from '../../../redux/service/ShiftService';
import SubjectService from '../../../redux/service/SubjectSevice';


  
const AddSubject = ({ isOpen, onOk, onCancel }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);


  const handleOk = () => {
    setIsModalOpen(false);
    // You can call the onOk function here if needed
    if (onOk) {
      onOk();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    // You can call the onCancel function here if needed
    if (onCancel) {
      onCancel();
    }
  };

//   const { Option } = Select;
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  
    const [form] = Form.useForm();
    const onFinish = (values) => {
      console.log(values);
      SubjectService.AddSubect(values).then((res)=>{
        console.log(res)
      })
    };
    const onReset = () => {
      form.resetFields();
    };
    return (
        <div>
        <Modal title="Basic Modal" visible={isOpen} onOk={handleOk} onCancel={handleCancel} footer= {null}>
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item
              name="name"
              label="Shift name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  // required: true,
                },
              ]}
            >
              <Input class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
            >
              {({ getFieldValue }) =>
                getFieldValue('gender') === 'other' ? (
                  <Form.Item
                    name="customizeGender"
                    label="Customize Gender"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Space>
                <Button type="default" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
}

export default AddSubject;
