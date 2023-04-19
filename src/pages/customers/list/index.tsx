import { Form, Table } from "antd";
import { createContext, createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
import SubHeader from "src/components/subHeader/SubHeader";
import { CustomerTypeEnum, UserGenderEnum } from "src/constants/enum";
import { fetchCustomersList, updateCustomer } from "src/services/actions/customer.actions";
import { formatDateYMD } from "src/utils/helpers/functions/date";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { notifyError, notifySuccess } from "../../../components/notification/index";
import { createCustomer } from "../../../services/actions/customer.actions";
import { AppState } from "../../../types";
import CreateModal from "../components/CreateModal";
import CustomerSearch from "../components/search.component";
import TransportModal from "../components/TransportModal";
import { columnsData, defaultValues, _paramsFilter } from "./data";
import TableStyledAntd from "src/components/table/TableStyled";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import moment from "moment";

export const CustomerListContext = createContext<any>({});

const CustomersList = () => {
	const dispatch = useDispatch();
	const isMount = useIsMount();
	const [createForm] = Form.useForm();
	const [searchForm] = Form.useForm();
	const [customersList, setCustomersList] = useState<any[]>([]);
	const { stateListCustomer, stateCreateCustomer, stateUpdateCustomer } = useSelector(
		(e: AppState) => e.customerReducer
	);
	const [openCreateModal, setOpenCreateModal] = useState<boolean>(defaultValues.openCreateModal);
	const [openTransportModal, setOpenTransportModal] = useState<boolean>(defaultValues.openCreateTrasportModal);

	const [transportFormsList, setTransportFormList] = useState<any[]>(defaultValues.transportFormsList);
	const [currentTransportForm, setCurrentTransportForm] = useState<any>(defaultValues.currentTransportForm);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const history = useHistory();
	const searchRef = createRef();

	const resetFields = () => {
		setTransportFormList(defaultValues.transportFormsList);
		setCurrentTransportForm(defaultValues.currentTransportForm);
		setOpenCreateModal(defaultValues.openCreateModal);
		setOpenTransportModal(defaultValues.openCreateTrasportModal);
	};

	const [paramsFilter, setParamsFilter] = useState<any>({ ..._paramsFilter });

	useEffect(() => {
		dispatch(fetchCustomersList(paramsFilter));
	}, []);

	useEffect(() => {
		if (!openCreateModal) {
			createForm.resetFields();
			setTransportFormList(defaultValues.transportFormsList);
		}
	}, [openCreateModal]);

	useEffect(() => {
		if (isMount) return;
		const { error, message, success, data } = stateListCustomer;
		if (success) {
			setCustomersList(data.data);
		}
		if (success === false || error) {
			notifyError(`${message}`);
		}
	}, [stateListCustomer.isLoading]);

	useEffect(() => {
		if (isMount) return;
		submitSearch();
	}, [paramsFilter.page]);

	useEffect(() => {
		function searchEvent(e: any) {
			if (e.key === "Enter") {
				submitSearch();
			}
		}
		document.addEventListener("keyup", searchEvent);
		return () => document.removeEventListener("keyup", searchEvent);
	}, []);

	useEffect(() => {
		if (isMount) return;
		const { error, success, message } = stateCreateCustomer;
		if (success) {
			notifySuccess(`${message}`);
			searchForm.resetFields();
			setParamsFilter(_paramsFilter);
			dispatch(fetchCustomersList({ ..._paramsFilter }));
			resetFields();
		}
		if (success === false || error) {
			notifyError(`${message}`);
		}
	}, [stateCreateCustomer.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { error, success, message } = stateUpdateCustomer;
		if (success) {
			notifySuccess(`${message}`);
			dispatch(fetchCustomersList(paramsFilter));
		}
		if (error || success === false) {
			notifyError(`${message}`);
		}
	}, [stateUpdateCustomer.isLoading]);

	const onChangePaging = (page: number, pageSize: number) => {
		setParamsFilter((prevState: any) => ({
			...prevState,
			page: page,
			limit: pageSize
		}));
	};

	const submitSearch = () => {
		const dataRequest: any = {
			...paramsFilter,
			...searchForm.getFieldsValue()
		};
		if (dataRequest.picker) {
			dataRequest.created_at_start = moment(dataRequest.picker[0]).format("YYYY-MM-DD");
			dataRequest.created_at_end = moment(dataRequest.picker[1]).format("YYYY-MM-DD");
		}
		delete dataRequest.picker;
		dispatch(fetchCustomersList(dataRequest));
	};

	const submitRefresh = () => {
		setParamsFilter({ ..._paramsFilter });
		searchForm.resetFields();
		dispatch(fetchCustomersList());
	};

	const onCancelCreateModal = () => {
		setOpenCreateModal(false);
		setCurrentTransportForm(null);
	};

	const onCancelTransportModal = () => {
		setOpenTransportModal(false);
		setCurrentTransportForm(null);
	};

	const onSaveTransportItem = (value: any) => {
		const _transportFormsList = isEdit
			? transportFormsList.map((item) => {
					if (item.id === value.id) {
						item = { ...value };
					}
					return item;
			  })
			: [...transportFormsList, value];

		const updateTransportFormList = _transportFormsList.map((transportFormItem: any, i: number) => {
			if (value.default === true) {
				if (transportFormItem.id !== value.id) {
					transportFormItem.default = false;
				} else {
					transportFormItem.default = true;
				}
			}
			return transportFormItem;
		});

		setTransportFormList((prevState: any[]) => updateTransportFormList);

		setCurrentTransportForm(null);
		setOpenTransportModal(false);
	};

	const onRemoveTransportItem = (id: any) => {
		const transportFormByOrder = transportFormsList.find((transportFormItem: any) => transportFormItem.id === id);
		if (transportFormByOrder.default) {
			setTransportFormList(
				transportFormsList
					.map((transportFormItem, i) => {
						if (i === 0) {
							transportFormItem.default = true;
						}
						return transportFormItem;
					})
					.filter((item, index) => item.id !== id)
			);
		} else {
			setTransportFormList(transportFormsList.filter((item, index) => item.id !== id));
		}

		if (transportFormsList.length === 1) {
			setTransportFormList(defaultValues.transportFormsList);
		}
		setCurrentTransportForm(null);
	};

	const onEditTransportItem = (id: any) => {
		setCurrentTransportForm(transportFormsList.find((transportFormItem: any) => transportFormItem.id === id));
		setOpenTransportModal(true);
	};

	const onCreateCustomer = () => {
		const formValues = createForm.getFieldsValue();
		const dataRequest = {
			...formValues,
			gender: formValues.gender || UserGenderEnum.Nam,
			customer_type: formValues.customer_type || CustomerTypeEnum["Khách thường"],
			date_of_birth: formValues.date_of_birth ? formatDateYMD(formValues.date_of_birth._d) : null,
			shipping_info: transportFormsList.map((item, i) => {
				delete item.id;
				item.order_no = i;
				return item;
			})
		};

		dispatch(createCustomer(dataRequest));
	};

	const onUpdateCustomerStatus = (id: number, status: any) => {
		dispatch(updateCustomer(id, { status }));
	};

	return (
		<div className="mt-[8px] customers">
			<CreateModal
				form={createForm}
				visible={openCreateModal}
				onCancel={onCancelCreateModal}
				openTransportModal={openTransportModal}
				setOpenTransportModal={setOpenTransportModal}
				transportFormsList={transportFormsList}
				setTransportFormList={setTransportFormList}
				onSave={onCreateCustomer}
				onRemoveTransportItem={onRemoveTransportItem}
				onEditTransportItem={onEditTransportItem}
				setIsEdit={setIsEdit}
			/>
			<TransportModal
				visible={openTransportModal}
				onCancel={onCancelTransportModal}
				currentTransportForm={currentTransportForm}
				transportFormsList={transportFormsList}
				setCurrentTransportForm={setCurrentTransportForm}
				onSave={onSaveTransportItem}
			/>
			<div className="mainPages customers">
				<SubHeader breadcrumb={[{ text: "Khách hàng" }, { text: "Quản lý khách hàng" }]} />
				<CustomerSearch
					searchForm={searchForm}
					submitSearch={submitSearch}
					submitRefresh={submitRefresh}
					onAddNew={() => setOpenCreateModal(true)}
					ref={searchRef}
				/>

				<div className="contentSection">
					<TableStyledAntd
						scroll={{ y: "calc(100vh - 345px)" }}
						rowClassName="testRow"
						rowKey="id"
						dataSource={[...customersList]}
						bordered
						pagination={false}
						columns={columnsData({ onUpdateCustomerStatus }) as any}
						widthCol1="100px"
						widthCol2="calc(15% - 220px)"
						widthCol3="calc(15% - 220px)"
						widthCol4="calc(15% - 220px)"
						widthCol5="calc(15% - 220px)"
						widthCol6="calc(15% - 220px)"
						widthCol7="calc(15% - 220px)"
						widthCol8="calc(10% - 220px)"
						widthCol9="120px"
					/>
					<PanigationAntStyled
						style={{ marginTop: "8px" }}
						current={paramsFilter.page}
						pageSize={paramsFilter.limit}
						showSizeChanger
						onChange={onChangePaging}
						showTotal={() => `Tổng ${stateListCustomer?.data?.paging?.total} khách hàng `}
						total={stateListCustomer?.data?.paging?.total || 0}
					/>
				</div>
			</div>
		</div>
	);
};

export default CustomersList;
