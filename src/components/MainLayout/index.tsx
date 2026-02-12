import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import AppHeader from '../AppHeader';
import Logo from '../Logo';
import { Link } from 'react-router';
import './styles.css';

const { Header, Content, Footer, Sider } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const items = [
    {
      key: '1',
      icon: React.createElement(UnorderedListOutlined),
      label: <Link to={'/'}>Campaigns</Link>
    },
    {
      key: '2',
      icon: React.createElement(PlusOutlined),
      label: <Link to="/campaigns/new">Create Campaign</Link>
    }
  ];

  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <Logo />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
      </Sider>
      <Layout>
        <AppHeader />
        <Content>
          <div
            style={{
              background: colorBgContainer
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Raffle Picker ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
