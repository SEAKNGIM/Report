import { Button, Card, Col, Row, Space, Statistic, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserService from '../../redux/service/UserService';
import { setAllUser } from '../../redux/slices/UserSlice';
import AddSubjectToUserComponent from './popup/AddSubjectToUserComponent';
import AddShiftToUserComponent from './popup/AddShiftToUserComponent';
import EditComponent from './popup/EditComponent';

const AllUserComponent = () => {
    const dispatch = useDispatch();
    const [dateRange, setDateRange] = useState(null);
    const [isModalOpenSubject, setIsModalOpenSubject] = useState(false);
    const [isModalOpenShift, setIsModalOpenShift] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [filteredData, setFilteredData] = useState(null);
    const resData = useSelector((state) => state.user.allUser);
    const [userIdForShift, setUserIdForShift] = useState(null);
    const [userIdForSubject, setUserIdFSubject] = useState(null);
    const [userId, setuserId] = useState(null)
    console.log("resData", resData);
    // get User
    const handleGetUser = () => {
        try {
            UserService.getAllUser().then((res) => {
                dispatch(setAllUser(res.data.data));
                console.log("res", res);
            });
        } catch (error) {
            console.log("Error fetching report:", error);
        }
    };
    // const handleFilteredData = () => {
    //     try {
    //         if (dateRange) {
    //             const startDate = dateRange[0].format('YYYY-MM-DD');
    //             const endDate = dateRange[1].format('YYYY-MM-DD');
    //             const filteredReports = resData.filter(
    //                 (item) => item.date >= startDate && item.date <= endDate
    //             );
    //             setFilteredData(filteredReports);
    //         } else {
    //             setFilteredData(null);
    //         }
    //     } catch (error) {
    //         console.log("Error filtering reports:", error);
    //     }
    // }

    useEffect(() => {

        const intervalId = setInterval(() => {
            handleGetUser();
            // handleFilteredData();
        }, 2000);
        return () => clearInterval(intervalId);
    }, [dateRange]);

    const displayData = dateRange ? filteredData : resData;


    if (!displayData) {
        // Handle the case where resData is undefined or null
        return <p>Loading...</p>;
    }

    const columns = [
        {
            title: 'FirstName',
            dataIndex: 'firstName',
            key: 'FirstName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'LastName',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Shift',
            dataIndex: 'shift',
            key: 'shift',
            render: (_, { shift }) => (
                <>
                    {shift.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';

                        color = 'geekblue';

                        return (
                            <Tag color={color} key={tag}>
                                {tag.name.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
            render: (_, { subject }) => (
                <>
                    {subject.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';

                        color = 'geekblue';

                        return (
                            <Tag color={color} key={tag}>
                                {tag.name.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleEdit(record.key)}>Edit</a>
                    <a onClick={() => handleShiftClick(record.key)}>Shift</a>
                    <a onClick={() => handleSubjectClick(record.key)}>Subject</a>
                </Space>
            ),
        },
    ];
    const pagination = {
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
    };

    const data = displayData?.map((item) => ({
        key: item.id, // Assuming there's an 'id' property in your data
        firstName: item.firstName,
        lastName: item.lastName,
        role: item.role,
        student: item.studentNum,
        //shift: item.shiftDto ? item.shiftDto.name: "N/A",
        subject: item.subject,
        shift: item.shift,
        //Assuming 'action' property is available in your data
        action: item.id,
    }))?.reverse();
    // add model


    const handleCancel = () => {
        setIsModalOpenShift(false);
        setIsModalOpenSubject(false);
        // Additional logic when modal is canceled
    };
    const handleShiftClick = (userId) => {
        setIsModalOpenShift(true);
        setUserIdForShift(userId);
    };
    const handleDeleteShift = () => {
        // Assuming you have a service or API call to delete a shift
        // You can update this logic based on your backend implementation
        try {
            UserService.deleteShift(userId).then((res) => {
                // Handle success response
                console.log('Shift deleted successfully');
                // Perform any additional actions (e.g., updating state, refreshing data)
            });
        } catch (error) {
            console.error('Error deleting shift:', error);
            // Handle error response
        }
    }
    const handleDeleteSubject = () => {
        // Assuming you have a service or API call to delete a subject
        // You can update this logic based on your backend implementation
        try {
            UserService.deleteSubject(userId).then((res) => {
                // Handle success response
                console.log('Subject deleted successfully');
                // Perform any additional actions (e.g., updating state, refreshing data)
            });
        } catch (error) {
            console.error('Error deleting subject:', error);
            // Handle error response
        }
    }
    const handleEdit = (userId) => {
        console.log("userId", userId)
        setIsModalOpenEdit(true);
        setuserId(userId);
    };


    const handleSubjectClick = (userId) => {
        setIsModalOpenSubject(true);
        setUserIdFSubject(userId)
    };
    return (
        <div>
            <div className='flex'>
                <EditComponent isOpen={isModalOpenEdit} onCancel={handleCancel} userId={userId} />
                <AddSubjectToUserComponent isOpen={isModalOpenSubject} onCancel={handleCancel} userIdForSubject={userIdForSubject} />
                <AddShiftToUserComponent isOpen={isModalOpenShift} onCancel={handleCancel} userIdForShift={userIdForShift} />
                <div className='m-left'>
                    {displayData && (
                        <Statistic
                            title="Number of Records"
                            value={displayData.length + " " + "User"}
                            style={{ marginLeft: '16px' }}
                        />
                    )}
                </div>

            </div>
            {/* <Table columns={columns} dataSource={data} pagination={pagination} /> */}
            <Row gutter={16}>
                {displayData?.map((item) => (
                    <Col key={item.id} span={12}>
                        <Card title={item.lastName} bordered={false} style={{ marginBottom: 16 }}>

                            <p className='p-2'>Full Name: {item.firstName} {item.lastName}</p>
                            <p className='p-2'>Email: {item.email}</p>
                            <p className='p-2'>Role: {item.role}</p>

                            <Row gutter={32}>
                                <Col key={item.id} span={12}>
                                    <Card title="Shift" bordered={false} style={{ marginBottom: 8 }}>
                                        {item.shift.map((shift) => (
                                            <p key={shift.id}>{shift.name}</p>
                                        ))}
                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button onClick={() => handleShiftClick(item.id)} style={{ marginRight: 8, color: '#1890ff' }}>Add</Button>
                                            <Button onClick={() => handleDeleteShift(item.id)} style={{ color: '#ff4d4f' }}>Delete</Button>
                                        </div>
                                    </Card>
                                </Col>
                                <Col key={item.id} span={12}>
                                    <Card title="Subject" bordered={false}>
                                        {item.subject.map((subject) => (
                                            <p key={subject.id}>{subject.name}</p>
                                        ))}
                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button onClick={() => handleSubjectClick(item.id)} style={{ marginRight: 8, color: '#1890ff' }}>Add</Button>
                                            <Button onClick={() => handleDeleteSubject(item.id)} style={{ color: '#ff4d4f' }}>Delete</Button>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>

        </div>
    )
}

export default AllUserComponent;
