import { Form, Tag } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import SubHeader from "src/components/subHeader/SubHeader";
import { getCustomerById, updateCustomer } from "src/services/actions/customer.actions";
import { AppState } from "src/types";
import { convertNumberWithCommas } from "src/utils/helpers/functions/textUtils";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { notifyError, notifySuccess } from "../../../components/notification/index";
import CustomerOrderHistory from "../components/CustomerOrdersHistory";
import CustomerPurchaseInfo from "../components/CustomerPurchaseInfo";
import CustomerTransport from "../components/CustomerTransport";
import EditCustomerInfo from "../components/EditCustomerInfo";
import TransportModal from "../components/TransportModal";
import { defaultValues } from "./data";

const CustomersEdit = () => {
	const dispatch = useDispatch();
	const isMount = useIsMount();
	const [customer, setCustomer] = useState<any>(defaultValues.customer);
	const paramURL = useParams() as any;
	const { stateCustomerById, stateUpdateCustomer } = useSelector((e: AppState) => e.customerReducer);
	const [customerForm] = Form.useForm();
	const [customerPurchaseForm] = Form.useForm();
	const [openTransportModal, setOpenTransportModal] = useState<boolean>(defaultValues.openTransportModal);
	const [currentTransportForm, setCurrentTransportForm] = useState<any>(defaultValues.currentTransport);
	const [transportFormsList, setTransportFormList] = useState<any[]>(defaultValues.transportFormsList);
	const [isEdit, setIsEdit] = useState<boolean>(defaultValues.isEdit);
	const [initialTransport, setInitialTransport] = useState<any[]>([]);

	useEffect(() => {
		dispatch(getCustomerById(paramURL.id));
	}, []);

	useEffect(() => {
		if (isMount) return;
		const { success, error, message, data: dataState } = stateCustomerById;
		if (success) {
			let data = dataState?.data;
			setCustomer(data);
			customerForm.setFieldsValue({ ...data, date_of_birth: data.date_of_birth ? moment(data.date_of_birth) : null });
			setTransportFormList(data.shipping_info);
			setInitialTransport(data.shipping_info);
		}
		if (error || success === false) {
			notifyError(`${message}`);
		}
	}, [stateCustomerById.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { success, error, message, data } = stateUpdateCustomer;
		if (success) {
			notifySuccess(`${message}`);
		}
		if (error || success === false) {
			notifyError(`${message}`);
		}
	}, [stateUpdateCustomer.isLoading]);

	const onSaveForm = () => {
		const values = customerForm.getFieldsValue();
		const removed_shipping_info = initialTransport
			.filter((transportItem) => !transportFormsList.some((item) => item.id === transportItem.id))
			.map((item) => item.id);
		const updated_shipping_info = transportFormsList
			.filter((item) => initialTransport.some((transportItem) => transportItem.id === item.id))
			.map((item: any, i: number) => {
				item.order_no = i;
				return item;
			});
		const new_shipping_info = transportFormsList
			.filter((item) => typeof item.id !== "number")
			.map((item: any, i: number) => {
				delete item.id;
				item.order_no = updated_shipping_info.length + i;
				return item;
			});

		const dataRequest: any = {
			...values,
			removed_shipping_info,
			updated_shipping_info,
			new_shipping_info
		};

		dispatch(updateCustomer(paramURL.id, dataRequest));
	};

	const onCancelTransportModal = () => {
		setOpenTransportModal(false);
		setCurrentTransportForm(null);
	};

	const onEditTransportItem = (id: any) => {
		console.log("sadfsadfas", transportFormsList, id);
		setCurrentTransportForm(transportFormsList.find((transportFormItem) => transportFormItem.id === id));
		setOpenTransportModal(true);
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

	if (!customer) return null;
	return (
		<>
			<TransportModal
				visible={openTransportModal}
				onCancel={onCancelTransportModal}
				currentTransportForm={currentTransportForm}
				transportFormsList={transportFormsList}
				setCurrentTransportForm={setCurrentTransportForm}
				onSave={onSaveTransportItem}
				setIsEdit={setIsEdit}
			/>
			<div className="customers__edit mainPages">
				<div className="customers__edit__header">
					<SubHeader
						breadcrumb={[
							{ text: "Khách hàng" },
							{ text: "Quản lý khách hàng", link: "/customers" },
							{ text: `${customer?.fullname} - ${customer?.id}` }
						]}
					/>
				</div>
				<div style={{ display: "flex", alignItems: "center" }}>
					<Tag
						color={
							Number(customer?.ranking) === 1
								? "red"
								: Number(customer?.ranking) === 2
								? "lime"
								: Number(customer?.ranking) === 3
								? "gold"
								: "green"
						}
					>
						{
							[
								{ label: "Thường", value: 1 },
								{ label: "Bạc", value: 2 },
								{ label: "Vàng", value: 3 },
								{ label: "Kim cương", value: 4 }
							].find((x: any) => x.value === Number(customer?.ranking))?.label
						}
					</Tag>
					<div
						style={{
							marginLeft: "8px",
							padding: "0 12px",
							borderLeft: "1px solid rgb(212,212,212)",
							borderRight: "1px solid rgb(212,212,212)"
						}}
					>
						Điểm tích luỹ: <span style={{ fontWeight: "600", color: "red" }}>{customer?.total_point}</span> điểm
					</div>
					<div
						style={{
							padding: "0 12px"
						}}
					>
						Giá trị quy đổi:{" "}
						<span style={{ fontWeight: "600", color: "red" }}>
							{convertNumberWithCommas(customer?.total_point * 1000)}
						</span>
						&nbsp;VNĐ
					</div>
				</div>
				<Form form={customerForm} id="customerForm" onFinish={onSaveForm} style={{ marginTop: "13px" }}>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<div style={{ width: "calc(65% - 4px)" }}>
							<div style={{ borderRadius: "5px", background: "#fff", padding: "16px" }}>
								<EditCustomerInfo customer={customer} form={customerForm} />
								<CustomerOrderHistory />
							</div>
						</div>
						<div style={{ width: "calc(35% - 4px)" }}>
							<div style={{ borderRadius: "5px", background: "#fff", padding: "16px" }}>
								<CustomerPurchaseInfo form={customerPurchaseForm} customer={customer} />
								<CustomerTransport
									transportFormsList={transportFormsList}
									setTransportFormList={setTransportFormList}
									setIsEdit={setIsEdit}
									setOpenTransportModal={setOpenTransportModal}
									onEditTransportItem={onEditTransportItem}
									onRemoveTransportItem={onRemoveTransportItem}
								/>
							</div>
						</div>
					</div>
				</Form>
			</div>
		</>
	);
};

export default CustomersEdit;
