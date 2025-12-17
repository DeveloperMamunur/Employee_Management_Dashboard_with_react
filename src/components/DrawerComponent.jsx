import React, { useEffect } from 'react';
import { Drawer, Form, Input, DatePicker, Select, InputNumber , Button } from 'antd';
import dayjs from 'dayjs';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const DrawerComponent = ({onClose, open, size, setEmployees, employee}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (employee) {
        form.setFieldsValue({
          employee: {
            ...employee,
            joiningDate: employee.joiningDate ? dayjs(employee.joiningDate) : null,
          },
        });
      } else {
        form.resetFields();
      }
    }
  }, [employee, form, open]);

  const onFinish = (values) => {
    const payload = {
      id: employee?.id ?? Date.now().toString(),
      name: values.employee.name,
      department: values.employee.department,
      role: values.employee.role,
      joiningDate: values.employee.joiningDate?.format('YYYY-MM-DD'),
      status: values.employee.status,
      performanceScore: values.employee.performanceScore,
      archived: employee?.archived ?? false,
    };

    setEmployees(prev => {
      const exists = prev.some(e => e.id === payload.id);
      const updated = exists
        ? prev.map(e => e.id === payload.id ? payload : e)
        : [...prev, payload];

      localStorage.setItem('employees', JSON.stringify(updated));
      return updated;
    });
    console.log(form.getFieldsValue());

    form.resetFields();
    onClose();
  };
  return (
    <>
      <Drawer
        title={employee ? 'Edit Employee' : 'Add Employee'}
        closable={{ 'aria-label': 'Close Button' }}
        onClose={onClose}
        open={open}
        size={size}
        destroyOnClose
      >
        <Form
          form={form}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
          initialValues={{
            employee: {
              status: 'Active',
              performanceScore: 50,
            },
          }}
        >
          <Form.Item name={['employee', 'name']} label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['employee', 'department']} label="Department" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['employee', 'role']} label="Role" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['employee', 'joiningDate']} label="Joining Date">
            <DatePicker />
          </Form.Item>
          <Form.Item name={['employee', 'status']} label="Status" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="On Leave">On Leave</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name={['employee', 'performanceScore']} label="Performance Score">
            <InputNumber min={0} max={100} />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
export default DrawerComponent;