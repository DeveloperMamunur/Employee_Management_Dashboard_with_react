import React, { useEffect, useState } from 'react';
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
import DrawerComponent from './components/DrawerComponent';
import employeesData from './data/employees.json';

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [open, setOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const showDrawer = (employee = null) => {
    setEditingEmployee(employee);
    setOpen(true);
    setSize('large');
  };
  const onClose = () => {
    setOpen(false);
    setEditingEmployee(null);
  };

  const [employees, setEmployees] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('employees');
    const parsed = stored ? JSON.parse(stored) : [];

    const sourceData =
      Array.isArray(parsed) && parsed.length > 0
        ? parsed
        : employeesData;

    const withIds = sourceData.map((emp, index) => ({
      ...emp,
      id: emp.id ?? String(index + 1),
    }));

    setEmployees(withIds);
  }, []); 

  useEffect(() => {
    if (employees.length > 0) {
      localStorage.setItem('employees', JSON.stringify(employees));
    }
  }, [employees]);

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
                title: <span>User</span>,
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
            <ContentHeader showDrawer={showDrawer} />
            <DataTable 
              employees={employees} 
              setEmployees={setEmployees} 
              showDrawer={showDrawer} 
            />
          </Content>
        </Layout>
      </Layout>
      <DrawerComponent 
        onClose={onClose} 
        open={open} 
        size={size} 
        setEmployees={setEmployees} 
        employee={editingEmployee}
      />
    </>
  )
}

export default App
