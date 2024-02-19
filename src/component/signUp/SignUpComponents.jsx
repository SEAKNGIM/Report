import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import AuthServices from '../../redux/service/AuthService';
import { useNavigate } from 'react-router-dom';
const setLocalStorageItems = (data) => {
    localStorage.setItem("token", data.body.token);
    localStorage.setItem("userId", data.body.id);
    localStorage.setItem("user_role", data.body.role);
};
const SignUpComponents = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [isShowErr, setIsShowErr] = useState(false)
    const [message, setMessage] = useState()
    const onFinish = (values) => {

        const formData = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            Role: "USER"
        }
        AuthServices.postSignUp(formData).then(res => {
            console.log(res)
            if (res) {
                console.log('API Response:', res.data);
                setLocalStorageItems(res.data);
                const token = localStorage.getItem("token")
                const user_role = localStorage.getItem("user_role")
                setTimeout(() => {
                    setLoading(false)
                    if (token) {
                        if (user_role == "ADMIN") {
                            navigate('/dashboard');
                        } else {
                            navigate('/report-list/current');
                        }
                    }
                }, 2000)

            }
            else {
                setTimeout(() => {
                    setLoading(false)
                    setIsShowErr(true)
                }, 2000)

            }
        },).catch(e => {
            console.log(e)
        })
        console.log('Success:', formData);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
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
                    label="FirstName"
                    name="firstName"
                    rules={[
                        {
                            // required: true,
                            message: 'Please input your FirstName!',
                        },
                    ]}
                >
                    <Input autoComplete='off' />
                </Form.Item>

                <Form.Item
                    label="LastName"
                    name="lastName"
                    rules={[
                        {
                            // required: true,
                            message: 'Please input your lastName!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            // required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            // required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default SignUpComponents;
