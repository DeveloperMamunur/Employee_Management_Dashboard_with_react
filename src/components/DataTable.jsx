import React, { useMemo, useState } from 'react';
import { Table, Dropdown, Space, Button, Input, Popconfirm, Switch } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { Search } = Input;

const DataTable = ({ employees, setEmployees, showDrawer }) => {
  const [searchText, setSearchText] = useState('');
  const [showArchivedOnly, setShowArchivedOnly] = useState(false);
  const [tableParams, setTableParams] = useState({
    sorter: {},
    filters: {},
  });

  const filteredEmployees = useMemo(() => {
    let data = [...employees];

    if (searchText) {
      const q = searchText.toLowerCase();
      data = data.filter((item) =>
        ['name', 'department', 'role', 'status'].some((key) =>
          item[key]?.toLowerCase().includes(q)
        )
      );
    }

    if (showArchivedOnly) {
      data = data.filter((item) => item.archived === true);
    }

    return data;
  }, [employees, searchText, showArchivedOnly]);

  const handleEdit = (employee) => {
    showDrawer(employee);
  };

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((item) => item.id !== id));
  };

  const handleArchiveToggle = (id) => {
    setEmployees((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, archived: !item.archived } : item
      )
    );
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      sorter: (a, b) => a.department.localeCompare(b.department),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
      title: 'Joining Date',
      dataIndex: 'joiningDate',
      sorter: (a, b) => new Date(a.joiningDate) - new Date(b.joiningDate),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'On Leave', value: 'On Leave' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Performance Score',
      dataIndex: 'performanceScore',
      sorter: (a, b) => a.performanceScore - b.performanceScore,
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>

          <Popconfirm
            title="Delete employee?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger>
              Delete
            </Button>
          </Popconfirm>
          <Button type={record.archived ? 'default' : 'primary'} onClick={() => handleArchiveToggle(record.id)}>
            {record.archived ? 'Unarchive' : 'Archive'}
          </Button>
        </Space>
      ),
    }
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({ filters, sorter });
  };

  const enhancedColumns = columns.map((col) => ({
    ...col,
    sortOrder:
      tableParams.sorter.field === col.dataIndex
        ? tableParams.sorter.order
        : null,
    filteredValue: tableParams.filters?.[col.dataIndex] || null,
  }));

  const sortMenuItems = [
    {
      key: 'department',
      label: (
        <span
          onClick={() =>
            setTableParams({
              ...tableParams,
              sorter: { field: 'department', order: 'ascend' },
            })
          }
        >
          Sort by Department
        </span>
      ),
    },
    {
      key: 'joiningDate',
      label: (
        <span
          onClick={() =>
            setTableParams({
              ...tableParams,
              sorter: { field: 'joiningDate', order: 'ascend' },
            })
          }
        >
          Sort by Joining Date
        </span>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between' }}>
        <Search
          allowClear
          placeholder="Search employees..."
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 350 }}
        />

        <Dropdown menu={{ items: sortMenuItems }} trigger={['click']}>
          <Button>
            <Space>
              Sort Options <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>

      <div style={{ marginBottom: 16 }}>
        Archived Only :
        <Switch
          checked={showArchivedOnly}
          onChange={setShowArchivedOnly}
          style={{ marginLeft: 15 }}
        />
      </div>

      <Table
        rowKey="id"
        columns={enhancedColumns}
        dataSource={filteredEmployees}
        onChange={handleTableChange}
        pagination={{ pageSize: 8 }}
      />
    </>
  );
};

export default DataTable;
