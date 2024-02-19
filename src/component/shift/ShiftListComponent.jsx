import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ShiftService from '../../redux/service/ShiftService';
import { setAllShifts, setCurrenShifts} from '../../redux/slices/ShiftSlices';
import AddShift from './popup/AddShift';
const ShiftListComponent = () => {
    const dispatch = useDispatch();
    const resData = useSelector((state) => state.shift.currenShifts)
    // get all shift
    const handleGetShift = () => {
        ShiftService.getCurrenShift().then(res => {
            console.log(res.data.data.payload)
            dispatch(setCurrenShifts(res.data.data.payload))
        })
    }
    useEffect(() => {
        const intervalId = setInterval(() => {
            handleGetShift();
        }, 2000);
        return () => clearInterval(intervalId);
    }, [])
    const pagination = {
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
    };
    const columns = [
        {
            title: 'Shift',
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
    ];
    console.log(resData)
    const data = resData.slice().reverse().map((item, index) => ({
        key: index,
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

export default ShiftListComponent;
