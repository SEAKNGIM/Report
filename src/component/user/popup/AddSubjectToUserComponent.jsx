import { Button, Form, Modal, Select, message } from 'antd';
import React, { useEffect, useState } from 'react';
import UserService from '../../../redux/service/UserService';
import { setAllUser } from '../../../redux/slices/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import SubjectService from '../../../redux/service/SubjectSevice';
import { setAllSubject } from '../../../redux/slices/SubjectSlices';

const AddSubjectToUserComponent = ({ isOpen, onCancel, recordAction, userIdForSubject }) => {
    const dispatch = useDispatch();
    const [IsModalOpenShift, setIsModalOpenShift] = useState(false);
    const resData = useSelector((state) => state.subject.allsubjects)
    console.log(resData)
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    console.log(recordAction)
    const handleCancel = () => {
        setIsModalOpenShift(false);
        // You can call the onCancel function here if needed
        if (onCancel) {
            onCancel();
        }
    };
    const handleGetSubject = () => {
        try {
            SubjectService.getAllSubject().then(res => {
                console.log("getAllSubject", res.data.data);
                dispatch(setAllSubject(res.data.data));
            }).catch(error => {
                console.error("Error in API request:", error.message);
                // You can add additional error handling logic here, such as displaying an error message to the user.
            });
        } catch (error) {
            console.error("Error in handleGetSubject:", error.message);
            // You can add additional error handling logic here.
        }
    }



    const onFinish = (values) => {
        const data = {
            user: userIdForSubject,
            subject: values.subject,
        }

        UserService.addSubjectToUser(data).then((res)=>{
            onCancel();
            console.log(res)
        }).catch((error)=>{
            if (error.response && error.response.status === 409) {
                // HTTP 409 indicates a conflict
                message.error('Conflict: User already associated with this subject');
            } else {
                console.error('Error:', error.message);
                // Handle other types of errors here
            }
        })

    };
    const type = "";
    const floor = ""
    const initialValue = {
        type: type,
        floor: floor
    }
    useEffect(() => {
        handleGetSubject();

    }, [])
    return (
        <div>
            <Modal title="Add Subject to User" visible={isOpen} onCancel={handleCancel} footer={null}>
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
                        label="Subject"
                        name="subject"
                        initialValue={initialValue}
                        rules={[
                            {
                                required: true,
                                message: 'Please input!',
                            },
                        ]}
                    >
                         <Select>
                            {resData.slice().reverse().map((item) => (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>
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

export default AddSubjectToUserComponent;
