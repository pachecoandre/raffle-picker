import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import NavBar from '../NavBar';
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
      label: 'Campaigns'
    },
    {
      key: '2',
      icon: React.createElement(PlusOutlined),
      label: 'Create Campaign'
    }
  ];

  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div style={{ minHeight: 70 }} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <NavBar />
        </Header>
        <Content className="content">
          <div
            style={{
              background: colorBgContainer
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
