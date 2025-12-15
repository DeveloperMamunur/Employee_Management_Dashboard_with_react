import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Breadcrumb, Flex, Spin  } from 'antd';
import DataTable from './components/DataTable';
import ContentHeader from './components/ContentHeader';
const { Header, Sider, Content } = Layout;
function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Flex 
        justify="center" 
        align="center" 
        gap="middle"
        style={{ height: '100vh' }}
      >
        <Spin size="large" />
      </Flex>
    );
  }
  return (
    <>
      <Layout
      style={{ minHeight: '100vh' }}
      >
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div 
            className='logo'
            style={{
              margin: '6px',
              padding: '10px',
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '6px',
              textAlign: 'center',
              lineHeight: '32px',
              color: '#fff',
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            <DashboardOutlined style={{ marginRight: '8px' }} />{collapsed ? '' : 'My App'}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: 'nav 1',
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: 'nav 2',
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3',
              },
            ]}
          />
        </Sider>
        <Layout
          style={{
            transition: 'all 0.2s',
          }}
        >
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Breadcrumb
            style={{ margin: '16px 16px 0' }}
            items={[
              {
                title: 'Home',
              },
              {
                title: <a href="">user</a>,
              },
              {
                title: 'Employee Management',
              },
            ]}
          />
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <ContentHeader />
            <DataTable />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default App
