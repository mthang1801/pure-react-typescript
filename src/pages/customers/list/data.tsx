import { Switch, Tag } from "antd";
import { Link } from "react-router-dom";
import { CustomerRanking } from "src/constants/enum";
import colors from "src/utils/colors";
import routerNames from "src/utils/data/routerName";
import { ISO8601Formats, formatDateYMD, formatDateYMDHM } from "src/utils/helpers/functions/date";
import { convertNumberWithDot } from "src/utils/helpers/functions/textUtils";
import { getKeyByValue } from "src/utils/helpers/functions/utils";
import { CustomerTypeEnum } from "../../../constants/enum";

export const columnsData = ({ onUpdateCustomerStatus }: any) => {
	return [
		{
			title: "Mã KH",
			dataIndex: "customer_code",
			key: "customer_code",
			align: "left",
			render: (customer_code: string, record: any, index: number) => {
				return (
					<div className="p-3">
						<Link
							to={(location) => ({
								...location,
								pathname: `${routerNames.CUSTOMERS_EDIT}/${record.id}`
							})}
							style={{ color: "#40BAFF", cursor: "pointer" }}
						>
							{customer_code}
						</Link>
					</div>
				);
			}
		},
		{
			title: "Tên khách hàng",
			dataIndex: "fullname",
			key: "fullname",
			render: (fullname: string, record: any, index: number) => {
				return <div>{fullname}</div>;
			}
		},
		{
			title: "Số điện thoại",
			dataIndex: "phone",
			key: "phone",
			render: (phone: string, record: any, index: number) => {
				return <a href={`tel:${record?.phone}`}>{record?.phone}</a>;
			}
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			render: (email: any, record: any, index: number) => {
				return (
					<a href={`mailto:${email}`} style={{ color: "#000" }}>
						{email}
					</a>
				);
			}
		},
		{
			title: "Loại khách",
			dataIndex: "customer_type",
			key: "customer_type",
			render: (customer_type: any, record: any, index: number) => {
				return <div>{getKeyByValue(CustomerTypeEnum, customer_type)}</div>;
			}
		},
		{
			title: "Hạng",
			dataIndex: "ranking",
			key: "ranking",
			render: (ranking: any, record: any, index: number) => {
				switch (+ranking) {
					case 1:
						return <Tag color="red">{getKeyByValue(CustomerRanking, ranking)}</Tag>;
					case 2:
						return <Tag color="lime">{getKeyByValue(CustomerRanking, ranking)}</Tag>;
					case 3:
						return <Tag color="gold">{getKeyByValue(CustomerRanking, ranking)}</Tag>;
					case 4:
						return <Tag color="green">{getKeyByValue(CustomerRanking, ranking)}</Tag>;
				}
			}
		},

		{
			title: "Ngày tạo",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (createdAt: Date, record: any, index: number) => {
				return <div>{ISO8601Formats(createdAt)}</div>;
			}
		},
		{
			title: "Điểm tích luỹ",
			dataIndex: "total_point",
			key: "total_point",
			align: "right",
			render: (total_point: any, record: any, index: number) => {
				return <div style={{ textAlign: "right" }}>{convertNumberWithDot(total_point)}</div>;
			}
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			align: "center",
			render: (status: boolean, record: any, index: number) => {
				return (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: "100%"
						}}
					>
						<Switch checked={status} onChange={(value: any) => onUpdateCustomerStatus(record.id, value)} />
					</div>
				);
			}
		}
	];
};

export const data = [
	{
		code: "1",
		supplier: "Chổi chà nhà làm",
		total: "800000",
		status: "A",
		statusPayment: "A",
		statusImport: "A",
		importBy: "Admin",
		importAt: "12/12/2022 12:12:12"
	}
];

export const defaultValues = {
	defaultFormNo: 0,
	checkTransportDefault: 1,
	transportFormsList: [],
	currentTransportForm: null,
	openCreateModal: false,
	openCreateTrasportModal: false
};

export const _paramsFilter: any = {
	q: undefined,
	status: null,
	created_at_start: undefined,
	created_at_end: undefined,
	page: 1,
	limit: 10
};

export const provincesList = [
	{ label: "Thành phố Cần Thơ", value: 92 },
	{ label: "Thành phố Hồ Chí Minh", value: 79 },
	{ label: "Long An", value: 80 },
	{ label: "Tiền Giang", value: 82 },
	{ label: "Trà Vinh", value: 84 },
	{ label: "An Giang", value: 89 }
];

export const districtsList = [
	{ label: "Quận Ninh Kiều", value: 916 },
	{ label: "Quận Ô Môn", value: 917 },
	{ label: "Quận Bình Thuỷ", value: 918 },
	{ label: "Quận Cái Răng", value: 919 },
	{ label: "Quận Thốt Nốt", value: 923 },
	{ label: "Huyện Vĩnh Thạnh", value: 924 }
];

export const wardsList = [
	{ label: "Phường Xuất Hóa", value: 22733 },
	{ label: "Xã Bằng Thành", value: 22734 },
	{ label: "Xã Nhạn Môn", value: 22735 },
	{ label: "Xã Bộc Bố", value: 22736 },
	{ label: "Xã Công Bằng", value: 22737 },
	{ label: "Xã Giáo Hiệu", value: 22738 }
];
