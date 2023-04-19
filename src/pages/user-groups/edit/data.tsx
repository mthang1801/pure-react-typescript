/* eslint-disable */
import { Row } from "antd";
import SvgIconView from "src/assets/svg/SvgIconView";
import colors from "src/utils/colors";

export const columnsData = [
  // {
  //   title: 'Ảnh',
  //   dataIndex: 'image',
  //   key: 'image',
  //   render: (text: string, record: any, index: number) => {
  //     return <Image
  //         width={40}
  //         height={40}
  //         src={text}
  //       />
  //   },
  // },
  {
    title: "Khách hàng",
    dataIndex: "khachang",
    key: "khachang",
    render: (text: string, record: any, index: number) => {
      return (
        <span className="flex flex-col justify-start items-start">
          {text}
          <p style={{ color: "#2D9CDB" }}>{record.phone}</p>
        </span>
      );
    },
  },
  {
    title: "Loại",
    dataIndex: "type",
    key: "type",
    render: (text: string, record: any, index: number) => {
      return <span>{text}</span>;
    },
  },
  {
    title: "Giới tính",
    dataIndex: "gender",
    key: "gender",
    render: (text: string, record: any, index: number) => {
      return <span>{text}</span>;
    },
  },

  {
    title: "Tổng tiền",
    dataIndex: "totalprice",
    key: "totalprice",
    render: (text: string, record: any, index: number) => {
      return <span className="text-right w-full">{text}</span>;
    },
  },
  {
    title: "Số lần mua",
    dataIndex: "countorder",
    key: "countorder",
    render: (text: string, record: any, index: number) => {
      return <span>{text}</span>;
    },
  },
  {
    title: "Điểm tích luỹ",
    dataIndex: "point",
    key: "point",
    render: (text: string, record: any, index: number) => {
      return <span>{text}</span>;
    },
  },
  {
    title: "Ngày mua gần nhất",
    dataIndex: "datebuy",
    key: "datebuy",
    render: (text: string, record: any, index: number) => {
      return <span>{text}</span>;
    },
  },
  {
    title: "Ngày tạo",
    dataIndex: "create_at",
    key: "create_at",
    render: (text: string, record: any, index: number) => {
      return <span>{text}</span>;
    },
  },
  {
    title: "Thao tác",
    dataIndex: null,
    key: null,
    render: (text: string, record: any, index: number) => {
      return (
        <Row>
          <button>
            <SvgIconView color={colors.primary_color_1_2} />
          </button>
        </Row>
      );
    },
  },
];

export const dataProductOptions = [
  { label: "Xem sản phẩm", value: "1" },
  { label: "Tạo sản phẩm", value: "2" },
  { label: "Sửa sản phẩm", value: "3" },
  { label: "Xóa sản phẩm", value: "4" },
  { label: "Xuất file sản phẩm", value: "5" },
  { label: "Nhập file sản phẩm", value: "6" },
];

export const dataOrderOptions = [
  { label: "Xem đơn hàng", value: "1" },
  { label: "Tạo đơn hàng", value: "2" },
  { label: "Hủy đơn hàng", value: "3" },
  { label: "Sửa đơn hàng", value: "4" },
  { label: "Duyệt đơn hàng", value: "5" },
  { label: "Xuất file đơn hàng", value: "6" },
  { label: "Nhập file đơn hàng", value: "7" },
  { label: "Đóng gói & giao hàng", value: "8" },
  { label: "Thanh toán đơn hàng", value: "9" },
  { label: "Xuất HĐ điện tử", value: "10" },
];

export const dataCustomerOptions = [
  { label: "Xem khách hàng", value: "1" },
  { label: "Tạo khách hàng", value: "2" },
  { label: "Sửa khách hàng", value: "3" },
  { label: "Xóa khách hàng", value: "4" },
  { label: "Xuất file khách hàng", value: "5" },
  { label: "Nhập file khách hàng", value: "6" },
];

export const defaultCheckedProduct = ["1", "2"];

export const selectOptions = {
  name: "name",
  value: "value",
};

export const datacheck = [
  {
    title: "Sản phẩm",
    child: [
      {
        label: "Xem sản phẩm",
        value: "Xem sản phẩm",
      },
      {
        label: "Tạo sản phẩm",
        value: "Tạo sản phẩm",
      },
      {
        label: "Xoá sản phẩm",
        value: "Xoá sản phẩm",
      },
      {
        label: "Sửa sản phẩm",
        value: "Sửa sản phẩm",
      },
      {
        label: "Xuất file sản phẩm",
        value: "Xuất file sản phẩm",
      },
      {
        label: "Nhập file sản phẩm",
        value: "Xuất file sản phẩm",
      },
    ],
  },
  {
    title: "Sản phẩm",
    child: [
      {
        label: "Xem sản phẩm",
        value: "Xem sản phẩm",
      },
      {
        label: "Tạo sản phẩm",
        value: "Tạo sản phẩm",
      },
      {
        label: "Xoá sản phẩm",
        value: "Xoá sản phẩm",
      },
      {
        label: "Sửa sản phẩm",
        value: "Sửa sản phẩm",
      },
      {
        label: "Xuất file sản phẩm",
        value: "Xuất file sản phẩm",
      },
      {
        label: "Nhập file sản phẩm",
        value: "Xuất file sản phẩm",
      },
    ],
  },
  {
    title: "Sản phẩm",
    child: [
      {
        label: "Xem sản phẩm",
        value: "Xem sản phẩm",
      },
      {
        label: "Tạo sản phẩm",
        value: "Tạo sản phẩm",
      },
      {
        label: "Xoá sản phẩm",
        value: "Xoá sản phẩm",
      },
      {
        label: "Sửa sản phẩm",
        value: "Sửa sản phẩm",
      },
      {
        label: "Xuất file sản phẩm",
        value: "Xuất file sản phẩm",
      },
      {
        label: "Nhập file sản phẩm",
        value: "Xuất file sản phẩm",
      },
    ],
  },
];

export const dataOptionsOnline = [
  { name: "Hiển thị", value: "A" },
  { name: "Ẩn", value: "D" },
];
