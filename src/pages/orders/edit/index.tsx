import { CheckCircleFilled } from "@ant-design/icons";
import { Checkbox, DatePicker, Form, Input, InputNumber, Modal, Radio, Select, Space, Tooltip, TreeSelect } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import SvgBin from "src/assets/svg/SvgBin";
import SvgCheck from "src/assets/svg/SvgCheck";
import SvgCopy from "src/assets/svg/SvgCopy";
import SvgEdit from "src/assets/svg/SvgEdit";
import SvgExpand from "src/assets/svg/SvgExpand";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import SvgPrint from "src/assets/svg/SvgPrint";
import { notifyError, notifySuccess, notifyWarning } from "src/components/notification";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import SubHeader from "src/components/subHeader/SubHeader";
import TableStyledAntd from "src/components/table/TableStyled";
import { customerTypes, platformsList } from "src/constants";
import { CustomerAddressTypesEnum } from "src/constants/enum";
import message from "src/constants/message";
import { AddressType, Wrapper } from "src/pages/customers/styles/CreateCustomer.styles";
import ModalAddProduct from "src/pages/installStore/components/ModalAddProduct";
import { createCustomer, updateCustomer } from "src/services/actions/customer.actions";
import { createOneOrder, getOrderById, updateOneOrder, updateOrdersStatus } from "src/services/actions/orders.actions";
import { fetchProductsList } from "src/services/actions/product.actions";
import { getListShipping } from "src/services/actions/shipping.actions";
import { getListStores } from "src/services/actions/stores.actions";
import { API_URL } from "src/services/api/config";
import { getDistricts, getProvinces, getWards } from "src/services/api/locators";
import { AppState } from "src/types";
import { ISO8601Formats, nowDate } from "src/utils/helpers/functions/date";
import {
	convertDatetime,
	convertNumberWithCommas,
	convertToOnlyNumber,
	geneUniId,
	geneUniqueKey,
	getAddressString,
	isVietnamesePhoneNumber,
	joinIntoAddress,
	mailPattern,
	phonePattern,
	removeSign
} from "src/utils/helpers/functions/textUtils";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";
import { columnsData, columnsHistory } from "./data";
import printGif from "src/assets/images/print.gif";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
import { api } from "src/services/api/api.index";
import { API_CATEGORY } from "src/services/api/url.index";
import SellerContext from "src/context/sellerContext";
const dataPaymentMethods = [
	{
		label: "Tiền mặt",
		value: 1
	},
	{
		label: "Chuyển khoản",
		value: 2
	},
	{
		label: "Quẹt thẻ",
		value: 3
	},
	{
		label: "COD",
		value: 4
	}
];
let headers: any = {
	"Content-Type": "application/json,text/plain, */*"
};
let token = localGetToken();
let authUUID = localGetAuthUUID();
if (token) {
	headers.Authorization = token;
}
if (authUUID) {
	headers["x-auth-uuid"] = authUUID;
}

const deliveryRequests = [
	{
		label: "Cho xem hàng, không cho thử",
		value: 1
	},
	{
		label: "Cho xem hàng, cho thử",
		value: 2
	},
	{
		label: "Không cho xem hàng",
		value: 3
	}
];

const printOptions = [
	{
		label: "Mẫu in A4",
		value: 1
	},
	{
		label: "Mẫu in A5",
		value: 2
	},
	{
		label: "Mẫu in K80",
		value: 3
	},
	{
		label: "Mẫu in K70",
		value: 4
	}
];

