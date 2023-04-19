import { Checkbox, DatePicker as DatePicker1, Form, Input, InputNumber, Select, TreeSelect } from "antd";
import DatePicker from "react-multi-date-picker";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import { notifySuccess, notifyWarning } from "src/components/notification";
import SubHeader from "src/components/subHeader/SubHeader";
import { platformsList } from "src/constants";
import SellerContext from "src/context/sellerContext";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import { API_CATEGORY, API_PRODUCTS } from "src/services/api/url.index";
import { convertNumberWithCommas, geneUniqueKey, removeSign } from "src/utils/helpers/functions/textUtils";
import ApplyForType1 from "../components/ApplyForType1";
import ApplyForType2 from "../components/ApplyForType2";
import ApplyForType3 from "../components/ApplyForType3";
import ApplyForType4 from "../components/ApplyForType4";
import ApplyForType5 from "../components/ApplyForType5";

const SaleCreate = () => {
	const { sellerInfo } = useContext(SellerContext) as any;
	const history = useHistory();
	const [visibleSource, setVisibleSource] = useState(false);
	const [visibleCustomer, setVisibleCustomer] = useState(false);
	const [visibleMonday, setVisibleMonday] = useState(false);
	const [visibleMonth, setVisibleMonth] = useState(false);
	const [customerSource, setCustomerSource] = useState<any[]>([]);
	const [utmSource, setUtmSource] = useState<any[]>([]);
	const [mondaySource, setMondaySource] = useState<any[]>([]);
	const [monthSource, setMonthSource] = useState<any[]>([]);

	const [includeDays, setIncludeDays] = useState<any[]>([]);
	const [notIncludeDays, setNotIncludeDays] = useState<any[]>([]);

	const [advanButton, setAdvanButton] = useState(false);

	const [entityList, setEntityList] = useState<any[]>([]);
	const [masterCategory, setMasterCategory] = useState<any[]>([]);
	const [paramsFilterListProduct, setParamsFilterListProduct] = useState<any>({
		page: 1,
		limit: 5,
		status: true
	});
	const [showProduct, setShowProduct] = useState(false);

	const [listProduct, setListProduct] = useState<any[]>([]);
	const [total, setTotal] = useState<any>(0);
	const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
	const [treeData, setTreeData] = useState<any[]>([]);
	const [filterProduct, setFilterProduct] = useState<any>({
		category_ids: undefined,
		q: undefined,
		limit: 10,
		page: 1
	});
	const [filterTableCode, setFilterTableCode] = useState({
		q: "",
		status: undefined,
		date: undefined,
		page: 1,
		limit: 10
	});
	const [formCreate] = Form.useForm();

	const [applyFor, setApplyFor] = useState<any>(1);
	const [applyAll, setApplyAll] = useState<any>(false);
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
			getCategories({ ...filterProduct, ...paramsFilterListProduct });
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, [paramsFilterListProduct, filterProduct]);
	const handleCreateCoupon = async (values?: any) => {
		if (entityList.length === 0) {
			return notifyWarning("Vui lòng chọn đối tượng áp dụng");
		}
		if (values.start_date && values.end_date && values.end_date < values.start_date) {
			return notifyWarning("Vui lòng chọn ngày kết thúc sau ngày bắt đầu");
		}
		let paramsEntity = [...entityList];
		if (applyFor === 1) {
			paramsEntity = paramsEntity.map((x: any) => {
				return { ...x, entity_id: undefined };
			});
			paramsEntity[0].details = paramsEntity[0].details.map((x: any) => {
				return { ...x, id: undefined };
			});
		}
		if (applyFor === 2 || applyFor === 3) {
			paramsEntity = paramsEntity.map((x: any) => {
				return {
					...x,
					details: x.details.map((item: any) => {
						return {
							quantity_from: item?.quantity_from,
							quantity_to: item?.quantity_to,

							max_use_quantity: item?.max_use_quantity,
							discount_amount: item?.discount_amount,
							discount_type: item?.discount_type
						};
					})
				};
			});
		}
		if (applyFor === 4 || applyFor === 5) {
			paramsEntity = paramsEntity.map((x: any) => {
				return {
					...x,
					details: x.details.map((item: any) => {
						return {
							quantity_from: item?.quantity_from,
							quantity_to: item?.quantity_to,
							discount_amount: item?.discount_amount,
							discount_type: item?.discount_type
						};
					})
				};
			});
		}
		let params = {
			program_code: values?.program_code,
			program_name: values?.program_name,
			description: values?.description,
			max_use_quantity: values?.max_use_quantity,
			start_date: values?.start_date ? moment(values?.start_date).format("YYYY-MM-DD") : undefined,
			end_date: values?.end_date ? moment(values?.end_date).format("YYYY-MM-DD") : undefined,
			start_at: values?.start_at ? moment(values?.start_at).format("HH:mm:ss") : undefined,
			end_at: values?.end_at ? moment(values?.end_at).format("HH:mm:ss") : undefined,
			days_of_week: mondaySource,
			days_of_month: undefined,
			months_of_year: monthSource,
			apply_method: applyFor,
			customer_rankings: customerSource,
			utm_sources: utmSource,
			apply_all_products: applyAll,
			include_dates: includeDays.length > 0 ? includeDays.join(",") : [],
			not_include_dates: notIncludeDays.length > 0 ? notIncludeDays.join(",") : [],
			entities: paramsEntity
		};
		try {
			const response = (await api.post(`${API_URL}/promotions`, params)) as any;
			let success = response["success"];
			if (success) {
				notifySuccess("Tạo thành công");
				history.push("/sale-manage");
			}
		} catch (error: any) {
			notifyWarning(`${error.message}`);
			throw new Error(error.response.data.message);
		}
	};
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
				notifySuccess("Thêm mã thành công");
				// setOpenAddCouponAuto(false);
				formCreate.setFieldsValue({
					program_code: data
				});
			}
		} catch (error: any) {
			throw new Error(error.response.data.message);
		}
	};

	const handleChangeValueFrom = (record: any, value: any, recordParent?: any) => {
		let fakeEntity = [...entityList];
		if (applyFor === 1) {
			fakeEntity[0].details = fakeEntity[0].details.map((x: any) =>
				x.id === record.id ? { ...x, total_price_from: value } : x
			);
			setEntityList(fakeEntity);
		} else {
			let fakeItem = fakeEntity.find((x: any) => x.entity_id === recordParent.entity_id);

			if (fakeItem) {
				fakeItem.details = fakeItem.details.map((x: any) => (x.id === record.id ? { ...x, quantity_from: value } : x));
			}
			fakeEntity = fakeEntity.map((x: any) => (x.entity_id === recordParent.entity_id ? fakeItem : x));
			setEntityList(fakeEntity);
		}
	};

	const handleChangeValueTo = (record: any, value: any, recordParent?: any) => {
		let fakeEntity = [...entityList];
		if (applyFor === 1) {
			fakeEntity[0].details = fakeEntity[0].details.map((x: any) =>
				x.id === record.id ? { ...x, total_price_to: value } : x
			);
			setEntityList(fakeEntity);
		}
		if (applyFor === 2 || applyFor === 3) {
			let fakeItem = fakeEntity.find((x: any) => x.entity_id === recordParent.entity_id);
			if (fakeItem) {
				fakeItem.details = fakeItem.details.map((x: any) =>
					x.id === record.id ? { ...x, max_use_quantity: value } : x
				);
			}
			fakeEntity = fakeEntity.map((x: any) => (x.entity_id === recordParent.entity_id ? fakeItem : x));
			setEntityList(fakeEntity);
		}
		if (applyFor === 4 || applyFor === 5) {
			let fakeItem = fakeEntity.find((x: any) => x.entity_id === recordParent.entity_id);
			if (fakeItem) {
				fakeItem.details = fakeItem.details.map((x: any) => (x.id === record.id ? { ...x, quantity_to: value } : x));
			}
			fakeEntity = fakeEntity.map((x: any) => (x.entity_id === recordParent.entity_id ? fakeItem : x));
			setEntityList(fakeEntity);
		}
	};

	const handleChangeAmount = (record: any, value: any, recordParent?: any) => {
		let fakeEntity = [...entityList];

		if (applyFor === 1) {
			fakeEntity[0].details = fakeEntity[0].details.map((x: any) =>
				x.id === record.id ? { ...x, discount_amount: value } : x
			);
			setEntityList(fakeEntity);
		} else {
			let fakeItem = fakeEntity.find((x: any) => x.entity_id === recordParent.entity_id);
			if (fakeItem) {
				fakeItem.details = fakeItem.details.map((x: any) =>
					x.id === record.id ? { ...x, discount_amount: value } : x
				);
			}
			fakeEntity = fakeEntity.map((x: any) => (x.entity_id === recordParent.entity_id ? fakeItem : x));
			setEntityList(fakeEntity);
		}
	};
	const handleChangeType = (record: any, type: any, recordParent?: any) => {
		let fakeEntity = [...entityList];
		if (applyFor === 1) {
			fakeEntity[0].details = fakeEntity[0].details.map((x: any) =>
				x.id === record.id ? { ...x, discount_type: type, discount_amount: 0 } : x
			);
			setEntityList(fakeEntity);
		} else {
			let fakeItem = fakeEntity.find((x: any) => x.entity_id === recordParent.entity_id);

			if (fakeItem) {
				fakeItem.details = fakeItem.details.map((x: any) =>
					x.id === record.id ? { ...x, discount_type: type, discount_amount: 0 } : x
				);
			}
			fakeEntity = fakeEntity.map((x: any) => (x.entity_id === recordParent.entity_id ? fakeItem : x));
			setEntityList(fakeEntity);
		}
	};
	const removeRecord = (record: any, recordParent?: any) => {
		let fakeEntity = [...entityList];

		if (applyFor === 1) {
			fakeEntity[0].details = fakeEntity[0].details.filter((x: any) => x.id !== record.id);
			setEntityList(fakeEntity);
		} else {
			let fakeItem = fakeEntity.find((x: any) => x.entity_id === recordParent.entity_id);
			if (fakeItem) {
				fakeItem.details = fakeItem.details.filter((x: any) => x.id !== record.id);
			}
			fakeEntity = fakeEntity.map((x: any) => (x.entity_id === recordParent.entity_id ? fakeItem : x));
			if (fakeItem.details.length === 0) {
				fakeEntity = fakeEntity.filter((x: any) => x.entity_id !== recordParent.entity_id);
			}
			setEntityList(fakeEntity);
		}
	};

	const handleAddRecordItem = (record: any) => {
		let fakeEntity = [...entityList];
		if (applyFor === 1) {
		} else {
			let fakeItem = fakeEntity.find((x: any) => x.entity_id === record.entity_id);
			if (fakeItem) {
				fakeItem.details.push({
					...fakeItem.details[0],
					id: geneUniqueKey(),
					quantity_from:
						fakeEntity[0]?.details?.length > 0
							? fakeEntity[0].details[fakeEntity[0]?.details?.length - 1]?.quantity_to + 1
							: undefined,
					quantity_to: undefined,
					max_use_quantity: 0,
					discount_amount: 1,
					discount_type: 1
				});
			}
			fakeEntity = fakeEntity.map((x: any) => (x.entity_id === record.item ? fakeItem : x));
			setEntityList(fakeEntity);
		}
	};
	const handleAddRecord = (x?: any, type?: any, checked?: any) => {
		let fakeEntity = [...entityList];
		setApplyAll(checked);
		if (type === 2) {
			if (checked) {
				setEntityList([
					{
						entity_id: 722023,
						details: [
							{
								id: geneUniqueKey(),
								quantity_from: undefined,
								quantity_to: undefined,
								total_price_from: 0,
								total_price_to: 1,
								discount_amount: 1,
								discount_type: 1
							}
						]
					}
				]);
			} else {
				setEntityList([]);
			}
			return;
		} else {
			setFilterProduct({ ...filterProduct, q: "" });
			fakeEntity = fakeEntity.filter((x: any) => x.entity_id !== 722023);

			if (applyFor === 1) {
				if (fakeEntity.length === 0) {
					fakeEntity.push({
						entity_id: geneUniqueKey(),
						details: [
							{
								id: geneUniqueKey(),
								quantity_from: undefined,
								quantity_to: undefined,
								total_price_from: undefined,
								total_price_to: undefined,
								discount_amount: 1,
								discount_type: 1
							}
						]
					});
				} else {
					fakeEntity[0].details.push({
						id: geneUniqueKey(),
						quantity_from: undefined,
						quantity_to: undefined,
						total_price_from: fakeEntity[0].details[fakeEntity[0]?.details?.length - 1]?.total_price_to + 1,
						total_price_to: undefined,
						discount_amount: 1,
						discount_type: 1
					});
				}
				setEntityList(fakeEntity);
			}

			if (applyFor === 2 || applyFor === 4) {
				let fakeItem = fakeEntity.find((entity: any) => entity.entity_id === x.id);
				console.log(fakeItem, fakeEntity, x.id);
				if (fakeItem) {
					return notifyWarning("Sản phẩm này đã tồn tại trong danh sách");
				}
				fakeEntity.push({
					entity_id: x.id,
					details: [
						{
							...x,
							id: geneUniqueKey(),
							quantity_from: undefined,
							quantity_to: undefined,
							max_use_quantity: 0,
							discount_amount: 1,
							discount_type: 1
						}
					]
				});

				setEntityList(fakeEntity);
			}

			if (applyFor === 3 || applyFor === 5) {
				let fakeItem = fakeEntity.find((entity: any) => entity.entity_id === x);
				let category = masterCategory.find((cate: any) => cate.category_id === x);
				if (fakeItem) {
					return notifyWarning("Sản phẩm này đã tồn tại trong danh sách");
				}
				fakeEntity.push({
					entity_id: x,
					details: [
						{
							...category,
							id: geneUniqueKey(),
							quantity_from: undefined,
							quantity_to: undefined,
							max_use_quantity: 0,
							discount_amount: 1,
							discount_type: 1
						}
					]
				});

				setEntityList(fakeEntity);
			}
		}
	};
	return (
		<div className="mainPages">
			<SubHeader
				breadcrumb={[
					{ text: "Khuyến mãi" },
					{ text: "Chiết khấu", link: "/sale-manage" },
					{ text: "Tạo chương trình chiết khấu" }
				]}
			/>

			<Form
				initialValues={{
					status: true,
					coupon_apply_type: 1,
					apply_method: 1
				}}
				layout="vertical"
				form={formCreate}
				id="formCreate"
				onFinish={handleCreateCoupon}
				style={{ display: "flex", justifyContent: "space-between" }}
			>
				<div style={{ width: "calc(27% - 6.5px)" }}>
					<div className="contentSection" style={{ margin: "0" }}>
						<h4 style={{ margin: "0" }}>Thời gian khuyến mãi</h4>
						<Form.Item
							name="start_date"
							label="Thời gian bắt đầu"
							style={{ margin: "0 0 13px 0" }}
							rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
						>
							<DatePicker1
								showTime
								className="defaultDate"
								disabledDate={(current) => {
									return moment().add(-1, "days") >= current;
								}}
							/>
						</Form.Item>
						<Form.Item
							name="end_date"
							label="Thời gian kết thúc"
							style={{ margin: "0 0 13px 0" }}
							rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
						>
							<DatePicker1
								showTime
								className="defaultDate"
								disabledDate={(current) => {
									return moment().add(-1, "days") >= current;
								}}
							/>
						</Form.Item>
						<Checkbox checked={advanButton} onChange={(e: any) => setAdvanButton(e.target.checked)}>
							Thêm nâng cao
						</Checkbox>
						{advanButton && (
							<>
								<div style={{ margin: "8px 0 4px 0" }}>Chỉ áp dụng trong các khung giờ</div>
								<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
									<div style={{ paddingRight: "4px" }}>Từ</div>
									<Form.Item name="start_at" style={{ margin: "0" }}>
										<DatePicker1.TimePicker className="defaultDate" />
									</Form.Item>

									<div style={{ padding: "0 4px" }}>đến</div>
									<Form.Item name="end_at" style={{ margin: "0" }}>
										<DatePicker1.TimePicker className="defaultDate" />
									</Form.Item>
								</div>
								<h4 style={{ margin: "13px 0 0 0" }}>
									Chỉ áp dụng cho các Thứ
									{/* {mondaySource.length > 0 && `( Đã chọn ${mondaySource.length} )`} */}
								</h4>
								<div style={{ position: "relative" }} onMouseLeave={() => setVisibleMonday(false)}>
									<div
										className="searchButton"
										style={{ fontWeight: "400", border: "1px solid rgb(212,212,212)" }}
										onClick={() => setVisibleMonday(!visibleMonday)}
									>
										Chọn thứ
									</div>
									{visibleMonday && (
										<div style={{ position: "absolute", zIndex: "5" }}>
											<Form.Item name="days_of_week">
												<Checkbox.Group
													onChange={(e: any) => setMondaySource(e)}
													options={[
														{ label: "Thứ hai", value: 2 },
														{ label: "Thứ ba", value: 3 },
														{ label: "Thứ tư", value: 4 },
														{ label: "Thứ năm", value: 5 },
														{ label: "Thứ sáu", value: 6 },
														{ label: "Thứ bảy", value: 7 },
														{ label: "Chủ nhật", value: 0 }
													]}
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
								<h4 style={{ margin: "13px 0 0 0" }}>
									Chỉ áp dụng cho các tháng
									{/* {monthSource.length > 0 && `( Đã chọn ${monthSource.length} )`} */}
								</h4>
								<div style={{ position: "relative" }} onMouseLeave={() => setVisibleMonth(false)}>
									<div
										className="searchButton"
										style={{ fontWeight: "400", border: "1px solid rgb(212,212,212)" }}
										onClick={() => setVisibleMonth(!visibleMonth)}
									>
										Chọn tháng
									</div>
									{visibleMonth && (
										<div style={{ position: "absolute", zIndex: "5" }}>
											<Form.Item name="months_of_year">
												<Checkbox.Group
													onChange={(e: any) => setMonthSource(e)}
													options={[
														{ label: "Tháng một", value: 1 },
														{ label: "Tháng hai", value: 2 },
														{ label: "Tháng ba", value: 3 },
														{ label: "Tháng tư", value: 4 },
														{ label: "Tháng năm", value: 5 },
														{ label: "Tháng sáu", value: 6 },
														{ label: "Tháng bảy", value: 7 },
														{ label: "Tháng tám", value: 8 },
														{ label: "Tháng chín", value: 9 },
														{ label: "Tháng mười", value: 10 },
														{ label: "Tháng mười một", value: 11 },
														{ label: "Tháng mười hai", value: 12 }
													]}
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
								<h4 style={{ margin: "13px 0 0 0" }}>Chỉ áp dụng trong các ngày</h4>
								<div style={{ width: "100%" }}>
									<div style={{ zIndex: "5", width: "100%" }}>
										<Form.Item name="include_dates" style={{ width: "100%", margin: "0" }}>
											<DatePicker
												multiple
												value={includeDays}
												onChange={(e: any) => setIncludeDays(e)}
												style={{ width: "100%", height: "35px" }}
											/>
										</Form.Item>
									</div>
								</div>
								<h4 style={{ margin: "13px 0 0 0" }}>Không áp dụng trong các ngày</h4>
								<div style={{ width: "100%" }}>
									<div style={{ zIndex: "5", width: "100%" }}>
										<Form.Item name="not_include_dates" style={{ width: "100%", margin: "0" }}>
											<DatePicker
												multiple
												value={notIncludeDays}
												onChange={(e: any) => setNotIncludeDays(e)}
												style={{ width: "100%", height: "35px" }}
											/>
										</Form.Item>
									</div>
								</div>
							</>
						)}
					</div>
					<div className="contentSection">
						<h4 style={{ margin: "0" }}>Nguồn đơn hàng {utmSource.length > 0 && `( Đã chọn ${utmSource.length} )`}</h4>
						<div style={{ position: "relative" }} onMouseLeave={() => setVisibleSource(false)}>
							<div
								className="searchButton"
								style={{ fontWeight: "400", border: "1px solid rgb(212,212,212)" }}
								onClick={() => setVisibleSource(!visibleSource)}
							>
								Chọn nguồn đơn
							</div>
							{visibleSource && (
								<div style={{ position: "absolute", zIndex: "5" }}>
									<Form.Item name="utm_source">
										<Checkbox.Group
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
					</div>
					<div className="contentSection">
						<h4 style={{ margin: "0" }}>
							Khách hàng áp dụng {customerSource.length > 0 && `( Đã chọn ${customerSource.length} )`}
						</h4>
						<div style={{ position: "relative" }} onMouseLeave={() => setVisibleCustomer(false)}>
							<div
								className="searchButton"
								style={{ fontWeight: "400", border: "1px solid rgb(212,212,212)" }}
								onClick={() => setVisibleCustomer(!visibleCustomer)}
							>
								Chọn khách hàng
							</div>
							{visibleCustomer && (
								<div style={{ position: "absolute", width: "100%" }}>
									<Form.Item name="customer_source">
										<Checkbox.Group
											onChange={(e: any) => setCustomerSource(e)}
											options={[
												{ label: "Thường", value: 1 },
												{ label: "Bạc", value: 2 },
												{ label: "Vàng", value: 3 },
												{ label: "Kim cương", value: 4 }
											]}
											style={{
												background: "#fff",
												padding: "8px",
												width: "100%",
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
					<div className="contentSection" style={{ margin: "0" }}>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<h4 style={{ margin: "0" }}>Thông tin chung</h4>
							<div className="defaultButton" onClick={() => formCreate.submit()}>
								<SvgIconStorage style={{ transform: "scale(0.7)" }} />
								&nbsp;Lưu
							</div>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<Form.Item
								name="program_name"
								label="Tên đợt phát hành"
								style={{ width: "calc(70% - 4px)", margin: "0 0 13px 0" }}
								rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
							>
								<Input className="defaultInput" />
							</Form.Item>
							<Form.Item
								name="program_code"
								label="Mã đợt phát hành"
								style={{ width: "calc(30% - 4px)", margin: "1px 0 13px 0" }}
								rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
							>
								<Input
									addonAfter={
										<div style={{ height: "100%" }} onClick={() => handleGetCode()}>
											Mã tự động
										</div>
									}
									className="defaultInputNumberAddon backgroundPrimary"
									style={{ width: "100%" }}
								/>
							</Form.Item>
						</div>
						<Form.Item name="description" label="Mô tả">
							<Input.TextArea className="defaultInput" style={{ height: "unset" }} />
						</Form.Item>
					</div>
					<div className="contentSection">
						<h4 style={{ margin: "0" }}>Thông tin khuyến mãi</h4>
						<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
							<Form.Item
								name="max_use_quantity"
								label="Số lượng khuyến mãi"
								style={{ width: "25%", margin: "0 0 13px 0" }}
							>
								<InputNumber
									min={1}
									formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
									parser={(value: any) => value!.replace(/\$\s?|(\.*)/g, "")}
									className="defaultInputNumber"
								/>
							</Form.Item>
							<Form.Item
								name="apply_method"
								label="Phương thức khuyến mãi"
								style={{ width: "calc(75% - 8px)", margin: "1px 0 13px 0" }}
								rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
							>
								<Select
									className="defaultSelect"
									onChange={(e: any) => {
										setApplyFor(e);
										setEntityList([]);
										setApplyAll(false);
									}}
									options={[
										{ label: "Chiết khấu theo tổng giá trị đơn hàng", value: 1 },
										{ label: "Chiết khấu theo từng sản phẩm", value: 2 },
										{ label: "Chiết khấu theo danh mục sản phẩm", value: 3 },
										{ label: "Chiết khấu số lượng sản phẩm", value: 4 },
										{ label: "Chiết khấu số lượng sản phẩm (theo danh mục)", value: 5 }
									]}
								/>
							</Form.Item>
						</div>
						{(applyFor === 2 || applyFor === 4) && (
							<div
								style={{ marginBottom: "4px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
							>
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
										setFilterProduct({ ...filterProduct, category_ids: fakeArray.join(",") });
									}}
								/>

								<div
									style={{ width: "calc(100% - 356px)", zIndex: "96" }}
									className="installStore__create__body__left__information__showProduct"
								>
									<Input
										className="defaultInput"
										onChange={(e: any) => {
											setFilterProduct({ ...filterProduct, q: e.target.value });
											setShowProduct(true);
										}}
										value={filterProduct?.q}
										onClick={() => setShowProduct(false)}
										placeholder="Nhập SKU, barcode, tên sản phẩm"
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
											{listProduct?.length > 0 ? (
												listProduct.map((x: any) => (
													<div
														style={{
															padding: "4px 8px",

															cursor: "pointer"
														}}
														onClick={() => {
															// handleSubmitAddCategory(x);
															setShowProduct(false);
															handleAddRecord(x, 1);
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
								<Checkbox
									checked={applyAll}
									style={{ width: "140px" }}
									onChange={(e: any) => {
										handleAddRecord({}, 2, e.target.checked);
									}}
								>
									Tất cả sản phẩm
								</Checkbox>
							</div>
						)}

						{(applyFor === 3 || applyFor === 5) && (
							<div
								style={{
									margin: "2px 0 4px 0",
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between"
								}}
							>
								<Select
									showSearch
									filterOption={(input: any, option: any) =>
										removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
									}
									value={null}
									onChange={(e: any) => {
										handleAddRecord(e, 1);
									}}
									options={masterCategory}
									placeholder="Chọn danh mục danh mục"
									className="defaultSelect"
									style={{ width: "calc(100% - 148px)" }}
								/>
								<Checkbox
									checked={applyAll}
									style={{ width: "140px" }}
									onChange={(e: any) => {
										handleAddRecord({}, 2, e.target.checked);
									}}
								>
									Tất cả sản phẩm
								</Checkbox>
							</div>
						)}
						{entityList.length > 0 &&
							(applyFor === 1 ? (
								<div
									style={{
										border: "1px solid rgb(212,212,212)",
										borderBottom: "unset",
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										marginTop: "13px"
									}}
								>
									<div
										style={{
											width: "calc((100% - 80px) / 3)",
											padding: "4px 8px",
											display: "flex",
											alignItems: "center",
											justifyContent: "flex-end",
											borderRight: "1px solid rgb(212,212,212)",
											background: "rgb(232,232,232)"
										}}
									>
										Đơn hàng có giá trị từ
									</div>
									<div
										style={{
											width: "calc((100% - 80px) / 3)",
											padding: "4px 8px",
											display: "flex",
											alignItems: "center",
											justifyContent: "flex-end",
											borderRight: "1px solid rgb(212,212,212)",
											background: "rgb(232,232,232)"
										}}
									>
										Đơn hàng có giá trị đến
									</div>
									<div
										style={{
											width: "calc((100% - 80px) / 3)",
											padding: "4px 8px",
											display: "flex",
											alignItems: "center",
											justifyContent: "flex-end",
											borderRight: "1px solid rgb(212,212,212)",
											background: "rgb(232,232,232)"
										}}
									>
										Chiếu khấu
									</div>
									<div
										style={{
											width: "80px",
											padding: "4px 8px",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											background: "rgb(232,232,232)"
										}}
									>
										Thao tác
									</div>
								</div>
							) : applyFor === 2 || applyFor === 3 ? (
								<div
									style={{
										border: "1px solid rgb(212,212,212)",
										borderBottom: "unset",
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between"
									}}
								>
									{!applyAll && (
										<div
											style={{
												width: "60px",
												padding: "4px 8px",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												borderRight: "1px solid rgb(212,212,212)",
												background: "rgb(232,232,232)"
											}}
										>
											Ảnh
										</div>
									)}
									<div
										style={{
											width: applyAll ? "calc(((100% - 140px) / 4) + 60px)" : "calc((100% - 140px) / 4)",
											padding: "4px 8px",
											display: "flex",
											alignItems: "center",
											borderRight: "1px solid rgb(212,212,212)",
											background: "rgb(232,232,232)"
										}}
									>
										{applyFor === 3 ? "Danh mục" : "Sản phẩm"}
									</div>
									<div
										style={{
											width: "calc((100% - 140px) / 4)",
											padding: "4px 8px",
											display: "flex",
											alignItems: "center",
											justifyContent: "flex-end",
											borderRight: "1px solid rgb(212,212,212)",
											background: "rgb(232,232,232)"
										}}
									>
										SL tối thiểu
									</div>
									<div
										style={{
											width: "calc((100% - 140px) / 4)",
											padding: "4px 8px",
											display: "flex",
											alignItems: "center",
											justifyContent: "flex-end",
											borderRight: "1px solid rgb(212,212,212)",
											background: "rgb(232,232,232)"
										}}
									>
										Giới hạn KM
									</div>
									<div
										style={{
											width: "calc((100% - 140px) / 4)",
											padding: "4px 8px",
											display: "flex",
											alignItems: "center",
											justifyContent: "flex-end",
											borderRight: "1px solid rgb(212,212,212)",
											background: "rgb(232,232,232)"
										}}
									>
										Chiếu khấu
									</div>
									<div
										style={{
											width: "80px",
											padding: "4px 8px",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											background: "rgb(232,232,232)"
										}}
									>
										Thao tác
									</div>
								</div>
							) : (
								<div
									style={{
										border: "1px solid rgb(212,212,212)",
										borderBottom: "unset",
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between"
									}}
								>
									{!applyAll && (
										<div
											style={{
												width: "60px",
												padding: "4px 8px",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												borderRight: "1px solid rgb(212,212,212)",
												background: "rgb(232,232,232)"
											}}
										>
											Ảnh
										</div>
									)}
									<div
										style={{
											width: applyAll ? "calc(((100% - 140px) / 4) + 60px)" : "calc((100% - 140px) / 4)",
											padding: "4px 8px",
											display: "flex",
											alignItems: "center",
											borderRight: "1px solid rgb(212,212,212)",
											background: "rgb(232,232,232)"
										}}
									>
										{applyFor === 5 ? "Danh mục" : "Sản phẩm"}
									</div>
									<div
										style={{
											width: "calc((100% - 140px) / 4)",
											padding: "4px 8px",
											display: "flex",
											alignItems: "center",
											justifyContent: "flex-end",
											borderRight: "1px solid rgb(212,212,212)",
											background: "rgb(232,232,232)"
										}}
									>
										SL từ
									</div>
									<div
										style={{
											width: "calc((100% - 140px) / 4)",
											padding: "4px 8px",
											display: "flex",
											alignItems: "center",
											justifyContent: "flex-end",
											borderRight: "1px solid rgb(212,212,212)",
											background: "rgb(232,232,232)"
										}}
									>
										đến
									</div>
									<div
										style={{
											width: "calc((100% - 140px) / 4)",
											padding: "4px 8px",
											display: "flex",
											alignItems: "center",
											justifyContent: "flex-end",
											borderRight: "1px solid rgb(212,212,212)",
											background: "rgb(232,232,232)"
										}}
									>
										Chiếu khấu
									</div>
									<div
										style={{
											width: "80px",
											padding: "4px 8px",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											background: "rgb(232,232,232)"
										}}
									>
										Thao tác
									</div>
								</div>
							))}
						{entityList &&
							entityList.length > 0 &&
							entityList?.map((entity: any) => (
								<div style={{ borderTop: "1px solid rgb(212,212,212)" }}>
									{entity.details.map((item: any, index: any) =>
										applyFor === 1 ? (
											<ApplyForType1
												applyAll={applyAll}
												applyFor={applyFor}
												indexItem={index}
												item={item}
												entity={entity}
												entityList={entityList}
												handleChangeValueTo={handleChangeValueTo}
												handleChangeValueFrom={handleChangeValueFrom}
												handleChangeType={handleChangeType}
												handleChangeAmount={handleChangeAmount}
												removeRecord={removeRecord}
												handleAddRecordItem={handleAddRecordItem}
											/>
										) : applyFor === 2 ? (
											<ApplyForType2
												applyAll={applyAll}
												applyFor={applyFor}
												indexItem={index}
												item={item}
												entity={entity}
												handleChangeValueTo={handleChangeValueTo}
												handleChangeValueFrom={handleChangeValueFrom}
												handleChangeType={handleChangeType}
												handleChangeAmount={handleChangeAmount}
												removeRecord={removeRecord}
												handleAddRecordItem={handleAddRecordItem}
											/>
										) : applyFor === 3 ? (
											<ApplyForType3
												applyAll={applyAll}
												applyFor={applyFor}
												indexItem={index}
												item={item}
												entity={entity}
												handleChangeValueTo={handleChangeValueTo}
												handleChangeValueFrom={handleChangeValueFrom}
												handleChangeType={handleChangeType}
												handleChangeAmount={handleChangeAmount}
												removeRecord={removeRecord}
												handleAddRecordItem={handleAddRecordItem}
											/>
										) : applyFor === 4 ? (
											<ApplyForType4
												entityList={entityList}
												applyAll={applyAll}
												applyFor={applyFor}
												indexItem={index}
												item={item}
												entity={entity}
												handleChangeValueTo={handleChangeValueTo}
												handleChangeValueFrom={handleChangeValueFrom}
												handleChangeType={handleChangeType}
												handleChangeAmount={handleChangeAmount}
												removeRecord={removeRecord}
												handleAddRecordItem={handleAddRecordItem}
											/>
										) : (
											<ApplyForType5
												entityList={entityList}
												applyAll={applyAll}
												applyFor={applyFor}
												indexItem={index}
												item={item}
												entity={entity}
												handleChangeValueTo={handleChangeValueTo}
												handleChangeValueFrom={handleChangeValueFrom}
												handleChangeType={handleChangeType}
												handleChangeAmount={handleChangeAmount}
												removeRecord={removeRecord}
												handleAddRecordItem={handleAddRecordItem}
											/>
										)
									)}
									{applyFor !== 1 && entity?.details?.length > 0 && (
										<div style={{ display: "flex", margin: "4px 0", justifyContent: "flex-end" }}>
											<div className="defaultButton" onClick={() => handleAddRecordItem(entity)}>
												Thêm
											</div>
										</div>
									)}
								</div>
							))}
						{/* <TableStyledAntd
							className="ordersTable"
							rowKey={"id"}
							columns={columnsData1({
								handleChangeValueFrom,
								handleChangeValueTo,
								handleChangeAmount,
								handleChangeType,
								removeRecord
							})}
							// rowSelection={rowSelection}
							dataSource={entityList}
							loading={false}
							pagination={false}
							bordered
							widthCol1="50px"
							widthCol8="150px"
						/> */}
						{applyFor === 1 && (
							<div style={{ marginTop: "8px", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
								<div className="defaultButton" onClick={() => handleAddRecord()}>
									Thêm
								</div>
							</div>
						)}
					</div>
				</div>
			</Form>
		</div>
	);
};

export default SaleCreate;
