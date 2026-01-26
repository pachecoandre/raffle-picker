import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../state';
import { Layout } from 'antd';
import './styles.css';

const { Header } = Layout;

const NavBar = () => {
  const { resetState } = useGlobalContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('t');
    resetState();
    navigate('/login');
  };

  return (
    <Header style={{ padding: 0, background: '#eeeeee' }}>
      <div className="navbar">
        <button onClick={handleLogout}>Log out</button>
      </div>
    </Header>
  );
};

export default NavBar;
