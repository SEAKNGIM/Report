import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Input, Select, Space } from 'antd';
import RoomService from '../../../redux/service/RoomService';
import { useDispatch, useSelector } from 'react-redux';
import { setRoom } from '../../../redux/slices/RoomSlices';

import ShiftService from '../../../redux/service/ShiftService';
import { setCurrenShifts } from '../../../redux/slices/ShiftSlices';
import ReportServices from '../../../redux/service/ReportServices';
import SubjectService from '../../../redux/service/SubjectSevice';
import { setCurrentSubject } from '../../../redux/slices/SubjectSlices';

const AddReport = ({ isOpen, onOk, onCancel }) => {


  //user
  const userId = localStorage.getItem("userId");

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

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

  const dispatch = useDispatch();
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

    ReportServices.postReport(apiData).then((res) => {
      console.log('API Response:', res.data);
      setSelectedSubject('');
      setSelectedRoom('');
      setSelectedShift('');
      setSelectedStudentNum('');
      setSelectedDate('');
      handleOk(); // Close the modal if needed
    });

    console.log('Form data submitted:', apiData);
  };
  useEffect(() => {
    handleGetRoom();
    handleGetShift();
    handleGetSubject();

  }, []);
  return (
    <div>
      <Modal title="Report" visible={isOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <div className=''>
          <div className="flex justify-center w-full">
            <div>
              <Form className="report-form w-96" onFinish={handleSubmit}>
                <Form.Item
                  name="select1"
                  label="Select"
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
                  label="Select"
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
                  label="Select"
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

                <div className="flex">
                  <div className='flex'>
                    <Form.Item
                      label="Input"
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
                  </div>

                  <div className='flex'>
                    <Form.Item
                      label="Input"
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
                  </div>
                </div>

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
  );
}

export default AddReport;
