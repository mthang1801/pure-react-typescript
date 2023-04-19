import { Form, Input, Row, Select, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SortableContainer as sortableContainer, SortableElement } from "react-sortable-hoc";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import { notifyError } from "src/components/notification";

import "antd/dist/antd.css";
import SubHeader from "src/components/subHeader/SubHeader";
import { APIMethodsEnum } from "src/constants/enum";
import {
	fetchModuleFunctionsList,
	updateModuleFunction,
	updateModuleFunctionsIndexes
} from "src/services/actions/moduleFunction.action";
import { AppState } from "src/types";
import { dateFormatYMD, tomorrow } from "src/utils/helpers/functions/date";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { mergeArray } from "src/utils/helpers/functions/utils";
import ImageOverlay from "../../../components/custom/ImageOverlay";
import { notifySuccess } from "../../../components/notification/index";
import ModuleFunctModal from "../components/ModuleFunctModal";
import { TypeModalEnum } from "../edit/data";
import { columnsFunctsData } from "./data";
import TableStyledAntd from "src/components/table/TableStyled";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";

const ModuleFunctionsList = () => {
	const dispatch = useDispatch();
	const isMount = useIsMount();
	const [searchForm] = Form.useForm();
	const [form] = Form.useForm();
	const {
		stateModuleFunctionsList,
		stateCreateModuleFunction,
		stateUpdateModuleFunction,
		stateUpdateModuleFunctionIndexes
	} = useSelector((e: AppState) => e.moduleFunctionsReducer);
	const [functsList, setFunctsList] = useState<any[]>([]);
	const [initialFunctsList, setInitialFunctsList] = useState<any[]>([]);
	const [showUpdateIndex, setShowUpdateIndex] = useState<boolean>(false);
	const [icon, setIcon] = useState("");
	const [icon2, setIcon2] = useState("");

	const [visibleModal, setVisibleModal] = useState(false);
	const [fieldChangeStatus, setFieldChangeStatus] = useState<any>(null);
	const [typeModal, setTypeModal] = useState<TypeModalEnum>(TypeModalEnum.CREATE);
	const [cronFunctions, setCronFunctions] = useState<any[]>([]);
	const [openImageOverlay, setOpenImageOverlay] = useState<boolean>(false);
	const [imageOverlay, setImageOverlay] = useState<string>("");
	const _paramsFilter = {
		q: undefined,
		status: undefined,
		page: 1,
		limit: 10,
		display_on_website: undefined,
		created_at_start: undefined,
		created_at_end: undefined
	};
	const [paramsFilter, setParamsFilter] = useState<any>({ ..._paramsFilter });
	const { stateGetCronFunctions } = useSelector((e: AppState) => e.userReducer);

	useEffect(() => {
		dispatch(fetchModuleFunctionsList());
	}, []);

	useEffect(() => {
		form.setFieldsValue({
			method: APIMethodsEnum.GET,
			status: true,
			display_on_website: true
		});
	}, [form]);

	useEffect(() => {
		if (isMount) return;
		const { success, data, message, error } = stateModuleFunctionsList;
		if (success) {
			setFunctsList(data?.data);
			setInitialFunctsList(data?.data);
			setShowUpdateIndex(false);
		}
		if (success === false || error) {
			notifyError(`Lấy danh sách Functs không thành công, ${message}`);
		}
	}, [stateModuleFunctionsList.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { message, success, error } = stateCreateModuleFunction;
		if (success) {
			notifySuccess("Tạo thành công.");
			form.resetFields();
			dispatch(fetchModuleFunctionsList(paramsFilter));
			setVisibleModal(false);
		}

		if (success === false || error) {
			notifyError(`Tạo không thành công, ${message}`);
		}
	}, [stateCreateModuleFunction.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { message, success, error } = stateUpdateModuleFunction;
		if (success) {
			notifySuccess("Cập nhật thành công");
			dispatch(fetchModuleFunctionsList(paramsFilter));
			setShowUpdateIndex(false);
			setVisibleModal(false);
			form.resetFields();
		}
	}, [stateUpdateModuleFunction.isLoading]);

	useEffect((): void | undefined => {
		if (isMount) return;
		const { data, message, success, error } = stateGetCronFunctions;
		if (success) {
			setCronFunctions(data?.dataTypePlatformFunctions);
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateGetCronFunctions.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { data, message, success, error } = stateUpdateModuleFunctionIndexes;
		if (success) {
			// notifySuccess(`${message}`);
			dispatch(fetchModuleFunctionsList(paramsFilter));
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

	const handleSubmitSearch = (values: any) => {
		onSearch();
	};

	const onSearch = () => {
		const values = searchForm.getFieldsValue();
		setParamsFilter((prevState: any) => ({ ...prevState, ...values }));

		let queryParams: any = {
			page: parseInt(paramsFilter.page),
			limit: parseInt(paramsFilter.limit),
			q: values.q,
			display_on_website: values.display_on_website,
			status: values.status
		};

		if (values.picker) {
			queryParams.created_at_start = values?.picker[0]?._d
				? moment(values?.picker[0]?._d).format(dateFormatYMD)
				: undefined;
			queryParams.created_at_end = values?.picker[0]?._d
				? moment(values?.picker[0]?._d).format(dateFormatYMD)
				: undefined;
		}

		if (queryParams.created_at_end) {
			queryParams.created_at_end += " 23:59:59";
		}
		if (queryParams.created_at_start && !queryParams.created_at_end) {
			queryParams["created_at_end"] = tomorrow();
		}

		dispatch(fetchModuleFunctionsList(queryParams));
	};

	const onChangeStatus = (record: any, status: boolean) => {
		dispatch(updateModuleFunction(record.id, { status: status }));
		setFieldChangeStatus({ id: record.id, status });
	};
	const onRefreshSearch = () => {
		searchForm.resetFields();
		setParamsFilter(_paramsFilter);
		dispatch(fetchModuleFunctionsList());
	};

	const handleCancelModal = () => {
		setVisibleModal(false);
		form.resetFields();
	};

	const onClickCreateFunct = () => {
		setVisibleModal(true);
		setIcon("");
		setTypeModal(TypeModalEnum.CREATE);
	};

	const onOpenImageOverlay = (icon: string) => {
		setImageOverlay(icon);
		setOpenImageOverlay(true);
	};

	const checkModuleIndexesDiff = (currentFuncts: any): boolean => {
		let isChanged = false;
		for (let [i, funct] of initialFunctsList.entries()) {
			if (currentFuncts[i].index !== funct.index) {
				isChanged = true;
				break;
			}
		}
		return isChanged;
	};

	const onSortStart = (props: any) => {
		const tds = document.getElementsByClassName("row-dragging")[0].childNodes;
		if (tds) {
			props.node.childNodes.forEach((node: any, idx: any) => {
				let htmlElement = tds.item(idx) as HTMLElement;
				htmlElement.style.width = `${node.offsetWidth}px`;
				htmlElement.style.backgroundColor = "#DFE2E4";
				htmlElement.style.padding = "12px";
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
		if (checkModuleIndexesDiff(_functsList)) {
			setShowUpdateIndex(true);
		} else {
			setShowUpdateIndex(false);
		}
		onUpdateIndexes(_functsList);
	};

	const SortableContainer = sortableContainer((props: any) => <tbody {...props} />);
	const SortableItem = SortableElement((props: any) => {
		return <tr {...props} />;
	});
	const DraggableContainer = (props: any) => (
		<SortableContainer
			useDragHandle
			disableAutoscroll
			helperClass="row-dragging"
			onSortEnd={onSortEnd}
			onSortStart={onSortStart}
			hideSortableGhost={true}
			{...props}
		/>
	);
	const DraggableBodyRow = ({ className, style, ...restProps }: any) => {
		const index = functsList.findIndex((x) => x.index === restProps["data-row-key"]);
		return <SortableItem index={index} {...restProps} />;
	};

	const onUpdateIndexes = (_functsList: any) => {
		const newFunctsPosition = _functsList.map((functItem: any, i: number) => {
			return { id: functItem.id, index: i };
		});

		dispatch(updateModuleFunctionsIndexes({ funct_indexes: newFunctsPosition }));
	};

	const onOpenModalEdit = (record: any) => {
		form.setFieldsValue(functsList.find((item) => item.id === record.id));
		setVisibleModal(true);
		setTypeModal(TypeModalEnum.EDIT);
		setIcon(record.ui_icon);
		setIcon2(record.active_icon);
	};

	const onOpenModalCreateFunctChild = (currentFunctId: number) => {
		console.log(currentFunctId);
		form.setFieldsValue({ parent_id: currentFunctId });
		setVisibleModal(true);
		setTypeModal(TypeModalEnum.CREATE);
		setIcon("");
	};

	return (
		<>
			<ImageOverlay open={openImageOverlay} imgSrc={imageOverlay} onClose={() => setOpenImageOverlay(false)} />
			<div className="mainPages moduleFunctions">
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

				<SubHeader breadcrumb={[{ text: "Thiết lập hệ thống" }, { text: "Module Function" }]} />

				<div style={{ background: "#fff", borderRadius: "5px", padding: "8px 16px 16px 16px" }}>
					<Form
						style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
						layout="vertical"
						form={searchForm}
						id="searchForm"
						onFinish={handleSubmitSearch}
					>
						<div style={{ width: "80%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
							<Form.Item name="q" label="Tìm kiếm" style={{ width: "calc(50% - 132px)", margin: "0" }}>
								<Input placeholder="Nhập tên, mã hoặc route của chức năng" className="defaultInput" />
							</Form.Item>

							<Form.Item name="status" label="Trạng thái" style={{ width: "calc(50% - 132px)", margin: "0" }}>
								<Select
									options={[
										{ label: "Hoạt động", value: true },
										{ label: "Ngừng hoạt động", value: false }
									]}
									className="defaultSelect"
									placeholder="Chọn trạng thái"
								/>
							</Form.Item>

							<button className="searchButton w-full" type="submit" style={{ margin: "19px 0 0 0" }}>
								<SvgIconSearch style={{ transform: "scale(0.8)" }} />
								&nbsp;Tìm kiếm
							</button>
							<button
								type="button"
								className="searchButton w-full"
								onClick={onRefreshSearch}
								style={{ margin: "19px 0 0 0" }}
							>
								<SvgIconRefresh style={{ transform: "scale(0.8)" }} />
								&nbsp;Đặt lại
							</button>
						</div>
						<div className="grow flex justify-around ">
							<div className="defaultButton w-full" onClick={onClickCreateFunct} style={{ margin: "19px 0 0 0" }}>
								<SvgIconPlus style={{ transform: "scale(0.8)" }} />
								&nbsp;Thêm mới
							</div>
						</div>
					</Form>
				</div>

				<div className="contentSection">
					<div className="moduleFunctions__table">
						<TableStyledAntd
							scroll={{ y: "calc(100vh - 345px)" }}
							rowKey="index"
							dataSource={[...functsList]}
							bordered
							columns={
								columnsFunctsData({
									onChangeStatus,
									onOpenImageOverlay,
									onOpenModalEdit,
									onOpenModalCreateFunctChild
								}) as any
							}
							components={{
								body: {
									wrapper: DraggableContainer,
									row: DraggableBodyRow
								}
							}}
							expandIconColumnIndex={-1}
							loading={stateModuleFunctionsList.isLoading || false}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default ModuleFunctionsList;
