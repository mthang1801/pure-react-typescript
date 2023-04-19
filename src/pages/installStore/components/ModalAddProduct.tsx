import { Form, Input, Modal, Select } from "antd";
import React from "react";

const ModalAddProduct = ({ handleCloseCallback }: any) => {
  return (
    <Form layout="vertical" className="formAddProduct">
      <Form.Item label="SKU">
        <Input className="defaultInput" />
      </Form.Item>
      <Form.Item label="Tên sản phẩm">
        <Input className="defaultInput" />
      </Form.Item>
      <Form.Item label="Giá bán lẻ">
        <Input className="defaultInput" />
      </Form.Item>
      <Form.Item label="Loại sản phẩm">
        <Select options={[]} className="defaultSelect" />
      </Form.Item>
      <Form.Item label="Khối lượng (kg)">
        <Input className="defaultInput" />
      </Form.Item>
      <Form.Item label="Đơn vị">
        <Select options={[]} className="defaultSelect" />
      </Form.Item>
      <Form.Item label="Giá nhập">
        <Input className="defaultInput" />
      </Form.Item>
      <Form.Item label="Số lượng nhập">
        <Input className="defaultInput" />
      </Form.Item>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          className="defaultButton"
          style={{
            background: "#999999",
            color: "#fff",
            borderColor: "#999999",
            marginRight: "8px",
          }}
          onClick={() => handleCloseCallback()}
        >
          Trở lại
        </div>
        <div className="defaultButton">Thêm</div>
      </div>
    </Form>
  );
};

export default ModalAddProduct;
