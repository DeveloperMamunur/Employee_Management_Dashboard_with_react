import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Breadcrumb  } from 'antd';
import AnchorLink from 'antd/es/anchor/AnchorLink';
const { Header, Sider, Content } = Layout;
function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Layout
      style={{ minHeight: '100vh' }}
      >
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <AnchorLink
           href="#/"
           style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 16,
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: borderRadiusLG,
           }}
          >
            <div className='logo'>logo</div>
          </AnchorLink>
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
              title: <a href="">Application Center</a>,
            },
            {
              title: 'An Application',
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
          Content
        </Content>
      </Layout>
    </Layout>
    </>
  )
}

export default App
