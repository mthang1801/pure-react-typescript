import { Image, Popover, Switch } from "antd";
import SvgEdit from "src/assets/svg/SvgEdit";
import SvgIcon3Dot from "src/assets/svg/SvgIcon3Dot";
import SvgIconCancel from "src/assets/svg/SvgIconCancel";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgPaymentComplete from "src/assets/svg/SvgPaymentComplete";

export const columnsDataAdmin = ({ editCallback, changeStatus }: any) => {
	return [
		{
			title: "Logo",
			dataIndex: "logo",
			key: "logo",
			render: (logo: string, record: any, index: number) => {
				return <Image src={logo} alt="Logo" width="100px" height="100px" />;
			}
		},
		{
			title: "Đơn vị vận chuyển",
			dataIndex: "shipping_unit",
			key: "shipping_unit",
			render: (shipping_unit: string, record: any, index: number) => {
				return <div>{shipping_unit}</div>;
			}
		},
		{
			title: "ID đơn vị vận chuyển",
			dataIndex: "shipping_unit_id",
			key: "shipping_unit_id",
			render: (shipping_unit_id: string, record: any, index: number) => {
				return <div>{shipping_unit_id}</div>;
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
						<Switch checked={status} onChange={(e: any) => changeStatus(e, record)} />
					</div>
				);
			}
		}
	];
};

export const columnsData = ({ editCallback, deleteCallback, editInfo }: any) => {
	return [
		{
			title: "Logo",
			dataIndex: "logo",
			key: "logo",
			render: (logo: string, record: any, index: number) => {
				return <Image src={logo} alt="Logo" width="100px" height="100px" />;
			}
		},
		{
			title: "Đơn vị vận chuyển",
			dataIndex: "shipping_unit",
			key: "shipping_unit",
			render: (shipping_unit: string, record: any, index: number) => {
				return <div>{shipping_unit}</div>;
			}
		},
		{
			title: "ID đơn vị vận chuyển",
			dataIndex: "shipping_unit_id",
			key: "shipping_unit_id",
			render: (shipping_unit_id: string, record: any, index: number) => {
				return <div>{shipping_unit_id}</div>;
			}
		},
		{
			title: "Trạng thái kết nối",
			dataIndex: "connect_status",
			key: "connect_status",
			align: "center",
			render: (connect_status: any, record: any, index: number) => {
				return (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: "100%"
						}}
					>
						{connect_status === true ? (
							<div className="defaultButton">
								<SvgPaymentComplete style={{ transform: "scale(0.8)" }} />
								&nbsp;Đã kết nối
							</div>
						) : (
							<div className="searchButton" onClick={() => editCallback(record)}>
								<SvgIconRefresh style={{ transform: "scale(0.8)" }} />
								&nbsp;Kết nối
							</div>
						)}
					</div>
				);
			}
		},
		{
			title: "Thao tác",
			dataIndex: null,
			key: null,
			align: "center",
			render: (status: boolean, record: any, index: number) => {
				return (
					<Popover content={content({ editCallback, record, deleteCallback, editInfo })} trigger="hover">
						<SvgIcon3Dot fill="rgb(212,212,212)" />
					</Popover>
				);
			}
		}
	];
};

const content = ({ editCallback, record, deleteCallback, editInfo }: any) => {
	return (
		<div style={{ padding: "8px" }}>
			{record?.connect_status ? (
				<>
					<p
						style={{ cursor: "pointer", margin: "0", display: "flex", alignItems: "center" }}
						onClick={() => editInfo(record)}
					>
						<span style={{ width: "25px", marginTop: "4px" }}>
							<SvgEdit style={{ transform: "scale(0.6)" }} />
						</span>
						&nbsp;Thông tin kết nối
					</p>
					<p
						style={{ cursor: "pointer", margin: "0", display: "flex", alignItems: "center" }}
						onClick={() => deleteCallback(record)}
					>
						<span style={{ width: "25px", marginTop: "4px" }}>
							<SvgIconCancel style={{ transform: "scale(0.7)" }} />
						</span>
						&nbsp;Ngắt kết nối
					</p>
				</>
			) : (
				<p style={{ cursor: "pointer", margin: "0" }} onClick={() => editCallback(record)}>
					Kết nối
				</p>
			)}
		</div>
	);
};
