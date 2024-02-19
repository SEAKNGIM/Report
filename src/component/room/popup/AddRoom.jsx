import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useState } from 'react';
import RoomService from '../../../redux/service/RoomService';

const AddRoom = ({ isOpen, onCancel }) => {
    // add model
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCancel = () => {
        setIsModalOpen(false);
        // You can call the onCancel function here if needed
        if (onCancel) {
            onCancel();
        }
    };

    const onFinish = (values) => {
        console.log(values)
        RoomService.addNewShift(values).then((res) => {
            setIsModalOpen(false);
            handleCancel(); // You may want to set this to true after the form is successfully submitted.
        })
            .catch((error) => {
                console.log("Error:", error);
                // Handle error as needed
            });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const type = "";
    const floor = ""
    const initialValue = {
        type: type,
        floor: floor
    }
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
                        label="Room"
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
                        label="Floor"
                        name="floor"
                        initialValue={initialValue}
                        rules={[
                            {
                                required: false,
                                message: 'Please input!',
                            },
                        ]}
                    >
                        <Select defaultValue={floor}>

                        <Select.Option value="floor1">floor1</Select.Option>
                            <Select.Option value="floor2">floor2</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Type"
                        name="type"
                        initialValue={initialValue}
                        rules={[
                            {
                                required: false,
                                message: 'Please input!',
                            },
                        ]}
                    >
                        <Select defaultValue={type}>
                            <Select.Option value="lab1">lab1</Select.Option>
                            <Select.Option value="Room">Room</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your description!',
                            },
                        ]}
                    >
                        <Input.TextArea />
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

export default AddRoom;
