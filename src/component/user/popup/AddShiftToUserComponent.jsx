import { Button, Form, Modal, Select, message } from 'antd';
import React, { useEffect, useState } from 'react';
import UserService from '../../../redux/service/UserService';
import { setAllUser } from '../../../redux/slices/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import ShiftService from '../../../redux/service/ShiftService';
import { setAllShifts } from '../../../redux/slices/ShiftSlices';
const AddShiftToUserComponent = ({ isOpen, onCancel, userIdForShift }) => {
    const dispatch = useDispatch();
    const [isModalOpenSubject, setIsModalOpenSubject] = useState(false);
    const resData = useSelector((state) => state.shift.allShifts)
    console.log(resData)
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleCancel = () => {
        setIsModalOpenSubject(false);
        // You can call the onCancel function here if needed
        if (onCancel) {
            onCancel();
        }
    };


    // get all shift
    const handleGetShift = () => {
        ShiftService.getAllShift().then(res => {
            console.log("123res", res.data.data)
            dispatch(setAllShifts(res.data.data))
        })
    }
    useEffect(() => {
        handleGetShift()
    }, [])
    const onFinish = (values) => {
        const selectedShiftId = values.shift;
        const data = {
            user: userIdForShift,
            shift: selectedShiftId
        }
        UserService.addShifToUser(data).then((res)=>{
            onCancel();
        }).catch((error)=>{
            if (error.response && error.response.status === 409) {
                // HTTP 409 indicates a conflict
                message.error('Conflict: User already associated with this subject');
            } else {
                console.error('Error:', error.message);
                // Handle other types of errors here
            }
        })

        // ShiftService.addNewShift(values).then((res) => {
        //   setIsModalOpen(false);
        //   handleCancel(); // You may want to set this to true after the form is successfully submitted.
        // })
        // .catch((error) => {
        //   console.log("Error:", error);
        //   // Handle error as needed
        // });
        // console.log(values)
    };
    const initialValue = {

    }
    useEffect(() => {

    }, [])
    return (
        <div>
            <Modal title="Add Shift to User" visible={isOpen} onCancel={handleCancel} footer={null}>
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
                        name="shift"
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
        </div >
    );
}

export default AddShiftToUserComponent;
