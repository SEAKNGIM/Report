
import { setReportCurrenUser } from '../../redux/slices/ReportSlices';
import { useDispatch, useSelector } from 'react-redux';
import ReportServices from '../../redux/service/ReportServices';
import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table, Tag } from 'antd';
import AddReport from './popup/AddReport';
import EditReport from './popup/EditReport';


const ReportAllUserComponent = () => {
    const dispatch = useDispatch();

    // get report list
    const handleGetReportList = () => {
        try {
            ReportServices.getReportCurrentUser().then((res) => {
                dispatch(setReportCurrenUser(res.data));
                console.log("res", res);
            });
        } catch (error) {
            console.log("Error fetching report:", error);
        }
    };

    useEffect(() => {
        handleGetReportList();
        const intervalId = setInterval(() => {
            handleGetReportList();
        }, 3000);
        return () => clearInterval(intervalId);

    }, []);
    const resData = useSelector((state) => state.report.reportCurrenUser);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [id, setid] = useState()
    console.log("resData", resData);

    if (!resData) {
        // Handle the case where resData is undefined or null
        return <p>Loading...</p>;
    }
    // delete report
    const handleDelete = (record) => {
        ReportServices.deleteById(record).then((res) => {
            console.log(res)
        }).catch((e) => {

        })
        console.log('Delete report:', record);
    };
    //Edit 
    const handleEdit = (record) => {
        setIsOpenEdit(true)
        setid(record)
    }

    const columns = [
        {
            title: 'Lecture',
            dataIndex: 'lecture',
            key: 'lecture',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
        },
        {
            title: 'Shift',
            dataIndex: 'shift',
            key: 'shift',
        },
        {
            title: 'Room',
            dataIndex: 'room',
            key: 'room',
            render: (_, { room }) => (
                <>
                    {room.map((tag) => {
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
            title: 'Number of Student',
            dataIndex: 'student',
            key: 'student',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleEdit(record.key)}>Edit</a>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}><a>Delete</a></Popconfirm>
                </Space>
            ),
        },
    ];
    const pagination = {
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
    };
    // .slice().reverse()
    const data = resData.slice().reverse().map((item) => ({
        key: item.id, // Assuming there's an 'id' property in your data
        lecture: item.user.firstName,
        subject: item.subject.name,
        shift: item.shift.name,
        student: item.studentNum,
        date: item.date,
        room: item.room
        // Assuming 'action' property is available in your data
    }))

    // add model
    const handleOk = () => {
        setIsModalOpen(false);
        // Additional logic when modal is OK
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsOpenEdit(false)
        // Additional logic when modal is canceled
    };
    return (
        <div>
            <Button type="default" onClick={() => setIsModalOpen(true)}>
                Add New Report
            </Button>
            <AddReport isOpen={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
            <EditReport isOpen={isOpenEdit} onOk={handleOk} onCancel={handleCancel} id={id} />
            <Table columns={columns} dataSource={data} pagination={pagination} />;
        </div>
    )



}

export default ReportAllUserComponent;