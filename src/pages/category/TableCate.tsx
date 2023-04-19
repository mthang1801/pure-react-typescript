import React from "react";
import { Space, Table } from "antd";
import { ReactComponent as Del } from "../../assets/images/delete.svg";
import { ReactComponent as View } from "../../assets/images/view.svg";
import { Row, Col } from "antd";
import TableStyledAntd from "src/components/table/TableStyled";

interface Category {
	category: string;
	meta_description: string;
	data: any;
	category_id: number;
}
interface CateProp {
	dataSource: Category[];
}

const TableCate: React.FC<CateProp> = ({ dataSource }) => {
	const rowSelection = {};
	const columns = [
		{
			title: "Danh mục",
			dataIndex: "category",
			key: "category"
		},
		{
			title: "Điều kiện",
			dataIndex: "meta_description",
			key: "meta_description"
		},
		{
			title: "",
			dataIndex: "action",
			key: "action",
			align: "right",
			render: (v: any) => {
				return (
					<Space>
						<View />
						<Del />
					</Space>
				);
			}
		}
	];
	const expandedRowRender = (record: Category) => {
		return <TableStyledAntd dataSource={record.data} columns={columns} />;
	};
	return (
		<Row>
			<Col xxl={{ span: 24 }} xl={{ span: 24 }}>
				<h1 className="flex-auto text-lg font-semibold text-slate-900">Danh sách danh mục</h1>
			</Col>
			<Col xxl={{ span: 24 }} xl={{ span: 24 }}>
				<TableStyledAntd
					rowSelection={rowSelection}
					dataSource={dataSource}
					columns={columns}
					rowKey={(record: Category) => record.category_id}
					expandedRowRender={(record: Category) => expandedRowRender(record)}
				/>
			</Col>
		</Row>
	);
};

export default TableCate;
