import {
	Checkbox,
	DatePicker,
	Form,
	Image,
	Input,
	InputNumber,
	Modal,
	Popover,
	Select,
	Tooltip,
	Tree,
	TreeSelect
} from "antd";
import { Option } from "antd/lib/mentions";
import NoImage from "src/assets/images/no-image.jpg";
import { DataNode } from "antd/lib/tree";
import moment from "moment";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Svg138 from "src/assets/svg/\bSvg138";
import Svg100 from "src/assets/svg/Svg100";
import Svg101 from "src/assets/svg/Svg101";
import Svg162 from "src/assets/svg/Svg162";
import Svg270 from "src/assets/svg/Svg270";
import SvgBin from "src/assets/svg/SvgBin";
import SvgIcon3Dot from "src/assets/svg/SvgIcon3Dot";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import { notifySuccess, notifyWarning } from "src/components/notification";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
import SubHeader from "src/components/subHeader/SubHeader";
import TableStyledAntd from "src/components/table/TableStyled";
import { platformsList } from "src/constants";
import SellerContext from "src/context/sellerContext";
import { api } from "src/services/api/api.index";
import { API_URL, API_URL_CDN } from "src/services/api/config";
import { API_CATEGORY, API_PRODUCTS } from "src/services/api/url.index";
import colors from "src/utils/colors";
import { ISO8601Formats } from "src/utils/helpers/functions/date";
import {
	convertNumberWithCommas,
	convertToConsucutiveString2,
	geneUniqueKey,
	removeSign
} from "src/utils/helpers/functions/textUtils";
import { columnsApplyCategory, columnsApplyProduct, columnsCoupon, columnsListProduct } from "./data";

