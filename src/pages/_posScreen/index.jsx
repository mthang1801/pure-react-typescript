import { DatePicker, Form, Input, InputNumber, Modal, Radio, Select, Tree, TreeSelect } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import PrintBillA4POS from "src/components/filePrint/PrintBillA4POS";
import { notifyError, notifySuccess, notifyWarning } from "src/components/notification";
import TableStyledAntd from "src/components/table/TableStyled";
import { customerTypes } from "src/constants";
import { createCustomer, updateCustomer } from "src/services/actions/customer.actions";
import { createOneOrder } from "src/services/actions/orders.actions";
import { fetchProductsList } from "src/services/actions/product.actions";
import { API_URL, API_URL_CDN } from "src/services/api/config";
import ComponentToPrintA4POS from "src/pages/print/ComponentToPrintA4POS";
import colors from "src/utils/colors";
import {
	convertNumberWithCommas,
	convertNumberWithDotChange,
	geneUniqueKey
} from "src/utils/helpers/functions/textUtils";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";
import { columnsData } from "./data";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { API_CATEGORY, API_PRODUCTS } from "src/services/api/url.index";
import { api } from "src/services/api/api.index";
import SvgNoImage from "src/assets/svg/Noimage";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import NavSearch from "src/components/navSearch/NavSearch";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import Svg0052 from "src/assets/svg/Svg0052";
import SvgFilter from "src/assets/svg/SvgFilter";
import SellerContext from "src/context/sellerContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PaymentInfo from "./components/PaymentInfo";
import ModalSale from "./components/ModalSale";
import { useReactToPrint } from "react-to-print";

const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 4000, min: 3000 },
		items: 5
	},
	desktop: {
		breakpoint: { max: 3000, min: 1920 },
		items: 6
	},
	laptop: {
		breakpoint: { max: 1919, min: 1441 },
		items: 5
	},
	laptopSmall: {
		breakpoint: { max: 1440, min: 1024 },
		items: 4
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1
	}
};

