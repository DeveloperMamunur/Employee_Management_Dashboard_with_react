import React, { useEffect, useState } from 'react';
import { Table, Dropdown, Space, Button, Input, Popconfirm, Switch  } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import rawData from '../data/employees.json';

const { Search } = Input;

const columns = [
  { 
    title: 'Name', 
    dataIndex: 'name', 
    sorter: (a, b) => a.name.localeCompare(b.name) 
  },
  { 
    title: 'Department', 
    dataIndex: 'department', 
    sorter: (a, b) => a.department.localeCompare(b.department) },
  { 
    title: 'Role', 
    dataIndex: 'role', 
    sorter: (a, b) => a.role.localeCompare(b.role) },
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
    sorter: (a, b) => a.performanceScore - b.performanceScore 
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <Space>
        <Button
          type="primary"
          onClick={() => handleEdit(record)}
        >
          Edit
        </Button>

        <Popconfirm
          title="Delete employee?"
          description={`Are you sure you want to delete ${record.name}?`}
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>
            Delete
          </Button>
        </Popconfirm>
      </Space>
    ),
  }
];

const handleEdit = (record) => {
  console.log('Edit record:', record);
};

const handleDelete = (id) => {
  console.log('Delete record with id:', id);
};

const DataTable = () => {
  const [originalData] = useState(rawData);
  const [data, setData] = useState(rawData);
  const [searchText, setSearchText] = useState('');
  const [tableParams, setTableParams] = useState({
    sorter: {},
    filters: {}
  });
  const [showArchivedOnly, setShowArchivedOnly] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      let filteredData = [...originalData];

    if (searchText) {
      const q = searchText.toLowerCase();
      filteredData = filteredData.filter((item) =>
        ['name', 'department', 'role', 'status'].some((key) =>
          item[key]?.toLowerCase().includes(q)
        )
      );
    }

    if (showArchivedOnly) {
      filteredData = filteredData.filter(item => item.archived === true);
    }

    setData(filteredData);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText, showArchivedOnly, originalData]);
  

  const items = [
    {
      key: 'department',
      label: (
        <span onClick={() => setTableParams({
          ...tableParams,
          sorter: { field: 'department', order: 'ascend' },
        })}>
          Sort by Department
        </span>
      ),
    },
    {
      key: 'joiningDate',
      label: (
        <span onClick={() => setTableParams({
          ...tableParams,
          sorter: { field: 'joiningDate', order: 'ascend' },
        })}>
          Sort by Joining Date
        </span>
      ),
    },
    {
      key: 'status',
      label: (
        <span onClick={() => setTableParams({
          ...tableParams,
          sorter: { field: 'status', order: 'ascend' },
        })}>
          Sort by Status
        </span>
      ),
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({ filters, sorter, ToggleEvent });
  };

  const enhancedColumns = columns.map((col) => ({
    ...col,
    sortOrder:
      tableParams.sorter.field === col.dataIndex
        ? tableParams.sorter.order
        : null,
    filteredValue: tableParams.filters?.[col.dataIndex] || null,
  }));

  const onArchiveToggle = (checked) => {
    setShowArchivedOnly(checked);
  };

  return (
    <>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between' }}>
        <Search
          allowClear
          placeholder="Search by name, department, role, status..."
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 350 }}
        />

        <Dropdown menu={{ items }} trigger={['click']}>
          <Button>
            <Space>
              Sort Options
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>

      <div style={{ marginBottom: 16 }}>
        Archived Only&nbsp;:
        <Switch 
          checked={showArchivedOnly} 
          onChange={onArchiveToggle} 
          style={{marginLeft: 15}}
          />
      </div>

      <Table
        rowKey="id"
        columns={enhancedColumns}
        dataSource={data}
        onChange={handleTableChange}
        pagination={{ pageSize: 8 }}
      />
    </>
  );
};

export default DataTable;