const dataSelectServices = [
	{
		label: "NTL Express Delivery",
		value: 10
	},
	{ label: "NTL Premium Service", value: 11 },
	{ label: "NTL Road Transportation", value: 20 },
	{ label: "NTL Mixed Express", value: 21 }
];
const OrdersEdit = () => {
	const { sellerInfo } = useContext(SellerContext) as any;

	const dispatch = useDispatch();
	const isMount = useIsMount();
	const history = useHistory();
	const paramsUrl = useParams() as any;
	const [formCreate] = Form.useForm();
	const [formModalCustomer] = Form.useForm();
	const [formAddAddress] = Form.useForm();
	const [listProduct, setListProduct] = useState<any[]>([]);
	const [showProduct, setShowProduct] = useState(false);
	const [openModalAdd, setOpenModalAdd] = useState(false);
	const [listStores, setListStores] = useState<any[]>([]);
	const [listAddProducts, setListAddProducts] = useState<any[]>([]);
	const [activeShipped, setActiveShipped] = useState(0);
	const [listShipping, setListShipping] = useState<any[]>([]);
	const [selectedDeliveryType, setSelectedDeliveryType] = useState<any>(10);
	const [selectedShipping, setSelectedShipping] = useState<any>(undefined);
	const [selectedTypeCash, setSelectedTypeCash] = useState<any>(10);
	const [listTypeShipping, setListTypeShipping] = useState<any[]>([]);
	const [openModalCustomer, setOpenModalCustomer] = useState<any>(false);
	const [openModalAddress, setOpenModalAddress] = useState<any>(false);
	const [openModalAddAddress, setOpenModalAddAddress] = useState<any>(false);
	const [openPrinter, setOpenPrinter] = useState<any>(false);
	const [paymentMethods, setPaymentMethods] = useState<any>(dataPaymentMethods);
	const [payments, setPayments] = useState<any[]>([]);
	const [selectedMethod, setSelectedMethod] = useState(undefined);
	const [filterCustomer, setFilterCustomer] = useState<any>("");
	const [shippingAddress, setShippingAddress] = useState<any[]>([]);
	const [selectedStore, setSelectedStore] = useState<any>(undefined);
	const [orderHistory, setOrderHistory] = useState<any>();
	const [openHistory, setOpenHistory] = useState<any>(false);
	const [filterHistory, setFilterHistory] = useState<any>({
		page: 1,
		limit: 10
	});
	const [provincesList, setProvincesList] = useState<any[]>([]);
	const [districtsList, setDistrictsList] = useState<any[]>([]);
	const [wardsList, setWardsList] = useState<any[]>([]);
	const [selectedProvince, setSelectedProvince] = useState<any>(null);
	const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
	const [selectedWard, setSelectedWard] = useState<any>(null);
	const [filterProduct, setFilterProduct] = useState<any>("");
	const [typeSubmitCreateAddress, setTypeSubmitCreateAddress] = useState<any>(true);
	const [openVoucher, setOpenVoucher] = useState<any>(false);
	const [paramsCheck, setParamsCheck] = useState<any>({
		warehouse_id: undefined,
		COD: 0,
		weight: 0
	});
	const [selectedTypeOrder, setSelectedTypeOrder] = useState(1);

	const [shippingFee, setShippingFee] = useState<any>(0);
	const [defaultAddress, setDefaultAddress] = useState(false);
	const { stateUpdateOrdersStatus } = useSelector((e: AppState) => e.ordersReducer);
	const [codValue, setCodValue] = useState<any>(0);

	const [dataOrder, setDataOrder] = useState<any>({});
	const [isCreateCustomer, setIsCreateCustomer] = useState(false);
	const [listCustomers, setListCustomers] = useState<any[]>([]);
	const [showCustomers, setShowCustomers] = useState(false);
	const [openCalc, setOpenCalc] = useState(false);
	const [removeProducts, setRemoveProducts] = useState<any[]>([]);
	const [removePaymentsData, setRemovePaymentsData] = useState<any[]>([]);
	const [showShip, setShowShip] = useState(true);
	const [selectedPlatform, setSelectedPlatform] = useState(1);
	const [selectedPrintOption, setSelectedPrintOption] = useState(1);
	const [openNoti, setOpenNoti] = useState<any>(false);
	const [selectedShippingInfo, setSelectedShippingInfo] = useState<any>(undefined);

	const [listServicesByShipUnit, setListServicesByShipUnit] = useState<any[]>([]);
	const [listPaymentsByShipUnit, setListPaymentsByShipUnit] = useState<any[]>([]);

	const features = localStorage.getItem("FEATURES") ? JSON.parse(localStorage.getItem("FEATURES") || "") : [];

	useEffect(() => {
		if (!features.includes("MODULES_ORDER__ORDERS__VIEW_DETAIL")) {
			notifyWarning("Bạn không được quyền truy cập");
			history.push("/orders");
		}
	}, []);

	const disabledDate = (current: any) => {
		// Can not select days before today and today
		return current && current > moment().subtract(6, "years");
	};

	useEffect(() => {
		setShowShip(!dataOrder?.receive_at_store);
		if (selectedPlatform !== 8) {
			setShowShip(true);
			let fakePaymentsMethod = [...paymentMethods];

			for (let i = 0; i < dataOrder?.order_payment_details?.length; i++) {
				fakePaymentsMethod = fakePaymentsMethod.filter(
					(x: any) => x.value !== dataOrder.order_payment_details[i].payment_method_id
				);
			}
			fakePaymentsMethod = fakePaymentsMethod.filter((x: any) => x.value === 2 || x.value === 4);
			setPaymentMethods(fakePaymentsMethod);
			setPayments(dataOrder?.order_payment_details || []);
			formCreate.setFieldValue(
				"COD",
				calTotalPriceFinal(listAddProducts) - calcTotalPayments(payments.filter((x: any) => x.payment_method_id !== 4))
			);
		} else {
			let fakePaymentsMethod = [...paymentMethods];

			for (let i = 0; i < dataOrder.order_payment_details.length; i++) {
				fakePaymentsMethod = fakePaymentsMethod.filter(
					(x: any) => x.value !== dataOrder.order_payment_details[i].payment_method_id
				);
			}
			setPaymentMethods(fakePaymentsMethod);
			setPayments(dataOrder?.order_payment_details || []);
			formCreate.setFieldValue(
				"COD",
				calTotalPriceFinal(listAddProducts) - calcTotalPayments(payments.filter((x: any) => x.payment_method_id !== 4))
			);
		}
	}, [selectedPlatform]);

	useEffect(() => {
		if (!isMount) {
			return;
		}
		if (selectedPlatform === 8) {
			if (showShip) {
				setPaymentMethods(dataPaymentMethods);
			} else {
				setPaymentMethods(dataPaymentMethods.filter((x: any) => x.value !== 4));
			}
		}

		setPayments([]);
	}, [showShip]);

	useEffect(() => {
		getProvinces().then((res) => {
			let fakeList = [];
			for (let i = 0; i < res.length; i++) {
				fakeList.push({
					label: res[i]?.province_name,
					value: res[i]?.id
				});
			}
			setProvincesList(fakeList);
		});
	}, []);

	useEffect(() => {
		if (selectedProvince) {
			getDistricts({ province_id: selectedProvince }).then((res) => {
				let fakeList = [];
				for (let i = 0; i < res.length; i++) {
					fakeList.push({
						label: res[i]?.district_name,
						value: res[i]?.id
					});
				}
				setDistrictsList(fakeList);
			});
		}
	}, [selectedProvince]);

	useEffect(() => {
		if (selectedDistrict) {
			getWards({ district_id: selectedDistrict }).then((res) => {
				let fakeList = [];
				for (let i = 0; i < res.length; i++) {
					fakeList.push({
						label: res[i]?.ward_name,
						value: res[i]?.id
					});
				}
				setWardsList(fakeList);
			});
		}
		setWardsList([]);
		setSelectedWard(null);
	}, [selectedDistrict]);
	const onSelectProvince = (value: any) => {
		setSelectedProvince(value);

		setDistrictsList([]);
		setWardsList([]);
		setSelectedDistrict(undefined);
		setSelectedWard(undefined);
		formAddAddress.setFieldValue("province_name", provincesList.find((province) => province.value === value).label);
		formAddAddress.setFieldsValue({
			province_name: provincesList.find((province) => province.value === value)?.label,
			district_name: undefined,
			district_id: undefined,
			ward_id: undefined,
			ward_name: undefined
		});
	};

	const onSelectDistrict = (value: any) => {
		setSelectedDistrict(value);

		setWardsList([]);
		setSelectedWard(undefined);
		formAddAddress.setFieldsValue({
			district_name: districtsList.find((district) => district.value === value)?.label,
			ward_id: undefined,
			ward_name: undefined
		});
	};

	const onSelectWard = (value: any) => {
		setSelectedWard(value);
		formAddAddress.setFieldValue("ward_name", wardsList.find((ward) => ward.value === value).label);
	};

	useEffect(() => {
		formCreate.setFieldValue("warehouse_id", listStores[0]?.value);
	}, [showShip]);
	const [dataCustomer, setDataCustomer] = useState<any>({
		b_fullname: undefined,

		b_phone: undefined,
		s_fullname: undefined,
		s_province_id: undefined,
		s_province: undefined,
		s_district_id: undefined,
		s_district: undefined,
		s_ward_id: undefined,
		s_ward: undefined,
		s_address: undefined,
		s_phone: undefined,
		selected_address: undefined,
		customer_type: undefined,
		date_of_birth: undefined,
		email: undefined,
		gender: undefined,
		phone: undefined,
		fullname: undefined,
		total_point: 0
	});

	const { stateProductsList } = useSelector((state: AppState) => state.productReducer);

	const { stateListShipping } = useSelector((state: AppState) => state.shippingReducer);
	const { stateListStores } = useSelector((state: AppState) => state.storesReducer);

	const { stateCreateOneOrder, stateOrderById, stateUpdateOneOrder } = useSelector(
		(state: AppState) => state.ordersReducer
	);
	const { stateCustomerById, stateUpdateCustomer, stateCreateCustomer } = useSelector(
		(e: AppState) => e.customerReducer
	);
	useEffect(() => {
		dispatch(getOrderById(paramsUrl.id));
	}, [paramsUrl.id]);

	useEffect(() => {
		if (isMount) return;
		const { success, data, isLoading, error } = stateOrderById;
		if (!isLoading) {
			if (success) {
				let dataInfo = data?.data;
				setDataOrder(dataInfo);
				setListAddProducts(dataInfo.details);
				let paymentsFake = [];
				let fakePaymentsMethod = [...paymentMethods];

				for (let i = 0; i < dataInfo.order_payment_details.length; i++) {
					paymentsFake.push({
						...dataInfo.order_payment_details[i],
						payment_at: ISO8601Formats(dataInfo.order_payment_details[i].payment_at)
					});
					fakePaymentsMethod = fakePaymentsMethod.filter(
						(x: any) => x.value !== dataInfo.order_payment_details[i].payment_method_id
					);
				}
				console.log("123123123", paymentsFake);
				setOrderHistory(dataInfo?.order_status_logs);
				setPaymentMethods(fakePaymentsMethod);
				setSelectedPlatform(dataInfo?.platform_id);
				setPayments(paymentsFake);
				setCodValue(dataInfo?.delivery_cod_fee);
				formCreate.setFieldsValue({
					height: dataInfo.height,
					weight: dataInfo.weight,
					length: dataInfo.length,
					width: dataInfo.width,
					order_source: dataInfo.platform_id,
					shipping_fee: dataInfo.shipping_fee,
					shipping_unit_id: dataInfo.shipping_unit_id,
					COD: dataInfo.cod,
					notes: dataInfo.notes,
					b_phone: dataInfo.b_phone,
					b_fullname: dataInfo.b_fullname,
					warehouse_id: dataInfo.warehouse_id,
					type_order: dataInfo?.platform_id === 8 ? 1 : 2
				});
				setShippingFee(dataInfo.shipping_fee);

				setParamsCheck({
					COD: dataInfo.cod,
					warehouse_id: dataInfo.warehouse_id,
					weight: dataInfo.weight
				});
				setFilterCustomer(dataInfo?.b_phone);
				setDataCustomer({
					b_id: dataInfo?.customer_id,
					b_fullname: dataInfo?.b_fullname,
					b_phone: dataInfo?.b_phone,
					s_fullname: dataInfo?.s_fullname,
					s_province_id: dataInfo?.s_province_id,
					s_province: dataInfo?.s_province,
					s_district_id: dataInfo?.s_district_id,
					s_district: dataInfo?.s_district,
					s_ward_id: dataInfo?.s_ward_id,
					s_ward: dataInfo?.s_ward,
					s_address: dataInfo?.s_address,
					s_phone: dataInfo?.s_phone,
					date_of_birth: moment(dataInfo?.b_dob, "YYYY-MM-DD"),
					email: dataInfo?.b_email,
					gender: dataInfo?.b_gender,
					phone: dataInfo?.b_phone,
					fullname: dataInfo?.b_fullname,
					total_point: dataInfo?.total_point
				});

				setSelectedShipping(dataInfo?.shipping_unit_id);
				setSelectedTypeOrder(dataInfo?.platform_id === 8 ? 1 : 2);
				setSelectedTypeCash(dataInfo.delivery_payment_method_id);
				setSelectedDeliveryType(dataInfo?.delivery_service_id);
			} else if (success === false || error) {
			}
		}
	}, [stateOrderById.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { success, data, isLoading, error } = stateUpdateCustomer;
		if (!isLoading) {
			if (success) {
				setOpenModalAddAddress(false);
				formAddAddress.resetFields();
				setOpenModalCustomer(false);
				if (typeSubmitCreateAddress) {
					notifySuccess("Cập nhật thành công!");
				} else {
					notifySuccess("Cập nhật thành công!");
				}
			} else if (success === false || error) {
				notifyError(error + "");
			}
		}
	}, [stateUpdateCustomer.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { success, data, message, isLoading, error } = stateCreateCustomer;
		if (!isLoading) {
			if (success) {
				setOpenModalCustomer(false);
				setFilterCustomer(formModalCustomer.getFieldValue("b_phone"));
				formCreate.setFieldsValue({
					b_phone: formModalCustomer.getFieldValue("b_phone"),
					b_fullname: formModalCustomer.getFieldValue("b_fullname")
				});
				notifySuccess("Thêm khách hàng thành công!");
			} else if (success === false || error) {
				notifyError(message + "");
			}
		}
	}, [stateCreateCustomer.isLoading]);

	useEffect(() => {
		dispatch(getListStores());
	}, []);

	useEffect(() => {
		dispatch(getListShipping());
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			let category_ids = selectedCategories.join(",");
			dispatch(
				fetchProductsList({
					product_level: "2,3,4",
					q: filterProduct,
					warehouse_id: selectedStore,
					category_ids: category_ids.length > 0 ? category_ids : undefined,
					status: true,
					page: 1,
					limit: 10
				})
			);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [filterProduct]);

	useEffect(() => {
		const getDataTable = async (params?: any) => {
			try {
				const response = (await api.get(
					`${API_URL}/shipping-units/${selectedShipping}
				`,
					params
				)) as any;
				let data = response?.data;
				if (data) {
					setListServicesByShipUnit(data?.shipping_services);
					setListPaymentsByShipUnit(data?.payment_methods);
				}
			} catch (error: any) {
				throw new Error(error?.response?.data?.message);
			}
		};
		if (selectedShipping) {
			getDataTable();
		}
	}, [selectedShipping]);

	useEffect(() => {
		const getCustomers = async () => {
			try {
				let headers: any = {
					"Content-Type": "application/json,text/plain, */*"
				};
				let token = localGetToken();
				let authUUID = localGetAuthUUID();
				if (token) {
					headers.Authorization = token;
				}
				if (authUUID) {
					headers["x-auth-uuid"] = authUUID;
				}
				const { data } = await axios.get(`${API_URL}/customers?q=${filterCustomer}&page=1&limit=10`, {
					headers: headers
				});
				if (data) {
					setListCustomers(data?.data);
					if (filterCustomer.length === 10) {
						if (data?.data?.length > 0) {
							formCreate.setFieldsValue({
								b_phone: data?.data[0]?.phone,
								b_fullname: data?.data[0]?.fullname
							});

							setDataCustomer({
								b_phone: data?.data[0]?.phone,
								b_id: data?.data[0]?.id,
								b_fullname: data?.data[0]?.fullname,
								customer_type: data?.data[0]?.customer_type,
								date_of_birth: data?.data[0]?.date_of_birth,
								email: data?.data[0]?.email,
								gender: data?.data[0]?.gender.length === 0 ? "Male" : data?.data[0]?.gender,
								phone: data?.data[0]?.phone,
								fullname: data?.data[0]?.fullname,
								total_point: data?.data[0]?.total_point
							});

							formModalCustomer.setFieldsValue({
								customer_type: data?.data[0]?.customer_type,
								b_phone: data?.data[0]?.phone,
								b_fullname: data?.data[0]?.fullname,
								b_email: data?.data[0]?.email,
								b_dob: moment(data?.data[0]?.date_of_birth, "YYYY-MM-DD"),
								b_gender: data?.data[0]?.gender
							});
							setShowCustomers(false);
						} else {
							notifyError("Số điện thoại chưa đăng ký khách hàng");
							formModalCustomer.resetFields();
							setDataCustomer({
								b_id: undefined,
								b_fullname: undefined,
								b_phone: undefined,
								s_fullname: undefined,
								s_province_id: undefined,
								s_province: undefined,
								s_district_id: undefined,
								s_district: undefined,
								s_ward_id: undefined,
								s_ward: undefined,
								s_address: undefined,
								s_phone: undefined,
								selected_address: undefined,
								customer_type: undefined,
								date_of_birth: undefined,
								email: undefined,
								gender: undefined,
								phone: undefined,
								fullname: undefined,
								total_point: 0
							});
						}
					}
				}
			} catch (error) {}
		};
		if (filterCustomer.length < 7) {
			setListCustomers([]);
			formModalCustomer.resetFields();
			setDataCustomer({
				b_id: undefined,
				b_fullname: undefined,
				b_phone: undefined,
				s_fullname: undefined,
				s_province_id: undefined,
				s_province: undefined,
				s_district_id: undefined,
				s_district: undefined,
				s_ward_id: undefined,
				s_ward: undefined,
				s_address: undefined,
				s_phone: undefined,
				selected_address: undefined,
				customer_type: undefined,
				date_of_birth: undefined,
				email: undefined,
				gender: undefined,
				phone: undefined,
				fullname: undefined,
				total_point: 0
			});
		}
		if (
			filterCustomer === formCreate.getFieldValue("b_phone") &&
			filterCustomer.length >= 7 &&
			!stateCreateCustomer.isLoading
		) {
			getCustomers();
		}
	}, [filterCustomer, stateCreateCustomer.isLoading]);
	const [countCalc, setCountCalc] = useState(1);
	useEffect(() => {
		const getCustomers = async () => {
			// var bodyFormData = new FormData();
			// bodyFormData.append("shipping_unit_id", "1");
			// bodyFormData.append("partner_id", "116586");
			// bodyFormData.append("cod_amount", formCreate.getFieldValue("COD"));
			// bodyFormData.append("weight", formCreate.getFieldValue("weight"));
			// bodyFormData.append("payment_method_id", selectedTypeCash);
			// bodyFormData.append("s_province", "TP Hồ Chí Minh");
			// bodyFormData.append("s_district", "Quận Gò Vấp");
			// bodyFormData.append("r_province", "TP Hồ Chí Minh");
			// bodyFormData.append("r_district", "Quận Bình Thạnh");
			// bodyFormData.append("service_id", "0");
			try {
				if ([1, 3].includes(Number(dataOrder.order_status_id))) {
					setOpenCalc(true);
				}
				let store = listStores.find((x: any) => x.value === formCreate.getFieldValue("warehouse_id"));
				let params = {
					shipping_unit_id: selectedShipping,
					partner_id: 116586,
					cod_amount: Number(formCreate.getFieldValue("COD")),
					weight: Number(formCreate.getFieldValue("weight")),
					payment_method_id: selectedTypeCash,
					s_province: store?.province_name,
					s_district: store?.district_name,
					r_province: dataCustomer?.s_province,
					r_district: dataCustomer?.s_district,
					service_id: selectedDeliveryType
				};

				let headers: any = {
					"Content-Type": "application/json"
				};
				let token = localGetToken();
				let uuid = localGetAuthUUID();
				if (token) {
					headers.Authorization = token;
					headers["x-auth-uuid"] = uuid;
				}
				const { data } = await axios.post(
					`${API_URL}/shipping-units/calc-fee
					  `,
					params,
					{
						headers: headers
					}
				);

				// const { data } = await axios.post(`${API_URL}/shipping-units/calc-fee`, params, {
				// 	headers: headers,
				// 	data: bodyFormData
				// });

				if (data) {
					setOpenCalc(false);
					setShippingFee(data?.data[0]?.total_fee || Number(dataOrder?.shipping_fee));
					setCodValue(data?.data[0]?.cod_fee);
					setListTypeShipping(data?.data);
					formCreate.setFieldsValue({
						shipping_fee: data?.data[0]?.total_fee,
						COD:
							calTotalPrice(listAddProducts) -
							calcTotalPayments(payments.filter((x: any) => x.payment_method_id !== 4)) +
							(data?.data[0]?.total_fee || Number(dataOrder?.shipping_fee))
					});
					let fakePayment = [...payments].find((x: any) => x.payment_method_id === 4);
					if (fakePayment) {
						setPayments(
							payments.map((x: any) =>
								x.payment_method_id === 4
									? {
											...fakePayment,
											amount:
												calTotalPrice(listAddProducts) -
												calcTotalPayments(payments.filter((x: any) => x.payment_method_id !== 4)) +
												(data?.data[0]?.total_fee || Number(dataOrder?.shipping_fee))
									  }
									: x
							)
						);
					}
					setActiveShipped(data?.data[0]?.service_id);
				}
			} catch (error) {
				setOpenCalc(false);
				notifyError("Lỗi không tính được phí vận chuyển");
			}
		};

		if (
			listAddProducts.length > 0 &&
			selectedShipping &&
			paramsCheck.warehouse_id &&
			Number(paramsCheck.weight) > 0 &&
			selectedTypeCash &&
			dataCustomer?.s_province &&
			dataCustomer?.s_district &&
			Number(paramsCheck.COD) >= 0 &&
			showShip
		) {
			if (countCalc > 2 && [1, 3].includes(Number(dataOrder.order_status_id))) {
				getCustomers();
			} else {
				setCountCalc((count) => count + 1);
			}
		} else {
		}
	}, [
		showShip,
		selectedDeliveryType,
		selectedTypeCash,
		selectedShipping,
		dataCustomer?.s_district,
		dataCustomer?.s_province,
		paramsCheck,
		listAddProducts.length
	]);

	const [count, setCount] = useState(1);
	useEffect(() => {
		const getCustomer = async () => {
			try {
				let headers: any = {
					"Content-Type": "application/json,text/plain, */*"
				};
				let token = localGetToken();
				let authUUID = localGetAuthUUID();
				if (token) {
					headers.Authorization = token;
				}
				if (authUUID) {
					headers["x-auth-uuid"] = authUUID;
				}
				const { data } = await axios.get(`${API_URL}/customers/${dataCustomer.b_id}`, {
					headers: headers
				});
				if (data) {
					setCount((count) => count + 1);
					setShippingAddress(data?.data?.shipping_info);
					if (count !== 1) {
						if (dataCustomer.selected_address) {
							let address = data?.data?.shipping_info.find((x: any) => x.id === dataCustomer.selected_address);
							if (address) {
								setDataCustomer({
									...dataCustomer,
									s_fullname: address?.fullname,
									s_phone: address?.phone,
									s_address: address?.address,
									s_province: address?.province_name,
									s_province_id: address?.province_id,
									s_district: address?.district_name,
									s_district_id: address?.district_id,
									s_ward: address?.ward_name,
									s_ward_id: address?.ward_id,
									selected_address: address?.id
								});
							}
						} else {
							for (let i = 0; i < data?.data?.shipping_info.length; i++) {
								if (data?.data?.shipping_info[i].default) {
									setDataCustomer({
										...dataCustomer,
										s_fullname: data?.data?.shipping_info[i]?.fullname,
										s_phone: data?.data?.shipping_info[i]?.phone,
										s_address: data?.data?.shipping_info[i]?.address,
										s_province: data?.data?.shipping_info[i]?.province_name,
										s_province_id: data?.data?.shipping_info[i]?.province_id,
										s_district: data?.data?.shipping_info[i]?.district_name,
										s_district_id: data?.data?.shipping_info[i]?.district_id,
										s_ward: data?.data?.shipping_info[i]?.ward_name,
										s_ward_id: data?.data?.shipping_info[i]?.ward_id,
										selected_address: data?.data?.shipping_info[i]?.id
									});
									break;
								}
							}
						}
					} else {
						setDataCustomer({
							...dataCustomer,
							s_fullname: dataOrder?.s_fullname,
							s_province_id: dataOrder?.s_province_id,
							s_province: dataOrder?.s_province,
							s_district_id: dataOrder?.s_district_id,
							s_district: dataOrder?.s_district,
							s_ward_id: dataOrder?.s_ward_id,
							s_ward: dataOrder?.s_ward,
							s_address: dataOrder?.s_address,
							s_phone: dataOrder?.s_phone
						});
					}
				}
			} catch (error) {}
		};
		if (dataCustomer.b_id) {
			getCustomer();
		}
	}, [dataCustomer.b_id, stateUpdateCustomer.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { success, data, isLoading, error } = stateListShipping;
		if (!isLoading) {
			if (success) {
				let array = [];
				// if (Number(dataOrder.order_status_id) > 6) {
				for (let i = 0; i < data?.data?.length; i++) {
					array.push({
						label: data?.data[i]?.shipping_unit,
						value: data?.data[i]?.id
					});
				}
				setListShipping(array);
				// } else {
				// 	for (let i = 0; i < data?.data?.length; i++) {
				// 		if (data?.data[i].connect_status) {
				// 			array.push({
				// 				label: data?.data[i]?.shipping_unit,
				// 				value: data?.data[i]?.id
				// 			});
				// 		}
				// 	}

				// 	setListShipping(array);
				// }
			} else if (success === false || error) {
			}
		}
	}, [stateListShipping.isLoading]);
	useEffect(() => {
		if (isMount) return;
		const { message, success, data, isLoading, error } = stateUpdateOneOrder;
		if (!isLoading) {
			if (success) {
				notifySuccess("Cập nhật đơn hàng thành công");
				history.push("/orders");
			} else if (success === false || error) {
				notifyError(message + "");
			}
		}
	}, [stateUpdateOneOrder.isLoading]);
	useEffect((): void | undefined => {
		if (isMount) return;
		const { data, message, success, error } = stateUpdateOrdersStatus;
		if (success) {
			notifySuccess("Chuyển trạng thái đơn thành công");
			setOpenPrinter(false);
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateUpdateOrdersStatus.isLoading]);
	useEffect(() => {
		if (isMount) return;
		const { success, data, isLoading, error } = stateProductsList;
		if (!isLoading) {
			if (success) {
				setListProduct(data?.data || []);
			} else if (success === false || error) {
			}
		}
	}, [stateProductsList.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { success, data, isLoading, error } = stateListStores;
		if (!isLoading) {
			if (success) {
				let fakeArray = [];
				for (var i = 0; i < data?.data?.length; i++) {
					fakeArray.push({
						value: data?.data[i]?.id,
						label: data?.data[i]?.warehouse_name,
						district_name: data?.data[i]?.district_name,
						province_name: data?.data[i]?.province_name
					});
				}
				// formCreate.setFieldValue("warehouse_id", data?.data[0]?.id);
				// setParamsCheck({ ...paramsCheck, warehouse_id: data?.data[0]?.id });
				setListStores(fakeArray);
			} else if (success === false || error) {
			}
		}
	}, [stateListStores.isLoading]);

	const handleOpenModalCustomer = () => {
		setOpenModalCustomer(true);
	};

	// const [dataCustomer, setDataCustomer] = useState<any>({
	// 	b_fullname: undefined,

	// 	b_phone: undefined,
	// 	s_fullname: undefined,
	// 	s_province_id: undefined,
	// 	s_province: undefined,
	// 	s_district_id: undefined,
	// 	s_district: undefined,
	// 	s_ward_id: undefined,
	// 	s_ward: undefined,
	// 	s_address: undefined,
	// 	s_phone: undefined,
	// 	selected_address: undefined
	// });

	const onSubmitCreate = (values: any) => {
		console.log(dataCustomer);
		if (!dataCustomer.b_id) {
			return notifyWarning("Vui lòng chọn khách hàng!");
		}
		if (listAddProducts.length === 0) {
			return notifyWarning("Vui lòng chọn ít nhất một sản phẩm!");
		}
		if (!dataCustomer?.s_province_id && showShip) {
			return notifyWarning("Vui lòng chọn địa chỉ giao hàng!");
		}
		if (!(Number(values?.weight) !== 0) && showShip) {
			return notifyWarning("Vui lòng nhập khối lượng!");
		}

		if (payments.length === 0) {
			return notifyWarning("Vui lòng chọn thanh toán");
		}
		if (!isVietnamesePhoneNumber(values?.b_phone)) {
			return notifyWarning("Sai định dạng số điện thoại!");
		}

		if (!listServicesByShipUnit.find((x: any) => x.delivery_service_id === selectedDeliveryType)?.status) {
			return notifyWarning("Vui lòng chọn lại Dịch vụ vận chuyển!");
		}

		if (!listPaymentsByShipUnit.find((x: any) => x.payment_method_id === selectedTypeCash)?.status) {
			return notifyWarning("Vui lòng chọn lại Hình thức thanh toán!");
		}
		let fakePayments = [] as any[];

		for (let i = 0; i < payments.length; i++) {
			if (
				payments[i].payment_code.length === 0 &&
				payments[i].payment_method_id !== 1 &&
				payments[i].payment_method_id !== 4
			) {
				notifyWarning(`Vui lòng nhập mã thanh chiếu cho hình thức thanh toán ${payments[i]?.payment_method_name}`);
				return;
			}
			fakePayments.push({
				...payments[i],
				amount: Number(payments[i].amount.toString().replaceAll(",", "")) || 0,
				id: Number(payments[i].id) ? payments[i].id : undefined
			});
		}
		console.log(calTotalPriceFinal(listAddProducts), calcTotalPayments(payments), Number(values.COD));
		if (calTotalPriceFinal(listAddProducts) < calcTotalPayments(payments) && showShip) {
			fakePayments.push({
				payment_method_id: 5,
				payment_method_name: "Tiền dư",
				payment_code: "",
				amount: Number(values.COD) * -1,
				payment_at: moment().toDate()
			});
		}
		let pram2 = {
			delivery_payment_method_name: showShip
				? [...listPaymentsByShipUnit].find((x: any) => x.payment_method_id === selectedTypeCash)?.payment_method_name
				: undefined,
			platform_id: values.order_source,
			warehouse_id: showShip ? values.warehouse_id : undefined,
			shipping_unit_id: showShip ? selectedShipping : undefined,
			delivery_service_id: showShip ? selectedDeliveryType : undefined,
			delivery_payment_method_id: showShip ? selectedTypeCash : undefined,
			shipping_fee: showShip ? Number(values?.shipping_fee) : undefined,
			weight: showShip ? Number(values?.weight) : undefined,
			length: showShip ? Number(values?.length) : undefined,
			width: showShip ? Number(values?.width) : undefined,
			height: showShip ? Number(values?.height) : undefined,
			delivery_request: showShip ? values?.delivery_request : undefined,
			customer_id: dataCustomer.b_id,
			b_fullname: dataCustomer?.b_fullname,
			b_phone: dataCustomer?.b_phone,
			b_email: dataCustomer?.b_email,
			b_dob: dataCustomer?.date_of_birth,
			b_gender: dataCustomer?.gender,
			s_fullname: showShip ? dataCustomer?.s_fullname : undefined,
			s_phone: showShip ? dataCustomer?.s_phone : undefined,
			// s_email: "tandev@gmail.com",
			s_province_id: showShip ? dataCustomer?.s_province_id : undefined,
			s_province: showShip ? dataCustomer?.s_province : undefined,
			s_district_id: showShip ? dataCustomer?.s_district_id : undefined,
			s_district: showShip ? dataCustomer?.s_district : undefined,
			s_ward_id: showShip ? dataCustomer?.s_ward_id : undefined,
			s_ward: showShip ? dataCustomer?.s_ward : undefined,
			s_address: showShip ? dataCustomer?.s_address : undefined,
			notes: showShip ? values.notes : undefined,
			details: listAddProducts,
			shipping_unit_name: showShip ? listShipping.find((x: any) => x.value === selectedShipping)?.label : undefined,
			delivery_service_name: showShip
				? listServicesByShipUnit.find((x: any) => x.delivery_service_id === selectedDeliveryType)?.delivery_service_name
				: undefined,
			platform_name: platformsList.find((x: any) => x.value === values.order_source)?.label,
			coupon_code: "OMS-COUPON",
			removed_payment_details: removePaymentsData,
			removed_details: removeProducts,
			receive_at_store: !showShip,

			coupon_value: 0,
			payment_details: fakePayments
		};

		dispatch(updateOneOrder(paramsUrl?.id, pram2));
	};

	const calcTotalPayments = (array: any) => {
		let total = 0;
		for (let i = 0; i < array.length; i++) {
			total = Number(total) + Number(array[i].amount.toString().replaceAll(",", ""));
		}
		return total;
	};

	const calTotalPriceFinal = (values: any) => {
		let total = 0;
		for (let i = 0; i < values.length; i++) {
			total = Number(total) + Number(values[i].price) * Number(values[i].quantity);
		}
		console.log("total", shippingFee, total);
		return shippingFee ? total + Number(shippingFee) : total;
	};
	const calTotalPrice = (values: any) => {
		let total = 0;
		for (let i = 0; i < values.length; i++) {
			total = Number(total) + Number(values[i].price) * Number(values[i].quantity);
		}
		return total;
	};
	const handleClickProduct = (value: any) => {
		if (Number(value.virtual_stock_quantity) === 0) {
			return notifyWarning("Sản phẩm đã hết hàng");
		}
		let fakeList = [...listAddProducts];

		let checked = fakeList.find((x) => x.product_id === value.id);
		if (checked) {
			notifyWarning("Sản phẩm này đã tồn tại");
		} else {
			fakeList.push({
				stock_quantity: Number(value.virtual_stock_quantity),
				product_id: value.id,
				product_name: value.product_name,
				sku: value.sku,
				price: value.retail_price ? value.retail_price : 0,
				barcode: value.barcode,
				quantity: 1,
				discount: 0,
				discount_type: "1"
			});
			setListAddProducts(fakeList);
			setFilterProduct(undefined);
			let total = 0;
			for (let i = 0; i < fakeList.length; i++) {
				total = Number(total) + Number(fakeList[i].price) * Number(fakeList[i].quantity);
			}
			formCreate.setFieldValue(
				"COD",
				total + shippingFee - calcTotalPayments(payments.filter((x: any) => x.payment_method_id !== 4))
			);
			let fakePayment = [...payments].find((x: any) => x.payment_method_id === 4);
			if (fakePayment) {
				setPayments(
					payments.map((x: any) =>
						x.payment_method_id === 4
							? {
									...fakePayment,
									amount:
										total + shippingFee - calcTotalPayments(payments.filter((x: any) => x.payment_method_id !== 4))
							  }
							: x
					)
				);
			}
		}
	};
	const removeProduct = (record: any) => {
		console.log(stateOrderById);
		if (dataOrder?.order_status_id === 1 || dataOrder?.order_status_id === 3) {
			let fakeList = [...listAddProducts];
			let fakeRemove = [...removeProducts];
			let checked = fakeList.find((x) => x.product_id === record.product_id);
			if (Number(checked.id)) {
				fakeRemove.push(checked.id);
			}
			if (checked) {
				fakeList = fakeList.filter((x: any) => x.product_id !== record.product_id);
				setRemoveProducts(fakeRemove);
				setListAddProducts(fakeList);
				let total = 0;
				for (let i = 0; i < fakeList.length; i++) {
					total = Number(total) + Number(fakeList[i].price) * Number(fakeList[i].quantity);
				}
				if (fakeList.length === 0) {
					formCreate.setFieldValue("COD", 0);
					setShippingFee(0);
					setPayments([]);
					setListTypeShipping([]);
					setParamsCheck({ ...paramsCheck, COD: 0 });
				} else {
					formCreate.setFieldValue(
						"COD",
						total + shippingFee - calcTotalPayments(payments.filter((x: any) => x.payment_method_id !== 4))
					);
					let fakePayment = [...payments].find((x: any) => x.payment_method_id === 4);
					if (fakePayment) {
						setPayments(
							payments.map((x: any) =>
								x.payment_method_id === 4
									? {
											...fakePayment,
											amount:
												total + shippingFee - calcTotalPayments(payments.filter((x: any) => x.payment_method_id !== 4))
									  }
									: x
							)
						);
					}
				}
			} else {
				notifyWarning("Không tồn tại sản phẩm");
			}
		}
	};

	const addPayment = () => {
		if (calTotalPriceFinal(listAddProducts) - calcTotalPayments(payments) === 0) {
			return notifyWarning("Đã thanh toán đủ!");
		}
		if (selectedMethod) {
			let fakePayments = [
				...payments,
				{
					id: geneUniqueKey(),
					payment_method_id: selectedMethod,
					payment_method_name: dataPaymentMethods.find((x: any) => x.value === selectedMethod)?.label,
					payment_code: "",
					amount:
						payments.length === 0
							? Number(calTotalPriceFinal(listAddProducts))
							: Number(calTotalPriceFinal(listAddProducts)) - Number(calcTotalPayments(payments)),
					payment_at: moment().toDate()
				}
			];

			setParamsCheck({
				...paramsCheck,
				COD:
					Number(calTotalPriceFinal(listAddProducts)) -
					Number(calcTotalPayments(fakePayments.filter((x: any) => x.payment_method_id !== 4)))
			});
			formCreate.setFieldValue(
				"COD",
				calTotalPriceFinal(listAddProducts) -
					calcTotalPayments(fakePayments.filter((x: any) => x.payment_method_id !== 4))
			);
			setPayments(fakePayments);
			setPaymentMethods((x: any) =>
				[...paymentMethods].filter((a: any) => a.value !== selectedMethod && a.value !== 4)
			);
		} else {
			notifyWarning("Vui lòng chọn phương thức thanh toán");
		}
	};

	const changeAmount = (value: any, record: any) => {
		let selected = [...payments].find((x: any) => x.id === record.id);
		if (selected) {
			if (selected.payment_method_id === 3) {
				formCreate.setFieldValue("COD", Number(value.replaceAll(",", "")));
				setParamsCheck({
					...paramsCheck,
					COD: Number(value.replaceAll(",", ""))
				});
			}
			selected.amount = value < 1 ? 1 : value;
			let fakePayments = [...payments].map((a: any) => (a.id === record.id ? selected : a));
			formCreate.setFieldValue(
				"COD",
				calTotalPriceFinal(listAddProducts) -
					calcTotalPayments(fakePayments.filter((x: any) => x.payment_method_id !== 4))
			);
			setPayments((x: any) => x.map((a: any) => (x.id === record.id ? selected : a)));
		} else {
			notifyWarning("Không tồn tại phương thức thanh toán");
		}
	};

	const changeCode = (value: any, record: any) => {
		let selected = [...payments].find((x: any) => x.id === record.id);
		if (selected) {
			selected.payment_code = value;
			setPayments((x: any) => x.map((a: any) => (x.id === record.id ? selected : a)));
		} else {
			notifyWarning("Không tồn tại phương thức thanh toán");
		}
	};

	const changeMethod = (value: any) => {
		// if (selected) {
		// 	selected.payment_method_id = value;
		// 	setPayments((x: any) => x.map((a: any) => (x.id === record.id ? selected : a)));
		// 	if (paymentTemp) {
		// 		setPaymentMethods((x: any) =>
		// 			[
		// 				...paymentMethods,
		// 				{ value: paymentTemp, label: dataPaymentMethods.find((x: any) => x.value === paymentTemp)?.label }
		// 			].filter((a: any) => a.value !== value)
		// 		);
		// 	} else {
		// 		setPaymentMethods((x: any) => [...paymentMethods].filter((a: any) => a.value !== value));
		// 	}
		// } else {
		// 	notifyWarning("Không tồn tại phương thức thanh toán");
		// }
		setSelectedMethod(value);
	};

	const removePayment = (record: any) => {
		let fakeList = [...payments];
		let checked = fakeList.find((x) => x.id === record.id);
		let paymentTemp = checked?.payment_method_id;
		if (checked) {
			fakeList = fakeList.filter((x: any) => x.payment_method_id !== record.payment_method_id);
			formCreate.setFieldValue(
				"COD",
				calTotalPriceFinal(listAddProducts) - calcTotalPayments(fakeList.filter((x: any) => x.payment_method_id !== 4))
			);
			setPayments(fakeList);
			if (![...paymentMethods].find((x: any) => x.value === record.payment_method_id)) {
				if (record.payment_method_id === 4) {
					setPaymentMethods((x: any) => [
						...paymentMethods,
						{ value: paymentTemp, label: dataPaymentMethods.find((x: any) => x.value === paymentTemp)?.label }
					]);
				} else {
					setPaymentMethods((x: any) => [
						...paymentMethods,
						{ value: paymentTemp, label: dataPaymentMethods.find((x: any) => x.value === paymentTemp)?.label },
						{ value: 4, label: "COD" }
					]);
				}
			}

			let fakeRemove = [];
			if (checked.id) {
				fakeRemove.push(checked.id);
			}
			setRemovePaymentsData(fakeRemove);
		} else {
			notifyWarning("Không tồn tại phương thức thanh toán");
		}
	};

	const changeDataAddress = (record: any) => {
		setDataCustomer({
			...dataCustomer,
			s_fullname: record?.fullname,
			s_phone: record?.phone,
			s_address: record?.address,
			s_province: record?.province_name,
			s_province_id: record?.province_id,
			s_district: record?.district_name,
			s_district_id: record?.district_id,
			s_ward: record?.ward_name,
			s_ward_id: record?.ward_id,
			selected_address: record?.id
		});
	};

	const handleOnSave = (values: any) => {
		let removed_shipping_info = [] as any;
		let updated_shipping_info = [] as any;
		let new_shipping_info = [] as any;
		if (typeSubmitCreateAddress) {
			if (defaultAddress === true) {
				updated_shipping_info = [...shippingAddress].map((x: any) => ({ ...x, default: false }));
			}
			new_shipping_info = [
				{
					address: values?.address,
					address_type: values?.address_type,
					default: defaultAddress,
					district_id: Number(values?.district_id),
					district_name: values?.district_name,
					fullname: values?.fullname,
					phone: values?.phone,
					province_id: Number(values?.province_id),
					province_name: values?.province_name,
					ward_id: Number(values?.ward_id),
					ward_name: values?.ward_name
				}
			];
		} else {
			updated_shipping_info = [...shippingAddress].map((x: any) =>
				x.id === values.id
					? {
							id: values?.id,
							address: values?.address,
							address_type: values?.address_type,
							default: defaultAddress,
							district_id: Number(values?.district_id),
							district_name: values?.district_name,
							fullname: values?.fullname,
							phone: values?.phone,
							province_id: Number(values?.province_id),
							province_name: values?.province_name,
							ward_id: Number(values?.ward_id),
							ward_name: values?.ward_name
					  }
					: { ...x, default: false }
			);
		}
		let params = {
			customer_type: dataCustomer?.customer_type,
			date_of_birth: dataCustomer?.date_of_birth,
			email: dataCustomer?.email,
			fullname: dataCustomer?.fullname,
			gender: dataCustomer?.gender || "Male",
			phone: dataCustomer?.phone,
			removed_shipping_info: removed_shipping_info,
			updated_shipping_info: updated_shipping_info,
			new_shipping_info: new_shipping_info
		};
		// const dataRequest: any = {
		// 	...values,
		// 	removed_shipping_info,
		// 	updated_shipping_info,
		// 	new_shipping_info
		// };

		dispatch(updateCustomer(dataCustomer?.b_id, params));
	};

	const setQuantityCallback = (value: any, record: any) => {
		if (value === 0) {
			return;
		}
		if (value > 10) {
			return notifyWarning("Tối đa 10 sản phẩm!");
		}
		if (value > record.stock_quantity) {
			return notifyWarning("Số lượng vượt quá tồn kho!");
		}
		let fakeList = [...listAddProducts];
		let checked = fakeList.find((x) => x.product_id === record.product_id);
		if (checked) {
			fakeList = fakeList.map((x: any) => (x.product_id === record.product_id ? { ...x, quantity: Number(value) } : x));
			setListAddProducts(fakeList);
			let total = 0;
			for (let i = 0; i < fakeList.length; i++) {
				total = Number(total) + Number(fakeList[i].price) * Number(fakeList[i].quantity);
			}
			formCreate.setFieldValue(
				"COD",
				total + shippingFee - calcTotalPayments(payments.filter((x: any) => x.payment_method_id !== 4))
			);
			let fakePayment = [...payments].find((x: any) => x.payment_method_id === 4);
			if (fakePayment) {
				setPayments(
					payments.map((x: any) =>
						x.payment_method_id === 4
							? {
									...fakePayment,
									amount:
										total + shippingFee - calcTotalPayments(payments.filter((x: any) => x.payment_method_id !== 4))
							  }
							: x
					)
				);
			}
		} else {
			notifyWarning("Không tồn tại sản phẩm");
		}
	};

	const contentPromotion = () => {
		return (
			<div style={{ display: "flex", alignItems: "center", width: "400px", background: "#fff" }}>
				<Input
					className="defaultInput"
					onChange={(e: any) => formCreate.setFieldValue("coupon_code", e.target.value)}
				/>
				<div className="searchButton" style={{ marginLeft: "8px" }} onClick={() => setOpenVoucher(false)}>
					Áp dụng
				</div>
			</div>
		);
	};
	const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
	const [treeData, setTreeData] = useState<any[]>([]);
	useEffect(() => {
		const getCategories = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/${API_CATEGORY}`, params)) as any;
				let data = response["data"];
				for (let i = 0; i < data?.length; i++) {
					data[i].value = data[i].category_id;
					data[i].key = data[i].category_id;
					data[i].title = data[i].category_name;
					let childrenLv1 = data[i].children || [];
					for (let j = 0; j < childrenLv1.length; j++) {
						childrenLv1[j].value = childrenLv1[j].category_id;
						childrenLv1[j].key = childrenLv1[j].category_id;
						childrenLv1[j].title = childrenLv1[j].category_name;
						let childrenLv2 = childrenLv1[j].children || [];
						for (let k = 0; k < childrenLv2.length; k++) {
							childrenLv2[k].value = childrenLv2[k].category_id;
							childrenLv2[k].key = childrenLv2[k].category_id;
							childrenLv2[k].title = childrenLv2[k].category_name;
							let childrenLv3 = childrenLv2[k].children || [];

							for (let m = 0; m < childrenLv3.length; m++) {
								childrenLv3[m].value = childrenLv3[m].category_id;
								childrenLv3[m].key = childrenLv3[m].category_id;
								childrenLv3[m].title = childrenLv3[m].category_name;
							}
						}
					}
				}
				setTreeData(data);
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};
		const timer = setTimeout(() => {
			let paramsFilter = {
				limit: 10000,
				page: 1,
				status: true,
				catalog_id: sellerInfo?.catalog_id
			};

			getCategories(paramsFilter);
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, [sellerInfo]);

	const onChangeCategories = (newValue: string[], value: any, value2: any) => {
		setSelectedCategories(newValue);
	};

	const tProps = {
		treeData: [...treeData],
		value: [...selectedCategories],
		onChange: onChangeCategories,
		treeCheckable: true,
		showCheckedStrategy: TreeSelect.SHOW_ALL,
		treeCheckStrictly: true,
		showSearch: true,
		placeholder: "Chọn danh mục",
		style: {
			width: "100%"
		}
	};

	const handleCreateCustomer = (values: any) => {
		if (isCreateCustomer) {
			dispatch(
				createCustomer({
					fullname: values?.b_fullname,
					email: values?.b_email,
					phone: values?.b_phone,
					gender: values?.b_gender,
					date_of_birth: moment(values?.b_dob),
					customer_type: values?.customer_type
				})
			);
		} else {
			let params = {
				fullname: values?.b_fullname,
				email: values?.b_email,
				phone: values?.b_phone,
				gender: values?.b_gender,
				date_of_birth: moment(values?.b_dob),
				customer_type: values?.customer_type
			};

			dispatch(updateCustomer(dataCustomer?.b_id, params));
		}
	};
	return (
		<div className="mainPages ordersPage__create">
			<OverlaySpinner text="Đang gọi phí vận chuyển ..." open={openCalc} />
			<div
				style={{
					zIndex: "94",
					position: "fixed",
					top: showCustomers || showProduct ? "0" : "-100%",
					left: "0",
					width: "100vw",
					height: "100vh"
				}}
				onClick={() => {
					setShowCustomers(false);
					setShowProduct(false);
				}}
			></div>
			<Modal
				width={700}
				visible={openHistory}
				title="Lịch sử đơn hàng"
				footer={null}
				onCancel={() => setOpenHistory(false)}
			>
				<TableStyledAntd
					style={{ marginTop: "8px" }}
					rowKey="id"
					dataSource={orderHistory}
					bordered
					pagination={false}
					loading={false}
					columns={columnsHistory() as any}
					widthCol1="34%"
					widthCol2="33%"
					widthCol3="33%"
				/>
			</Modal>
			<Modal visible={openNoti} title="Thay đổi địa chỉ giao hàng" footer={null} onCancel={() => setOpenNoti(false)}>
				<div style={{ color: "red" }}>Hành động hiện tại có thể sẽ thay đổi phí vận chuyển</div>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
					<div className="searchButton" onClick={() => setOpenNoti(false)}>
						Trở lại
					</div>
					<div
						className="defaultButton"
						style={{ marginLeft: "8px" }}
						onClick={() => {
							setOpenNoti(false);
							changeDataAddress(selectedShippingInfo);
						}}
					>
						Đồng ý
					</div>
				</div>
			</Modal>
			<Modal centered visible={openPrinter} title="Chọn mẫu in" footer={null} onCancel={() => setOpenPrinter(false)}>
				<div style={{ height: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
					<img src={printGif} alt={printGif} style={{ height: "100%", objectFit: "contain" }} />
				</div>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					{printOptions.map((x: any) => (
						<div
							className={selectedPrintOption === x.value ? "defaultButton" : "searchButton"}
							style={{ width: "calc((100% - 24px) / 4)" }}
							onClick={() => setSelectedPrintOption(x.value)}
						>
							{x.label}
						</div>
					))}
				</div>
				<div style={{ marginTop: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<Checkbox>Đặt làm tùy chọn mặc định</Checkbox>
					<div style={{ display: "flex", alignItems: "center" }}>
						<div className="searchButton" onClick={() => setOpenPrinter(false)}>
							Trở lại
						</div>{" "}
						<div
							className="defaultButton"
							style={{ marginLeft: "4px" }}
							onClick={() =>
								dispatch(
									updateOrdersStatus({
										ids: [paramsUrl.id],
										current_order_status_id: dataOrder?.order_status_id,
										target_order_status_id: 15
									})
								)
							}
						>
							In
						</div>
					</div>
				</div>
			</Modal>
			<Modal
				visible={openModalAddAddress}
				title="Thêm địa chỉ giao hàng"
				footer={null}
				onCancel={() => {
					setOpenModalAddAddress(false);
					formAddAddress.resetFields();
					setDefaultAddress(false);
				}}
			>
				<Form
					form={formAddAddress}
					onFinish={handleOnSave}
					initialValues={{
						address_type: CustomerAddressTypesEnum["Nhà riêng"]
					}}
				>
					<Form.Item name="province_name" className="hidden">
						<Input type="hidden" />
					</Form.Item>
					<Form.Item name="district_name" className="hidden">
						<Input type="hidden" />
					</Form.Item>
					<Form.Item name="ward_name" className="hidden">
						<Input type="hidden" />
					</Form.Item>
					<Wrapper>
						<Form.Item name="id" style={{ display: "none" }}></Form.Item>
						<div className="row">
							<Form.Item
								name="fullname"
								label="Họ tên"
								rules={[{ required: true, message: message.customer.fullnameNotEmpty }]}
								className="item"
							>
								<Input
									disabled={dataOrder?.order_status_id === 3 && !typeSubmitCreateAddress}
									placeholder="Nhập họ tên"
									className="defaultInput"
								/>
							</Form.Item>
							<Form.Item
								name="phone"
								label="Số điện thoại"
								rules={[
									{ required: true, message: "" },
									() => ({
										validator(_: any, value: any) {
											if (!value) {
												return Promise.reject(new Error("Không bỏ trống!"));
											}

											if (value && isVietnamesePhoneNumber(value)) {
												return Promise.resolve();
											} else {
												return Promise.reject(new Error("Sai định dạng số điện thoại"));
											}
										}
									})
								]}
								className="item"
							>
								<Input
									onChange={(e: any) => {
										formAddAddress.setFieldValue("phone", convertToOnlyNumber(e.target.value));
									}}
									disabled={dataOrder?.order_status_id === 3 && !typeSubmitCreateAddress}
									placeholder="Nhập số điện thoại"
									className="defaultInput"
								/>
							</Form.Item>
						</div>
						<div className="row">
							<Form.Item
								name="province_id"
								label="Tỉnh/thành phố"
								rules={[{ required: true, message: message.customer.provinceNotEmpty }]}
								className="item"
							>
								<Select
									showSearch
									placeholder="Chọn tỉnh/ thành phố"
									className="defaultSelect"
									disabled={dataOrder?.order_status_id === 3 && !typeSubmitCreateAddress}
									notFoundContent={null}
									optionFilterProp="children"
									filterOption={(input: any, option: any) =>
										removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
									}
									value={selectedProvince}
									options={provincesList}
									onChange={onSelectProvince}
								/>
							</Form.Item>
							<Form.Item
								name="district_id"
								label="Quận/huyện"
								rules={[{ required: true, message: message.customer.districtNotEmpty }]}
								required
								className="item"
							>
								<Select
									showSearch
									disabled={dataOrder?.order_status_id === 3 && !typeSubmitCreateAddress}
									placeholder="Chọn quận huyện"
									className="defaultSelect"
									notFoundContent={null}
									filterOption={(input: any, option: any) =>
										removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
									}
									options={districtsList}
									value={selectedDistrict}
									onChange={onSelectDistrict}
								/>
							</Form.Item>
						</div>
						<div className="row">
							<Form.Item
								name="ward_id"
								label="Phường/xã"
								rules={[{ required: true, message: message.customer.wardNotEmpty }]}
								className="item"
							>
								<Select
									showSearch
									placeholder="Chọn phường xã"
									className="defaultSelect"
									notFoundContent={null}
									filterOption={(input: any, option: any) =>
										removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
									}
									value={selectedWard}
									onChange={onSelectWard}
									options={wardsList}
								/>
							</Form.Item>
							<Form.Item
								name="address"
								label="Địa chỉ"
								rules={[{ required: true, message: message.customer.addressNotEmpty }]}
								className="item"
							>
								<Input placeholder="Nhập địa chỉ" className="defaultInput" />
							</Form.Item>
						</div>
						<AddressType>
							<Form.Item name="address_type" label="Loại địa chỉ" style={{ marginTop: "10px" }}>
								<Radio.Group
									style={{ marginTop: 0 }}
									disabled={dataOrder?.order_status_id === 3 && !typeSubmitCreateAddress}
								>
									<Space direction="horizontal">
										{Object.entries(CustomerAddressTypesEnum).map(([key, val]) => (
											<Radio key={key} value={val}>
												{key}
											</Radio>
										))}
									</Space>
								</Radio.Group>
							</Form.Item>
						</AddressType>
						<Form.Item name="defaultAddress" className="hidden"></Form.Item>
						<div style={{ marginTop: "10px", marginLeft: "auto", display: "flex", justifyContent: "space-between" }}>
							<Checkbox
								disabled={dataOrder?.order_status_id === 3 && !typeSubmitCreateAddress}
								checked={defaultAddress}
								onChange={(e: any) => setDefaultAddress(e.target.checked)}
							>
								Địa chỉ mặc định
							</Checkbox>
							<div style={{ marginTop: "10px", marginLeft: "auto", display: "flex", justifyContent: "flex-end" }}>
								<button
									className="defaultButton bg-black"
									style={{ width: "130px", padding: "7.5px 20px", height: "37px" }}
									type="submit"
								>
									<SvgIconStorage style={{ transform: "scale(0.7)" }} />
									&nbsp; Lưu
								</button>
							</div>
						</div>
					</Wrapper>
				</Form>
			</Modal>
			<Modal
				visible={openModalAddress}
				title="Địa chỉ giao hàng"
				footer={null}
				onCancel={() => setOpenModalAddress(false)}
			>
				<div
					onClick={() => {
						setOpenModalAddAddress(true);
						setTypeSubmitCreateAddress(true);
						setOpenModalAddress(false);
						setDefaultAddress(false);
					}}
					style={{
						display: "flex",
						alignItems: "center",
						padding: "4px 12px",
						background: "rgb(242,242,242)",
						borderRadius: "5px",
						marginBottom: "4px",
						color: "rgb(47,129,174)",
						cursor: "pointer"
					}}
				>
					<span
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							height: "16px",
							width: "16px",
							color: "white",
							background: "rgb(47,129,174)",
							borderRadius: "50%",
							marginRight: "4px"
						}}
					>
						+
					</span>
					Thêm địa chỉ nhận hàng
				</div>
				<div>
					{shippingAddress.length > 0 &&
						shippingAddress.map((shippingInfo: any) => (
							<div
								className="customers__edit__body__right-side__transport"
								key={shippingInfo.id}
								onClick={() => {
									if (shippingInfo.id === dataCustomer.selected_address) {
										return;
									}
									if (dataOrder?.order_status_id === 3) {
										setOpenNoti(true);
										setSelectedShippingInfo(shippingInfo);
									} else {
										changeDataAddress(shippingInfo);
									}
								}}
							>
								<div
									className="customers__edit__body__right-side__transport__item"
									style={dataCustomer.selected_address === shippingInfo.id ? { background: "rgb(227,236,250)" } : {}}
								>
									<div>
										<div>
											<span className="customers__edit__body__right-side__transport__item__fullname">
												{shippingInfo.fullname}
											</span>
											<span className="customers__edit__body__right-side__transport__item__text">
												| {shippingInfo.phone}
											</span>
											{shippingInfo.default === true ? (
												<span className="customers__edit__body__right-side__transport__item__default">
													<CheckCircleFilled />
													<span>Địa chỉ mặc định</span>
												</span>
											) : null}
										</div>
										<div className="customers__edit__body__right-side__transport__item__text">
											{shippingInfo?.address}
										</div>
										<div className="customers__edit__body__right-side__transport__item__text">
											{joinIntoAddress(shippingInfo.province_name, shippingInfo.district_name, shippingInfo.ward_name)}
										</div>
									</div>
									<div className="customers__edit__body__right-side__transport__item__button-groups">
										<div
											className="customers__edit__body__right-side__transport__item__button-item"
											onClick={() => {
												setTypeSubmitCreateAddress(false);
												setOpenModalAddAddress(true);
												setSelectedProvince(shippingInfo?.province_id);
												setDefaultAddress(shippingInfo?.default);
												setSelectedDistrict(shippingInfo?.district_id);
												formAddAddress.setFieldsValue({
													id: shippingInfo?.id,
													address: shippingInfo?.address,
													address_type: shippingInfo?.address_type,
													defaultAddress: shippingInfo.default,
													district_id: shippingInfo?.district_id,
													district_name: shippingInfo?.district_name,
													fullname: shippingInfo?.fullname,
													phone: shippingInfo?.phone,
													province_id: shippingInfo?.province_id,
													province_name: shippingInfo?.province_name,
													ward_id: shippingInfo?.ward_id,
													ward_name: shippingInfo?.ward_name
												});
											}}
										>
											<SvgEdit fill="rgb(19,118,162)" style={{ transform: "scale(0.7)" }} />
										</div>
									</div>
								</div>
							</div>
						))}
				</div>
			</Modal>
			<Modal
				visible={openModalCustomer}
				title={isCreateCustomer ? "Tạo mới khách hàng" : "Thông tin khách hàng"}
				footer={null}
				centered
				onCancel={() => {
					setOpenModalCustomer(false);
					setIsCreateCustomer(false);
				}}
			>
				<Form
					layout="vertical"
					form={formModalCustomer}
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						flexWrap: "wrap"
					}}
					onFinish={handleCreateCustomer}
					initialValues={{
						b_gender: "Male"
					}}
				>
					<Form.Item
						rules={[{ required: true, message: message.customer.fullnameNotEmpty }]}
						label="Họ tên"
						style={{ width: "calc(50% - 4px)", margin: "0 0 13px 0" }}
						name="b_fullname"
					>
						<Input className="defaultInput" />
					</Form.Item>
					<Form.Item
						rules={[
							{ required: true, message: "" },
							() => ({
								validator(_: any, value: any) {
									if (!value) {
										return Promise.reject(new Error("Không bỏ trống!"));
									}

									if (value && isVietnamesePhoneNumber(value)) {
										return Promise.resolve();
									} else {
										return Promise.reject(new Error("Sai định dạng số điện thoại"));
									}
								}
							})
						]}
						label="Số điện thoại"
						style={{ width: "calc(50% - 4px)", margin: "0 0 13px 0" }}
						name="b_phone"
					>
						<Input
							onChange={(e: any) => {
								formModalCustomer.setFieldValue("b_phone", convertToOnlyNumber(e.target.value));
							}}
							className="defaultInput"
						/>
					</Form.Item>
					<Form.Item label="Ngày sinh" style={{ width: "calc(50% - 4px)", margin: "0 0 13px 0" }} name="b_dob">
						<DatePicker
							defaultValue={moment().subtract(6, "years")}
							disabledDate={disabledDate}
							style={{ width: "100%" }}
							className="defaultInput"
						/>
					</Form.Item>
					<Form.Item label="Giới tính" style={{ width: "calc(50% - 4px)", margin: "0 0 13px 0" }} name="b_gender">
						<Select
							options={[
								{ label: "Nam", value: "Male" },
								{ label: "Nữ", value: "Female" },
								{ label: "Khác", value: "Others" }
							]}
							className="defaultSelect"
						/>
					</Form.Item>
					<Form.Item
						rules={[{ required: true, pattern: mailPattern, message: message.customer.inValidEmail }]}
						label="Email"
						style={{ width: "calc(50% - 4px)", margin: "0 0 13px 0" }}
						name="b_email"
					>
						<Input className="defaultInput" />
					</Form.Item>
					<Form.Item
						label="Loại khách hàng"
						style={{ width: "calc(50% - 4px)", margin: "0 0 13px 0" }}
						name="customer_type"
					>
						<Select options={customerTypes} className="defaultSelect" />
					</Form.Item>

					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-end",
							width: "100%"
						}}
					>
						<button type="submit" className="defaultButton">
							<SvgIconStorage style={{ transform: "scale(0.7)" }} />
							&nbsp;Lưu
						</button>
					</div>
				</Form>
			</Modal>
			<SubHeader
				breadcrumb={[
					{ text: "Quản lý đơn hàng" },
					{ text: "Đơn hàng", link: "/orders" },
					{
						text: `Chi tiết đơn`
					}
				]}
			/>
			<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
				<div
					style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", transform: "translateY(-6px)" }}
				>
					<span style={{ color: "rgb(47,129,174)", fontWeight: "bold", marginRight: "8px" }}>
						{dataOrder.order_code}
					</span>
					<span
						style={{ marginRight: "8px" }}
						className={
							[1, 2].includes(dataOrder?.order_status_id)
								? `newStatus`
								: [3, 4, 5, 6, 7, 8, 9, 12, 13, 14].includes(dataOrder?.order_status_id)
								? "processStatus"
								: [11].includes(dataOrder?.order_status_id)
								? "uncompleteStatus"
								: "completeStatus"
						}
					>
						{dataOrder.order_status_name}
					</span>
					{features.includes("MODULES_ORDER__ORDERS__VIEW_LOGS") && (
						<span
							style={{
								color: "rgb(47,129,174)",
								textDecorationLine: "underline ",
								textDecorationStyle: "solid",
								textDecorationColor: "rgb(47,129,174)",
								cursor: "pointer"
							}}
							onClick={() => setOpenHistory(true)}
						>
							Lịch sử đơn hàng
						</span>
					)}
				</div>
				<div style={{ display: "flex", alignItems: "center" }}>
					<div className="searchButton" style={{ cursor: "not-allowed" }}>
						<SvgCopy style={{ transform: "scale(0.7)" }} />
						&nbsp;Sao chép đơn hàng
					</div>
					<div
						className="searchButton"
						style={{ marginLeft: "8px", cursor: "not-allowed" }}
						// onClick={() => setOpenPrinter(true)}
					>
						<SvgPrint style={{ transform: "scale(0.7)" }} />
						&nbsp;In
						<div style={{ borderLeft: "1px solid #000", height: "70%", margin: "0 4px 0 8px" }} />
						<SvgExpand fill="#000" style={{ transform: "scale(0.7)" }} />
					</div>
					{features.includes("MODULES_ORDER__ORDERS__UPDATE") &&
						(dataOrder?.order_status_id === 1 || dataOrder?.order_status_id === 3) && (
							<div onClick={() => formCreate.submit()} className="defaultButton" style={{ marginLeft: "8px" }}>
								<SvgIconStorage style={{ transform: "scale(0.7)" }} />
								&nbsp;Cập nhật
							</div>
						)}
				</div>
			</div>
			<div style={{ transform: "translateY(-6px)" }}>Sàn: {dataOrder?.platform_name}</div>
			<Form
				className="ordersPage__create__body"
				layout="vertical"
				form={formCreate}
				id="formCreate"
				onFinish={onSubmitCreate}
				initialValues={{
					COD: 0,
					weight: 1,
					width: 0,
					height: 0,
					length: 0,
					delivery_request: 1,
					shipping_unit_id: 1,
					order_source: 1,
					notes: deliveryRequests.find((x: any) => x.value === 1)?.label
				}}
			>
				<Form.Item name="delivery_service_name" style={{ display: "none" }}></Form.Item>
				<Form.Item name="delivery_payment_method_name" style={{ display: "none" }}></Form.Item>
				<Form.Item name="delivery_cod_fee" style={{ display: "none" }}></Form.Item>
				<Form.Item name="shipping_fee" style={{ display: "none" }}></Form.Item>
				<div className="ordersPage__create__body__left">
					<div className="ordersPage__create__body__left__items">
						<div className="ordersPage__create__body__left__items__search">
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between"
								}}
							>
								<span
									style={{
										width: "calc(25% - 4px)",
										marginTop: "2px"
									}}
								>
									Kho hàng
								</span>
								<span
									style={{
										width: "calc(25% - 4px)",
										marginTop: "2px"
									}}
								>
									Danh mục
								</span>
								<span
									style={{
										width: "calc(50% - 4px)"
									}}
								>
									Tên sản phẩm
								</span>
							</div>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between"
								}}
							>
								<Form.Item style={{ width: "calc(25% - 4px)", margin: "2px 0 0 0" }} name="warehouse_id">
									<Select
										disabled={(![1].includes(dataOrder?.order_status_id) && true) || listAddProducts.length > 0}
										options={listStores}
										className="defaultSelect"
										onChange={(e: any) => {
											setSelectedStore(e);
											setParamsCheck({ ...paramsCheck, warehouse_id: e });
										}}
										placeholder="Chọn kho hàng"
									/>
								</Form.Item>
								<TreeSelect
									maxTagCount={"responsive"}
									{...tProps}
									className="defaultSelect"
									filterTreeNode={(search: any, item: any) => {
										return item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
									}}
									style={{
										width: "calc(25% - 4px)",
										marginTop: "2px"
									}}
									onChange={(e: any) => {
										let fakeArray = [];
										for (let i = 0; i < e?.length; i++) {
											fakeArray.push(e[i]?.value);
										}
										setSelectedCategories(fakeArray);
									}}
									disabled={![1].includes(dataOrder?.order_status_id) && true}
									placeholder="Chọn danh mục"
								/>

								<div
									style={{ width: "calc(50% - 4px)", zIndex: "96" }}
									className="installStore__create__body__left__information__showProduct"
									onClick={() => setShowProduct(false)}
								>
									<Input
										className="defaultInput"
										onChange={(e: any) => {
											setFilterProduct(e.target.value);
											setShowProduct(true);
										}}
										placeholder="Nhập SKU, barcode, tên sản phẩm"
										disabled={![1].includes(dataOrder?.order_status_id) && true}
									/>
									{showProduct && (
										<div className="installStore__create__body__left__information__showProduct__table">
											{/* <div
												className="installStore__create__body__left__information__showProduct__table__add"
												onClick={() => setOpenModalAdd(true)}
											>
												<SvgIconPlus fill="#000" />
												&nbsp;&nbsp;Thêm mới sản phẩm
											</div> */}
											{listProduct.length > 0 ? (
												listProduct.map((x: any) => (
													<div
														style={{
															padding: "4px 8px",

															cursor: "pointer"
														}}
														onClick={() => {
															handleClickProduct(x);
															setShowProduct(false);
														}}
													>
														<div
															style={{
																display: "flex",
																alignItems: "center",
																justifyContent: "space-between"
															}}
														>
															<div>{x.product_name}</div>
															<div style={{ color: "red" }}>
																{x.retail_price ? convertNumberWithCommas(x.retail_price) : 0}
																&nbsp;đ
															</div>
														</div>
														<div
															style={{
																display: "flex",
																alignItems: "center",
																justifyContent: "space-between",
																fontSize: "12px"
															}}
														>
															<div>SKU: {x?.sku}</div>
															<div>Tồn: {x?.virtual_stock_quantity}</div>
														</div>
													</div>
												))
											) : (
												<div>Không có sản phẩm</div>
											)}
										</div>
									)}
								</div>
							</div>
							<TableStyledAntd
								style={{ marginTop: "8px" }}
								rowKey="product_id"
								dataSource={listAddProducts}
								bordered
								pagination={false}
								loading={false}
								columns={
									columnsData({ removeProduct, setQuantityCallback, orderStatus: dataOrder?.order_status_id }) as any
								}
								widthCol1="5%"
								widthCol2="31%"
								widthCol3="16%"
								widthCol4="16%"
								widthCol5="16%"
								widthCol6="16%"
							/>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "flex-end",
									flexWrap: "wrap",
									marginTop: "8px"
								}}
							>
								<div
									style={{
										width: "100%",
										display: "flex",
										alignItems: "center",
										justifyContent: "flex-end"
									}}
								>
									<div
										style={{
											width: "300px",
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between"
										}}
									>
										<span>Tiền hàng (vnđ):</span>
										<span>{convertNumberWithCommas(calTotalPrice(listAddProducts).toString())}</span>
									</div>
								</div>
								<div
									style={{
										width: "100%",
										display: "flex",
										alignItems: "center",
										justifyContent: "flex-end"
									}}
								>
									<div
										style={{
											width: "300px",
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between"
										}}
									>
										<span onClick={() => console.log(listShipping)}>Phí COD (vnđ):</span>
										<span>{convertNumberWithCommas(codValue)}</span>
									</div>
								</div>
								<div
									style={{
										width: "100%",
										display: "flex",
										alignItems: "center",
										justifyContent: "flex-end"
									}}
								>
									<div
										style={{
											width: "300px",
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between"
										}}
									>
										<span>Phí vận chuyển (vnđ):</span>

										<span>{shippingFee ? convertNumberWithCommas(shippingFee?.toString()) : "-"}</span>
									</div>
								</div>
								{/* <div
									style={{
										width: "100%",
										display: "flex",
										alignItems: "center",
										justifyContent: "flex-end"
									}}
								>
									<div
										style={{
											width: "300px",
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between"
										}}
									>
										<span style={{ color: "rgb(0,117,164" }}>Chiếu khấu (vnđ):</span>
										<span>0</span>
									</div>
								</div>{" "}
								<div
									style={{
										width: "100%",
										display: "flex",
										alignItems: "center",
										justifyContent: "flex-end"
									}}
								>
									<div
										style={{
											width: "300px",
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between"
										}}
									>
										<span style={{ color: "rgb(0,117,164" }}>
											<Tooltip title={contentPromotion} open={openVoucher}>
												<span>Khuyến mãi:</span>
											</Tooltip>
										</span>
										<span>0</span>
									</div>
								</div>{" "} */}
								<div
									style={{
										width: "100%",
										display: "flex",
										alignItems: "center",
										justifyContent: "flex-end"
									}}
								>
									<div
										style={{
											width: "300px",
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											marginTop: "4px",
											paddingTop: "4px",
											borderTop: "1px solid black"
										}}
									>
										<span>Tổng tiền (vnđ):</span>
										<span style={{ fontWeight: "700" }}>
											{convertNumberWithCommas(calTotalPriceFinal(listAddProducts).toString())}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					{!dataOrder?.receive_at_store && (
						<>
							<div className="ordersPage__create__body__left__transport">
								<div style={{ display: "flex", alignItems: "center" }}>
									<h4>Thông tin vận chuyển</h4>&nbsp;&nbsp;
									{selectedPlatform === 8 && (dataOrder?.order_status_id === 1 || dataOrder?.order_status_id === 3) && (
										<div style={{ marginTop: "-8px" }}>
											<Checkbox
												checked={showShip}
												onClick={() => {
													setShowShip(!showShip);
													if (showShip) {
														setShippingFee(0);

														formCreate.setFieldsValue({
															shipping_fee: 0
														});
														let haveRemove = [...removePaymentsData];
														for (let i = 0; i < payments.length; i++) {
															if (Number(payments[i].id)) {
																haveRemove.push(payments[i].id);
															}
														}
														setRemovePaymentsData(haveRemove);
														for (let i = 0; i < payments.length; i++) {
															removePayment(payments[i]);
														}
														setPayments([]);
													}
												}}
											/>
										</div>
									)}
								</div>
								{showShip && (
									<div style={{ display: "flex", justifyContent: "space-between" }}>
										<div style={{ width: "calc(40% - 4px)" }}>
											<div className="ordersPage__create__body__left__transport__left">
												<Form.Item label="Tiền thu hộ COD (vnđ)" name="COD" style={{ width: "100%" }}>
													<InputNumber
														// disabled={!(dataOrder?.order_status_id === 1 || dataOrder?.order_status_id === 3) && true}
														disabled={true}
														className="defaultInputNumber"
														min={0}
														formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
														parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
														onChange={(e: any) => setParamsCheck({ ...paramsCheck, COD: e })}
													/>
												</Form.Item>
												<Form.Item label="Khối lượng (kg)" name="weight" style={{ width: "calc(50% - 4px)" }}>
													<InputNumber
														disabled={![1].includes(dataOrder?.order_status_id) && true}
														className="defaultInputNumber"
														min={0}
														formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
														parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
														onChange={(e: any) => setParamsCheck({ ...paramsCheck, weight: e })}
													/>
												</Form.Item>
												<Form.Item label="Chiều dài (cm)" name="length" style={{ width: "calc(50% - 4px)" }}>
													<InputNumber
														min={0}
														disabled={![1].includes(dataOrder?.order_status_id) && true}
														className="defaultInputNumber"
														formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
														parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
													/>
												</Form.Item>
												<Form.Item label="Chiều rộng (cm)" name="width" style={{ width: "calc(50% - 4px)" }}>
													<InputNumber
														min={0}
														disabled={![1].includes(dataOrder?.order_status_id) && true}
														className="defaultInputNumber"
														formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
														parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
													/>
												</Form.Item>
												<Form.Item label="Chiều cao (cm)" name="height" style={{ width: "calc(50% - 4px)" }}>
													<InputNumber
														min={0}
														disabled={![1].includes(dataOrder?.order_status_id) && true}
														className="defaultInputNumber"
														formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
														parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
													/>
												</Form.Item>
												<Form.Item label="Yêu cầu giao hàng" style={{ width: "100%" }} name="delivery_request">
													<Select
														disabled={![1].includes(dataOrder?.order_status_id) && true}
														options={deliveryRequests}
														className="defaultSelect"
														onChange={(e: any) =>
															formCreate.setFieldValue("notes", deliveryRequests.find((x: any) => x.value === e)?.label)
														}
													/>
												</Form.Item>
												<Form.Item label="Ghi chú giao hàng" style={{ width: "100%" }} name="notes">
													<Input.TextArea
														className="defaultInput"
														disabled={![1].includes(dataOrder?.order_status_id)}
													/>
												</Form.Item>
											</div>
										</div>
										<div style={{ width: "calc(60% - 4px)" }}>
											<div className="ordersPage__create__body__left__transport__right">
												<Form.Item
													label="Đơn vị vận chuyển"
													style={{ width: "100%", margin: "0" }}
													name="shipping_unit_id"
												>
													<Select
														options={listShipping}
														className="defaultSelect"
														value={selectedShipping}
														onChange={(e: any) => {
															setSelectedShipping(e);
															setActiveShipped(0);
														}}
														disabled={!(dataOrder?.order_status_id === 1 || dataOrder?.order_status_id === 3) && true}
													/>
												</Form.Item>
												{selectedShipping === 1 && (
													<>
														{listServicesByShipUnit.length > 0 && (
															<div>
																<h4 style={{ margin: "0" }}>Dịch vụ vận chuyển</h4>
																<Radio.Group
																	onChange={(e) => {
																		setSelectedDeliveryType(e.target.value);
																		formCreate.setFieldValue(
																			"delivery_service_name",
																			listServicesByShipUnit.find((x: any) => x.delivery_service_id === e.target.value)
																				?.delivery_service_name
																		);
																	}}
																	value={Number(selectedDeliveryType)}
																	disabled={
																		!(dataOrder?.order_status_id === 1 || dataOrder?.order_status_id === 3) && true
																	}
																>
																	{dataOrder?.order_status_id === 1 || dataOrder?.order_status_id === 3
																		? listServicesByShipUnit
																				.sort((a, b) => Number(b.status) - Number(a.status))
																				.map((x: any) => (
																					<Radio
																						disabled={!x.status}
																						value={x?.delivery_service_id}
																						style={{ width: "100%" }}
																					>
																						{x.delivery_service_name}
																					</Radio>
																				))
																		: listServicesByShipUnit
																				.sort((a, b) => Number(b.status) - Number(a.status))
																				.map((x: any) => (
																					<Radio
																						disabled={!x.status}
																						value={x?.delivery_service_id}
																						style={{ width: "100%" }}
																					>
																						{x.delivery_service_name}
																					</Radio>
																				))}
																</Radio.Group>
															</div>
														)}
														{listPaymentsByShipUnit.length > 0 && (
															<div style={{ marginTop: "8px" }}>
																<h4 style={{ margin: "0" }}>Hình thức thanh toán</h4>

																<Radio.Group
																	onChange={(e) => {
																		setSelectedTypeCash(e.target.value);
																		formCreate.setFieldValue(
																			"delivery_payment_method_name",
																			listPaymentsByShipUnit.find((x: any) => x.payment_method_id === e)
																				?.payment_method_name
																		);
																	}}
																	value={selectedTypeCash}
																	disabled={
																		!(dataOrder?.order_status_id === 1 || dataOrder?.order_status_id === 3) && true
																	}
																>
																	{dataOrder?.order_status_id === 1 || dataOrder?.order_status_id === 3
																		? listPaymentsByShipUnit
																				.sort((a, b) => Number(b.status) - Number(a.status))
																				.map((x: any) => (
																					<Radio
																						disabled={!x.status}
																						value={x?.payment_method_id}
																						style={{ width: "100%" }}
																					>
																						{x.payment_method_name}
																					</Radio>
																				))
																		: listPaymentsByShipUnit
																				.sort((a, b) => Number(b.status) - Number(a.status))
																				.map((x: any) => (
																					<Radio
																						disabled={!x.status}
																						value={x?.payment_method_id}
																						style={{ width: "100%" }}
																					>
																						{x.payment_method_name}
																					</Radio>
																				))}
																</Radio.Group>
															</div>
														)}
													</>
												)}
												{![1, 3].includes(Number(dataOrder.order_status_id)) ? (
													<div className="modalChooseShipper__form__option active" style={{ marginTop: "8px" }}>
														<div className="modalChooseShipper__form__option__select">
															{/* <span>{x?.service_name}</span> */}
															<span>
																{dataOrder?.shipping_fee ? convertNumberWithCommas(dataOrder?.shipping_fee) : "0"} đ
															</span>
														</div>
														<div className="modalChooseShipper__form__option__time">
															<span>Dự kiến giao hàng:&nbsp;</span>
															<span>
																{dataOrder?.delivery_expected_at
																	? ISO8601Formats(dataOrder?.delivery_expected_at)
																	: "-"}
															</span>
														</div>
														<SvgCheck style={{ transform: "scale(0.7)" }} />
													</div>
												) : (
													listTypeShipping.length > 0 &&
													listTypeShipping.map((x: any) => (
														<div
															className={`modalChooseShipper__form__option  ${
																activeShipped === x?.service_id ? "active" : ""
															}`}
															onClick={() => {
																setShippingFee(x?.total_fee || "0");

																formCreate.setFieldValue("shipping_fee", x?.total_fee);
																setActiveShipped(x?.service_id);
															}}
															style={{ marginTop: "8px" }}
														>
															<div className="modalChooseShipper__form__option__select">
																{/* <span>{x?.service_name}</span> */}
																<span>{x?.total_fee ? convertNumberWithCommas(x?.total_fee) : "0"} đ</span>
															</div>
															<div className="modalChooseShipper__form__option__time">
																<span>Dự kiến giao hàng:&nbsp;</span>
																<span>{x?.lead_time}</span>
															</div>
															{activeShipped === x?.service_id && <SvgCheck style={{ transform: "scale(0.7)" }} />}
														</div>
													))
												)}
											</div>
										</div>
									</div>
								)}
							</div>
						</>
					)}
				</div>
				<div className="ordersPage__create__body__right">
					<div className="ordersPage__create__body__right__source">
						<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
							<Form.Item name="type_order" label="Nguồn đơn hàng" style={{ margin: "0", width: "calc(50% - 4px)" }}>
								<Select
									showSearch
									filterOption={(input: any, option: any) =>
										removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
									}
									options={[
										{
											value: 1,
											label: "POS"
										},
										{
											value: 2,
											label: "Online"
										}
									]}
									className="defaultSelect"
									onChange={(e: any) => {
										setSelectedTypeOrder(e);
										if (e === 1) {
											formCreate.setFieldValue("order_source", 8);
											setSelectedPlatform(8);
										} else {
											formCreate.setFieldValue("order_source", 18268187);
											setSelectedPlatform(18268187);
										}
									}}
									disabled={[1, 2, 3, 4, 5].includes(dataOrder?.order_status_id) || true}
								/>
							</Form.Item>
							{selectedTypeOrder === 2 && (
								<Form.Item name="order_source" label="&nbsp;" style={{ margin: "0", width: "calc(50% - 4px)" }}>
									<Select
										showSearch
										filterOption={(input: any, option: any) =>
											removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
										}
										options={
											selectedTypeOrder === 2
												? platformsList.filter((x: any) => x.value !== 8)
												: [{ value: 8, label: "POS" }]
										}
										className="defaultSelect"
										onChange={(e: any) => setSelectedPlatform(e)}
										disabled={[1, 2, 3, 4, 5].includes(dataOrder?.order_status_id) || true}
									/>
								</Form.Item>
							)}
						</div>

						<h4
							style={{
								display: "flex",
								alignItems: "center",
								cursor: "pointer"
							}}
						>
							Thông tin mua hàng&nbsp;
							{filterCustomer.length === 10 && dataCustomer.b_id && false && (
								<SvgEdit
									style={{ transform: "scale(0.7)" }}
									fill="rgb(47,129,174)"
									onClick={() => handleOpenModalCustomer()}
								/>
							)}
						</h4>
						<div
							style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between" }}
						>
							<Form.Item
								name="b_phone"
								label="Số điện thoại"
								style={{ zIndex: "95", width: "calc(50% - 4px)", margin: "0 0 16px 0" }}
								rules={[
									{ required: true, message: "" },
									() => ({
										validator(_: any, value: any) {
											if (!formCreate.getFieldValue("b_phone")) {
												return Promise.reject(new Error("Không bỏ trống!"));
											} else {
												return Promise.resolve();
											}
										}
									})
								]}
							>
								<Input
									className="defaultInput"
									autoComplete="off"
									onChange={(e: any) => {
										formCreate.setFieldValue("b_phone", convertToOnlyNumber(e.target.value));

										setFilterCustomer(convertToOnlyNumber(e.target.value));
										if (e.target.value.length > 0) {
											setShowCustomers(true);
										} else {
											setShowCustomers(false);
										}
									}}
									onClick={() => setShowCustomers(false)}
									placeholder="Số điện thoại khách hàng"
									disabled={true}
								/>
							</Form.Item>
							<Form.Item
								name="b_fullname"
								label="Họ tên"
								style={{ width: "calc(50% - 4px)", margin: "0 0 16px 0" }}
								required
							>
								<Input className="defaultInput" disabled={true} />
							</Form.Item>
							{showCustomers && (dataOrder?.order_status_id === 1 || dataOrder?.order_status_id === 3) && (
								<div
									style={{
										zIndex: "95",
										position: "absolute",
										top: "calc(100% - 10px)",
										width: "100%",
										padding: "8px",
										background: "#fff",
										border: "1px solid rgb(99,99,99)",
										borderRadius: "5px"
									}}
								>
									<div
										className="center"
										style={{
											justifyContent: "flex-start",
											padding: "4px",
											background: "rgb(242,242,242)",
											color: "rgb(47,129,174)",
											cursor: "pointer"
										}}
										onClick={() => {
											setShowCustomers(false);
											handleOpenModalCustomer();
											setIsCreateCustomer(true);
											formModalCustomer.resetFields();
											formModalCustomer.setFieldsValue({
												b_phone: formCreate.getFieldValue("b_phone")
											});
											formCreate.setFieldsValue({
												b_phone: undefined,
												b_fullname: undefined
											});

											setDataCustomer({
												b_fullname: undefined,
												b_phone: undefined,
												s_fullname: undefined,
												s_province_id: undefined,
												s_province: undefined,
												s_district_id: undefined,
												s_district: undefined,
												s_ward_id: undefined,
												s_ward: undefined,
												s_address: undefined,
												s_phone: undefined,
												selected_address: undefined,
												customer_type: undefined,
												date_of_birth: undefined,
												email: undefined,
												gender: undefined,
												phone: undefined,
												fullname: undefined,
												total_point: 0
											});
										}}
									>
										<span
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												height: "16px",
												width: "16px",
												color: "white",
												background: "rgb(47,129,174)",
												borderRadius: "50%",
												marginRight: "4px"
											}}
										>
											+
										</span>
										Thêm khách hàng mới
									</div>
									{listCustomers.length > 0 &&
										listCustomers.map((customer: any) => (
											<div
												style={{ cursor: "pointer" }}
												onClick={() => {
													setFilterCustomer(customer.phone);
													formCreate.setFieldValue("b_phone", customer.phone);
													setShowCustomers(false);
												}}
											>
												{customer.phone} - {customer.fullname}
											</div>
										))}
								</div>
							)}
						</div>
						<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
							<Form.Item label="Điểm tích lũy:" style={{ width: "calc(50% - 4px)", margin: "0" }}>
								<Input
									style={{ textAlign: "right" }}
									value={dataCustomer?.total_point}
									className="defaultInputNumber"
									disabled={true}
								/>
							</Form.Item>
							<Form.Item label="Giá trị quy đổi:" style={{ width: "calc(50% - 4px)", margin: "0" }}>
								<Input
									style={{ textAlign: "right" }}
									value={
										dataCustomer?.total_point ? convertNumberWithCommas(dataCustomer?.total_point * 1000) : undefined
									}
									className="defaultInputNumber"
									disabled={true}
								/>
							</Form.Item>
						</div>
					</div>
					{showShip && (
						<div className="ordersPage__create__body__right__shipping">
							<h4 style={{ display: "flex", alignItems: "center" }}>
								Thông tin giao hàng&nbsp;
								{filterCustomer.length === 10 &&
									dataCustomer?.b_id &&
									[1, 2, 3, 4, 5].includes(dataOrder?.order_status_id) && (
										<SvgEdit
											style={{ transform: "scale(0.7)" }}
											fill="rgb(47,129,174)"
											onClick={() => {
												setOpenModalAddress(true);
											}}
										/>
									)}
							</h4>
							<div
								style={{
									padding: "4px 0",
									borderBottom: "1px solid rgb(212,212,212)",
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between"
								}}
							>
								<span style={{ minWidth: "120px" }}> Tên khách hàng:</span>
								<span style={{ textAlign: "right" }}>{dataCustomer.s_fullname}</span>
							</div>
							<div
								style={{
									padding: "4px 0",
									borderBottom: "1px solid rgb(212,212,212)",
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between"
								}}
							>
								<span> Số điện thoại:</span>
								<span>{dataCustomer.s_phone}</span>
							</div>
							<div
								style={{
									padding: "4px 0",
									borderBottom: "1px solid rgb(212,212,212)",
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between"
								}}
							>
								<span style={{ minWidth: "120px" }}>Địa chỉ:</span>
								<span style={{ textAlign: "right" }}>
									{getAddressString(
										dataCustomer?.s_address,
										dataCustomer?.s_ward,
										dataCustomer?.s_district,
										dataCustomer?.s_province
									)}
								</span>
							</div>
						</div>
					)}
					<div className="ordersPage__create__body__right__payments">
						<h4 onClick={() => console.log(payments)}>Thông tin thanh toán</h4>
						{[1].includes(dataOrder?.order_status_id) && !payments.find((x: any) => x.payment_method_id === 4) && (
							<div style={{ display: "flex", alignItems: "center" }}>
								<div style={{ minWidth: "160px", marginRight: "4px" }}>
									<Select
										value={selectedMethod}
										className="defaultSelect"
										options={paymentMethods}
										onChange={(e: any) => changeMethod(e)}
										placeholder="Chọn phương thức"
									/>
								</div>
								<div className="defaultButton" onClick={() => addPayment()} style={{ marginTop: "-6px" }}>
									<SvgIconPlus style={{ transform: "scale(0.7)" }} />
									&nbsp;Thêm
								</div>
							</div>
						)}
						{payments.length > 0 && (
							<div style={{ border: "1px solid rgb(212,212,212)", marginTop: "4px", borderRadius: "5px" }}>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										borderRadius: "5px",
										background: "rgb(242,242,242)",
										padding: "4px 2px"
									}}
								>
									<div style={{ width: "100px", fontWeight: "500" }}>Phương thức</div>
									<div style={{ width: "calc(35% - 46px)", textAlign: "center", fontWeight: "500" }}>Thời gian</div>
									<div style={{ width: "calc(30% - 46px)", textAlign: "right", fontWeight: "500" }}>Tham chiếu</div>
									<div style={{ width: "calc(35% - 46px)", textAlign: "right", fontWeight: "500" }}>Số tiền (vnđ)</div>
									<div style={{ width: "30px" }}></div>
								</div>

								{payments?.map((x: any, index: any) => (
									<>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
												padding: "4px 2px",
												borderTop: index === 0 ? "" : "1px solid rgb(212,212,212)"
											}}
										>
											<span style={{ width: "100px" }}>
												{dataPaymentMethods.find((a: any) => a.value === x.payment_method_id)?.label}
											</span>

											<span style={{ color: "rgb(156,156,156)", width: "calc(35% - 46px)", textAlign: "center" }}>
												{ISO8601Formats(x?.payment_at)}
											</span>
											<div style={{ width: "calc(30% - 46px)" }}>
												<Input
													className="defaultInput"
													disabled={!x.payment_method_id || ![1].includes(dataOrder?.order_status_id)}
													onBlur={(e: any) => changeCode(e.target.value, x)}
													defaultValue={x.payment_code}
													style={{ height: "31px", width: "100%" }}
												/>
											</div>
											<div style={{ width: "calc(35% - 46px)" }}>
												<InputNumber
													value={x.amount}
													onBlur={(e: any) => changeAmount(convertToOnlyNumber(e.target.value) || 1, x)}
													onKeyPress={(e: any) =>
														e.key === "Enter" && changeAmount(convertToOnlyNumber(e.target.value) || 1, x)
													}
													min={1}
													className="defaultInputNumber"
													formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
													parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
													disabled={
														!x.payment_method_id ||
														![1].includes(dataOrder?.order_status_id) ||
														x.payment_method_id === 4
													}
													style={{ height: "31px", width: "90%" }}
												/>
											</div>
											<div
												onClick={() => [1].includes(dataOrder?.order_status_id) && removePayment(x)}
												style={{
													cursor: "pointer",
													border: "1px solid rgb(212,212,212)",
													borderRadius: "2px",
													width: "26px",
													height: "26px",
													display: "flex",
													alignItems: "center",
													justifyContent: "center"
												}}
											>
												<SvgBin fill="rgb(212,212,212)" style={{ transform: "scale(0.9)" }} />
											</div>
										</div>
									</>
								))}
							</div>
						)}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								background: "rgb(242,242,242)",
								padding: "4px",
								borderRadius: "5px",
								marginTop: "4px"
							}}
						>
							<div>
								<span style={{ color: "rgb(156,156,156)" }}>Tổng tiền:&nbsp;</span>
								<span style={{ fontWeight: "bold" }}>
									{convertNumberWithCommas(calTotalPriceFinal(listAddProducts))}
								</span>
							</div>
							<div>
								<span style={{ color: "rgb(156,156,156)" }}>Đã thanh toán:&nbsp;</span>
								<span style={{ fontWeight: "bold" }}>
									{convertNumberWithCommas(calcTotalPayments(payments.filter((x: any) => x.payment_method_id !== 4)))}
								</span>
							</div>
							<div>
								<span style={{ color: "rgb(156,156,156)" }}> Còn phải trả:&nbsp;</span>
								<span style={{ fontWeight: "bold", color: "red" }}>
									{convertNumberWithCommas(
										calTotalPriceFinal(listAddProducts) -
											calcTotalPayments(payments.filter((x: any) => x.payment_method_id !== 4))
									)}
								</span>
							</div>
						</div>
					</div>
				</div>
			</Form>
		</div>
	);
};

export default OrdersEdit;
