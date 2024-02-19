import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import AuthServices from '../../redux/service/AuthService';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from './popup/LoadingComponent';
import WarningPopUpComponents from './popup/WarningPopUpComponents';
const setLocalStorageItems = (data) => {
    localStorage.setItem("token", data.body.token);
    localStorage.setItem("userId", data.body.id);
    localStorage.setItem("user_role", data.body.role);
};

const LoginComponent = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [isShowErr, setIsShowErr] = useState(false)
    const [message, setMessage] = useState()
    const onFinish = (values) => {
        setLoading(true)
        console.log('Received values of form: ', values);
        AuthServices.postLogin(values)
            .then((res) => {
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
                else{
                    setTimeout(() => {
                        setLoading(false)
                        setIsShowErr(true)
                    }, 2000)
                    
                }
            },).catch((e) => {
                
            })
    };

    const token = localStorage.getItem("token")

    useEffect(() => {
        if (token) {
            navigate('/dashboard');
        }
    }, [])
    return (
        <>
            {isShowErr && <WarningPopUpComponents setIsShowErr={setIsShowErr}  message={message} /> }
            {loading && <LoadingComponent />}
            <div className='flex justify-center h-[100vh] items-center'>
                <div className='bg-gray-200 p-10 rounded-md w-[70vh]'>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            or <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                LOGIN
                            </Button>
                            Or <NavLink to="/login register now!">
                                register now
                            </NavLink>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default LoginComponent;
