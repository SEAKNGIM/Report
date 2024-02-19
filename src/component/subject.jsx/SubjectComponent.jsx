import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import SubjectService from '../../redux/service/SubjectSevice';
import { setCurrentSubject } from '../../redux/slices/SubjectSlices';


const SubjectComponent = () => {
    const dispatch = useDispatch();
    const resData = useSelector((state) => state.subject.currentUserSubjects)



    const handleGetSubject = () => {
        SubjectService.getAllCurrentSubject().then(res => {
            try {
                console.log("getAllSubject", res.data.data.payload)
                dispatch(setCurrentSubject(res.data.data.payload))
            } catch { }
        })
    }
    useEffect(() => {
        
        const intervalId = setInterval(() => {
            handleGetSubject();
        }, 2000);
        return () => clearInterval(intervalId);
    }, [])

    const pagination = {
        defaultPageSize: 2,
        showSizeChanger: true,
        pageSizeOptions: ['10', '5', '2'],
    };
    const columns = [
        {
            title: 'Subject',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 3,
            },
        },
        {
            title: 'Date',
            dataIndex: 'date',
            sorter: {
                compare: (a, b) => a.math - b.math,
                multiple: 2,
            },
        },
    ];
    console.log(resData)
    const data = resData.map((item) => ({
        key: item.dataIndex,
        name: item.name,
        description: item.description,
        date: item.date,

    }
    ));

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return (
        <div>
            <Table columns={columns} dataSource={data} onChange={onChange} pagination={pagination} />
        </div>
    );
}

export default SubjectComponent;