const PosScreen = () => {
	const { sellerInfo } = useContext(SellerContext);

	const dispatch = useDispatch();
	const isMount = useIsMount();
	const [formCreate] = Form.useForm();
	const [formModalCustomer] = Form.useForm();
	const history = useHistory();
	const [bills, setBills] = useState([
		{
			id: geneUniqueKey(),
			listProduct: []
		}
	]);
	const [selectedBill, setSelectedBill] = useState(undefined);
	const [listProduct, setListProduct] = useState([]);
	const [showProduct, setShowProduct] = useState(false);
	const [filterProduct, setFilterProduct] = useState("");
	const [filterCustomer, setFilterCustomer] = useState("");
	const [openModalCustomer, setOpenModalCustomer] = useState(false);
	const [openDeleteAllProduct, setOpenDeleteAllProduct] = useState(false);
	const [isCreateCustomer, setIsCreateCustomer] = useState(false);
	const [listCategory, setListCategory] = useState(1);
	const [listCustomers, setListCustomers] = useState([]);
	const [showCustomers, setShowCustomers] = useState(false);
	const [listPrices, setListPrices] = useState([]);
	const [notes, setNotes] = useState("");
	const [large, setLarge] = useState(2);
	const [total, setTotal] = useState(0);
	const [orderCreated, setOrderCreated] = useState(undefined);
	const [selectedCustomer, setSelectedCustomer] = useState({
		phone: undefined,
		name: undefined,
		total_point: 0
	});

	const [typePayment, setTypePayment] = useState(1);
	const [willConvert, setWillConvert] = useState(false);
	const [dataCustomer, setDataCustomer] = useState({
		b_fullname: undefined,
		id: undefined,
		b_phone: undefined,
		total_point: 0,
		customer_type: undefined,
		date_of_birth: undefined,
		email: undefined,
		gender: undefined,
		phone: undefined
	});
	const [applyCouponCode, setApplyCouponCode] = useState({
		code: "",
		value: 0
	});
	const [paramsFilterType2, setParamsFilterType2] = useState({
		product_level: "2,3,4",
		limit: 6,
		page: 1,
		q: undefined,
		status: true,
		category_ids: undefined,
		attribute_ids: undefined
	});
	const [paramsSearch, setParamsSearch] = useState(undefined);
	const [treeCategories, setTreeCategories] = useState([]);
	const [treeAttributes, setTreeAttributes] = useState([]);

	const [filterCategories, setFilterCategories] = useState([]);
	const [filterAttributes, setFilterAttributes] = useState([]);
	const [openCategory, setOpenCategory] = useState(false);
	const [openAttributes, setOpenAttributes] = useState(false);
	const [openSaleModal, setOpenSaleModal] = useState(false);
	const [listProductType2, setListProductType2] = useState([]);
	const { stateProductsList } = useSelector((state) => state.productReducer);
	const { stateCustomerById, stateUpdateCustomer, stateCreateCustomer } = useSelector((e) => e.customerReducer);
	const { stateCreateOneOrder } = useSelector((state) => state.ordersReducer);

	useEffect(() => {
		if (!isMount) {
			return;
		}
		if (bills.length === 1) {
			setSelectedBill(bills[0]?.id);
		}
	}, [bills]);
	useEffect(() => {
		if (isMount) return;
		const { success, data, message, isLoading, error } = stateCreateCustomer;
		if (!isLoading) {
			if (success) {
				setOpenModalCustomer(false);
				setFilterCustomer(formModalCustomer.getFieldValue("b_phone"));
				notifySuccess("Thêm khách hàng thành công!");
			} else if (success === false || error) {
				notifyError(message + "");
			}
		}
	}, [stateCreateCustomer.isLoading]);
	useEffect(() => {
		if (isMount) return;
		const { message, success, data, isLoading, error } = stateCreateOneOrder;
		if (!isLoading) {
			if (success) {
				printDataCallback({
					...orderCreated,
					order_code: data?.data?.order_code,
					created_at: data?.data?.createdAt,
					money: bills.find((x) => x.id === selectedBill)?.money || 0
				});

				// printDataCallback(orderCreated);
				notifySuccess("Tạo đơn hàng thành công");
				formModalCustomer.resetFields();
				setDataCustomer({
					b_id: undefined,
					b_fullname: undefined,
					b_phone: undefined,
					customer_type: undefined,
					date_of_birth: undefined,
					email: undefined,
					gender: undefined,
					phone: undefined,
					total_point: 0
				});
				setSelectedCustomer({ phone: undefined, name: undefined, total_point: 0 });

				setFilterCustomer("");
				setNotes("");
				let fakeBills = [...bills];
				fakeBills = fakeBills.filter((x) => x.id !== selectedBill);
				setBills(fakeBills);

				setSelectedBill(fakeBills[0]?.id);
			} else if (success === false || error) {
				notifyError(message + "");
			}
		}
	}, [stateCreateOneOrder.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { success, data, isLoading, error } = stateUpdateCustomer;
		if (!isLoading) {
			if (success) {
				setOpenModalCustomer(false);
				setFilterCustomer(formModalCustomer.getFieldValue("b_phone"));
				notifySuccess("Cập nhật thành công!");
			} else if (success === false || error) {
				notifyError(error + "");
			}
		}
	}, [stateUpdateCustomer.isLoading]);

	useEffect(() => {
		if (large === 1) {
			setParamsFilterType2({ ...paramsFilterType2, limit: 8 });
		}
		if (large === 2) {
			setParamsFilterType2({ ...paramsFilterType2, limit: 6 });
		}
		if (large === 3) {
			setParamsFilterType2({ ...paramsFilterType2, limit: 4 });
		}
	}, [large]);
	useEffect(() => {
		// Handler to call on window resize

		function handleResize() {
			// Set window width/height to state

			if (window.innerWidth >= 1920) {
				setLarge(1);
			} else if (window.innerWidth >= 1440) {
				setLarge(2);
			} else {
				setLarge(3);
			}
		}
		// Add event listener
		window.addEventListener("resize", handleResize);
		// Call handler right away so state gets updated with initial window size
		handleResize();
		// Remove event listener on cleanup
		return () => window.removeEventListener("resize", handleResize);
	}, []); // Empty array ensures that effect is only run on mount

	useEffect(() => {
		const getCustomers = async () => {
			try {
				let headers = {
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
					if (filterCustomer?.length === 10) {
						if (data?.data?.length > 0) {
							formCreate.setFieldsValue({
								b_phone: data?.data[0]?.phone,
								b_fullname: data?.data[0]?.fullname
							});
							formModalCustomer.setFieldsValue({
								customer_type: data?.data[0]?.customer_type,
								b_phone: data?.data[0]?.phone,
								b_fullname: data?.data[0]?.fullname,
								b_email: data?.data[0]?.email,
								b_dob: moment(data?.data[0]?.date_of_birth, "YYYY-MM-DD"),
								b_gender: data?.data[0]?.gender
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
						} else {
							notifyError("Số điện thoại chưa đăng ký khách hàng");
							formModalCustomer.resetFields();
							setDataCustomer({
								b_id: undefined,
								b_fullname: undefined,
								b_phone: undefined,
								customer_type: undefined,
								date_of_birth: undefined,
								email: undefined,
								gender: undefined,
								phone: undefined,
								total_point: 0
							});
						}
					}
				}
			} catch (error) {}
		};
		if (filterCustomer?.length < 7) {
			setListCustomers([]);
			formModalCustomer.resetFields();
			setDataCustomer({
				b_id: undefined,
				b_fullname: undefined,
				b_phone: undefined,
				customer_type: undefined,
				date_of_birth: undefined,
				email: undefined,
				gender: undefined,
				phone: undefined,
				total_point: 0
			});
		}
		if (filterCustomer?.length >= 7 && !stateCreateCustomer.isLoading && !stateUpdateCustomer.isLoading) {
			getCustomers();
		}
	}, [filterCustomer, stateCreateCustomer.isLoading, stateUpdateCustomer.isLoading]);

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(fetchProductsList({ status: true, q: filterProduct, page: 1, limit: 10, product_level: "2,3,4" }));
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [filterProduct]);

	useEffect(() => {
		const getCategories = async (params) => {
			try {
				const response = await api.get(`${API_URL}/${API_CATEGORY}`, params);
				let data = response?.data;
				let fakeListCate = [];
				for (let i = 0; i < data.length; i++) {
					fakeListCate.push({ ...data[i] });
					let childrenLv1 = data[i].children || [];
					for (let j = 0; j < childrenLv1.length; j++) {
						fakeListCate.push({ ...childrenLv1[j] });
						let childrenLv2 = childrenLv1[j].children || [];
						for (let k = 0; k < childrenLv2.length; k++) {
							fakeListCate.push({ ...childrenLv2[k] });
							let childrenLv3 = childrenLv2[k].children || [];

							for (let m = 0; m < childrenLv3.length; m++) {
								fakeListCate.push({ ...childrenLv3[m] });
							}
						}
					}
				}
				setListCategory(fakeListCate);
			} catch (error) {
				throw new Error(error.response.data.message);
			}
		};
		const timer = setTimeout(() => {
			let paramsFilter = {
				limit: 10000,
				catalog_id: sellerInfo?.catalog_id,
				page: 1,
				status: true
			};

			getCategories(paramsFilter);
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, [sellerInfo]);

	useEffect(() => {
		const getCategories = async (params) => {
			try {
				const response = await api.get(`${API_URL}/${API_PRODUCTS}`, params);
				let data = response?.data;
				setListProductType2(data);
				setTotal(response?.paging?.total);
			} catch (error) {
				throw new Error(error.response.data.message);
			}
		};
		const timer = setTimeout(() => {
			let paramsFilter = { ...paramsFilterType2 };

			if (
				paramsFilter?.category_ids?.length > 0 &&
				(!paramsFilter?.attribute_ids || paramsFilter?.attribute_ids?.length === 0)
			) {
				let a = paramsFilter.category_ids;

				paramsFilter.category_ids = a?.length > 0 ? a.join(",") : undefined;
				delete paramsFilter.attribute_ids;
			}
			if (
				paramsFilter?.attribute_ids?.length > 0 &&
				(!paramsFilter?.category_ids || paramsFilter?.category_ids?.length === 0)
			) {
				let a = paramsFilter.attribute_ids;
				paramsFilter.attribute_ids = a?.length > 0 ? a.join(",") : undefined;
				delete paramsFilter.category_ids;
			}
			getCategories(paramsFilter);
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, [paramsFilterType2]);

	useEffect(() => {
		let fakePrices = [];
		let money = bills.find((x) => x.id === selectedBill)?.money || 0;
		if (Number(money?.toString().replaceAll(",", "")) > 0 && willConvert) {
			if (Number(money.toString().replaceAll(",", "")) > 0 && willConvert) {
				if (Number(money.toString().replaceAll(",", "")) * 1000 <= 1000000000) {
					fakePrices.push(convertNumberWithCommas(Number(money.toString().replaceAll(",", "")) * 1000));
				}
				if (Number(money.toString().replaceAll(",", "")) * 10000 <= 1000000000) {
					fakePrices.push(convertNumberWithCommas(Number(money.toString().replaceAll(",", "")) * 10000));
				}
				if (Number(money.toString().replaceAll(",", "")) * 100000 <= 1000000000) {
					fakePrices.push(convertNumberWithCommas(Number(money.toString().replaceAll(",", "")) * 100000));
				}
			}
			fakePrices.push(
				convertNumberWithCommas(
					calTotalPrice(bills.find((x) => x.id === selectedBill)?.listProduct) - applyCouponCode?.value
				)
			);

			setListPrices(fakePrices);
		}
	}, [bills.find((x) => x.id === selectedBill)?.money, applyCouponCode]);
	useEffect(() => {
		if (bills.find((x) => x.id === selectedBill)?.listProduct?.length > 0) {
			let fakePrices = [...listPrices];
			let money = bills.find((x) => x.id === selectedBill)?.money || 0;
			if (fakePrices?.length === 0) {
				fakePrices = [];
				fakePrices.push(
					convertNumberWithCommas(
						calTotalPrice(bills.find((x) => x.id === selectedBill)?.listProduct) - applyCouponCode?.value
					)
				);
			} else {
				fakePrices = [];
				if (Number(money.toString().replaceAll(",", "")) > 0 && willConvert) {
					if (Number(money.toString().replaceAll(",", "")) * 1000 <= 1000000000) {
						fakePrices.push(convertNumberWithCommas(Number(money.toString().replaceAll(",", "")) * 1000));
					}
					if (Number(money.toString().replaceAll(",", "")) * 10000 <= 1000000000) {
						fakePrices.push(convertNumberWithCommas(Number(money.toString().replaceAll(",", "")) * 10000));
					}
					if (Number(money.toString().replaceAll(",", "")) * 100000 <= 1000000000) {
						fakePrices.push(convertNumberWithCommas(Number(money.toString().replaceAll(",", "")) * 100000));
					}
				}
				fakePrices.push(
					convertNumberWithCommas(
						calTotalPrice(bills.find((x) => x.id === selectedBill)?.listProduct) - applyCouponCode?.value
					)
				);
			}
			setListPrices(fakePrices);
		} else {
			setListPrices([]);
		}
	}, [bills, selectedBill]);

	useEffect(() => {
		if (applyCouponCode?.code?.length > 0) {
			notifyWarning("Đơn hàng có sự thay đổi vui lòng nhập lại coupon code");
		}
		setApplyCouponCode({ code: "", value: 0 });
	}, [bills.find((x) => x.id === selectedBill)?.listProduct]);
	useEffect(() => {
		const getCategories = async (params) => {
			try {
				const response = await api.get(`${API_URL}/${API_CATEGORY}`, params);
				let data = response["data"];
				for (let i = 0; i < data.length; i++) {
					data[i].value = data[i]?.category_id;
					data[i].key = data[i].category_id;
					data[i].title = data[i].category_name;
					let childrenLv1 = data[i].children || [];
					for (let j = 0; j < childrenLv1.length; j++) {
						childrenLv1[j].value = childrenLv1[j]?.category_id;
						childrenLv1[j].key = childrenLv1[j].category_id;
						childrenLv1[j].title = childrenLv1[j].category_name;
						let childrenLv2 = childrenLv1[j].children || [];
						for (let k = 0; k < childrenLv2.length; k++) {
							childrenLv2[k].value = childrenLv2[k]?.category_id;
							childrenLv2[k].key = childrenLv2[k].category_id;
							childrenLv2[k].title = childrenLv2[k].category_name;
							let childrenLv3 = childrenLv2[k].children || [];

							for (let m = 0; m < childrenLv3.length; m++) {
								childrenLv3[m].value = childrenLv3[m]?.category_id;
								childrenLv3[m].key = childrenLv3[m].category_id;
								childrenLv3[m].title = childrenLv3[m].category_name;
							}
						}
					}
				}
				setTreeCategories(data);
			} catch (error) {
				throw new Error(error.response.data.message);
			}
		};
		const timer = setTimeout(() => {
			let paramsFilter = {
				catalog_id: sellerInfo?.catalog_id,
				limit: 10000,
				page: 1,
				status: true
			};
			getCategories(paramsFilter);
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, [sellerInfo]);

	useEffect(() => {
		const getCategories = async (params) => {
			try {
				const response = await api.get(`${API_URL}/attributes?include_values=true`, params);
				let data = response["data"];
				for (let i = 0; i < data.length; i++) {
					data[i].value = data[i]?.id;
					data[i].key = data[i].attribute_code;
					data[i].title = data[i].attribute_name;
					data[i].children = [...data[i].values];
					let childrenLv1 = data[i].children || [];
					for (let j = 0; j < childrenLv1.length; j++) {
						childrenLv1[j].value = childrenLv1[j]?.id;
						childrenLv1[j].key = childrenLv1[j].id;
						childrenLv1[j].title = childrenLv1[j].value_name;
						// let childrenLv2 = childrenLv1[j].children || [];
						// for (let k = 0; k < childrenLv2.length; k++) {
						// 	childrenLv2[k].value = childrenLv2[k]?.category_id;
						// 	childrenLv2[k].key = childrenLv2[k].id;
						// 	childrenLv2[k].title = childrenLv2[k].category_name;
						// 	let childrenLv3 = childrenLv2[k].children || [];

						// 	for (let m = 0; m < childrenLv3.length; m++) {
						// 		childrenLv3[m].value = childrenLv3[m]?.category_id;
						// 		childrenLv3[m].key = childrenLv3[m].id;
						// 		childrenLv3[m].title = childrenLv3[m].category_name;
						// 	}
						// }
					}
				}
				setTreeAttributes(data);
			} catch (error) {
				throw new Error(error.response.data.message);
			}
		};
		const timer = setTimeout(() => {
			let paramsFilter = {
				limit: 10000,
				page: 1,
				status: true
			};
			getCategories(paramsFilter);
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, []);

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
	const removeBill = (values) => {
		let fakeBills = [...bills];
		fakeBills = fakeBills.filter((x) => x.id !== values.id);
		setBills(fakeBills);
		if (values.id === selectedBill) {
			setSelectedBill(fakeBills[0].id);
		}
	};

	const handleClickProduct = (value) => {
		if (Number(value.stock_quantity) === 0) {
			return notifyWarning("Sản phẩm đã hết hàng");
		}
		if (bills.length === 0) {
			let fakeBills = [...bills];
			fakeBills.push({
				id: geneUniqueKey(),
				money: 0,
				apply_coupon: "",
				coupon_value: 0,
				listProduct: [
					{
						stock_quantity: Number(value.virtual_stock_quantity),
						product_id: value.id,
						product_name: value.product_name,
						sku: value.sku,
						price: value.retail_price ? value.retail_price : 0,
						barcode: value.barcode,
						quantity: 1,
						discount: 0,
						discount_type: "1"
					}
				]
			});
			setSelectedBill(fakeBills[0].id);
			setBills(fakeBills);
		} else {
			let fakeBills = [...bills];
			let selectedBills = fakeBills.find((x) => x.id === selectedBill);
			if (selectedBills) {
				let arrayProduct = [...selectedBills.listProduct];
				let checked = arrayProduct.find((x) => x.product_id === value.id);
				if (checked) {
					setQuantityCallback(Number(checked.quantity) + 1, checked);
				} else {
					arrayProduct.push({
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
					selectedBills.listProduct = arrayProduct;
				}
			}
			fakeBills = fakeBills.map((x) => (x.id === selectedBill ? selectedBills : x));

			setBills(fakeBills);
		}

		setFilterProduct(undefined);
	};

	const removeProduct = (record) => {
		let fakeBills = [...bills];
		let selectedBills = fakeBills.find((x) => x.id === selectedBill);
		if (selectedBills) {
			let arrayProduct = [...selectedBills.listProduct];
			let checked = arrayProduct.find((x) => x.product_id === record.product_id);
			if (checked) {
				arrayProduct = arrayProduct.filter((x) => x.product_id !== record.product_id);
				selectedBills.listProduct = arrayProduct;
			} else {
				notifyWarning("Không tồn tại sản phẩm");
			}
		}
		fakeBills = fakeBills.map((x) => (x.id === selectedBill ? selectedBills : x));

		setBills(fakeBills);
	};

	const setMoney = (e) => {
		let fakeBills = [...bills];
		let selectedBills = fakeBills.find((x) => x.id === selectedBill);
		if (selectedBills) {
			selectedBills.money = e;
			fakeBills = fakeBills.map((x) => (x.id === selectedBill ? selectedBills : x));

			setBills(fakeBills);
		}
	};
	const setQuantityCallback = (value, record) => {
		if (value === 0) {
			return;
		}
		if (value > 10) {
			return notifyWarning("Tối đa 10 sản phẩm!");
		}
		console.log(value, record);
		if (value > record.stock_quantity) {
			return notifyWarning("Số lượng vượt quá tồn kho!");
		}
		let fakeBills = [...bills];
		let selectedBills = fakeBills.find((x) => x.id === selectedBill);
		if (selectedBills) {
			let arrayProduct = [...selectedBills.listProduct];
			let checked = arrayProduct.find((x) => x.product_id === record.product_id);
			if (checked) {
				checked.quantity = value;
				arrayProduct = arrayProduct.map((x) => (x.product_id === record.product_id ? checked : x));
				selectedBills.listProduct = arrayProduct;
			} else {
				notifyWarning("Không tồn tại sản phẩm");
			}
		}
		fakeBills = fakeBills.map((x) => (x.id === selectedBill ? selectedBills : x));

		setBills(fakeBills);
	};

	const handleCreateCustomer = (values) => {
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

	const calTotalPrice = (values) => {
		let total = 0;
		for (let i = 0; i < values?.length; i++) {
			total = Number(total) + Number(values[i]?.price) * Number(values[i]?.quantity);
		}

		return total;
	};

	const onSubmitCreate = () => {
		if (!dataCustomer.b_id) {
			return notifyWarning("Vui lòng chọn khách hàng!");
		}
		if (bills.find((x) => x.id === selectedBill)?.listProduct?.length === 0) {
			return notifyWarning("Vui lòng chọn ít nhất một sản phẩm!");
		}
		let money = bills.find((x) => x.id === selectedBill)?.money || 0;
		let payments = [
			{
				payment_method_id: typePayment,
				payment_method_name: typePayment === 1 ? "Tiền mặt" : typePayment === 2 ? "Chuyển khoản" : "Quẹt thẻ",
				payment_code: "",
				amount: Number(money.toString().replaceAll(",", "")),
				payment_at: moment().toDate()
			}
		];
		if (
			Number(money.toString().replaceAll(",", "")) -
				calTotalPrice(bills.find((x) => x.id === selectedBill)?.listProduct) +
				applyCouponCode.value >
			0
		) {
			payments.push({
				payment_method_id: 5,
				payment_method_name: "Tiền dư",
				payment_code: "",
				amount:
					(Number(money.toString().replaceAll(",", "")) -
						calTotalPrice(bills.find((x) => x.id === selectedBill)?.listProduct)) *
					-1,
				payment_at: moment().toDate()
			});
		}
		let pram2 = {
			platform_id: 8,
			customer_id: dataCustomer.b_id,
			b_fullname: dataCustomer?.b_fullname,
			b_phone: dataCustomer?.b_phone,
			b_email: dataCustomer?.b_email,
			b_dob: dataCustomer?.date_of_birth,
			b_gender: dataCustomer?.gender,

			receive_at_store: true,

			notes: notes,
			details: bills.find((x) => x.id === selectedBill)?.listProduct,

			platform_name: "Mua tại cửa hàng",
			coupon_code: bills.find((x) => x.id === selectedBill)?.apply_coupon,
			coupon_value: bills.find((x) => x.id === selectedBill)?.coupon_value,
			payment_details: payments
		};
		setOrderCreated(pram2);
		dispatch(createOneOrder(pram2));
	};

	const onChangeCategories = (value) => {
		setFilterCategories(value.checked);
	};

	const submitFilterCategories = () => {
		setParamsFilterType2({ ...paramsFilterType2, attribute_ids: [], category_ids: [...filterCategories], page: 1 });
		setOpenCategory(false);
		setFilterAttributes([]);
	};

	const resetFilterCategories = () => {
		setParamsFilterType2({ ...paramsFilterType2, category_ids: [], page: 1 });
		setFilterCategories([]);
		setOpenCategory(false);
	};
	const tProps = {
		treeData: [...treeCategories],
		checkedKeys: [...filterCategories],
		onCheck: onChangeCategories,
		showCheckedStrategy: TreeSelect.SHOW_ALL,
		checkStrictly: true,
		checkable: true,
		showSearch: true,
		placeholder: "Chọn danh mục",
		style: {
			width: "100%"
		}
	};

	const onChangeAttributes = (value) => {
		setFilterAttributes(value.checked);
	};

	const submitFilterAttributes = () => {
		// setParamsFilterType2({ ...paramsFilterType2, category_ids: [...filterCategories], page: 1 });
		setOpenAttributes(false);
		setParamsFilterType2({ ...paramsFilterType2, category_ids: [], attribute_ids: filterAttributes, page: 1 });
		setFilterCategories([]);
	};

	const resetFilterAttributes = () => {
		setParamsFilterType2({ ...paramsFilterType2, attribute_ids: [], page: 1 });

		setFilterAttributes([]);
		setOpenAttributes(false);
	};
	const addNewBill = () => {
		if (bills.length > 4) {
			return notifyWarning("Vui lòng tạo đối đa 5 hoá đơn trong một thời điểm");
		}
		let fakeBills = [...bills];
		fakeBills.push({ id: geneUniqueKey(), money: 0, apply_coupon: "", coupon_value: 0, listProduct: [] });
		if (fakeBills.length === 1) {
			setSelectedBill(fakeBills[0].id);
		} else {
			setSelectedBill(fakeBills[fakeBills.length - 1]?.id);
		}
		setBills(fakeBills);
	};

	const handleDeleteAllProduct = () => {
		let fakeBills = [...bills];
		fakeBills = fakeBills.map((x) => (x.id === selectedBill ? { ...x, listProduct: [] } : x));
		setBills(fakeBills);
		setOpenDeleteAllProduct(false);
	};
	const footerClickCallback = (type) => {
		switch (type) {
			case 1:
				addNewBill();
				break;
			case 2:
				setOpenDeleteAllProduct(true);
				break;
			case 3:
				setOpenSaleModal(true);
				break;

			default:
				break;
		}
	};
	const tPropsAttributes = {
		treeData: [...treeAttributes],
		checkedKeys: [...filterAttributes],
		onCheck: onChangeAttributes,
		showCheckedStrategy: TreeSelect.SHOW_ALL,
		checkStrictly: true,
		checkable: true,
		showSearch: true,
		placeholder: "Chọn thuộc tính",
		style: {
			width: "100%"
		}
	};

	const handleKeyDown = (e) => {
		switch (e.key) {
			case "F6":
				setOpenSaleModal(true);
				break;
			case "F7":
				break;

			default:
				break;
		}
	};

	const addCouponCallback = async (e) => {
		if (e.length === 0) {
			let fakeBills = [...bills];
			let selectedBills = fakeBills.find((x) => x.id === selectedBill);
			if (selectedBills) {
				selectedBills.apply_coupon = "";
				selectedBills.coupon_value = 0;
				fakeBills = fakeBills.map((x) => (x.id === selectedBill ? selectedBills : x));
			}
			setApplyCouponCode({ code: "", value: 0 });
			setBills(fakeBills);
			return;
		}
		let params = {
			code: e,
			utm_source: 8,
			order_total_amount: calTotalPrice(bills.find((x) => x.id === selectedBill)?.listProduct),
			products: bills
				.find((x) => x.id === selectedBill)
				?.listProduct?.map((x) => {
					return { id: x?.product_id, amount: x?.quantity };
				})
		};
		let fakeBills = [...bills];
		let selectedBills = fakeBills.find((x) => x.id === selectedBill);
		if (selectedBills) {
			selectedBills.apply_coupon = e;
			selectedBills.coupon_value = 0;
			fakeBills = fakeBills.map((x) => (x.id === selectedBill ? selectedBills : x));
		}
		try {
			const response = await api.post(`${API_URL}/coupons/apply-coupon`, params);
			let data = response["data"];
			if (data) {
				if (data.length === 0) {
					notifyWarning("Không có sản phẩm nào được giảm giá!");
				} else {
					let saleTotal = 0;
					let fakeItems = selectedBills.listProduct;
					for (let i = 0; i < data?.length; i++) {
						saleTotal = saleTotal + data[i]?.discount_amount;
						for (let j = 0; j < fakeItems.length; j++) {
							if (data[i]?.id === fakeItems[j].product_id) {
								fakeItems[j].discount = data[i]?.discount_amount;
							}
						}
					}
					selectedBills.apply_coupon = e;
					selectedBills.coupon_value = saleTotal;
					selectedBills.listProduct = fakeItems;
					fakeBills = fakeBills.map((x) => (x.id === selectedBill ? selectedBills : x));
					setApplyCouponCode({ code: e, value: saleTotal });
					setBills(fakeBills);
					setOpenSaleModal(false);
					notifySuccess("Áp dụng coupon thành công!");
				}
			}
		} catch (error) {
			notifyError(`${error.message}`);
		}
	};
	const [selectedOrder, setSelectedOrder] = useState([]);
	const componentRef = useRef();
	const [loadingPrint, setLoadingPrint] = useState(false);
	const printDataCallback = async (e) => {
		await setSelectedOrder([e]);
		handlePrint();
	};
	const onBeforeGetContentResolve = useRef();
	const handleOnBeforeGetContent = () => {
		return new Promise((resolve) => {
			setLoadingPrint(true);
			onBeforeGetContentResolve.current = resolve;
		});
	};

	const handlePrint = useReactToPrint({
		content: () => {
			return componentRef.current;
		},
		onBeforeGetContent: handleOnBeforeGetContent,
		onAfterPrint: () => setLoadingPrint(false),
		onPrintError: () => setLoadingPrint(false)
	});

	useEffect(() => {
		if (loadingPrint) {
			onBeforeGetContentResolve.current && onBeforeGetContentResolve?.current();
		}
	}, [loadingPrint, onBeforeGetContentResolve]);

	return (
		<div style={{ overflow: "hidden" }} tabIndex={0} onKeyDown={(e) => handleKeyDown(e)}>
			<OverlaySpinner
				open={openCategory || openAttributes}
				onClickCallback={() => {
					setOpenAttributes(false);
					setOpenCategory(false);
				}}
			/>
			<Modal
				open={openDeleteAllProduct}
				title={"Xác nhận"}
				centered
				onOk={() => handleDeleteAllProduct()}
				onCancel={() => {
					setOpenDeleteAllProduct(false);
				}}
			>
				Xác nhận xoá toàn bộ sản phẩm
			</Modal>
			<NavSearch open={openAttributes}>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<h4>Lọc theo thuộc tính</h4>
					<h4 style={{ cursor: "pointer", transform: "scale(1.5)" }} onClick={() => setOpenAttributes(false)}>
						X
					</h4>
				</div>
				<div>
					<Tree
						{...tPropsAttributes}
						className="attributeTree"
						// filterTreeNode={(search, item) => {
						// 	return item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
						// }}
					/>
					<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "4px" }}>
						<button
							className="searchButton"
							style={{ width: "calc(50% - 4px)" }}
							onClick={() => submitFilterAttributes()}
						>
							<SvgIconSearch />
							&nbsp; Tìm kiếm
						</button>
						<div className="searchButton" style={{ width: "calc(50% - 4px)" }} onClick={() => resetFilterAttributes()}>
							<SvgIconRefresh />
							&nbsp;Đặt lại
						</div>
					</div>
				</div>
			</NavSearch>
			<NavSearch open={openCategory}>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<h4>Lọc theo danh mục</h4>
					<h4 style={{ cursor: "pointer", transform: "scale(1.5)" }} onClick={() => setOpenCategory(false)}>
						X
					</h4>
				</div>
				<div>
					<Tree
						{...tProps}
						// className="defaultSelect"
						// filterTreeNode={(search, item) => {
						// 	return item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
						// }}
					/>
					<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "4px" }}>
						<button
							className="searchButton"
							style={{ width: "calc(50% - 4px)" }}
							onClick={() => submitFilterCategories()}
						>
							<SvgIconSearch />
							&nbsp; Tìm kiếm
						</button>
						<div className="searchButton" style={{ width: "calc(50% - 4px)" }} onClick={() => resetFilterCategories()}>
							<SvgIconRefresh />
							&nbsp;Đặt lại
						</div>
					</div>
				</div>
			</NavSearch>
			<Modal
				open={openModalCustomer}
				title={"Thông tin khách hàng"}
				footer={null}
				centered
				onCancel={() => {
					setOpenModalCustomer(false);
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
					<Form.Item label="Họ tên" style={{ width: "calc(50% - 4px)", margin: "0 0 13px 0" }} name="b_fullname">
						<Input className="defaultInput" />
					</Form.Item>
					<Form.Item label="Số điện thoại" style={{ width: "calc(50% - 4px)", margin: "0 0 13px 0" }} name="b_phone">
						<Input className="defaultInput" />
					</Form.Item>
					<Form.Item label="Ngày sinh" style={{ width: "calc(50% - 4px)", margin: "0 0 13px 0" }} name="b_dob">
						<DatePicker style={{ width: "100%" }} className="defaultInput" />
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
					<Form.Item label="Email" style={{ width: "calc(50% - 4px)", margin: "0 0 13px 0" }} name="b_email">
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
			<ModalSale
				openSaleModal={openSaleModal}
				setOpenSaleModal={setOpenSaleModal}
				addCouponCallback={addCouponCallback}
			/>
			<Header
				history={history}
				filterProduct={filterProduct}
				setFilterProduct={setFilterProduct}
				showProduct={showProduct}
				setShowProduct={setShowProduct}
				listProduct={listProduct}
				setListProduct={setListProduct}
				bills={bills}
				removeBill={removeBill}
				selectedBill={selectedBill}
				setSelectedBill={setSelectedBill}
				handleClickProduct={handleClickProduct}
				addNewBill={addNewBill}
			/>
			<div
				style={{
					background: "rgb(237,240,243)",
					display: "flex",
					justifyContent: "space-between",
					marginTop: "54px",
					height: "calc(100vh - 110px)",
					width: "100%"
				}}
			>
				<div style={{ width: "65%", height: "100%", padding: "8px", position: "relative" }}>
					<TableStyledAntd
						style={{ marginTop: "8px", padding: "8px", background: "#fff", zIndex: 1 }}
						rowKey="product_id"
						dataSource={bills.find((x) => x.id === selectedBill)?.listProduct}
						bordered
						scroll={{ y: "calc(100vh - 470px)" }}
						pagination={false}
						loading={false}
						columns={columnsData({ removeProduct, setQuantityCallback })}
						widthCol1="60px"
						widthCol3="100px"
						widthCol4="120px"
						widthCol5="100px"
						widthCol6="140px"
						widthCol7="40px"
					/>
					<PaymentInfo
						saleValue={bills.find((x) => x.id === selectedBill)?.coupon_value}
						filterCustomer={filterCustomer}
						setFilterCustomer={setFilterCustomer}
						showCustomers={showCustomers}
						setShowCustomers={setShowCustomers}
						setOpenModalCustomer={setOpenModalCustomer}
						setIsCreateCustomer={setIsCreateCustomer}
						formModalCustomer={formModalCustomer}
						formCreate={formCreate}
						listCustomers={listCustomers}
						selectedCustomer={selectedCustomer}
						setSelectedCustomer={setSelectedCustomer}
						notes={notes}
						setNotes={setNotes}
						bills={bills}
						selectedBill={selectedBill}
						onSubmitCreate={onSubmitCreate}
						money={bills.find((x) => x.id === selectedBill)?.money}
						setMoney={setMoney}
						setTypePayment={setTypePayment}
						setWillConvert={setWillConvert}
						listPrices={listPrices}
					/>
				</div>
				<div
					style={{
						background: colors.neutral_color_1_8,
						width: "35%",
						height: "calc(100% - 10px)",
						padding: "16px",
						position: "relative"
					}}
				>
					<div
						style={{
							marginTop: "-8px",
							marginBottom: "4px",
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-end"
						}}
					>
						<div
							onClick={() => setOpenCategory(true)}
							style={{
								border: "1px solid rgb(212,212,212)",
								borderRadius: "2px",
								width: "28px",
								height: "28px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								marginRight: "8px",
								cursor: "pointer"
							}}
						>
							<Svg0052 style={{ transform: "scale(0.6)" }} />
						</div>
						<div
							onClick={() => setOpenAttributes(true)}
							style={{
								border: "1px solid rgb(212,212,212)",
								borderRadius: "2px",
								width: "28px",
								height: "28px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								cursor: "pointer"
							}}
						>
							<SvgFilter style={{ transform: "scale(0.6)" }} />
						</div>
					</div>

					{(!paramsFilterType2?.attribute_ids || paramsFilterType2?.attribute_ids?.length === 0) && (
						<>
							<Carousel responsive={responsive}>
								{listCategory &&
									listCategory.length > 0 &&
									listCategory.map((x, index) => (
										<div
											style={{
												padding: "4px",
												display: "flex",
												flexDirection: "column",
												position: "relative",
												width: "100px",
												height: "100px",
												border: "1px solid rgb(212,212,212)",
												borderRadius: "5px",
												alignItems: "center",
												justifyContent: "center",
												cursor: "pointer",
												overflow: "hidden",
												background:
													paramsFilterType2?.category_ids?.length > 0 &&
													paramsFilterType2?.category_ids?.includes(x.category_id)
														? "rgba(212, 212, 212, 0.6)"
														: "none"
											}}
											onClick={() => {
												let fakeArray =
													paramsFilterType2?.category_ids?.length > 0 ? [...paramsFilterType2?.category_ids] : [];
												let checked = fakeArray.find((a) => a === x.category_id);
												if (checked) {
													fakeArray = fakeArray.filter((a) => a !== x.category_id);
												} else {
													fakeArray.push(x.category_id);
												}
												setParamsFilterType2({ ...paramsFilterType2, category_ids: fakeArray, page: 1 });
											}}
										>
											<div
												style={{
													position: "absolute",
													top: "0",
													width: "100%",
													background: "#fff",
													height: "60px"
												}}
											>
												<img
													src={`${API_URL_CDN}${x.category_image}`}
													alt={x.category_image}
													style={{
														position: "absolute",
														width: "60px",
														height: "60px",
														left: "50%",
														transform: "translateX(-50%)",
														objectFit: "cover"
													}}
												/>
											</div>
											<div
												style={{
													textAlign: "center",
													position: "absolute",
													top: "62px",
													fontSize: "12px",
													lineHeight: "15px",
													padding: "0 4px"
												}}
											>
												{x.category_name}
											</div>
										</div>
									))}
							</Carousel>

							<h4 style={{ margin: "8px 0 0 0 " }}>Sản phẩm</h4>
							<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
								<Input
									placeholder="Tên sản phẩm, barcode"
									className="defaultInput"
									onChange={(e) => setParamsSearch(e.target.value)}
									style={{ width: "calc(100% - 248px)" }}
								/>
								<div
									className="searchButton"
									onClick={() => setParamsFilterType2({ ...paramsFilterType2, q: paramsSearch })}
								>
									<SvgIconSearch style={{ transform: "scale(0.7)" }} />
									&nbsp;Tìm kiếm
								</div>
								<div
									className="searchButton"
									onClick={() =>
										setParamsFilterType2({
											...paramsFilterType2,
											page: 1,
											q: undefined,
											status: true,
											category_ids: undefined,
											attribute_ids: undefined
										})
									}
								>
									<SvgIconRefresh style={{ transform: "scale(0.7)" }} />
									&nbsp;Đặt lại
								</div>
							</div>
							<div
								style={{
									marginTop: "8px",
									display: "flex",
									alignItems: "center",
									justifyContent: "flex-start",
									flexWrap: "wrap"
								}}
							>
								{listProductType2.length > 0 ? (
									listProductType2.map((x) => (
										<div
											style={{
												padding: "8px",
												display: "flex",
												flexDirection: "column",
												width:
													large === 1
														? "calc(25% - 4px)"
														: large === 2
														? "calc((100%  /3) - 4px )"
														: "calc((100%  /2) - 4px )",
												marginBottom: "4px",
												marginRight: "4px",
												border: "1px solid rgb(212,212,212)",
												borderRadius: "5px",
												alignItems: "center",
												justifyContent: "center",
												cursor: "pointer"
											}}
											onClick={() => handleClickProduct(x)}
										>
											<img
												style={{ height: "80px", width: "auto", objectFit: "cover" }}
												alt={x?.thumbnail}
												src={`${API_URL_CDN}${x?.thumbnail}`}
											/>
											<p className="breakTwoLine" style={{ height: "30px", fontWeight: "600", margin: "8px 0 4px 0" }}>
												{x?.product_name}
											</p>
											<div
												style={{
													width: "100%",
													display: "flex",
													alignItems: "center",
													justifyContent: "space-between"
												}}
											>
												<p style={{ fontWeight: "600", margin: "0" }}>
													{x?.retail_price ? convertNumberWithCommas(x?.retail_price) : "-"}đ
												</p>
												<p style={{ margin: "0" }}>
													Tồn:{x?.virtual_stock_quantity ? convertNumberWithDotChange(x?.virtual_stock_quantity) : "-"}
												</p>
											</div>
										</div>
									))
								) : (
									<div style={{ height: "100px", width: "100%" }}>Không có sản phẩm nào!</div>
								)}
							</div>
							{listProductType2.length > 0 && (
								<PanigationAntStyled
									style={{ marginTop: "8px" }}
									current={paramsFilterType2.page}
									pageSize={paramsFilterType2.limit}
									onChange={(a, b) => setParamsFilterType2({ ...paramsFilterType2, page: a })}
									total={total}
								/>
							)}
						</>
					)}
				</div>
			</div>
			<Footer
				footerClickCallback={footerClickCallback}
				listProduct={[...bills].find((x) => x.id === selectedBill)?.listProduct || []}
			/>
			<div style={{ position: "fixed", top:"100%",opacity: "0", zIndex: "102" }}>
				<ComponentToPrintA4POS ref={componentRef} setLoaded={setLoadingPrint}>
					<PrintBillA4POS selectedOrders={selectedOrder} />
				</ComponentToPrintA4POS>
			</div>
		</div>
	);
};

export default PosScreen;
