import { Checkbox, Form, Input, InputNumber, Radio, Row, Select, Switch, Table, TreeSelect } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductStatusEnum, ProductTypeEnum } from "src/constants/enum";
import SellerContext from "src/context/sellerContext";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import { API_CATALOGS, API_CATEGORY, API_PRODUCTS } from "src/services/api/url.index";
import { convertToConsucutiveString2 } from "src/utils/helpers/functions/textUtils";
import { notifyError, notifyWarning } from "../../../components/notification/index";
import { removeSign } from "src/utils/helpers/functions/textUtils";
import { ProductLevelEnum } from "../../../constants/enum";
import { catalogsList, categoriesList, columnsData } from "../create/data";
const plainOptions = ["Tiki", "Lazada", "Shopee", "Sen hồng", "Sen đỏ"];
const defaultCheckedList = ["Tiki", "Sen hồng"];

const InformationTab = ({
	product,
	form,
	setProduct,
	setAttributes,
	attributes,
	attributeParams,
	setAttributeParams,
	setSelectedParent,
	selectedParent,
	productLevel,
	setProductLevel,
	setActiveTab,
	selectedCatalog,
	setSelectedCatalog
}: any) => {
	const { sellerInfo } = useContext(SellerContext) as any;

	const [checkedList, setCheckedList] = useState(defaultCheckedList);
	const [indeterminate, setIndeterminate] = useState(true);
	const [checkAll, setCheckAll] = useState(false);
	const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
	const [treeData, setTreeData] = useState<any[]>([]);
	const [listCategoriesChoice, setListCategoriesChoice] = useState<any[]>([]);
	const [selectedChoice, setSelectedChoice] = useState<any>(undefined);
	const [showParentProduct, setShowParentProduct] = useState(false);
	const [filterParents, setFilterParents] = useState<any>("");
	const [listProductParents, setListProductParents] = useState<any[]>([]);
	const [listUnits, setListUnits] = useState<any[]>([]);
	const paramsUrl = useParams() as any;
	useEffect(() => {
		setFilterParents(selectedParent?.product_name);
	}, [selectedParent]);
	useEffect(() => {
		if (product) {
			let selectedFake = [];
			let listFake = [];
			for (let i = 0; i < product?.categories_list?.length; i++) {
				selectedFake.push(product?.categories_list[i]?.id);
				listFake.push({
					value: product?.categories_list[i]?.id,
					label: product?.categories_list[i]?.category_name
				});
			}
			setSelectedCategories(selectedFake);
			setListCategoriesChoice(listFake);
		}
	}, [product]);

	const [catalogs, setCatalogs] = useState<any[]>([]);
	useEffect(() => {
		const getCatalogs = async (params?: any) => {
			let paramsFilter = {
				limit: 10000,
				page: 1,
				status: true
			};
			try {
				const response = (await api.get(`${API_URL}/${API_CATALOGS}`, paramsFilter)) as any;
				let data = response["data"];
				let fakeArray = [];
				for (let i = 0; i < data?.length; i++) {
					fakeArray.push({
						value: data[i]?.id,
						label: data[i]?.catalog_name
					});
				}
				setCatalogs(fakeArray);
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};
		const timer = setTimeout(() => {
			getCatalogs();
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	useEffect(() => {
		const getCatalogs = async (params?: any) => {
			let paramsFilter = {
				limit: 10000,
				page: 1,
				status: true
			};
			try {
				const response = (await api.get(`${API_URL}/units`, paramsFilter)) as any;
				let data = response["data"];
				let fakeArray = [];
				for (let i = 0; i < data?.length; i++) {
					fakeArray.push({
						value: data[i]?.id,
						label: data[i]?.unit
					});
				}
				setListUnits(fakeArray);
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};
		const timer = setTimeout(() => {
			getCatalogs();
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	useEffect(() => {
		const getParentProduct = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/${API_PRODUCTS}?product_level=1`, params)) as any;
				let data = response["data"];
				setListProductParents(data);
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};
		const timer = setTimeout(() => {
			let params = {
				q: filterParents,
				page: 1,
				limit: 10,
				status: true
			};
			getParentProduct(params);
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, [filterParents]);
	useEffect(() => {
		const getCategory = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/${API_CATEGORY}/${selectedChoice}`, params)) as any;
				let data = response?.data;

				setAttributes(data?.attributes?.filter((x: any) => x?.purposes !== "3"));
				let fakeParams = [];
				for (let i = 0; i < data?.attributes?.length; i++) {
					fakeParams.push({
						attribute_id: data?.attributes[i]?.id,
						value_ids: [],
						text_value: undefined,
						value_text: []
					});
				}
				setAttributeParams(fakeParams);
			} catch (error: any) {
				throw new Error(error?.response?.data?.message);
			}
		};
		const timer = setTimeout(() => {
			let paramsFilter = {
				limit: 10000,
				page: 1,
				status: true
			};
			selectedChoice && getCategory(paramsFilter);
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, [selectedChoice]);
	useEffect(() => {
		const getCategories = async (params?: any) => {
			try {
				const response = (await api.get(
					`${API_URL}/${API_CATEGORY}?catalog_id=${sellerInfo?.catalog_id}`,
					params
				)) as any;
				let data = response["data"];
				for (let i = 0; i < data.length; i++) {
					data[i].value = data[i]?.category_id;
					data[i].key = data[i].id;
					data[i].title = data[i].category_name;
					let childrenLv1 = data[i].children || [];
					for (let j = 0; j < childrenLv1.length; j++) {
						childrenLv1[j].value = childrenLv1[j]?.category_id;
						childrenLv1[j].key = childrenLv1[j].id;
						childrenLv1[j].title = childrenLv1[j].category_name;
						let childrenLv2 = childrenLv1[j].children || [];
						for (let k = 0; k < childrenLv2.length; k++) {
							childrenLv2[k].value = childrenLv2[k]?.category_id;
							childrenLv2[k].key = childrenLv2[k].id;
							childrenLv2[k].title = childrenLv2[k].category_name;
							let childrenLv3 = childrenLv2[k].children || [];

							for (let m = 0; m < childrenLv3.length; m++) {
								childrenLv3[m].value = childrenLv3[m]?.category_id;
								childrenLv3[m].key = childrenLv3[m].id;
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
				status: true
			};
			if (sellerInfo?.user_type !== "admin") {
				getCategories(paramsFilter);
			}
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, [sellerInfo]);

	useEffect(() => {
		const getCategories = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/${API_CATEGORY}?catalog_id=${selectedCatalog}`, params)) as any;
				let data = response["data"];
				for (let i = 0; i < data.length; i++) {
					data[i].value = data[i]?.category_id;
					data[i].key = data[i].id;
					data[i].title = data[i].category_name;
					let childrenLv1 = data[i].children || [];
					for (let j = 0; j < childrenLv1.length; j++) {
						childrenLv1[j].value = childrenLv1[j]?.category_id;
						childrenLv1[j].key = childrenLv1[j].id;
						childrenLv1[j].title = childrenLv1[j].category_name;
						let childrenLv2 = childrenLv1[j].children || [];
						for (let k = 0; k < childrenLv2.length; k++) {
							childrenLv2[k].value = childrenLv2[k]?.category_id;
							childrenLv2[k].key = childrenLv2[k].id;
							childrenLv2[k].title = childrenLv2[k].category_name;
							let childrenLv3 = childrenLv2[k].children || [];

							for (let m = 0; m < childrenLv3.length; m++) {
								childrenLv3[m].value = childrenLv3[m]?.category_id;
								childrenLv3[m].key = childrenLv3[m].id;
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
				status: true
			};
			if (sellerInfo?.user_type === "admin") {
				getCategories(paramsFilter);
			}
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, [selectedCatalog]);

	const onChange = (list: any) => {
		setCheckedList(list);
		setIndeterminate(!!list.length && list.length < plainOptions.length);
		setCheckAll(list.length === plainOptions.length);
	};

	const onCheckAllChange = (e: any) => {
		setCheckedList(e.target.checked ? plainOptions : []);
		setIndeterminate(false);
		setCheckAll(e.target.checked);
	};

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

	const handleClickParentProduct = (value: any) => {
		console.log(value);
		setSelectedParent(value);
		setFilterParents(value?.product_name);
	};
	return (
		<div className="productPage__create__form__informations">
			<div className="productPage__create__form__informations__left">
				<div className="productPage__create__form__informations__left__information" style={{ margin: "0" }}>
					<h4 style={{ margin: "0" }}>Thông tin sản phẩm</h4>
					<Form.Item
						name="sku"
						label="SKU"
						rules={[
							() => ({
								validator(_: any, value: any) {
									if (product?.product_level === "2" || productLevel === "2") {
										return Promise.resolve();
									}
									if (value) {
										return Promise.resolve();
									}
									return Promise.reject(new Error("Vui lòng không bỏ trống"));
								}
							})
						]}
						style={{ width: "calc(25% - 4px)", margin: "0 0 7px 0" }}
					>
						<Input
							disabled={(product?.product_level === "2" || productLevel === "2") && paramsUrl?.id}
							className="defaultInput"
							onChange={(e: any) => {
								if (e.target.value === "-") {
									form.setFieldValue("sku", "");
									setProduct((prevState: any) => ({
										...prevState,
										sku: ""
									}));
								} else {
									form.setFieldValue("sku", convertToConsucutiveString2(e.target.value).toUpperCase());
									setProduct((prevState: any) => ({
										...prevState,
										sku: convertToConsucutiveString2(e.target.value).toUpperCase()
									}));
								}
							}}
						/>
					</Form.Item>
					<Form.Item
						rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
						style={{ width: "calc(25% - 4px)", margin: "0 0 7px 0" }}
						name="barcode"
						label="Barcode"
					>
						<Input
							className="defaultInput"
							onChange={(e: any) => {
								console.log("e.tar", e.target.value);
								if (e.target.value === "-") {
									form.setFieldValue("barcode", "");
									setProduct((prevState: any) => ({
										...prevState,
										barcode: ""
									}));
								} else {
									form.setFieldValue("barcode", convertToConsucutiveString2(e.target.value).toUpperCase());
									setProduct((prevState: any) => ({
										...prevState,
										barcode: convertToConsucutiveString2(e.target.value).toUpperCase()
									}));
								}
							}}
						/>
					</Form.Item>

					<Form.Item
						rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
						name="product_name"
						label="Tên sản phẩm"
						style={{ width: "calc(35% - 4px)", margin: "0 0 7px 0" }}
					>
						<Input
							className="defaultInput"
							onChange={(e: any) => setProduct((prevState: any) => ({ ...prevState, product_name: e.target.value }))}
						/>
					</Form.Item>
					<Form.Item
						rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
						name="unit_id"
						label="Đơn vị"
						style={{ width: "calc(15% - 4px)", margin: "0 0 7px 0" }}
					>
						<Select
							showSearch
							filterOption={(input: any, option: any) =>
								removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
							}
							options={listUnits}
							className="defaultSelect"
							placeholder="Chọn đơn vị"
						/>
					</Form.Item>
					<Form.Item
						rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
						name="product_type"
						label="Loại sản phẩm"
						style={{ margin: "0 0 0  0" }}
					>
						<Select className="defaultSelect">
							{Object.entries(ProductTypeEnum).map(([key, value]) => (
								<Select.Option value={value} key={key}>
									{key}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
						name="catalog_id"
						label="Ngành hàng"
						style={{ margin: "0 0 0 0" }}
					>
						<Select
							onChange={(e: any) => setSelectedCatalog(e)}
							disabled={sellerInfo?.user_type !== "admin"}
							showSearch
							filterOption={(input: any, option: any) =>
								removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
							}
							options={catalogs}
							className="defaultSelect"
							placeholder="Chọn ngành hàng"
						/>
					</Form.Item>
					<Form.Item
						rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
						name="product_status"
						label="Tình trạng"
						style={{ margin: "0 0 0 0" }}
					>
						<Select className="defaultSelect">
							{Object.entries(ProductStatusEnum).map(([key, val]) => (
								<Select.Option key={key} value={val}>
									{key}
								</Select.Option>
							))}
						</Select>
					</Form.Item>

					<div style={{ display: "flex", marginTop: "1px", justifyContent: "space-between", width: "calc(25% - 4px)" }}>
						<Form.Item
							rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
							name="stock_quantity"
							label="Tồn thực"
							style={{ margin: "0 0 0 0", width: "calc(50% - 2px)" }}
						>
							<InputNumber
								disabled
								className="defaultInputNumber"
								formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
								parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
								min={0}
								onChange={(value: any) => setProduct((prevState: any) => ({ ...prevState, stock_quantity: value }))}
							/>
						</Form.Item>
						<Form.Item
							rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
							name="virtual_stock_quantity"
							label="Tồn khả dụng"
							style={{ margin: "0 0 0 0", width: "calc(50% - 2px)" }}
						>
							<InputNumber
								disabled
								className="defaultInputNumber"
								formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
								parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
								min={0}
								onChange={(value: any) => setProduct((prevState: any) => ({ ...prevState, stock_quantity: value }))}
							/>
						</Form.Item>
					</div>

					<h4 style={{ margin: "0" }}>Giá sản phẩm</h4>
					<Form.Item
						rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
						name="retail_price"
						label="Giá bán lẻ (vnđ)"
						style={{ margin: "0" }}
					>
						<InputNumber
							className="defaultInputNumber"
							formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
							parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
							onChange={(value: any) => setProduct((prevState: any) => ({ ...prevState, retail_price: value }))}
						/>
					</Form.Item>
					<Form.Item
						rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
						name="wholesale_price"
						label="Giá bán buôn (vnđ)"
						style={{ margin: "0" }}
					>
						<InputNumber
							className="defaultInputNumber"
							formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
							parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
							min={0}
							onChange={(value: any) => setProduct((prevState: any) => ({ ...prevState, wholesale_price: value }))}
						/>
					</Form.Item>
					<Form.Item
						rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
						name="import_price"
						label="Giá niêm yết (vnđ)"
						style={{ margin: "0" }}
					>
						<InputNumber
							className="defaultInputNumber"
							min={0}
							formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
							parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
							onChange={(value: any) => setProduct((prevState: any) => ({ ...prevState, import_price: value }))}
						/>
					</Form.Item>
					<Form.Item
						rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
						name="return_price"
						label="Giá thu lại (vnđ)"
						style={{ margin: "0" }}
					>
						<InputNumber
							className="defaultInputNumber"
							min={0}
							formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
							parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
							onChange={(value: any) => setProduct((prevState: any) => ({ ...prevState, return_price: value }))}
						/>
					</Form.Item>
				</div>
				<div
					className="productPage__create__form__informations__left__attributes"
					style={{ marginTop: "13px", padding: "13px 16px" }}
				>
					<div className="productPage__create__form__informations__left__attributes__header">
						<h4>Thuộc tính sản phẩm</h4>
						<div style={{ display: "flex", alignItems: "center" }}>
							<span style={{ marginBottom: "4px" }}>Danh mục</span>
							<Form.Item style={{ margin: "0 0 0 8px", width: "200px" }}>
								<Select
									onClick={() => {
										if (listCategoriesChoice?.length === 0) {
											notifyWarning("Vui lòng chọn danh mục trước");
										}
									}}
									disabled={listCategoriesChoice?.length === 0}
									options={listCategoriesChoice}
									className="defaultSelect"
									onChange={(e: any) => setSelectedChoice(e)}
								/>
							</Form.Item>
						</div>
					</div>
					<div style={{ width: "100%" }}>
						{attributes?.filter((x: any) => x?.purposes !== "3")?.length > 0 &&
							attributes
								?.filter((x: any) => x?.purposes !== "3" && x.status === true)
								.map((x: any, index: any) => (
									<div
										style={{
											width: "100%",
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											marginTop: index === 0 ? "0" : "8px"
										}}
									>
										<Input
											className="defaultInput"
											style={{ width: "calc(50% - 4px)" }}
											disabled
											value={x?.attribute_name}
										/>
										<div style={{ width: "calc(50% - 4px)" }}>
											{/* {x.filter_type === "1" && (
											<Input
												className="defaultInput"
												defaultValue={x?.text_value}
												value={attributeParams.find((item: any) => item.attribute_id === x.id)?.text_value}
												onBlur={(e: any) => {
													console.log("123123", x.id);
													let fakeArray = [...attributeParams];
													console.log("345", fakeArray);
													fakeArray = fakeArray.map((item: any) =>
														item.attribute_id === x.id ? { ...item, text_value: e.target.value } : item
													);
													setAttributeParams(fakeArray);
												}}
											/>
										)}
										{x.filter_type !== "1" && ( */}
											<Select
												style={{ marginTop: "6px" }}
												defaultValue={x?.value_ids ? JSON.parse(x?.value_ids) : null}
												value={attributeParams.find((item: any) => item.attribute_id === x.id)?.value_ids}
												className="defaultSelect"
												fieldNames={{ label: "value_name", value: "id" }}
												mode={"multiple"}
												options={x.values}
												onChange={(e: any) => {
													console.log("12321", x.values);
													let fakeArray = [...attributeParams];
													fakeArray = fakeArray.map((item: any) =>
														item.attribute_id === x.id ? { ...item, value_ids: e, value_text: e.value_name } : item
													);
													setAttributeParams(fakeArray);
												}}
											/>
											{/* )} */}
										</div>
									</div>
								))}
					</div>
				</div>
			</div>
			<div className="productPage__create__form__informations__right" style={{ margin: "0" }}>
				<div className="productPage__create__form__informations__right__status">
					<h4 onClick={() => console.log(attributes?.filter((x: any) => x?.purposes !== "3"))}>Trạng thái hiển thị</h4>
					<Form.Item name="status" style={{ margin: "0" }}>
						<Radio.Group>
							<Radio value={true}>Hiển thị</Radio>
							<Radio value={false}>Ẩn</Radio>
						</Radio.Group>
					</Form.Item>
				</div>
				<div className="productPage__create__form__informations__right__category" style={{ marginTop: "13px" }}>
					<h4>Danh mục</h4>
					<Form.Item
						rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
						name="categories"
						style={{ margin: "0" }}
					>
						<TreeSelect
							maxTagCount={"responsive"}
							{...tProps}
							className="defaultSelect"
							filterTreeNode={(search: any, item: any) => {
								return item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
							}}
							onChange={(e: any) => {
								let fakeArray = [];
								for (let i = 0; i < e.length; i++) {
									fakeArray.push({
										value: e[i]?.value,
										label: e[i]?.label
									});
								}

								setListCategoriesChoice(fakeArray);
							}}
						/>
					</Form.Item>
				</div>
				<div className="productPage__create__form__informations__right__product-level" style={{ marginTop: "13px" }}>
					<Row style={{ flexDirection: "column" }}>
						<h4>Cấp bậc sản phẩm</h4>
						<Form.Item name="product_level" style={{ margin: "0" }}>
							<Select
								onChange={(e: any) => {
									setProductLevel(e);
								}}
								className="defaultSelect"
								disabled={paramsUrl?.id && product?.product_level !== "3"}
							>
								{Object.entries(ProductLevelEnum).map(([key, val]) => {
									return (
										<Select.Option key={key} value={val}>
											{key}
										</Select.Option>
									);
								})}
							</Select>
						</Form.Item>
					</Row>
					{(product?.product_level === "2" || productLevel === "2") && (
						<Row style={{ flexDirection: "column", margin: "13px 0 0 0" }}>
							<h4>Lựa chọn sản phẩm cha</h4>
							<div style={{ position: "relative" }}>
								<Input
									value={filterParents}
									placeholder="Lựa chọn sản phẩm cha"
									className="defaultInput"
									onClick={() => setShowParentProduct(false)}
									onChange={(value: any) => {
										if (!(value.target.value.length > 0)) {
											setShowParentProduct(false);
										} else {
											setShowParentProduct(true);
										}

										setFilterParents(value.target.value);
									}}
								/>
								{showParentProduct && (
									<div
										style={{
											position: "absolute",
											background: "#fff",
											borderRadius: "5px",
											border: "1px solid rgb(192,192,192)",
											width: "100%",
											zIndex: "10",
											display: "flex",
											alignItems: "center",
											flexWrap: "wrap"
										}}
									>
										{listProductParents.length > 0 ? (
											listProductParents.map((x: any) => (
												<div
													style={{
														padding: "4px 8px",
														width: "100%",
														cursor: "pointer"
													}}
													onClick={() => {
														console.log("12312", x);
														handleClickParentProduct(x);
														setShowParentProduct(false);
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
													</div>
												</div>
											))
										) : (
											<p style={{ display: "flex", alignItems: "center", margin: "0", padding: "4px 9px" }}>
												Không có sản phẩm
											</p>
										)}
									</div>
								)}
							</div>
						</Row>
					)}
					{(product?.product_level === "1" || productLevel === "1") && (
						<div
							className="productPage__create__buttons__create-children-products"
							onClick={() =>
								product?.sku && product?.barcode && product?.product_name
									? setActiveTab(4)
									: notifyWarning("Vui lòng nhập sku, barcode trước khi tạo sản phẩm con!")
							}
						>
							Tạo sản phẩm con
						</div>
					)}
					{productLevel === "2" && selectedParent && (
						<Link
							to={`/products/edit/${selectedParent.id}`}
							className="productPage__create__buttons__create-children-products"
						>
							Link đến sản phẩm cha
						</Link>
					)}
				</div>
				{false && (
					<>
						<div className="productPage__create__form__informations__right__installment " style={{ marginTop: "13px" }}>
							<h4>Trả góp</h4>
							<Form.Item name="allow_installment" style={{ margin: "0" }}>
								<Checkbox>Cho phép mua trả góp</Checkbox>
							</Form.Item>
						</div>
						<div className="productPage__create__form__informations__right__platform" style={{ marginTop: "13px" }}>
							<h4>Kênh bán hàng</h4>
							<Form.Item style={{ margin: "0" }}>
								<Checkbox style={{ width: "100%" }}>POS</Checkbox>
								<Checkbox style={{ width: "100%", margin: "0" }}>Website</Checkbox>
								<Checkbox
									indeterminate={indeterminate}
									onChange={onCheckAllChange}
									checked={checkAll}
									style={{ width: "100%", margin: "0" }}
								>
									Sàn thương mại điện tử
								</Checkbox>
								<Checkbox.Group options={plainOptions} value={checkedList} onChange={onChange} />
							</Form.Item>
						</div>
						<div className="productPage__create__form__informations__right__available" style={{ marginTop: "13px" }}>
							<h4>Tồn kho</h4>
							<Table rowKey="id" dataSource={[]} bordered columns={columnsData() as any} />
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default InformationTab;
