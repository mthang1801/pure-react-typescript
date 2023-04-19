import { Switch } from "antd";

export const columnsData = () => {
  return [
    {
      title: "Kênh bán hàng",
      dataIndex: "scheduler_id",
      key: "scheduler_id",
      render: (scheduler_id: string, record: any, index: number) => {
        return <div>{scheduler_id}</div>;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "scheduler_interval",
      key: "scheduler_interval",

      render: (scheduler_interval: string, record: any, index: number) => {
        return <div>{scheduler_interval}</div>;
      },
    },

    {
      title: "Đồng bộ",
      dataIndex: "desc",
      key: "desc",
      render: (desc: string, record: any, index: number) => {
        return <div>{desc}</div>;
      },
    },
  ];
};