const CouponEdit = () => {
	const paramsUrl = useParams() as any;
	const [addCouponAutoForm] = Form.useForm();
	const { sellerInfo } = useContext(SellerContext) as any;
	const [formFilterTableCode] = Form.useForm();
	const [masterCategory, setMasterCategory] = useState<any[]>([]);
	const [searchValue, setSearchValue] = useState("");
	const [loadingUpdateStatus, setLoadingUpdateStatus] = useState(false);
	const [paramsFilterListProduct, setParamsFilterListProduct] = useState<any>({
		page: 1,
		limit: 5,
		status: true
	});
	const [filterProduct, setFilterProduct] = useState<any>({
		category_ids: undefined,
		q: undefined,
		limit: 10,
		page: 1
	});

	const [autoCouponCode, setAutoCouponCode] = useState<any>("");

	const [searchSelect, setSearchSelect] = useState("");
	const [fakeFilterProduct, setFakeFilterProduct] = useState<any>({ q: undefined, category_ids: undefined, array: [] });
	const [customerSource, setCustomerSource] = useState<any[]>([]);
	const [utmSource, setUtmSource] = useState<any[]>([]);
	const [visibleSource, setVisibleSource] = useState(false);
	const [visibleCustomer, setVisibleCustomer] = useState(false);
	const [defaultData, setDefaultData] = useState<any>(undefined);
	const [couponCode, setCouponCode] = useState<any>("");
	const [listCouponCode, setListCouponCode] = useState<any[]>([]);
	const [tableCode, setTableCode] = useState<any[]>([]);
	const [listProduct, setListProduct] = useState<any[]>([]);
	const [total, setTotal] = useState<any>(0);
	const [dataTableAdd, setDataTableAdd] = useState<any[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
	const [treeData, setTreeData] = useState<any[]>([]);
	const [openAddProduct, setOpenAddProduct] = useState(false);
	const [openAddCategory, setOpenAddCategory] = useState(false);
	const [openAddCouponBasic, setOpenAddCouponBasic] = useState(false);
	const [selectedAddCategories, setSelectedAddCategories] = useState<any[]>([]);
	const [formCreate] = Form.useForm();
	const [listSearchSelect, setListSearchSelect] = useState<any[]>([]);
	const [selectedDelete, setSelectedDelete] = useState<any>(undefined);
	const [removeTableAdd, setRemoveTableAdd] = useState<any[]>([]);
	const [filterTableCode, setFilterTableCode] = useState({
		q: "",
		status: undefined,
		date: undefined,
		page: 1,
		limit: 10
	});
	const [subParamsFilter, setSubParamsFilter] = useState<any>({
		page: 1,
		limit: 5,
		category_ids: [],
		q: undefined
	});
	const [openAddCouponAuto, setOpenAddCouponAuto] = useState(false);
	const [showCategory, setShowCategory] = useState(false);
	useEffect(() => {
		const getCategories = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/${API_CATEGORY}`, params)) as any;
				let fakeMaster = [];
				let data = response["data"];
				for (let i = 0; i < data?.length; i++) {
					data[i].value = data[i].category_id;
					data[i].key = data[i].category_id;
					data[i].title = data[i].category_name;
					data[i].label = data[i].category_name;
					data[i].thumbnail = data[i].category_image;

					fakeMaster.push(data[i]);
					let childrenLv1 = data[i].children || [];
					for (let j = 0; j < childrenLv1.length; j++) {
						childrenLv1[j].value = childrenLv1[j].category_id;
						childrenLv1[j].key = childrenLv1[j].category_id;
						childrenLv1[j].title = childrenLv1[j].category_name;
						childrenLv1[j].label = childrenLv1[j].category_name;
						childrenLv1[j].thumbnail = childrenLv1[j].category_image;

						fakeMaster.push(childrenLv1[j]);

						let childrenLv2 = childrenLv1[j].children || [];
						for (let k = 0; k < childrenLv2.length; k++) {
							childrenLv2[k].value = childrenLv2[k].category_id;
							childrenLv2[k].key = childrenLv2[k].category_id;
							childrenLv2[k].title = childrenLv2[k].category_name;
							childrenLv2[k].label = childrenLv2[k].category_name;
							childrenLv2[k].thumbnail = childrenLv2[k].category_image;

							fakeMaster.push(childrenLv2[k]);

							let childrenLv3 = childrenLv2[k].children || [];

							for (let m = 0; m < childrenLv3.length; m++) {
								childrenLv3[m].value = childrenLv3[m].category_id;
								childrenLv3[m].key = childrenLv3[m].category_id;
								childrenLv3[m].title = childrenLv3[m].category_name;
								childrenLv3[m].label = childrenLv3[m].category_name;
								childrenLv3[m].thumbnail = childrenLv3[m].category_image;
								fakeMaster.push(childrenLv3[m]);
							}
						}
					}
				}
				setListSearchSelect(fakeMaster);
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};
		const timer = setTimeout(() => {
			let paramsFilter = {
				limit: 10000,
				page: 1,
				status: true,
				catalog_id: sellerInfo?.catalog_id,
				q: searchSelect
			};

			getCategories(paramsFilter);
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, [sellerInfo, searchSelect]);
	const [applyFor, setApplyFor] = useState<any>(1);
	const [infoSale, setInfoSale] = useState<any>({
		discount_type: 1,
		discount_amount: 0,
		max_discount_amount: 0,
		max_used: 1,
		max_usedChecked: false,
		customer_max_usedChecked: false,
		customer_max_used: 1,
		apply_for_other_promotions: false
	});
	const [showProduct, setShowProduct] = useState(false);
	const [openDeleteCoupon, setOpenDeleteCoupon] = useState(false);

	const [visiblePopover, setVisiblePopover] = useState(false);
	const [visibleActionPopover, setVisibleActionPopover] = useState(false);
	const handleCreateCoupon = async (values?: any) => {
		if (applyFor !== 1 && dataTableAdd.length === 0) {
			if (applyFor === 2) {
				return notifyWarning("Vui lòng chọn danh mục áp dụng!");
			}
			if (applyFor === 3) {
				return notifyWarning("Vui lòng chọn sản phẩm áp dụng!");
			}
		}
		if (tableCode?.length === 0) {
			return notifyWarning("Vui lòng thêm mã giảm giá");
		}
		if (utmSource?.length === 0) {
			return notifyWarning("Vui lòng chọn nguồn đơn áp dụng");
		}
		if (customerSource?.length === 0) {
			return notifyWarning("Vui lòng chọn đối tượng áp dụng");
		}
		if (values.start_at && values.end_at && values.end_at < values.start_at) {
			return notifyWarning("Vui lòng chọn ngày kết thúc sau ngày bắt đầu");
		}
		let params = {
			...values,
			discount_type: infoSale?.discount_type,
			discount_amount: infoSale?.discount_amount,
			max_discount_amount: infoSale?.max_discount_amount,
			max_used: infoSale?.max_usedChecked ? infoSale?.max_used : 0,
			customer_max_used: infoSale?.customer_max_usedChecked ? infoSale?.customer_max_used : 0,
			apply_for_other_promotions: infoSale?.apply_for_other_promotions,
			removed_entity_ids: defaultData?.coupon_apply_type !== applyFor ? [] : removeTableAdd,
			removed_coupon_detail_ids: [],
			coupon_apply_type: applyFor,
			entities: dataTableAdd.map((x: any) => {
				return { entity_id: applyFor === 2 ? x.category_id : x.id, min_product_amount: x.value };
			}),
			coupon_details: tableCode.map((x: any) => {
				return { coupon_detail_code: x.coupon_detail_code, status: x.status };
			})
		};
		delete params.coupon_detail_codes;
		try {
			const response = (await api.put(`${API_URL}/coupons/${paramsUrl.id}`, params)) as any;
			let data = response;
			if (response?.statusCode === 200) {
				notifySuccess("Cập nhật thành công");
			}
		} catch (error: any) {
			throw new Error(error.response.data.message);
		}
	};
	useEffect(() => {
		const getCategories = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/${API_PRODUCTS}`, params)) as any;
				let data = response?.data;
				setListProduct(data);
				setTotal(response?.paging?.total);
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};
		const timer = setTimeout(() => {
			getCategories(paramsFilterListProduct);
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, [paramsFilterListProduct]);
	useEffect(() => {
		const getCouponById = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/coupons/${paramsUrl.id}`, params)) as any;
				let data = response?.data;
				setDefaultData(data);
				setApplyFor(Number(data?.coupon_apply_type));
				setTableCode(data?.coupon_details || []);
				if (Number(data?.coupon_apply_type) === 2) {
					setDataTableAdd(
						data?.coupon_applications?.map((x: any) => {
							return { ...x.category, value: x.min_product_amount };
						})
					);
				}
				if (Number(data?.coupon_apply_type) === 3) {
					setDataTableAdd(
						data?.coupon_applications?.map((x: any) => {
							return { ...x.product, value: x.min_product_amount };
						})
					);
				}
				setInfoSale({
					discount_type: data?.discount_type,
					discount_amount: data?.discount_amount,
					max_discount_amount: data?.max_discount_amount,
					max_used: data?.max_used,
					max_usedChecked: data?.max_used > 0 ? true : false,
					customer_max_usedChecked: data?.customer_max_used > 0 ? true : false,
					customer_max_used: data?.customer_max_used,
					apply_for_other_promotions: data?.apply_for_other_promotions
				});
				setUtmSource(
					data?.utm_sources?.split(",")?.map((x: any) => {
						return Number(x);
					})
				);
				setCustomerSource(
					data?.apply_for_customer_rankings?.split(",")?.map((x: any) => {
						return Number(x);
					})
				);
				formCreate.setFieldsValue({
					apply_for_customer_rankings: data?.apply_for_customer_rankings?.split(",")?.map((x: any) => {
						return Number(x);
					}),
					coupon_apply_type: data?.coupon_apply_type,
					coupon_code: data?.coupon_code,
					coupon_name: data?.coupon_name,
					description: data?.description,
					end_at: data.end_at ? moment(data.end_at, "YYYY-MM-DD HH-mm-ss") : undefined,
					order_price_from: data?.order_price_from,
					start_at: data.start_at ? moment(data.start_at, "YYYY-MM-DD HH-mm-ss") : undefined,
					status: data?.status,
					utm_sources: data?.utm_sources?.split(",")?.map((x: any) => {
						return Number(x);
					})
				});
			} catch (error: any) {
				throw new Error(error?.response?.data?.message);
			}
		};
		const timer = setTimeout(() => {
			if (!loadingUpdateStatus) {
				getCouponById();
			}
		}, 200);
		return () => {
			clearTimeout(timer);
		};
	}, [paramsUrl.id, loadingUpdateStatus]);

	useEffect(() => {
		const getCategories = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/${API_CATEGORY}`, params)) as any;
				let fakeMaster = [];
				let data = response["data"];
				for (let i = 0; i < data?.length; i++) {
					data[i].value = data[i].category_id;
					data[i].key = data[i].category_id;
					data[i].title = data[i].category_name;
					fakeMaster.push(data[i]);
					let childrenLv1 = data[i].children || [];
					for (let j = 0; j < childrenLv1.length; j++) {
						childrenLv1[j].value = childrenLv1[j].category_id;
						childrenLv1[j].key = childrenLv1[j].category_id;
						childrenLv1[j].title = childrenLv1[j].category_name;
						fakeMaster.push(childrenLv1[j]);

						let childrenLv2 = childrenLv1[j].children || [];
						for (let k = 0; k < childrenLv2.length; k++) {
							childrenLv2[k].value = childrenLv2[k].category_id;
							childrenLv2[k].key = childrenLv2[k].category_id;
							childrenLv2[k].title = childrenLv2[k].category_name;
							fakeMaster.push(childrenLv2[k]);

							let childrenLv3 = childrenLv2[k].children || [];

							for (let m = 0; m < childrenLv3.length; m++) {
								childrenLv3[m].value = childrenLv3[m].category_id;
								childrenLv3[m].key = childrenLv3[m].category_id;
								childrenLv3[m].title = childrenLv3[m].category_name;
								fakeMaster.push(childrenLv3[m]);
							}
						}
					}
				}
				setMasterCategory(fakeMaster);
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
	const handleGetCode = async () => {
		try {
			const response = (await api.get(`${API_URL}/coupons/coupon-code`)) as any;
			let data = response?.data?.coupon_code;
			if (data) {
				// let fakeArray = data.map((x: any) => {
				// 	return { key: geneUniqueKey(), coupon_detail_code: x, status: false };
				// });
				// setTableCode([...fakeArray, ...tableCode]);
				if (tableCode.find((x: any) => x.coupon_detail_code === data)) {
					handleGetCode();
				} else {
					setAutoCouponCode(data);
					notifySuccess("Thêm mã thành công");
					// setOpenAddCouponAuto(false);
					formCreate.setFieldsValue({
						coupon_code: data
					});
				}
			}
		} catch (error: any) {
			throw new Error(error.response.data.message);
		}
	};

	const handleChangeStatus = async (e: any) => {
		try {
			let params = {
				coupon_ids: [paramsUrl?.id],
				status: e
			};
			setLoadingUpdateStatus(true);

			const response = (await api.put(`${API_URL}/coupons/change-status`, params)) as any;
			let data = response;
			if (data.success) {
				notifySuccess("Đổi trạng thái chương trình thành công!");
			} else {
				notifyWarning(data?.message);
			}
			setLoadingUpdateStatus(false);
		} catch (error: any) {
			throw new Error(error.response.data.message);
		}
	};
	// const treeDataAddCategory = useEffect(() => {
	// 	const loop = (data: any) =>
	// 		searchValue?.length > 0
	// 			? data
	// 					// .filter((x: any) =>
	// 					// 	removeSign(x.category_name)?.toLowerCase()?.includes(removeSign(searchValue)?.toLowerCase())
	// 					// )
	// 					.map((item: any) => {
	// 						const title = item.category_name;
	// 						if (item.children) {
	// 							return { title, key: item.key, children: loop(item.children) };
	// 						}

	// 						return {
	// 							title,
	// 							key: item.key
	// 						};
	// 					})
	// 			: data.map((item: any) => {
	// 					const title = item.category_name;
	// 					if (item.children) {
	// 						return { title, key: item.key, children: loop(item.children) };
	// 					}

	// 					return {
	// 						title,
	// 						key: item.key
	// 					};
	// 			  });

	// 	return loop(treeData);
	// }, [searchValue]);

	const onChangeSubPaging = (page: any, pageSize: any) => {
		setSubParamsFilter({ page: page, limit: pageSize });
	};
	const handleSubmitAddCouponCode = () => {
		const checkCoupon = async () => {
			try {
				let params = {
					coupon_detail_code: couponCode
				};
				const response = (await api.post(`${API_URL}/coupons/check-detail`, params)) as any;
				let data = response?.data;
				if (data.response) {
					let check = [...listCouponCode].find((x: any) => x === couponCode);
					if (check) {
						return notifyWarning("Mã coupon đã được thêm, vui lòng nhập mã khác");
					}
					let fakeArray = [...listCouponCode];
					setListCouponCode([...fakeArray, couponCode]);
					setCouponCode("");
				} else {
					notifyWarning("Mã coupon đã tồn tại, vui lòng nhập mã khác");
				}
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};
		checkCoupon();
	};
	const handleSubmitAddListCouponCode = () => {
		let fakeListCouponCode = [...listCouponCode];
		let check = fakeListCouponCode.find((x: any) => x === autoCouponCode);
		if (check) {
			fakeListCouponCode = fakeListCouponCode.filter((x: any) => x !== autoCouponCode);
			notifyWarning(`Mã ${autoCouponCode} đã tồn tại`);
		}
		let fakeArray = fakeListCouponCode.map((x: any) => {
			return {
				id: geneUniqueKey(),
				coupon_detail_code: x,
				status: false,
				remain: infoSale.max_usedChecked ? infoSale.max_used : undefined
			};
		});
		for (let i = 0; i < tableCode.length; i++) {
			for (let j = 0; j < fakeArray.length; j++) {
				if (tableCode[i].coupon_detail_code === fakeArray[j].coupon_detail_code) {
					notifyWarning(`Mã ${tableCode[i].coupon_detail_code} đã tồn tại`);
					fakeArray = fakeArray.filter((x: any) => x.coupon_detail_code !== tableCode[i].coupon_detail_code);
				}
			}
		}
		setTableCode([...fakeArray, ...tableCode]);
		setListCouponCode([]);
		setOpenAddCouponBasic(false);
	};
	const handleDeleteCouponCode = (code: any) => {
		let fakeArray = [...listCouponCode];
		setListCouponCode(fakeArray.filter((x: any) => x !== code));
	};

	const removeCouponCode = (record: any) => {
		setSelectedDelete(record);
		setOpenDeleteCoupon(true);
	};

	const changeStatusCouponCode = (e: any, record: any) => {
		let fakeTableCode = [...tableCode];
		setTableCode(
			fakeTableCode.map((x: any) => (x.coupon_detail_code !== record.coupon_detail_code ? x : { ...x, status: e }))
		);
	};

	const handleSubmitAddCategory = (e?: any) => {
		if (e) {
			if (applyFor === 2) {
				let array = [...dataTableAdd];
				let item = [...masterCategory].find((x: any) => x.category_id === e);
				let checked = array.find((x: any) => x.category_id === e);
				if (checked) {
					return notifyWarning("Đã tồn tại danh mục");
				}
				if (item) {
					setDataTableAdd([...array, { ...item, value: 0 }]);
				} else {
					notifyWarning("Lỗi không tìm thấy danh mục");
				}
			}
			if (applyFor === 3) {
				let array = [{ ...e }];
				let checked = [...dataTableAdd].find((x: any) => x.id === e.id);
				if (checked) {
					return notifyWarning("Đã tồn tại sản phẩm");
				}
				setDataTableAdd([...array, ...dataTableAdd]);
			}
		} else {
			if (applyFor === 2) {
				let array = [...masterCategory]
					.filter((x: any) => [...selectedAddCategories].includes(x.category_id))
					.filter((x: any) => ![...dataTableAdd].find((a: any) => a.category_id === x.category_id))
					.map((y: any) => {
						return { ...y, value: 0 };
					});
				setDataTableAdd([...array, ...dataTableAdd]);
				let notifyArray = selectedAddCategories.filter((x: any) =>
					[...dataTableAdd].find((a: any) => a.category_id === x)
				);
				notifyArray.map((x: any) =>
					notifyWarning(`Đã tồn tại ${masterCategory?.find((a: any) => a.category_id === x)?.category_name}`)
				);
				setSelectedAddCategories([]);
				if (array.length > 0) {
					notifySuccess("Thêm thành công");
				}
			}
			if (applyFor === 3) {
				let array = addSelectedRows
					.filter((x: any) => ![...dataTableAdd].find((a: any) => a.id === x.id))
					.map((x: any) => {
						return { ...x, value: 0 };
					});
				let notifyArray = addSelectedRows.filter((x: any) => [...dataTableAdd].find((a: any) => a.id === x.id));
				setDataTableAdd([...array, ...dataTableAdd]);

				notifyArray.map((x: any) => notifyWarning(`Đã tồn tại ${x.product_name}`));
				if (array.length > 0) {
					notifySuccess("Thêm thành công");
				}
			}
		}
		setOpenAddProduct(false);
		setOpenAddCategory(false);
	};

	const removeAdd = (record: any) => {
		console.log(record);
		let fakeArray = [...dataTableAdd].filter((x: any) => x.id !== record.id);
		let fakeArrayRemove = [...removeTableAdd];
		if (applyFor === 2) {
			fakeArrayRemove.push(record.category_id);
		}
		if (applyFor === 3) {
			fakeArrayRemove.push(record.id);
		}
		setDataTableAdd(fakeArray);
		setRemoveTableAdd(fakeArrayRemove);
	};

	const handleChangeValue = (e: any, record: any) => {
		let fakeArray = [...dataTableAdd].map((x: any) => (x.id === record.id ? { ...x, value: e } : x));
		setDataTableAdd(fakeArray);
	};
	const [addSelectedCouponRowKeys, setAddSelectedCouponRowKeys] = useState<any[]>([]);
	const [addSelectedCouponRows, setAddSelectedCouponRows] = useState<any[]>([]);
	const [addSelectedRowKeys, setAddSelectedRowKeys] = useState<any[]>([]);
	const [addSelectedRows, setAddSelectedRows] = useState<any[]>([]);
	const rowSelection = {
		selectedRowKeys: addSelectedRowKeys,
		onSelect: (_record: any, _selected: boolean, _selectedRows: any) => {
			if (_selected) {
				setAddSelectedRowKeys([...addSelectedRowKeys, _record.id]);
				setAddSelectedRows([...addSelectedRows, _record]);
			} else {
				setAddSelectedRowKeys([...addSelectedRowKeys.filter((e: any) => e !== _record?.id)]);
				setAddSelectedRows([...addSelectedRows.filter((e: any) => e?.id !== _record?.id)]);
			}
		},
		onSelectAll: (_selected: boolean, _selectedRows: any, _changeRows: any) => {
			if (_selected) {
				let _rowkeys = _changeRows.map((e: any) => e.id);
				let _rows = _changeRows;
				setAddSelectedRowKeys([...addSelectedRowKeys, ..._rowkeys]);
				setAddSelectedRows([...addSelectedRows, ..._rows]);
			} else {
				let _rowKeys: any[] = addSelectedRowKeys;
				let _rows: any[] = addSelectedRows;
				_changeRows.forEach((e: any) => {
					_rowKeys = _rowKeys.filter((item) => item !== e.id);
					_rows = _rows.filter((item) => item?.id !== e?.id);
				});

				setAddSelectedRowKeys(_rowKeys);
				setAddSelectedRows(_rows);
			}
		}
	};

	const rowCouponSelection = {
		selectedCouponRowKeys: addSelectedCouponRowKeys,
		onSelect: (_record: any, _selected: boolean, _selectedRows: any) => {
			if (_selected) {
				setAddSelectedCouponRowKeys([...addSelectedCouponRowKeys, _record.coupon_detail_code]);
				setAddSelectedCouponRows([...addSelectedCouponRows, _record]);
			} else {
				setAddSelectedCouponRowKeys([
					...addSelectedCouponRowKeys.filter((e: any) => e !== _record?.coupon_detail_code)
				]);
				setAddSelectedCouponRows([
					...addSelectedCouponRows.filter((e: any) => e?.coupon_detail_code !== _record?.coupon_detail_code)
				]);
			}
		},
		onSelectAll: (_selected: boolean, _selectedRows: any, _changeRows: any) => {
			if (_selected) {
				let _rowkeys = _changeRows.map((e: any) => e.coupon_detail_code);
				let _rows = _changeRows;
				setAddSelectedCouponRowKeys([...addSelectedCouponRowKeys, ..._rowkeys]);
				setAddSelectedCouponRows([...addSelectedCouponRows, ..._rows]);
			} else {
				let _rowKeys: any[] = addSelectedCouponRowKeys;
				let _rows: any[] = addSelectedCouponRows;
				_changeRows.forEach((e: any) => {
					_rowKeys = _rowKeys.filter((item) => item !== e.coupon_detail_code);
					_rows = _rows.filter((item) => item?.icoupon_detail_code !== e?.coupon_detail_code);
				});

				setAddSelectedCouponRowKeys(_rowKeys);
				setAddSelectedCouponRows(_rows);
			}
		}
	};
	const checkStatus = (array: any) => {
		for (let i = 0; i < array.length; i++) {
			let status = array[i].status;
			let a = array.find((x: any) => x.status !== status);
			if (a) {
				return false;
			}
		}
		return true;
	};
	const filterCode = (array: any, q?: string, status?: any, timesCreate?: any, pageNumber?: any, limitSize?: any) => {
		let fake = [...array];

		if (q && q.length > 0) {
			fake = fake.filter((x: any) => x.coupon_detail_code.toLowerCase().includes(q.toLowerCase()));
		}
		if (status === false || status === true) {
			fake = fake.filter((x: any) => x.status === status);
		}
		if (timesCreate) {
			let start_at = new Date(moment(timesCreate[0]).format("YYYY-MM-DD") + " 00:00:00").getTime();
			let stop_at = new Date(moment(timesCreate[1]).format("YYYY-MM-DD") + " 23:59:59").getTime();

			fake = fake.filter(
				(x: any) =>
					new Date(ISO8601Formats(x.createdAt)).getTime() >= start_at &&
					new Date(ISO8601Formats(x.createdAt)).getTime() <= stop_at
			);
		}
		return fake.slice((pageNumber - 1) * 10, pageNumber * limitSize);
	};
	const handleChangeStatusListCoupon = (value: any) => {
		let fakeList = [...tableCode].map((x: any) =>
			addSelectedCouponRowKeys.includes(x.coupon_detail_code) ? { ...x, status: value } : x
		);
		let fakeListCoupon = [...addSelectedCouponRows].map((x: any) => {
			return { ...x, status: value };
		});
		setAddSelectedCouponRows(fakeListCoupon);
		setVisibleActionPopover(false);
		setTableCode(fakeList);
		notifySuccess("Đổi trạng thái coupon thành công");
	};

	const handleDeleteListCoupon = () => {
		let fakeList = [...tableCode];
		if (selectedDelete) {
			fakeList = fakeList.filter((x: any) => x?.coupon_detail_code !== selectedDelete?.coupon_detail_code);
		} else {
			fakeList = fakeList.filter((x: any) => !addSelectedCouponRowKeys.includes(x.coupon_detail_code));
		}
		setSelectedDelete(undefined);
		setTableCode(fakeList);
		setOpenDeleteCoupon(false);
		setVisibleActionPopover(false);
		setAddSelectedCouponRowKeys([]);
		setAddSelectedCouponRows([]);
		notifySuccess("Xoá coupon thành công");
	};

	const handleSubmitAddAuto = async (values: any) => {
		try {
			const response = (await api.post(`${API_URL}/coupons/coupon-detail-codes`, values)) as any;
			let data = response?.data?.coupon_detail_codes;
			let check = data.find((x: any) => x === autoCouponCode);
			if (check) {
				data = data.filter((x: any) => x !== autoCouponCode);
				notifyWarning(`Mã ${autoCouponCode} đã tồn tại`);
			}
			if (data) {
				let fakeArray = data.map((x: any) => {
					return {
						id: geneUniqueKey(),
						coupon_detail_code: x,
						status: false,
						remain: infoSale.max_usedChecked ? infoSale.max_used : undefined
					};
				});
				setTableCode([...fakeArray, ...tableCode]);
				notifySuccess("Thêm mã thành công");
				setOpenAddCouponAuto(false);
			}
		} catch (error: any) {
			throw new Error(error.response.data.message);
		}
	};
	const contentAction = () => {
		return (
			<div style={{ borderRadius: "5px", padding: "4px", width: "140px" }}>
				{!addSelectedCouponRows[0]?.status && (
					<div
						style={{
							height: "35px",
							border: "1px solid rgb(212,212,212)",
							background: "rgb(243,243,243)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
							fontWeight: "600"
						}}
						onClick={(e: any) =>
							addSelectedCouponRowKeys.length > 0
								? handleChangeStatusListCoupon(true)
								: notifyWarning("Vui lòng chọn mã giảm")
						}
					>
						Kích hoạt
					</div>
				)}
				{addSelectedCouponRows[0]?.status && (
					<div
						style={{
							marginTop: "4px",
							height: "35px",
							border: "1px solid rgb(212,212,212)",
							background: "rgb(243,243,243)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
							fontWeight: "600"
						}}
						onClick={(e: any) =>
							addSelectedCouponRowKeys.length > 0
								? handleChangeStatusListCoupon(false)
								: notifyWarning("Vui lòng chọn mã giảm")
						}
					>
						Ngừng hoạt động
					</div>
				)}
				<div
					style={{
						marginTop: "4px",
						height: "35px",
						border: "1px solid rgb(212,212,212)",
						background: "rgb(243,243,243)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						cursor: "pointer",
						fontWeight: "600"
					}}
					onClick={(e: any) =>
						addSelectedCouponRowKeys.length > 0
							? addSelectedCouponRows.find((x: any) => x.used > 0)
								? notifyWarning("Không thể xoá mã coupon đã được sử dụng")
								: setOpenDeleteCoupon(true)
							: notifyWarning("Vui lòng chọn mã giảm")
					}
				>
					Xóa
				</div>
			</div>
		);
	};

	const content = () => {
		return (
			<div style={{ borderRadius: "5px", padding: "4px", width: "140px" }}>
				<div
					style={{
						height: "35px",
						border: "1px solid rgb(212,212,212)",
						background: "rgb(243,243,243)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						cursor: "pointer",
						fontWeight: "600"
					}}
					onClick={() => {
						setOpenAddCouponBasic(true);
						setOpenAddCouponAuto(false);
					}}
				>
					Thêm thủ công
				</div>
				<div
					style={{
						marginTop: "4px",
						height: "35px",
						border: "1px solid rgb(212,212,212)",
						background: "rgb(243,243,243)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						cursor: "pointer",
						fontWeight: "600"
					}}
					onClick={() => {
						setOpenAddCouponAuto(true);
						setOpenAddCouponBasic(false);
					}}
				>
					Thêm tự động
				</div>
			</div>
		);
	};
	return (
		<div className="mainPages">
			<SubHeader
				breadcrumb={[
					{ text: "Khuyến mãi" },
					{ text: "Mã giảm giá", link: "/coupon" },
					{ text: "Chi tiết mã giảm giá" }
				]}
			/>
			<div
				style={{
					zIndex: "94",
					position: "fixed",
					top: showCategory || showProduct || visibleCustomer || visibleSource ? "0" : "-100%",
					left: "0",
					width: "100vw",
					height: "100vh"
				}}
				onClick={() => {
					setShowCategory(false);
					setShowProduct(false);
					setVisibleCustomer(false);
					setVisibleSource(false);
				}}
			></div>
			<Modal
				onCancel={() => {
					setOpenDeleteCoupon(false);
					setSelectedDelete(undefined);
				}}
				open={openDeleteCoupon}
				title={"Xóa mã giảm giá"}
				footer={null}
			>
				<div>
					{selectedDelete ? (
						<div>{selectedDelete.coupon_detail_code}</div>
					) : (
						addSelectedCouponRows.map((x: any) => (
							<div onClick={() => console.log(addSelectedCouponRows)}>{x?.coupon_detail_code}</div>
						))
					)}
				</div>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: "8px" }}>
					<div
						className="searchButton"
						onClick={() => {
							setOpenDeleteCoupon(false);
							setSelectedDelete(undefined);
						}}
					>
						Thoát
					</div>
					<div className="defaultButton" style={{ marginLeft: "8px" }} onClick={() => handleDeleteListCoupon()}>
						<SvgIconStorage style={{ transform: "scale(0.7)" }} />
						&nbsp;Đồng ý
					</div>
				</div>
			</Modal>
			<Modal
				onCancel={() => {
					addCouponAutoForm.resetFields();
					setOpenAddCouponAuto(false);
				}}
				open={openAddCouponAuto}
				title={"Thêm mã tự động"}
				footer={null}
			>
				<Form layout="vertical" form={addCouponAutoForm} id="addCouponAutoForm" onFinish={handleSubmitAddAuto}>
					<Form.Item
						name="prefix"
						label="Tiếp đầu ngữ"
						rules={[
							{
								required: true,
								message: "Vui lòng không bỏ trống!"
							}
						]}
						style={{ margin: "0 0 13px 0" }}
					>
						<Input
							className="defaultInput"
							placeholder="Nhập tối đa 10 ký tự. Ví dụ: OMS"
							onChange={(e: any) => {
								if (e.target.value === "-") {
									addCouponAutoForm.setFieldValue("prefix", "");
								}
								addCouponAutoForm.setFieldValue(
									"prefix",
									convertToConsucutiveString2(e.target.value?.slice(0, 10)).toUpperCase()
								);
							}}
						/>
					</Form.Item>
					<Form.Item
						name="character_amount"
						rules={[
							{
								required: true,
								message: "Vui lòng không bỏ trống!"
							}
						]}
						label="Số ký tự ngẫu nhiên"
						style={{ margin: "0 0 13px 0" }}
					>
						<InputNumber
							min={6}
							max={20}
							formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
							parser={(value: any) => value!.replace(/\$\s?|(\.*)/g, "")}
							className="defaultInputNumberLeft"
							placeholder="Tối thiểu là 6 - tối đa là 20. Ví dụ: 7"
						/>
					</Form.Item>
					<Form.Item
						name="suffix"
						label="Hậu tố"
						rules={[
							{
								required: true,
								message: "Vui lòng không bỏ trống!"
							}
						]}
						style={{ margin: "0 0 13px 0" }}
					>
						<Input
							className="defaultInput"
							placeholder="Nhập tối đa 10 ký tự. Ví dụ: XUAN2023"
							onChange={(e: any) => {
								if (e.target.value === "-") {
									addCouponAutoForm.setFieldValue("suffix", "");
								}
								addCouponAutoForm.setFieldValue(
									"suffix",
									convertToConsucutiveString2(e.target.value?.slice(0, 10)).toUpperCase()
								);
							}}
						/>
					</Form.Item>
					<Form.Item
						name="code_amount"
						rules={[
							{
								required: true,
								message: "Vui lòng không bỏ trống!"
							}
						]}
						label="Số lượng mã "
						style={{ margin: "0 0 13px 0" }}
					>
						<InputNumber
							min={1}
							max={1000}
							formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
							parser={(value: any) => value!.replace(/\$\s?|(\.*)/g, "")}
							className="defaultInputNumberLeft"
							placeholder="Tối đa là 1000 mã"
						/>
					</Form.Item>
				</Form>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: "8px" }}>
					<div
						className="searchButton"
						onClick={() => {
							addCouponAutoForm.resetFields();
							setOpenAddCouponAuto(false);
						}}
					>
						Thoát
					</div>
					<div className="defaultButton" style={{ marginLeft: "8px" }} onClick={() => addCouponAutoForm.submit()}>
						<SvgIconStorage style={{ transform: "scale(0.7)" }} />
						&nbsp;Lưu
					</div>
				</div>
			</Modal>

			<Modal
				onCancel={() => {
					setOpenAddCouponBasic(false);
					setCouponCode("");
					setListCouponCode([]);
				}}
				open={openAddCouponBasic}
				title={"Thêm mã thủ công"}
				footer={null}
			>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<Input
						value={couponCode}
						onChange={(e: any) => {
							if (e.target.value?.length > 30) {
								e.preventDefault();
							} else {
								if (e.target.value === "-") {
									setCouponCode("");
								} else {
									setCouponCode(convertToConsucutiveString2(e.target.value).toUpperCase());
								}
							}
						}}
						placeholder="Nhập chữ cái hoa và số - tối đa 30 ký tự"
						className="defaultInput"
					/>
					<div
						className="defaultButton"
						style={{ marginLeft: "8px" }}
						onClick={() => (couponCode.length > 1 ? handleSubmitAddCouponCode() : notifyWarning("Vui lòng nhập code!"))}
					>
						<SvgIconPlus style={{ transform: "scale(0.7)" }} />
						&nbsp;Thêm
					</div>
				</div>
				{listCouponCode?.length > 0 && (
					<>
						<div
							style={{
								marginTop: "8px"
							}}
						>
							{listCouponCode.map((x: any, index: any) => (
								<div
									style={{
										height: "32px",
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between"
									}}
								>
									<span
										style={{
											padding: "4px 9px",
											border: "solid 1px rgb(212,212,212)",
											width: "calc(100% - 40px)",
											borderTop: index === 0 ? "solid 1px rgb(212,212,212)" : "none",
											height: "100%"
										}}
									>
										{x}
									</span>
									<span
										style={{
											padding: "4px",
											border: "solid 1px rgb(212,212,212)",
											borderTop: index === 0 ? "solid 1px rgb(212,212,212)" : "none",

											borderLeft: "none",
											width: "40px",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											height: "100%"
										}}
									>
										<SvgBin
											style={{ cursor: "pointer" }}
											fill="rgb(230,44,63)"
											onClick={() => handleDeleteCouponCode(x)}
										/>
									</span>
								</div>
							))}
						</div>
						<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: "8px" }}>
							<div
								className="searchButton"
								onClick={() => {
									setCouponCode("");
									setOpenAddCouponBasic(false);
									setListCouponCode([]);
								}}
							>
								Thoát
							</div>
							<div
								className="defaultButton"
								style={{ marginLeft: "8px" }}
								onClick={() => handleSubmitAddListCouponCode()}
							>
								<SvgIconStorage style={{ transform: "scale(0.7)" }} />
								&nbsp;Lưu
							</div>
						</div>
					</>
				)}
			</Modal>
			<Modal
				onCancel={() => {
					setOpenAddCategory(false);
					setSearchValue("");
				}}
				footer={null}
				title={"Thêm danh mục áp dụng khuyến mãi"}
				open={openAddCategory}
			>
				{/* <Input
					value={searchValue}
					style={{ marginBottom: 8 }}
					placeholder="Tìm danh mục"
					className="defaultInput"
					onChange={onChangeAddCategory}
				/> */}
				<Tree
					checkable
					checkStrictly={true}
					treeData={treeData}
					onCheck={(e: any) => setSelectedAddCategories(e?.checked)}
					defaultExpandAll={true}
					checkedKeys={selectedAddCategories}
					defaultExpandParent={true}
				/>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
					<div
						className="searchButton"
						onClick={() => {
							setSelectedAddCategories([]);
							setSearchValue("");
						}}
					>
						<SvgIconRefresh style={{ transform: "scale(0.7)" }} />
						&nbsp;Làm mới
					</div>
					<div
						className="defaultButton"
						style={{ marginLeft: "8px" }}
						onClick={() =>
							selectedAddCategories.length === 0 ? notifyWarning("Vui lòng chọn danh mục") : handleSubmitAddCategory()
						}
					>
						<SvgIconPlus style={{ transform: "scale(0.7)" }} />
						&nbsp;Thêm
					</div>
				</div>
			</Modal>

			<Modal
				onCancel={() => {
					setOpenAddProduct(false);
					setSearchValue("");
					setFilterProduct({
						...filterProduct,
						page: 1,
						limit: 10,
						q: undefined,
						category_ids: undefined
					});
					setSelectedCategories([]);
				}}
				footer={null}
				width={1000}
				title={"Thêm sản phẩm áp dụng khuyến mãi"}
				open={openAddProduct}
			>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<TreeSelect
						maxTagCount={"responsive"}
						{...tProps}
						className="defaultSelect"
						filterTreeNode={(search: any, item: any) => {
							return item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
						}}
						style={{
							width: "calc(200px)",
							marginTop: "2px"
						}}
						onChange={(e: any) => {
							let fakeArray = [];
							for (let i = 0; i < e?.length; i++) {
								fakeArray.push(e[i]?.value);
							}
							setSelectedCategories(fakeArray);
							setFakeFilterProduct({ ...fakeFilterProduct, array: fakeArray, category_ids: fakeArray.join(",") });
						}}
					/>

					<div
						style={{ width: "calc(100% - 336px)", zIndex: "96" }}
						className="installStore__create__body__left__information__showProduct"
					>
						<Input
							className="defaultInput"
							onChange={(e: any) => {
								setFakeFilterProduct({ ...fakeFilterProduct, q: e.target.value });
							}}
							value={fakeFilterProduct?.q}
							placeholder="Nhập SKU, barcode, tên sản phẩm"
						/>
					</div>
					<div
						className="searchButton"
						style={{ marginTop: "2px" }}
						onClick={() => {
							setParamsFilterListProduct({
								...paramsFilterListProduct,
								page: 1,
								q: fakeFilterProduct?.q,
								category_ids: fakeFilterProduct?.category_ids
							});
						}}
					>
						Tìm kiếm
					</div>
				</div>
				<TableStyledAntd
					style={{ marginTop: "13px" }}
					rowKey="id"
					expandIconColumnIndex={-1}
					dataSource={listProduct}
					bordered
					rowSelection={rowSelection}
					pagination={false}
					columns={columnsListProduct({}) as any}
					widthCol1="50px"
					widthCol2="80px"
				/>
				<PanigationAntStyled
					style={{ marginTop: "8px" }}
					current={paramsFilterListProduct.page}
					pageSize={paramsFilterListProduct.limit}
					showSizeChanger={false}
					onChange={(page: any, limit: any) => {
						setParamsFilterListProduct({ ...paramsFilterListProduct, page: page, limit: limit });
					}}
					showTotal={() => `Tổng ${total} sản phẩm`}
					total={total}
				/>

				<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: "8px" }}>
					<div
						className="searchButton"
						onClick={() =>
							setParamsFilterListProduct({
								...paramsFilterListProduct,
								page: 1,
								q: undefined,
								category_ids: []
							})
						}
					>
						<SvgIconRefresh style={{ transform: "scale(0.7)" }} />
						&nbsp;Làm mới
					</div>
					<div
						className="defaultButton"
						style={{ marginLeft: "8px" }}
						onClick={() =>
							addSelectedRowKeys.length > 0 ? handleSubmitAddCategory() : notifyWarning("Chưa chọn sản phẩm")
						}
					>
						<SvgIconPlus style={{ transform: "scale(0.7)" }} />
						&nbsp;Thêm
					</div>
				</div>
			</Modal>
			<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						color: "#fff",
						height: "22px",
						padding: "4px 9px",
						borderRadius: "16px",
						background:
							defaultData?.status === 1
								? "rgb(64,192,118)"
								: defaultData?.status === 2
								? "rgb(47,129,174)"
								: defaultData?.status === 3
								? "rgb(139,107,39)"
								: "rgb(128,138,148)"
					}}
				>
					{defaultData?.status === 1
						? "Chưa kích hoạt"
						: defaultData?.status === 2
						? "Hoạt động"
						: defaultData?.status === 3
						? "Tạm dừng"
						: "Ngừng hoạt động"}
				</div>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					{(defaultData?.status === 1 || defaultData?.status === 3) && (
						<div
							style={{
								height: "35px",
								border: "1px solid #000",
								background: "#fff",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								cursor: "pointer",
								fontWeight: "600",
								marginRight: "8px",
								minWidth: "120px",
								borderRadius: "5px",
								padding: "4px 9px"
							}}
							onClick={(e: any) => handleChangeStatus(2)}
						>
							<Svg162 style={{ transform: "scale(0.7)" }} />
							&nbsp; Kích hoạt
						</div>
					)}
					{defaultData?.status === 2 && (
						<div
							style={{
								height: "35px",
								border: "1px solid #000",
								background: "#fff",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								cursor: "pointer",
								fontWeight: "600",
								marginRight: "8px",
								minWidth: "120px",
								borderRadius: "5px",
								padding: "4px 9px"
							}}
							onClick={(e: any) => handleChangeStatus(3)}
						>
							<Svg270 style={{ transform: "scale(0.8)" }} />
							&nbsp; Tạm dừng
						</div>
					)}
					{(defaultData?.status === 2 || defaultData?.status === 3) && (
						<div
							style={{
								height: "35px",
								border: "1px solid #000",
								background: "#fff",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								cursor: "pointer",
								fontWeight: "600",
								marginRight: "8px",
								minWidth: "120px",
								borderRadius: "5px",
								padding: "4px 9px"
							}}
							onClick={(e: any) => handleChangeStatus(4)}
						>
							<Svg100 style={{ transform: "scale(0.7)" }} />
							&nbsp; Ngừng hoạt động
						</div>
					)}
					{defaultData?.status !== 4 && (
						<div className="defaultButton" onClick={() => formCreate.submit()}>
							<SvgIconStorage style={{ transform: "scale(0.7)" }} />
							&nbsp;Lưu
						</div>
					)}
				</div>
			</div>
			<Form
				layout="vertical"
				form={formCreate}
				id="formCreate"
				onFinish={handleCreateCoupon}
				style={{ display: "flex", justifyContent: "space-between" }}
			>
				<div style={{ width: "calc(27% - 6.5px)" }}>
					<div className="contentSection">
						<Form.Item name="start_at" label="Thời gian bắt đầu" style={{ margin: "0 0 13px 0" }}>
							<DatePicker
								showTime
								disabled={defaultData?.status !== 1}
								className="defaultDate"
								disabledDate={(current) => {
									return moment().add(-1, "days") >= current;
								}}
							/>
						</Form.Item>
						<Form.Item name="end_at" label="Thời gian kết thúc" style={{ margin: "0 0 13px 0" }}>
							<DatePicker
								showTime
								disabled={defaultData?.status === 4}
								className="defaultDate"
								disabledDate={(current) => {
									return moment().add(-1, "days") >= current;
								}}
							/>
						</Form.Item>
						<h4 style={{ margin: "0" }}>Nguồn đơn hàng {utmSource.length > 0 && `( Đã chọn ${utmSource.length} )`}</h4>
						<div style={{ position: "relative" }}>
							<div
								className="searchButton"
								style={{ fontWeight: "400", border: "1px solid rgb(212,212,212)" }}
								onClick={() => setVisibleSource(!visibleSource)}
							>
								Chọn nguồn đơn
							</div>
							{visibleSource && (
								<div style={{ position: "absolute", zIndex: "99" }}>
									<Form.Item name="utm_sources">
										<Checkbox.Group
											disabled={defaultData?.status !== 1}
											onChange={(e: any) => setUtmSource(e)}
											options={platformsList}
											style={{
												background: "#fff",
												padding: "8px",
												boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
												borderRadius: "5px"
											}}
										/>
									</Form.Item>
								</div>
							)}
						</div>

						<h4 style={{ margin: "13px 0 0 0 " }}>
							Khách hàng áp dụng {customerSource.length > 0 && `( Đã chọn ${customerSource.length} )`}
						</h4>
						<div style={{ position: "relative" }}>
							<div
								className="searchButton"
								style={{ fontWeight: "400", border: "1px solid rgb(212,212,212)" }}
								onClick={() => setVisibleCustomer(!visibleCustomer)}
							>
								Chọn khách hàng
							</div>
							{visibleCustomer && (
								<div style={{ position: "absolute", width: "100%", zIndex: "99" }}>
									<Form.Item name="apply_for_customer_rankings">
										<Checkbox.Group
											disabled={defaultData?.status !== 1}
											onChange={(e: any) => setCustomerSource(e)}
											options={[
												{ label: "Thường", value: 1 },
												{ label: "Bạc", value: 2 },
												{ label: "Vàng", value: 3 },
												{ label: "Kim cương", value: 4 }
											]}
											style={{
												width: "100%",
												background: "#fff",
												padding: "8px",
												boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
												borderRadius: "5px"
											}}
										/>
									</Form.Item>
								</div>
							)}
						</div>
					</div>
				</div>
				<div style={{ width: "calc(73% - 6.5px)" }}>
					<div className="contentSection">
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<h4 style={{ margin: "0" }}>Thông tin chung</h4>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<Form.Item
								name="coupon_name"
								label="Tên đợt phát hành"
								style={{ width: "calc(70% - 4px)", margin: "0 0 13px 0" }}
								rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
							>
								<Input disabled={defaultData?.status !== 1} className="defaultInput" />
							</Form.Item>
							<Form.Item
								name="coupon_code"
								label="Mã đợt phát hành"
								style={{ width: "calc(30% - 4px)", margin: "1px 0 13px 0" }}
								rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
							>
								<Input
									addonAfter={<div style={{ height: "100%" }}>Mã tự động</div>}
									disabled
									className="defaultInputNumberAddon backgroundPrimary"
									style={{ width: "100%" }}
									onBlur={(e: any) => setAutoCouponCode(e.target.value)}
									value={autoCouponCode}
								/>
							</Form.Item>
						</div>

						<Form.Item name="description" label="Mô tả">
							<Input.TextArea
								disabled={defaultData?.status !== 1}
								className="defaultInput"
								style={{ height: "unset" }}
							/>
						</Form.Item>
					</div>
					<div className="contentSection">
						<h4 style={{ margin: "0" }}>Thông tin khuyến mãi</h4>
						<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
							<div style={{ width: "calc((100% - 16px) / 3)" }}>Loại khuyến mãi</div>
							<div style={{ width: "calc((100% - 16px) / 3)" }}>
								{infoSale.discount_type === 1 ? "Giá trị" : "Số tiền"}
							</div>
							<div style={{ width: "calc((100% - 16px) / 3)" }}>{infoSale.discount_type === 1 && "Tối đa"}</div>
						</div>
						<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
							<div
								style={{
									borderRadius: "5px",
									display: "flex",
									alignItems: "center",
									width: "calc((100% - 16px) / 3)"
								}}
							>
								<div
									style={{
										width: "120px",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										border: "1px solid rgb(212,212,212)",
										borderTopLeftRadius: "5px",
										borderBottomLeftRadius: "5px",
										borderRight: "none",
										height: "35px",
										cursor: defaultData?.status === 1 ? "pointer" : "not-allowed",
										color: infoSale.discount_type === 1 ? "#000" : "rgb(121,121,121)",
										background: infoSale.discount_type === 1 ? colors.primary_color_1_1 : "#fff"
									}}
									onClick={() =>
										defaultData?.status === 1 && setInfoSale({ ...infoSale, discount_type: 1, discount_amount: 1 })
									}
								>
									Theo %
								</div>
								<div
									style={{
										width: "120px",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										border: "1px solid rgb(212,212,212)",
										borderTopRightRadius: "5px",
										borderBottomRightRadius: "5px",
										height: "35px",
										cursor: defaultData?.status === 1 ? "pointer" : "not-allowed",
										color: infoSale.discount_type === 2 ? "#000" : "rgb(121,121,121)",
										background: infoSale.discount_type === 2 ? colors.primary_color_1_1 : "#fff"
									}}
									onClick={() =>
										defaultData?.status === 1 && setInfoSale({ ...infoSale, discount_type: 2, discount_amount: 1 })
									}
								>
									Số tiền
								</div>
							</div>
							<div style={{ width: "calc((100% - 16px) / 3)" }}>
								<InputNumber
									min={0}
									max={infoSale.discount_type === 2 ? 1000000000 : 100}
									value={infoSale.discount_amount}
									disabled={defaultData?.status !== 1}
									onChange={(e: any) => setInfoSale({ ...infoSale, discount_amount: e })}
									formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
									parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
									addonAfter={infoSale.discount_type === 1 ? "%" : "VNĐ"}
									className="defaultInputNumberAddon backgroundPrimary"
									style={{ width: "100%", maxWidth: "243px" }}
								/>
							</div>
							<div style={{ width: "calc((100% - 16px) / 3)" }}>
								{infoSale.discount_type === 1 && (
									<InputNumber
										min={0}
										max={1000000000}
										disabled={defaultData?.status !== 1}
										value={infoSale.max_discount_amount}
										onChange={(e: any) => setInfoSale({ ...infoSale, max_discount_amount: e })}
										formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
										parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
										addonAfter="VNĐ"
										className="defaultInputNumberAddon backgroundPrimary"
										style={{ width: "100%", maxWidth: "243px" }}
									/>
								)}
							</div>
						</div>
						<h4 style={{ marginTop: "8px" }}>Giới hạn sử dụng (không tick chọn nghĩa là không giới hạn)</h4>
						<div style={{ display: "flex", alignItems: "center", height: "35px" }}>
							<Checkbox
								checked={infoSale.max_usedChecked}
								disabled={defaultData?.status !== 1}
								onChange={(e: any) => setInfoSale({ ...infoSale, max_usedChecked: e.target.checked })}
								style={{ width: "300px" }}
							>
								Mỗi mã được sử dụng
							</Checkbox>
							{infoSale.max_usedChecked && (
								<InputNumber
									min={0}
									max={1000000000}
									value={infoSale.max_used}
									disabled={defaultData?.status !== 1}
									onChange={(e: any) => {
										setInfoSale({ ...infoSale, max_used: e });
										let fakeArray = [...tableCode];
										fakeArray = fakeArray.map((x: any) => {
											return { ...x, remain: e };
										});
										setTableCode(fakeArray);
									}}
									formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
									parser={(value: any) => value!.replace(/\$\s?|(\.*)/g, "")}
									addonAfter="lần"
									className="defaultInputNumberAddon backgroundPrimary"
								/>
							)}
						</div>
						<div style={{ display: "flex", alignItems: "center", marginTop: "13px", height: "35px" }}>
							<Checkbox
								checked={infoSale.customer_max_usedChecked}
								disabled={defaultData?.status !== 1}
								onChange={(e: any) => setInfoSale({ ...infoSale, customer_max_usedChecked: e.target.checked })}
								style={{ width: "300px" }}
							>
								Mỗi khách hàng được sử dụng tối đa
							</Checkbox>
							{infoSale.customer_max_usedChecked && (
								<InputNumber
									min={0}
									max={1000000000}
									value={infoSale.customer_max_used}
									disabled={defaultData?.status !== 1}
									onChange={(e: any) => setInfoSale({ ...infoSale, customer_max_used: e })}
									formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
									parser={(value: any) => value!.replace(/\$\s?|(\.*)/g, "")}
									addonAfter="lần"
									className="defaultInputNumberAddon backgroundPrimary"
								/>
							)}
						</div>
						<div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
							<Checkbox
								checked={infoSale?.apply_for_other_promotions}
								onChange={(e: any) => setInfoSale({ ...infoSale, apply_for_other_promotions: e.target.checked })}
								disabled={defaultData?.status !== 1}
							>
								Áp dụng chung với các khuyến mãi khác
							</Checkbox>
						</div>
					</div>
					<div className="contentSection">
						<h4 style={{ margin: "0" }}>Điều kiện áp dụng</h4>
						<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
							<div
								style={{
									width: "calc(50% - 8px)",
									display: "flex",
									alignItems: "center"
								}}
							>
								Đơn hàng có giá trị từ&nbsp;&nbsp;&nbsp;
								<Form.Item name="order_price_from" style={{ margin: "0" }}>
									<InputNumber
										min={0}
										max={1000000000}
										disabled={defaultData?.status !== 1}
										defaultValue={0}
										formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
										parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
										addonAfter="VNĐ"
										className="defaultInputNumberAddon backgroundPrimary"
									/>
								</Form.Item>
							</div>
							<div
								style={{
									width: "calc(50% - 8px)",
									display: "flex",
									alignItems: "center"
								}}
							>
								Áp dụng cho&nbsp;&nbsp;&nbsp;
								<Form.Item name="coupon_apply_type" style={{ margin: "0" }}>
									<Select
										disabled={defaultData?.status !== 1}
										options={[
											{ label: "Toàn bộ sản phẩm", value: 1 },
											{ label: "Danh mục", value: 2 },
											{ label: "Sản phẩm", value: 3 }
										]}
										onChange={(e: any) => {
											setApplyFor(e);
											setDataTableAdd([]);
										}}
										className="defaultSelect"
										style={{ minWidth: "240px" }}
									/>
								</Form.Item>
							</div>
						</div>
						{applyFor === 2 && (
							<div>
								{defaultData?.status === 1 && (
									<div
										style={{
											margin: "8px 0 12px 0",
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between"
										}}
									>
										<Form.Item style={{ margin: "0", width: "calc(100% - 128px)" }}>
											<div
												style={{ width: "100%", zIndex: "96" }}
												className="installStore__create__body__left__information__showProduct"
											>
												<Input
													className="defaultInput"
													placeholder="Chọn danh mục"
													onChange={(e: any) => {
														setSearchSelect(e.target.value);
														// if (e.target.value.length > 0) {
														// 	setShowCategory(true);
														// } else {
														// 	setShowCategory(false);
														// 	setListSearchSelect([]);
														// }

														setShowCategory(true);
													}}
													value={searchSelect}
													onClick={() =>
														searchSelect?.length > 0 ? setShowCategory(!showCategory) : setShowCategory(false)
													}
												/>
												{showCategory && (
													<div
														className="installStore__create__body__left__information__showProduct__table"
														style={{ width: "100%" }}
													>
														{/* <div
												className="installStore__create__body__left__information__showProduct__table__add"
												onClick={() => setOpenModalAdd(true)}
											>
												<SvgIconPlus fill="#000" />
												&nbsp;&nbsp;Thêm mới sản phẩm
											</div> */}
														{listSearchSelect?.length > 0 ? (
															listSearchSelect.map((x: any) => (
																<div
																	style={{
																		padding: "4px 8px",

																		cursor: "pointer"
																	}}
																	onClick={() => {
																		handleSubmitAddCategory(x.category_id);
																		setShowCategory(false);
																	}}
																>
																	<div
																		style={{
																			display: "flex",
																			alignItems: "center"
																		}}
																	>
																		<div>
																			<Image
																				style={{
																					height: "40px",
																					width: "auto",
																					maxWidth: "100%",
																					objectFit: "contain"
																				}}
																				alt={x?.category_image}
																				src={x?.category_image ? `${API_URL_CDN}${x?.category_image}` : NoImage}
																				preview={{ className: "modalImage" }}
																			/>
																		</div>
																		<div style={{ marginLeft: "8px" }}>{x.category_name}</div>
																	</div>
																</div>
															))
														) : (
															<div>Không có danh mục</div>
														)}
													</div>
												)}
											</div>
										</Form.Item>
										<div className="searchButton" onClick={() => setOpenAddCategory(true)}>
											Thêm
										</div>
									</div>
								)}

								<TableStyledAntd
									rowKey="category_id"
									expandIconColumnIndex={-1}
									dataSource={dataTableAdd.slice(
										(subParamsFilter.page - 1) * subParamsFilter.limit,
										subParamsFilter.page * subParamsFilter.limit
									)}
									bordered
									pagination={false}
									columns={columnsApplyCategory({ removeAdd, handleChangeValue }) as any}
									widthCol1="80px"
									widthCol3="200px"
									widthCol4="60px"
								/>
								<PanigationAntStyled
									style={{ marginTop: "8px" }}
									current={subParamsFilter.page}
									pageSize={subParamsFilter.limit}
									onChange={onChangeSubPaging}
									showTotal={() => `Tổng ${dataTableAdd?.length} danh mục`}
									total={dataTableAdd?.length}
								/>
							</div>
						)}
						{applyFor === 3 && (
							<div>
								{defaultData?.status === 1 && (
									<div
										style={{
											marginBottom: "4px",
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between"
										}}
									>
										<TreeSelect
											maxTagCount={"responsive"}
											{...tProps}
											disabled={defaultData?.status !== 1}
											className="defaultSelect"
											filterTreeNode={(search: any, item: any) => {
												return item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
											}}
											style={{
												width: "calc(200px)",
												marginTop: "2px"
											}}
											onChange={(e: any) => {
												let fakeArray = [];
												for (let i = 0; i < e?.length; i++) {
													fakeArray.push(e[i]?.value);
												}
												setSelectedCategories(fakeArray);
												setFilterProduct({ ...filterProduct, category_ids: fakeArray.join(",") });
											}}
										/>

										<div
											style={{ width: "calc(100% - 336px)", zIndex: "96" }}
											className="installStore__create__body__left__information__showProduct"
										>
											<Input
												className="defaultInput"
												disabled={defaultData?.status !== 1}
												onChange={(e: any) => {
													setFilterProduct({ ...filterProduct, q: e.target.value });
													// if (e.target.value.length > 0) {
													// 	setShowProduct(true);
													// } else {
													// 	setShowProduct(false);
													// 	setListProduct([]);
													// }

													setShowProduct(true);
												}}
												value={filterProduct?.q}
												onClick={() =>
													filterProduct?.q?.length > 0 ? setShowProduct(!showProduct) : setShowProduct(false)
												}
												placeholder="Nhập SKU, barcode, tên sản phẩm"
											/>
											{showProduct && (
												<div
													className="installStore__create__body__left__information__showProduct__table"
													style={{ width: "100%" }}
												>
													{/* <div
												className="installStore__create__body__left__information__showProduct__table__add"
												onClick={() => setOpenModalAdd(true)}
											>
												<SvgIconPlus fill="#000" />
												&nbsp;&nbsp;Thêm mới sản phẩm
											</div> */}
													{listProduct?.length > 0 ? (
														listProduct.map((x: any) => (
															<div
																style={{
																	padding: "4px 8px",
																	cursor: "pointer"
																}}
																onClick={() => {
																	handleSubmitAddCategory(x);
																	setShowProduct(false);
																}}
															>
																<div
																	style={{
																		display: "flex",
																		alignItems: "center"
																	}}
																>
																	<Image
																		style={{
																			height: "40px",
																			width: "auto",
																			maxWidth: "100%",
																			objectFit: "contain"
																		}}
																		alt={x?.thumbnail}
																		src={x?.thumbnail ? `${API_URL_CDN}${x?.thumbnail}` : NoImage}
																		preview={{ className: "modalImage" }}
																	/>
																	<div style={{ marginLeft: "8px" }}>
																		<div style={{ fontSize: "500" }}> {x.product_name}</div>
																		<div>
																			Mã sản phẩm:{x.barcode} - SKU:{x?.sku}
																		</div>
																	</div>
																</div>
															</div>
														))
													) : (
														<div>Không có sản phẩm</div>
													)}
												</div>
											)}
										</div>
										<div
											className="searchButton"
											style={{ marginTop: "2px", cursor: defaultData?.status !== 1 ? "not-allowed" : "pointer" }}
											onClick={() => {
												if (defaultData?.status !== 1) {
													return;
												}
												setOpenAddProduct(true);
												setFakeFilterProduct({
													q: undefined,
													category_ids: undefined
												});
												setFilterProduct({
													...filterProduct,
													page: 1,
													limit: 10,
													q: undefined,
													category_ids: undefined
												});
												setSelectedCategories([]);
												setShowProduct(false);
											}}
										>
											Thêm
										</div>
									</div>
								)}

								<TableStyledAntd
									rowKey="id"
									dataSource={dataTableAdd.slice(
										(subParamsFilter.page - 1) * subParamsFilter.limit,
										subParamsFilter.page * subParamsFilter.limit
									)}
									bordered
									pagination={false}
									columns={columnsApplyProduct({ defaultData, removeAdd, handleChangeValue }) as any}
									widthCol1="80px"
									widthCol3="200px"
									widthCol4="60px"
								/>
								<PanigationAntStyled
									style={{ marginTop: "8px" }}
									current={subParamsFilter.page}
									pageSize={subParamsFilter.limit}
									onChange={onChangeSubPaging}
									showTotal={() => `Tổng ${dataTableAdd?.length} sản phẩm `}
									total={dataTableAdd?.length}
								/>
							</div>
						)}
					</div>
					<div className="contentSection">
						<h4 style={{ margin: "0" }}>Danh sách coupon phát hành</h4>
						<Form
							form={formFilterTableCode}
							id="formFilterTableCode"
							onFinish={(values: any) =>
								setFilterTableCode({
									...filterTableCode,
									q: values?.q,
									date: values.date,
									status: values?.status,
									page: 1
								})
							}
							style={{ display: "flex", justifyContent: "space-between", rowGap: "20px" }}
						>
							<Form.Item name="q" style={{ margin: "0 0 13px 0", width: "calc((100% - 400px) / 3)" }}>
								<Input
									className="defaultInput"
									placeholder="Mã coupon"
									onKeyDown={(e: any) => e.key === "Enter" && formFilterTableCode.submit()}
								/>
							</Form.Item>
							<Form.Item name="date" style={{ margin: "1px 0 13px 0", width: "calc((100% - 400px) / 3)" }}>
								<DatePicker.RangePicker className="defaultDate" />
							</Form.Item>
							<Form.Item name="status" style={{ margin: "0 0 13px 0", width: "calc((100% - 400px) / 3)" }}>
								<Select
									options={[
										{ value: true, label: "Đang hoạt động" },
										{
											value: false,
											label: "Ngừng hoạt động"
										}
									]}
									className="defaultSelect"
									placeholder="Trạng thái"
								/>
							</Form.Item>

							<div className="searchButton" style={{ marginTop: "2px" }} onClick={() => formFilterTableCode.submit()}>
								<SvgIconSearch style={{ transform: "scale(0.8)" }} />
								&nbsp;Tìm kiếm
							</div>

							<Popover
								content={contentAction}
								title=""
								placement="bottom"
								trigger="click"
								open={visibleActionPopover}
								onOpenChange={(e) =>
									checkStatus(addSelectedCouponRows || [])
										? defaultData?.status !== 4 && setVisibleActionPopover(e)
										: notifyWarning("Vui lòng chỉ chọn các coupon cùng trạng thái")
								}
							>
								<div
									className="searchButton"
									style={{ marginTop: "2px", cursor: defaultData?.status !== 4 ? "pointer" : "not-allowed" }}
								>
									<Svg138 />
									&nbsp;Thao tác
								</div>
							</Popover>
							<Popover
								content={content}
								title=""
								placement="bottom"
								trigger="click"
								open={visiblePopover}
								onOpenChange={(e) => defaultData?.status !== 4 && setVisiblePopover(e)}
							>
								<div
									className="defaultButton"
									style={{ marginTop: "2px", cursor: defaultData?.status !== 4 ? "pointer" : "not-allowed" }}
								>
									<SvgIconPlus style={{ transform: "scale(0.7)" }} />
									&nbsp;Thêm coupon
								</div>
							</Popover>
						</Form>
						<TableStyledAntd
							rowKey="coupon_detail_code"
							dataSource={filterCode(
								[...tableCode],
								filterTableCode?.q,
								filterTableCode?.status,
								filterTableCode?.date,
								filterTableCode?.page,
								filterTableCode?.limit
							)}
							rowSelection={rowCouponSelection}
							bordered
							pagination={false}
							columns={columnsCoupon({ defaultData, removeCouponCode, changeStatusCouponCode }) as any}
							widthCol5="120px"
							widthCol6="60px"
						/>
						<PanigationAntStyled
							style={{ marginTop: "8px" }}
							current={filterTableCode.page}
							pageSize={filterTableCode.limit}
							showSizeChanger
							onChange={(page: any, limit: any) => {
								setFilterTableCode({ ...filterTableCode, page: page, limit: limit });
							}}
							showTotal={() =>
								`Tổng ${
									filterCode(
										[...tableCode],
										filterTableCode?.q,
										filterTableCode?.status,
										filterTableCode?.date,
										1,
										1000000000
									).length
								} mã`
							}
							total={
								filterCode(
									[...tableCode],
									filterTableCode?.q,
									filterTableCode?.status,
									filterTableCode?.date,
									1,
									1000000000
								).length
							}
						/>
					</div>
				</div>
			</Form>
		</div>
	);
};

export default CouponEdit;
