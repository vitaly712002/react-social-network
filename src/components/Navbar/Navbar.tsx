import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { MailOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
const Navbar = () => {
  const [current, setCurrent] = useState('1');
  const handleClick = (e: any): void => {
    setCurrent(e.key);
  };
  
  return (
    <Menu
      theme={'light'}
      onClick={handleClick}
      style={{  height: '100%' }}
      defaultOpenKeys={['sub1']}
      selectedKeys={[current]}
      mode="inline">
      <SubMenu key="sub1" icon={<MailOutlined />} title="Navbar">
        <Menu.Item key="1">
          <Link to="/profile">Profile</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/dialogs">Message</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/users">Users</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/settings">Settings</Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/chat">Chat</Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};
export default Navbar;
