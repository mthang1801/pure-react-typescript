import { Form, Input, Table } from "antd";
import React from "react";
import { columnsGroupData } from "./data";

const GroupProduct = () => {
  return (
    <div className="productPage__create__form__group">
      <h4>Thêm sản phẩm</h4>
      <Form.Item label="Tên sản phẩm">
        <Input className="defaultInput" placeholder="Nhập tên sản phẩm" />
      </Form.Item>
      <Table
        rowKey="id"
        dataSource={[]}
        bordered
        columns={columnsGroupData() as any}
      />
    </div>
  );
};

export default GroupProduct;
