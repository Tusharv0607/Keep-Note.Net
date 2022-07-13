import React from 'react';
import { Link} from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, ContainerOutlined,LogoutOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';

const NavBar = () => {

  const Logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
  }

  const menuItems = [
    {
      key: 'home',
      label: (
        <Link to="/">
          Home
        </Link>),
      icon: <HomeOutlined />,
      className: 'navbar-btn'
    },
    {
      key: 'about',
      icon: <ContainerOutlined />,
      className: 'navbar-btn',
      label: (
        <Link to="/AboutUs">
          About
        </Link>
      )
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      className: 'navbar-btn',
      label: <a href='/Login' onClick={Logout}>Logout</a>,
      disabled: (!localStorage.getItem('token') ? true : false)
    },
    {
      key: 'login',
      icon: <LoginOutlined />,
      className: 'navbar-btn',
      label: (
        <Link to="/Login">
          Login
        </Link>
      ),
      disabled: (localStorage.getItem('token') ? true : false)
    },
    {
      key: 'signup',
      icon: <UserOutlined />,
      className: 'navbar-btn',
      label: (
        <Link to="/Signup">
          Signup
        </Link>
      ),
      disabled: (localStorage.getItem('token') ? true : false)
    },

  ];

  return (

    <>
      <Menu mode="horizontal" className='navbar' defaultSelectedKeys={['h']} items={menuItems} >
      </Menu>
    </>
  )
};

export default NavBar;
