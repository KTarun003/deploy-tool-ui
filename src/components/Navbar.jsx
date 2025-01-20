import React, { useState } from 'react';
import { AppstoreOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
    {
        label: (<a href="/">Profiles</a>),
        key: 'profiles',
        icon: <UserOutlined />,
    },
    {
        label: (<a href="/services">Service Templates</a>),
        key: 'service',
        icon: <AppstoreOutlined />,
    },
    {
        label: (<a href="/nginx">Nginx Config Templates</a>),
        key: 'nginx',
        icon: <SettingOutlined />,
    },
];
const Navbar = () => {
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default Navbar;