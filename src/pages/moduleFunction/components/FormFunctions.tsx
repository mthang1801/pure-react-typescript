import { Form, Input, Row, Select, Table } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SortableContainer as sortableContainer, SortableElement } from "react-sortable-hoc";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
import {
	fetchModuleFunctionsList,
	getChildrenModuleFunctionById,
	updateModuleFunction,
	updateModuleFunctionsIndexes
} from "src/services/actions/moduleFunction.action";
import { AppState } from "src/types";
import colors from "src/utils/colors";
import { dateFormatYMD, tomorrow } from "src/utils/helpers/functions/date";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { mergeArray } from "src/utils/helpers/functions/utils";
import { notifyError, notifySuccess } from "../../../components/notification/index";
import { columnsData, TypeModalEnum } from "../edit/data";
import ModuleFunctModal from "./ModuleFunctModal";

const _paramsFilter = {
	q: undefined,
	status: undefined,
	display_on_website: undefined,
	page: 1,
	limit: 10,
	created_at_start: undefined,
	created_at_end: undefined
};

enum modalType {
	"create" = "create",
	"edit" = "edit"
}

const FormFunction = ({
	visibleModal,
	setVisibleModal,
	typeModal,
	setTypeModal,
	form,
	setOpenImageOverlay,
	setImageOverlay,
	currentFunct,
	editForm
}: any) => {
	const isMount = useIsMount();
	const dispatch = useDispatch();
	const paramsUrl = useParams() as any;
	const [searchForm] = Form.useForm();
	const [showUpdateIndex, setShowUpdateIndex] = useState<boolean>(false);
	const [parentModule, setParentModule] = useState<any>(null);
	const paramsURL = useParams() as any;
	const [functsList, setFunctsList] = useState<any[]>([]);
	const [initialFunctsList, setInitialFunctsList] = useState<any[]>([]);
	const [paramsFilter, setParamsFilter] = useState<any>({ ..._paramsFilter });
	const [icon, setIcon] = useState<string>("");
	const [icon2, setIcon2] = useState<string>("");

	const {
		stateModuleFunctionById,
		stateChildrenModuleFunctionById,
		stateCreateModuleFunction,
		stateUpdateModuleFunction,
		stateUpdateModuleFunctionIndexes
	} = useSelector((e: AppState) => e.moduleFunctionsReducer);
	useEffect(() => {
		dispatch(getChildrenModuleFunctionById(paramsUrl.id));
	}, []);

	useEffect(() => {
		if (isMount) return;
		const { success, message, error, data } = stateChildrenModuleFunctionById;
		if (success) {
			setFunctsList(data.data);
			setInitialFunctsList(data.data);
			setShowUpdateIndex(false);
		}

		if (success === false || error) {
			notifyError(`${message}`);
		}
	}, [stateChildrenModuleFunctionById.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { success, message, error, data } = stateCreateModuleFunction;

		if (success) {
			notifySuccess(`${message}`);
			handleCancelModal();
			form.resetFields();
			dispatch(getChildrenModuleFunctionById(paramsUrl.id, paramsFilter));
		}

		if (success === false || error) {
			notifyError(`${message}`);
		}
	}, [stateCreateModuleFunction.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { success, message, error, data } = stateUpdateModuleFunction;
		if (success) {
			notifySuccess(`${message}`);
			handleCancelModal();
			form.resetFields();
			dispatch(getChildrenModuleFunctionById(paramsUrl.id, paramsFilter));
		}

		if (success === false || error) {
			notifyError(`${message}`);
		}
	}, [stateUpdateModuleFunction.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { data, message, success, error } = stateUpdateModuleFunctionIndexes;
		if (success) {
			notifySuccess(`${message}`);
			dispatch(getChildrenModuleFunctionById(paramsUrl.id, paramsFilter));
		}

		if (success === false || error) {
			notifyError(`${message}`);
		}
	}, [stateUpdateModuleFunctionIndexes.isLoading]);

	const onChangePaging = (page: number, pageSize: number) => {
		setParamsFilter({
			...paramsFilter,
			page: page,
			limit: pageSize
		});
	};

	const onSearch = () => {
		const values = searchForm.getFieldsValue();

		const queryParams: any = {
			page: parseInt(paramsFilter.page),
			limit: parseInt(paramsFilter.limit),
			q: values.q,
			display_on_website: values.display_on_website,
			status: values.status,
			created_at_start: values?.created_at_start?._d
				? moment(values?.created_at_start?._d).format(dateFormatYMD)
				: undefined,
			created_at_end: values?.created_at_end?._d ? moment(values?.created_at_end?._d).format(dateFormatYMD) : undefined
		};
		if (queryParams.created_at_start && !queryParams.created_at_end) {
			queryParams["created_at_end"] = tomorrow();
		}
		dispatch(getChildrenModuleFunctionById(paramsUrl.id, queryParams));
	};

	const handleSubmitSearch = (values: any) => {
		onSearch();
	};

	const handleCancelModal = () => {
		setVisibleModal(false);
		form.resetFields();
		setIcon("");
		setIcon2("");
		setParentModule(null);
	};

	const onViewFunctDetail = (record: any) => {
		const rawFunctCode = record.funct_code.split("__").slice(-1)[0];
		console.log("12321312", record);
		form.setFieldsValue({
			...record,
			init_funct_code: record.funct_code,
			funct_code: record.funct_code,
			raw_funct_code: rawFunctCode
		});
		if (record.ui_icon) {
			setIcon(record.ui_icon);
		}
		if (record.active_icon) {
			setIcon2(record.active_icon);
		}
		setTypeModal(TypeModalEnum.EDIT);
		setVisibleModal(true);
	};

	const onAddActions = (currentFunct: any) => {
		form.setFieldsValue({
			parent_id: currentFunct.id,
			level: currentFunct.level + 1,
			funct_code: currentFunct.funct_code
		});
		setTypeModal(TypeModalEnum.CREATE);
		setVisibleModal(true);
	};

	const onRefreshSearch = () => {
		searchForm.resetFields();
		setParamsFilter(_paramsFilter);
		dispatch(fetchModuleFunctionsList());
	};

	const checkFunctsDiff = (currentFuncts: any): boolean => {
		let isChanged = false;
		for (let [i, funct] of initialFunctsList.entries()) {
			if (currentFuncts[i].index !== funct.index) {
				isChanged = true;
				break;
			}
		}
		return isChanged;
	};

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

	const onSortEnd = ({ oldIndex, newIndex }: any) => {
		let _functsList = [...functsList];
		if (oldIndex !== newIndex) {
			const movingItem = _functsList[oldIndex];
			_functsList.splice(oldIndex, 1);
			_functsList = mergeArray(_functsList, [movingItem], newIndex);
		}
		setFunctsList(_functsList);
		onUpdateIndexes(_functsList);
	};

	const SortableContainer = sortableContainer((props: any) => <tbody {...props} />);
	const SortableItem = SortableElement((props: any) => {
		return <tr {...props} />;
	});
	const DraggableContainer = (props: any) => {
		return (
			<SortableContainer
				useDragHandle
				disableAutoscroll
				helperClass="row-dragging"
				onSortEnd={onSortEnd}
				onSortStart={handleSortStart}
				{...props}
			/>
		);
	};

	const DraggableBodyRow = (restProps: any) => {
		let index: number | undefined;
		index = functsList?.findIndex((x: any) => x.index === restProps["data-row-key"]);
		return <SortableItem index={index} {...restProps} />;
	};

	const onUpdateIndexes = (array: any) => {
		const newFunctsPosition = array.map((functItem: any, i: number) => {
			return { id: functItem.id, index: i };
		});

		dispatch(updateModuleFunctionsIndexes({ funct_indexes: newFunctsPosition }));
	};

	const onOpenEditActionModal = (record: any) => {
		form.setFieldsValue({ ...record });
		setVisibleModal(true);
		setTypeModal(TypeModalEnum.EDIT);
		setIcon(record.ui_icon);
	};

	const onOpenImageOverlay = (imageSrc: string) => {
		setOpenImageOverlay(true);
		setImageOverlay(imageSrc);
	};

	const onClickCreateButton = () => {
		form.resetFields();
		form.setFieldsValue({
			parent_id: currentFunct?.id,
			level: currentFunct.level + 1,
			init_funct_code: currentFunct.funct_code,
			funct_code: currentFunct.funct_code
		});
		setVisibleModal(true);
		setTypeModal(TypeModalEnum.CREATE);
	};

	const onChangeStatus = (record: any, status: boolean) => {
		dispatch(updateModuleFunction(record.id, { ...record, status }));
	};
	const submitEdit = (values: any) => {
		let params = {
			method: stateModuleFunctionById?.data?.data?.method || "GET",
			funct_name: values?.funct_name,
			funct_code: values?.funct_code,
			status: values?.status,
			ui_route: values?.ui_route
		};
		dispatch(updateModuleFunction(paramsUrl.id, params));
	};
	return (
		<div className="moduleFunctions__form-function">
			<ModuleFunctModal
				form={form}
				visible={visibleModal}
				setVisible={setVisibleModal}
				handleCancel={handleCancelModal}
				type={typeModal}
				icon={icon}
				setIcon={setIcon}
				icon2={icon2}
				setIcon2={setIcon2}
			/>
			<div style={{ padding: "8px 16px 16px 16px", background: "#fff", borderRadius: "5px", marginTop: "8px" }}>
				<Form
					form={editForm}
					onFinish={submitEdit}
					id="editForm"
					layout="vertical"
					style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
				>
					<Form.Item
						rules={[{ required: true, message: "Vui lòng không bỏ trống!" }]}
						label="Display name"
						name="funct_name"
						style={{ width: "calc((100% - 272px) /3)", margin: "0" }}
					>
						<Input className="defaultInput" />
					</Form.Item>
					<Form.Item
						rules={[{ required: true, message: "Vui lòng không bỏ trống!" }]}
						label="Function code"
						name="funct_code"
						style={{ width: "calc((100% - 272px) /3)", margin: "0" }}
					>
						<Input className="defaultInput" />
					</Form.Item>

					<Form.Item label="Trạng thái" name="status" style={{ width: "calc((100% - 272px) /3)", margin: "0" }}>
						<Select
							className="defaultSelect"
							options={[
								{ label: "Hiển thị", value: true },
								{ label: "Ẩn", value: false }
							]}
						/>
					</Form.Item>
					<div className="defaultButton" onClick={() => editForm.submit()} style={{ marginTop: "19px" }}>
						<SvgIconStorage style={{ transform: "scale(0.7)" }} />
						&nbsp;Lưu
					</div>
					<div className="defaultButton" onClick={() => onClickCreateButton()} style={{ marginTop: "19px" }}>
						<SvgIconPlus style={{ transform: "scale(0.7)" }} />
						&nbsp;Thêm module
					</div>
				</Form>
			</div>
			<div className="contentSection">
				<div className="moduleFunctions__table" style={{ marginTop: "8px" }}>
					<Table
						rowKey="index"
						dataSource={[...functsList]}
						defaultExpandAllRows={paramsFilter?.q?.length > 0 ? true : false}
						bordered
						pagination={false}
						columns={
							columnsData({
								onViewFunctDetail,
								onAddActions,
								onOpenImageOverlay,
								onChangeStatus
							}) as any
						}
						expandable={{
							expandIconColumnIndex: 1
						}}
						components={{
							body: {
								wrapper: DraggableContainer,
								row: DraggableBodyRow
							}
						}}
					/>
				</div>

				{/* <PanigationAntStyled
					style={{ marginTop: "8px" }}
					current={paramsFilter.page}
					pageSize={paramsFilter.limit}
					showSizeChanger
					onChange={onChangePaging}
					showTotal={() => `Tổng ${stateChildrenModuleFunctionById?.data?.page?.total} functions `}
					total={stateChildrenModuleFunctionById?.data?.page?.total}
				/> */}
			</div>
		</div>
	);
};

export default FormFunction;
