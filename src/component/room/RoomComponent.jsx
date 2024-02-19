import { Button, Popconfirm, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoomService from '../../redux/service/RoomService';
import { setRoom } from '../../redux/slices/RoomSlices';
import AddRoom from './popup/AddRoom';

const RoomComponent = () => {
    const dispatch = useDispatch();
    const resData = useSelector((state) => state.room.rooms)
  // get all room
  const handleGetRoom = () => {
    RoomService.getAllRoom().then(res => {
      console.log(res.data.data);
      dispatch(setRoom(res.data.data));
    });
  };


        useEffect(() => {
            const intervalId = setInterval(() => {
                handleGetRoom();
            }, 2000);
            return () => clearInterval(intervalId);
        }, [])
    const pagination = {
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
    };
     // delete report
     const handleDelete = (record) => {
        RoomService.deleteById(record).then((res)=>{
            console.log(res)
        })
        // ReportServices.deleteById(record).then((res) => {
        //     console.log(res)
        // }).catch((e) => {

        // })
        // console.log('Delete report:', record);
    };
    //Edit 
    const handleEdit = (record) => {
        // setIsOpenEdit(true)
        // setid(record)
    }
    const columns = [
        {
            title: 'Room',
            dataIndex: 'name',
            // sorter: {
            //     compare: (a, b) => a.name.localeCompare(b.name),
            //     multiple: 1,
            // },
        },
        {
            title: 'Description',
            dataIndex: 'description',
            // sorter: {
            //     compare: (a, b) => a.description.localeCompare(b.description),
            //     multiple: 2,
            // },
        },
        {
            title: 'Floor',
            dataIndex: 'floor',
            // sorter: {
            //     compare: (a, b) => new Date(a.date) - new Date(b.date),
            //     multiple: 3,
            // },
        },
        {
            title: 'Type',
            dataIndex: 'type',
            // sorter: {
            //     compare: (a, b) => new Date(a.date) - new Date(b.date),
            //     multiple: 3,
            // },
        },
        {
            title: 'Date',
            dataIndex: 'date',
            // sorter: {
            //     compare: (a, b) => new Date(a.date) - new Date(b.date),
            //     multiple: 3,
            // },
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleEdit(record.key)}>Edit</a>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}><a>Delete</a></Popconfirm>
                </Space>
            ),
        },
      
    ];
    console.log("resData" ,resData)
    const data = resData.slice().reverse().map((item, index) => ({
        key: item.id,
        name: item.name,
        description: item.description,
        date: item.date,
        type: item.type,
        floor: item.floor,
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
            // Additional logic when modal is canceled
        };
    return (
        <div>
                <Button type="default" onClick={() => setIsModalOpen(true)}>
                    Add Room
                </Button>
            <AddRoom isOpen={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
             <Table columns={columns} dataSource={data} onChange={onChange} pagination={pagination} />
        </div>
    );
}

export default RoomComponent;
