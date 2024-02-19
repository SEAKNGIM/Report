import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import SubjectService from '../../redux/service/SubjectSevice';
import SubjectSlices, { setAllSubject } from '../../redux/slices/SubjectSlices';
import AddSubject from './popup/AddSubject';
import EditeComponent from './popup/EditeComponent';
const AllSubjectComponent = () => {
    const dispatch = useDispatch();
    const resData = useSelector((state) => state.subject.allsubjects)
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState()
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
    const handleEdit = (id) => {
        setIsOpenEdit(true);
        setId(id)
        console.log("id", id)

    }
    const handleDelete = (id) => {
        console.log(id)
        SubjectService.deleteById(id).then((res) => {

        })
    }


    const pagination = {
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '500'],
    };
    const columns = [
        {
            title: 'Subject',
            dataIndex: 'name',
            sorter: {
                compare: (a, b) => a.name.localeCompare(b.name),
                multiple: 1,
            },
        },
        {
            title: 'Description',
            dataIndex: 'description',
            sorter: {
                compare: (a, b) => a.description.localeCompare(b.description),
                multiple: 2,
            },
        },
        {
            title: 'Date',
            dataIndex: 'date',
            sorter: {
                compare: (a, b) => new Date(a.date) - new Date(b.date),
                multiple: 3,
            },
        },
        {

            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleEdit(record.action)}>Edit</a>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.action)}><a>Delete</a></Popconfirm>
                </Space>
            ),
        },
    ];
    useEffect(() => {
        handleGetSubject();
        const intervalId = setInterval(() => {
            handleGetSubject();
        }, 2000);
        return () => clearInterval(intervalId);

    }, [])
    console.log(resData)
    const data = resData.slice().reverse().map((item) => ({
        key: item.dataIndex,
        name: item.name,
        description: item.description,
        date: item.date,
        action: item.id

    }
    ));

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    // add model
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                Add New Subject
            </Button>
            <AddSubject isOpen={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
            <EditeComponent isOpen={isOpenEdit} onCancel={handleCancel} id={id} />
            <Table columns={columns} dataSource={data} onChange={onChange} pagination={pagination} />
        </div>
    );
}

export default AllSubjectComponent;
