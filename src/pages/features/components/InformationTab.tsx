import { Col, Form, Input, Radio, Row, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import DIcon from "src/components/icons/DIcon";
import {
	AttributeFilterTypeVietnameseEnum,
	AttributePurposeVietnameseEnum,
	AttributeTypeVietnameseEnum
} from "src/constants/enum";
import TableStyledAntd from "src/components/table/TableStyled";

import { geneUniqueKey, removeSign, removeSignSpace } from "src/utils/helpers/functions/textUtils";
import { mergeArray } from "src/utils/helpers/functions/utils";
import { notifyError, notifySuccess, notifyWarning } from "../../../components/notification/index";
import colors from "src/utils/colors";
import { arrayMoveImmutable } from "array-move";
import { columnsFeaturesData, columnsFeaturesData2 } from "./data";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
const SortableItem = SortableElement((props: any) => <tr {...props} />);
const SortableBody = SortableContainer((props: any) => <tbody {...props} />);
const plainOptions = ["Tiki", "Lazada", "Shopee", "Sen hồng", "Sen đỏ"];
const defaultCheckedList = ["Tiki", "Sen hồng"];

const { Option } = Select;

const InformationTab = ({
	form,
	getValuesCallback,
	removeValueCallback,
	attributeType,
	setAttributeType,
	attributeValues,
	setAttributeValues
}: any) => {
	const isMount = useIsMount();
	const paramsURL = useParams() as any;
	const { stateAttributeById, stateUpdateAttribute } = useSelector((e: AppState) => e.attributesReducer);

	const [purpose, setPurpose] = useState<AttributePurposeVietnameseEnum>(
		AttributePurposeVietnameseEnum["Tìm kiếm sản phẩm thông qua bộ lọc"]
	);
	const [filterType, setFilterType] = useState<AttributeFilterTypeVietnameseEnum>(
		AttributeFilterTypeVietnameseEnum["Dạng text hoặc number"]
	);

	const [valueOption, setValueOption] = useState<string>("");

	useEffect(() => {
		if (getValuesCallback) {
			getValuesCallback(attributeValues);
		}
	}, [attributeValues]);

	useEffect(() => {
		if (Number(attributeType) === 2) {
			setAttributeValues((prevValues: any) =>
				prevValues.map((value: any, index: number) => {
					if (value.value === "") {
						value.value = "#000";
					}
					return value;
				})
			);
		}
	}, [attributeType]);
	const onChangeValueOption = (e: any) => {
		setValueOption(e.target.value);
	};

	const removeValuesCallback = (value: any) => {
		removeValueCallback(value);
	};

	useEffect(() => {
		if (isMount) return;
		const { data, message, success, error } = stateAttributeById;
		if (success) {
			setAttributeValues(data?.data?.values);
			setAttributeType(data?.data?.attribute_type);
		}
		if (success === false || error) {
		}
	}, [stateAttributeById.isLoading]);

	const onClickAddValueOption = (e: any) => {
		const newValues = [...attributeValues, { value_name: "", value: attributeType === "2" ? "#000" : "" }].map(
			(item, i) => ({
				...item,
				index: i
			})
		);
		setAttributeValues(newValues);
	};

	const onSortEnd = ({ oldIndex, newIndex }: any) => {
		if (oldIndex !== newIndex) {
			const newData = arrayMoveImmutable([].concat(attributeValues as any), oldIndex, newIndex).filter((el) => !!el);
			let convertData = [...newData] as any;
			for (var i = 0; i < convertData.length; i++) {
				convertData[i].index = i + 1;
			}
			setAttributeValues(convertData);
		}
	};

	const DraggableContainer = (props: any) => (
		<SortableBody
			useDragHandle
			disableAutoscroll
			helperClass="row-dragging"
			onSortEnd={onSortEnd}
			onSortStart={handleSortStart}
			{...props}
		/>
	);

	const handleSortStart = (props: { node: any }) => {
		const tds = document.getElementsByClassName("row-dragging")[0].childNodes;
		if (tds) {
			props.node.childNodes.forEach((node: any, idx: any) => {
				let htmlElement = tds.item(idx) as HTMLElement;
				htmlElement.style.width = `${node.offsetWidth}px`;
				htmlElement.style.backgroundColor = colors.neutral_color_1_6;
				htmlElement.style.padding = "4px 21px 4px 21px";
			});
		}
	};

	const DraggableBodyRow = ({ className, style, ...restProps }: any) => {
		const index = attributeValues.findIndex((x: any) => x.index === restProps["data-row-key"]);
		return <SortableItem index={index} {...restProps} />;
	};

	const onChangeValueItem = (e: any, i: number) => {
		setAttributeValues((prevValues: any) =>
			prevValues.map((value: any, index: number) => {
				if (i === index) {
					value.value = e.target.value;
				}
				return value;
			})
		);
	};
	const onChangeValueNameItem2 = (e: any, i: number) => {
		setAttributeValues((prevValues: any) =>
			prevValues.map((value: any, index: number) => {
				if (i === index) {
					value.value_name = e.target.value;
					value.value = e.target.value;
				}
				return value;
			})
		);
	};

	const onChangeValueNameItem = (e: any, i: number) => {
		setAttributeValues((prevValues: any) =>
			prevValues.map((value: any, index: number) => {
				if (i === index) {
					value.value_name = e.target.value;
				}
				return value;
			})
		);
	};
	const deleteValue = (record: any) => {
		if (paramsURL.id && record.id) {
			removeValuesCallback(record.id);
		}
		let fakeArray = [...attributeValues].filter((x: any) => x.index !== record.index);
		setAttributeValues(fakeArray);
	};
	return (
		<div className="featuresPage__edit__information-tab ">
			<Form form={form} style={{ display: "flex", justifyContent: "space-between" }}>
				<div style={{ width: "calc(65% - 6.5px)" }}>
					<div
						style={{
							padding: "16px",
							background: "#fff",
							width: "100%",
							borderRadius: "5px",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between"
						}}
					>
						<Form.Item name="attribute_name" label="Tên thuộc tính" style={{ width: "calc(50% - 4px)", margin: "0" }}>
							<Input
								className="defaultInput"
								placeholder="Nhập tên thuộc tính"
								onBlur={(e: any) => {
									form.setFieldsValue({
										attribute_code: removeSignSpace(e.target.value)
									});
								}}
							/>
						</Form.Item>

						<Form.Item name="attribute_code" label="Mã thuộc tính" style={{ width: "calc(50% - 4px)", margin: "0" }}>
							<Input disabled className="defaultInput" placeholder="Nhập mã thuộc tính" />
						</Form.Item>
					</div>

					<div
						className="featuresPage__edit__information-tab__wrapper"
						style={{
							marginTop: "13px",
							padding: "16px",
							background: "#fff",
							width: "100%",
							borderRadius: "5px"
						}}
					>
						<h4>Bộ giá trị của thuộc tính</h4>
						<TableStyledAntd
							style={{ marginTop: "8px" }}
							rowKey="index"
							dataSource={[...attributeValues] || []}
							showHeader={false}
							bordered={false}
							pagination={false}
							columns={
								attributeType === "2"
									? (columnsFeaturesData({
											deleteValue,
											type: attributeType,
											onChangeValueItem,
											onChangeValueNameItem
									  }) as any)
									: columnsFeaturesData2({
											deleteValue,
											type: attributeType,
											onChangeValueNameItem: onChangeValueNameItem2
									  })
							}
							widthCol1="50px"
							widthCol2="auto"
							widthCol3={attributeType === "2" ? "auto" : "120px"}
							widthCol4={attributeType === "2" ? "120px" : "0"}
							components={{
								body: {
									wrapper: DraggableContainer,
									row: DraggableBodyRow
								}
							}}
						/>
						<div style={{ marginTop: "4px", display: "flex", justifyContent: "flex-end" }}>
							<button
								type="button"
								className="featuresPage__edit__information-tab__form-item__button w-full min-w-[120px]"
								onClick={onClickAddValueOption}
								style={{ margin: "0 8px 0 8px", width: "120px" }}
							>
								Thêm giá trị
							</button>
						</div>
					</div>
				</div>
				<div style={{ width: "calc(35% - 6.5px)" }}>
					<div style={{ padding: "16px", background: "#fff", borderRadius: "5px" }}>
						<Form.Item name="status" label="Trạng thái hiển thị" style={{ margin: "0" }}>
							<Radio.Group defaultValue={true}>
								<Radio value={true}>Hiển thị</Radio>
								<Radio value={false}>Ẩn</Radio>
							</Radio.Group>
						</Form.Item>
					</div>

					<div style={{ marginTop: "13px", padding: "16px", background: "#fff", borderRadius: "5px" }}>
						<h4>Mục đích của thuộc tính</h4>
						<div>
							<Form.Item
								name="purposes"
								style={{ margin: "0" }}
								label="Mục đích"
								className="featuresPage__edit__information-tab__form-item"
							>
								<Radio.Group defaultValue={AttributePurposeVietnameseEnum["Tìm kiếm sản phẩm thông qua bộ lọc"]}>
									<Space direction="vertical">
										{Object.entries(AttributePurposeVietnameseEnum).map(([key, val]) => (
											<Radio value={val} key={val}>
												{key}
											</Radio>
										))}
									</Space>
								</Radio.Group>
							</Form.Item>

							<Form.Item
								name="filter_type"
								style={{ margin: "8px 0 0 0" }}
								label="Kiểu lọc"
								className="featuresPage__edit__information-tab__form-item"
							>
								<Select
									className="featuresPage__edit__information-tab__form-item__select"
									defaultValue={AttributeFilterTypeVietnameseEnum["Dạng text hoặc number"]}
								>
									{Object.entries(AttributeFilterTypeVietnameseEnum).map(([key, val]) => {
										return (
											<Option value={String(val)} key={key}>
												{key}
											</Option>
										);
									})}
								</Select>
							</Form.Item>

							<Form.Item
								name="attribute_type"
								label="Loại thuộc tính"
								className="featuresPage__edit__information-tab__form-item"
								style={{ margin: "8px 0 0 0" }}
							>
								<Select
									defaultValue={"1"}
									className="featuresPage__edit__information-tab__form-item__select"
									onChange={(e: any) => {
										console.log(e);
										setAttributeType(e);
									}}
								>
									{Object.entries(AttributeTypeVietnameseEnum).map(([key, val]) => {
										return (
											<Option value={String(val)} key={key}>
												{key}
											</Option>
										);
									})}
								</Select>
							</Form.Item>
						</div>
					</div>
				</div>
			</Form>
		</div>
	);
};

const data = [
	{
		id: 72,
		url: "http://localhost:8000/api/courseware/course_section/72/",
		course_id: 37,
		name: "Red",
		index: 1,
		published_at: null,
		subsections: [
			"http://localhost:8000/api/courseware/course_subsection/57/",
			"http://localhost:8000/api/courseware/course_subsection/58/"
		]
	},
	{
		id: 74,
		url: "http://localhost:8000/api/courseware/course_section/74/",
		course_id: 37,
		name: "Yello",
		index: 2,
		published_at: null,
		subsections: []
	},
	{
		id: 75,
		url: "http://localhost:8000/api/courseware/course_section/75/",
		course_id: 37,
		name: "Blue",
		index: 3,
		published_at: null,
		subsections: []
	},
	{
		id: 76,
		url: "http://localhost:8000/api/courseware/course_section/76/",
		course_id: 37,
		name: "Pink",
		index: 4,
		published_at: null,
		subsections: [
			"http://localhost:8000/api/courseware/course_subsection/59/",
			"http://localhost:8000/api/courseware/course_subsection/60/",
			"http://localhost:8000/api/courseware/course_subsection/61/",
			"http://localhost:8000/api/courseware/course_subsection/62/",
			"http://localhost:8000/api/courseware/course_subsection/63/",
			"http://localhost:8000/api/courseware/course_subsection/64/",
			"http://localhost:8000/api/courseware/course_subsection/65/"
		]
	}
];

export default InformationTab;
