import { Button, Form, Input, Layout, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import SubjectService from '../../../redux/service/SubjectSevice';

const EditeComponent = ({ isOpen, onCancel, id}) => {
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleCancel = () => {
        setIsOpenEdit(false);
        // You can call the onCancel function here if needed
        if (onCancel) {
            onCancel();
        }
    };
    const onFinish = (value) => {
        console.log(id)
        SubjectService.updateById(id,value).then((res) => {
          setIsOpenEdit(false);
          handleCancel(); // You may want to set this to true after the form is successfully submitted.
        })
        .catch((error) => {
          console.log("Error:", error);
          // Handle error as needed
        });
      };
      useEffect(()=>{
        onFinish();
      })
    return (
        <div>
           <Modal title="Edit Subject" visible={isOpen} onCancel={handleCancel} footer={null}>
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

export default EditeComponent;
