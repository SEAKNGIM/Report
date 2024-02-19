import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';
import RoomService from '../../../redux/service/RoomService';
import { useDispatch, useSelector } from 'react-redux';
import { setRoom } from '../../../redux/slices/RoomSlices';

import ShiftService from '../../../redux/service/ShiftService';
import { setCurrenShifts } from '../../../redux/slices/ShiftSlices';
import ReportServices from '../../../redux/service/ReportServices';
import SubjectService from '../../../redux/service/SubjectSevice';
import { setCurrentSubject } from '../../../redux/slices/SubjectSlices';
import { setReportById } from '../../../redux/slices/ReportSlices';


const EditReport = ({ isOpen, onOk, onCancel, id }) => {

    const dispatch = useDispatch();
    //user
    const userId = localStorage.getItem("userId");
    
    
    const [formedit] = Form.useForm();
    
    // selected report
    const selectorEntities = useSelector(state => state.report);
    
    //get report default
   
        const handleGetReportById = (id) => {
                ReportServices.getReportById(id).then((res) => {
                dispatch(setReportById(res.data))
                console.log("res", res)
            }).catch((e)=>{

            })
        }
    
    // get all room
    const handleGetRoom = () => {
        RoomService.getAllRoom().then(res => {
            console.log(res.data.data);
            dispatch(setRoom(res.data.data));
        });
    };

    // get all shift
    const handleGetShift = () => {
        ShiftService.getCurrenShift().then(res => {
            console.log(res.data.data.payload);
            dispatch(setCurrenShifts(res.data.data.payload));
        });
    };

    // get all Subject
    const handleGetSubject = () => {
        SubjectService.getAllCurrentSubject().then(res => {
            console.log("getAllSubject", res.data.data.payload)
            dispatch(setCurrentSubject(res.data.data.payload))
        })
    }

    const [isOpenEdit, setIsOpenEdit] = useState(false);


    const handleOk = () => {
        setIsOpenEdit(false);
        // You can call the onOk function here if needed
        if (onOk) {
            onOk();
        }
    };

    const handleCancel = () => {
        setIsOpenEdit(false);
        // You can call the onCancel function here if needed
        if (onCancel) {
            onCancel();
        }
    };
    const values = useSelector((state) => state.report.reportById);
    console.log("values", values)
    useEffect(() => {
        if (values) {
            setSelectedSubject(values.subject);
            // setSelectedRoom(values.roomId);
            // setSelectedShift(values.shiftId);
            // setSelectedStudentNum(values.studentNum);
            // setSelectedDate(values.date);
        }
    }, [values]);

    
    const roomOptions = useSelector((state) => state.room.rooms);
    const roomOption = roomOptions.slice().reverse().map(item => ({
        value: item.id,
        label: item.name,
    }));

    const subjectOptions = useSelector((state) => state.subject.currentUserSubjects);
    console.log("subjectOptions", subjectOptions)

    const subjectOption = subjectOptions.slice().reverse().map((item) => ({
        value: item.id,
        label: item.name,
    }));

    const shiftOptions = useSelector((state) => state.shift.currenShifts);
    const shiftOption = shiftOptions.slice().reverse().map(item => ({
        value: item.id,
        label: item.name,
    }));




    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');
    const [selectedShift, setSelectedShift] = useState('');
    const [selectedStudentNum, setSelectedStudentNum] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const handledefultValue=(name, value)=>{

    }

    const handleInputChange = (name, value) => {
        switch (name) {
            case 'subject':
                setSelectedSubject(value);
                break;
            case 'room':
                setSelectedRoom(value);
                break;
            case 'shift':
                setSelectedShift(value);
                break;
            case 'studentNum':
                setSelectedStudentNum(value);
                break;
            case 'date':
                setSelectedDate(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (values) => {
        const apiData = {
            subjectId: values.select1,
            userId: userId,
            roomIds: values.select2,
            shiftId: values.select3,
            date: values.date,
            studentNum: values.studentNum,
        };
        console.log("id", id)
        ReportServices.updateById(id, apiData).then((res) => {
            console.log('API Response:', res.data);
            setSelectedSubject('');
            setSelectedRoom('');
            setSelectedShift('');
            setSelectedStudentNum('');
            setSelectedDate('');
            handleOk(); // Close the modal if needed
        });

        console.warn('Form data submitted:', values);
    };
    useEffect(() => {
        handleGetRoom();
        handleGetShift();
        handleGetSubject();
        handleGetReportById(id);

        if (isOpen) {
            handleGetReportById(id);
        }
    }, [isOpen]);

    if (selectorEntities) {
        formedit.setFieldsValue({
            select1: values.subject?.name,
            select2: values.room,
            select3: values.shift?.name,
            date: values.date,
            studentNum: values.studentNum,
        });
        console.error("TESTING", values)
    }
    
    return (
        <div>
            <Modal title="Edit Report" visible={isOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <div className=''>
                    <div className="flex justify-center w-full">
                        <div>
                            <Form className="report-form w-96" form={formedit} onFinish={handleSubmit}>
                                <Form.Item
                                    name="select1"
                                    label="Subject"
                                    hasFeedback
                                    rules={[{ required: true, message: 'select is required' }]}
                                >
                                    <Select
                                        mode="single"
                                        placeholder="Select subject"
                                        value={selectedSubject}
                                        onChange={(value) => handleInputChange('subject', value)}
                                        showSearch

                                        filterOption={(input, option) =>
                                            option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        style={{
                                            width: '100%',
                                        }}
                                        options={subjectOption}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="select2"
                                    label="Room"
                                    hasFeedback
                                    rules={[{ required: true, message: 'select is required' }]}
                                >
                                    <Select
                                        mode="multiple"
                                        placeholder="Select Room"
                                        value={selectedRoom}
                                        onChange={(value) => handleInputChange('room', value)}
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        style={{
                                            width: '100%',
                                        }}
                                        options={roomOption}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="select3"
                                    label="Shift Room"
                                    hasFeedback
                                    rules={[{ required: true, message: 'select is required' }]}
                                >
                                    <Select
                                        mode="single"
                                        placeholder="Select shift"
                                        value={selectedShift}
                                        onChange={(value) => handleInputChange('shift', value)}
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        style={{
                                            width: '100%',
                                        }}
                                        options={shiftOption}
                                    />
                                </Form.Item>

                                {/* <div className="flex">
                                    <div className='flex'> */}
                                        <Form.Item
                                            label="Student ID"
                                            name="studentNum"
                                            hasFeedback
                                            rules={[{ required: true, message: 'Input student number is required' }]}
                                        >
                                            <Input
                                                type="text"
                                                id="studentNum"
                                                name="studentNum"
                                                value={selectedStudentNum}
                                                onChange={(e) => handleInputChange('studentNum', e.target.value)}
                                                placeholder="Number of student"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </Form.Item>
                                    {/* </div> */}

                                    {/* <div className='flex'> */}
                                        <Form.Item
                                            label="Date"
                                            name="date"
                                            hasFeedback
                                            rules={[{ required: true, message: 'Input date is required' }]}
                                        >
                                            <Input
                                                type="date"
                                                id="date"
                                                name="date"
                                                value={selectedDate}
                                                onChange={(e) => handleInputChange('date', e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </Form.Item>
                                    {/* </div> */}
                                {/* </div> */}

                                <div className='pt-5'>
                                    <Button type="default" htmlType="submit">
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default EditReport;
