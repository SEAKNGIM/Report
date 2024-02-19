import React, { useState } from 'react';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { Sidebar } from 'flowbite-react';
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Report', 'sub1', <MailOutlined />, [
        getItem(
            <button>
                <NavLink to="/report-list/current"
                > All Report
                </NavLink>
            </button>, '6'),
    ]),

    getItem('Shift', 'sub2', <MailOutlined />, [
        getItem(
            <button>
                <NavLink to="/shift-list/current"
                > All Shift
                </NavLink>
            </button>, '6'),

    ]),

    getItem('Subject', 'sub3', <MailOutlined />, [
        getItem(
            <button>
                <NavLink to="/subject-list/current"
                > All Subject
                </NavLink>
            </button>, '6'),
    ]),
];
const userRole = localStorage.getItem('user_role');

const filterItemsByRole = (items, userRole) => {
    return items.filter((item) => !item.role || item.role === userRole);
};

const Slidebaes = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const filteredItems = filterItemsByRole(items, userRole);
    return (
        <div className='w-1/6 min-h-full bg-gray-500' >
            <Button
                type="primary"
                onClick={toggleCollapsed}
                style={{
                    marginBottom: 16,
                }}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu className="text-white "
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="grey"
                inlineCollapsed={collapsed}
                items={filteredItems}
            />
        </div>
    );
}

export default Slidebaes;
