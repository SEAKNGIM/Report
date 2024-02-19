import React, { useEffect, useState } from 'react';
import Slidebaes from '../layout/Slidebaes';
import { useDispatch, useSelector } from 'react-redux';

import { Table } from 'antd';
const columns = [
    
    {
        title: 'No',
        dataIndex: 'no',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Description',
        dataIndex: 'description',
    },
    {
        title: 'Date',
        dataIndex: 'date',
    },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
    }),
};
const LecturerList = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.lecturer.lecturers)
    // useEffect(() => {
    //     handleGetLecturer();
    // }, [])
    return (
        <div>
            <div className='flex'>
                <div>
                    <div>
                        <Table
                        
                            columns={ columns }
                            dataSource={data}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LecturerList;
