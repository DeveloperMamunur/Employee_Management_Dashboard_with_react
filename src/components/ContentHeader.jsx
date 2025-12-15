import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";

export default function ContentHeader() {
  return (
    <div>
      <Flex justify="space-between" align="center">
        <h2>Employee Management</h2>
        <Button type="primary"><PlusOutlined /> Add Employee</Button>
      </Flex>
    </div>
  );
}