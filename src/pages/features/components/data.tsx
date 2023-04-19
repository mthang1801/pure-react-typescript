import { Input } from "antd";
import { SortableHandle } from "react-sortable-hoc";
import DIcon from "src/components/icons/DIcon";

export const DragHandle = SortableHandle(({ active }: any) => (
	<div style={{ cursor: "grab" }}>
		<DIcon icon="sixDot" />
	</div>
));
export const columnsFeaturesData = ({
	deleteValue,
	type,
	onChangeValueItem,
	removeValuesCallback,
	onChangeValueNameItem
}: any) => {
	return [
		{
			title: "",
			dataIndex: "sort",
			width: 30,
			className: "drag-visible paddingTd",
			render: () => {
				return (
					<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
						<DragHandle />
					</div>
				);
			}
		},
		{
			title: null,
			className: "paddingTd",
			dataIndex: "value",
			key: "value",
			render: (value: string, record: any, index: number) => {
				return (
					<div>
						{type === "2" ? (
							<Input
								type="color"
								className="defaultInput"
								onChange={(e: any) => onChangeValueItem(e, index)}
								value={value}
							/>
						) : (
							<Input defaultValue={value} className="defaultInput" onBlur={(e: any) => onChangeValueItem(e, index)} />
						)}
					</div>
				);
			}
		},
		{
			title: null,
			dataIndex: "value_name",
			className: "paddingTd",
			key: "value_name",

			render: (value_name: string, record: any, index: number) => {
				return (
					<Input
						defaultValue={value_name}
						className="defaultInput"
						onBlur={(e: any) => onChangeValueNameItem(e, index)}
					/>
				);
			}
		},
		{
			title: null,
			dataIndex: "desc",
			key: "desc",
			className: "paddingTd",
			align: "right",
			render: (desc: string, record: any, index: number) => {
				return (
					<div>
						<div className="searchButton" onClick={() => deleteValue(record)}>
							Xóa{" "}
						</div>
					</div>
				);
			}
		}
	];
};

export const columnsFeaturesData2 = ({
	deleteValue,
	type,
	onChangeValueItem,
	removeValuesCallback,
	onChangeValueNameItem
}: any) => {
	return [
		{
			title: "",
			dataIndex: "sort",
			width: 30,
			className: "drag-visible paddingTd",
			render: () => {
				return (
					<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
						<DragHandle />
					</div>
				);
			}
		},
		{
			title: null,
			dataIndex: "value_name",
			className: "paddingTd",
			key: "value_name",

			render: (value_name: string, record: any, index: number) => {
				return (
					<Input
						defaultValue={value_name}
						className="defaultInput"
						onBlur={(e: any) => onChangeValueNameItem(e, index)}
					/>
				);
			}
		},
		{
			title: null,
			dataIndex: "desc",
			key: "desc",
			className: "paddingTd",
			align: "right",
			render: (desc: string, record: any, index: number) => {
				return (
					<div style={{ width: "120px" }}>
						<div className="searchButton" onClick={() => deleteValue(record)}>
							Xóa{" "}
						</div>
					</div>
				);
			}
		}
	];
};
