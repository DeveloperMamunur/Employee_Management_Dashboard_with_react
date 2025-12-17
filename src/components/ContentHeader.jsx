import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";

export default function ContentHeader({ showDrawer }) {
  

  return (
    <div>
      <Flex justify="space-between" align="center">
        <h2>Employee Management</h2>
        <Button type="primary" onClick={showDrawer}><PlusOutlined /> Add Employee</Button>
      </Flex>
    </div>
  );
}