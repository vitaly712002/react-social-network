import { Button, Col, Menu, Row, Layout } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { UserOutlined } from '@ant-design/icons';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../../redux/auth-reducer';
import {
  getAuthLogin,
  getAuthUserId,
  getIsAuth,
} from '../../redux/auth-selectors';

type PropsType = {};

const Header: React.FC<PropsType> = (props) => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };
  const userId = useSelector(getAuthUserId);
  const login = useSelector(getAuthLogin);
  const isAuth = useSelector(getIsAuth);
  const { Header } = Layout;
  return (
    <Header className="header">
      <Row>
        <Col span={18}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">
              <Link to="/users">Developers</Link>
            </Menu.Item>
          </Menu>
        </Col>

        {isAuth ? (
          <>
            <Col span={2}>
              <Link to="/profile">
                id:{userId}
                <Avatar
                  alt={login || ''}
                  style={{ backgroundColor: '#87d068', marginLeft: '10px' }}
                  icon={<UserOutlined />}
                />
              </Link>
            </Col>
            <Col span={4}>
              <Button onClick={onLogout}>Log out</Button>
            </Col>
          </>
        ) : (
          <Col span={6} style={{ color: 'white' }}>
            <Button>
              <Link to={'/login'}>Login</Link>
            </Button>
            email: eiz57720@cuoly.com
          </Col>
        )}
      </Row>
    </Header>
  );
};
export default Header;
