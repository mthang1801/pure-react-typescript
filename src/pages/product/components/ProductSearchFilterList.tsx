import { Form, Input, Select, TreeSelect } from "antd";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SvgFilter from "src/assets/svg/SvgFilter";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import NavSearch from "src/components/navSearch/NavSearch";
import { notifyWarning } from "src/components/notification";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import SellerContext from "src/context/sellerContext";
import { getListStores } from "src/services/actions/stores.actions";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import { API_CATALOGS, API_CATEGORY } from "src/services/api/url.index";
import { AppState } from "src/types";
import routerNames from "src/utils/data/routerName";
import { removeSign } from "src/utils/helpers/functions/textUtils";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { ProductStatusEnum } from "../../../constants/enum";

const ProductSearchFilterList = ({ features, formSearch, onFinishSearchFilter, onClickResetSearchFilter }: any) => {
	const { sellerInfo } = useContext(SellerContext) as any;

	const isMount = useIsMount();
	const dispatch = useDispatch();
	const [openNav, setOpenNav] = useState(false);
	const [visibleFilter, setVisibleFilter] = useState<any>(false);
	const [listStores, setListStores] = useState<any[]>([]);
	const [catalogs, setCatalogs] = useState<any[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
	const [treeData, setTreeData] = useState<any[]>([]);
	const [selectedCatalog, setSelectedCatalog] = useState<any>(undefined);
	const [listCategoriesChoice, setListCategoriesChoice] = useState<any[]>([]);
	useEffect(() => {
		if (sellerInfo.user_type !== "admin") {
			formSearch.setFieldValue("catalog_id", sellerInfo?.catalog_id);
			setSelectedCatalog(sellerInfo?.catalog_id);
		}
	}, [sellerInfo]);
	useEffect(() => {
		dispatch(getListStores({ page: 1, limit: 100000 }));
	}, []);
	const { stateListStores } = useSelector((state: AppState) => state.storesReducer);

	useEffect(() => {
		const getCatalogs = async (params?: any) => {
			let paramsFilter = {
				limit: 10000,
				page: 1
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
		if (isMount) return;
		const { success, data, isLoading, error } = stateListStores;
		if (!isLoading) {
			if (success) {
				let fakeArray = [];
				for (var i = 0; i < data?.data.length; i++) {
					fakeArray.push({
						value: data?.data[i]?.id,
						label: data?.data[i]?.warehouse_name
					});
				}
				setListStores(fakeArray);
			} else if (success === false || error) {
			}
		}
	}, [stateListStores.isLoading]);

	useEffect(() => {
		const getCategories = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/${API_CATEGORY}`, params)) as any;
				let data = response["data"];
				for (let i = 0; i < data.length; i++) {
					data[i].value = data[i].category_id;
					data[i].key = data[i].id;
					data[i].title = data[i].category_name;
					let childrenLv1 = data[i].children || [];
					for (let j = 0; j < childrenLv1.length; j++) {
						childrenLv1[j].value = childrenLv1[j].category_id;
						childrenLv1[j].key = childrenLv1[j].id;
						childrenLv1[j].title = childrenLv1[j].category_name;
						let childrenLv2 = childrenLv1[j].children || [];
						for (let k = 0; k < childrenLv2.length; k++) {
							childrenLv2[k].value = childrenLv2[k].category_id;
							childrenLv2[k].key = childrenLv2[k].id;
							childrenLv2[k].title = childrenLv2[k].category_name;
							let childrenLv3 = childrenLv2[k].children || [];

							for (let m = 0; m < childrenLv3.length; m++) {
								childrenLv3[m].value = childrenLv3[m].category_id;
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
				status: true,
				catalog_id: selectedCatalog
			};
			if (selectedCatalog) {
				getCategories(paramsFilter);
			}
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, [selectedCatalog]);

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

	return (
		<div className="ordersPage__search" style={{ padding: "8px 16px 16px 16px" }}>
			<OverlaySpinner open={openNav} onClickCallback={() => setOpenNav(false)} />

			<Form
				id="formSearch"
				onFinish={onFinishSearchFilter}
				form={formSearch}
				layout="vertical"
				style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
			>
				<NavSearch open={openNav}>
					<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
						<h4>Tìm kiếm nâng cao</h4>
						<h4 style={{ cursor: "pointer", transform: "scale(1.5)" }} onClick={() => setOpenNav(false)}>
							X
						</h4>
					</div>
					<div>
						<Form.Item name="product_level" label="Cấp bậc sản phẩm" style={{ margin: "0 0 13px 0" }}>
							<Select
								showSearch
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								options={[
									{
										value: 1,
										label: "Sản phẩm cha"
									},
									{
										value: 2,
										label: "Sản phẩm con"
									},
									{
										value: 3,
										label: "Sản phẩm độc lập"
									}
								]}
								className="defaultSelect"
								placeholder="Chọn cấp bậc sản phẩm"
							/>
						</Form.Item>
						<Form.Item name="warehouse_id" label="Kho" style={{ margin: "0 0 13px 0" }}>
							<Select
								options={listStores}
								className="defaultSelect"
								placeholder="Chọn kho"
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								showSearch
							/>
						</Form.Item>
						<Form.Item name="catalog_id" label="Ngành hàng" style={{ margin: "0 0 13px 0" }}>
							<Select
								showSearch
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								options={catalogs}
								className="defaultSelect"
								placeholder="Chọn ngành hàng"
								onChange={(e: any) => setSelectedCatalog(e)}
								disabled={sellerInfo.user_type !== "admin"}
							/>
						</Form.Item>
						<Form.Item name="categories" style={{ margin: "0 0 13px 0" }} label="Danh mục">
							<TreeSelect
								maxTagCount={"responsive"}
								onClick={() => {
									if (!selectedCatalog) {
										notifyWarning("Vui lòng chọn ngành hàng trước");
									}
								}}
								disabled={!selectedCatalog}
								{...tProps}
								className="defaultSelect"
								filterTreeNode={(search: any, item: any) => {
									return item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
								}}
								onChange={(e: any) => {
									let fakeArray = [];
									for (let i = 0; i < e?.length; i++) {
										fakeArray.push(e[i]?.value);
									}
									setListCategoriesChoice(fakeArray);
								}}
							/>
						</Form.Item>
						<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "4px" }}>
							<button className="searchButton" style={{ width: "calc(50% - 4px)" }}>
								<SvgIconSearch />
								&nbsp; Tìm kiếm
							</button>
							<div
								className="searchButton"
								style={{ width: "calc(50% - 4px)" }}
								onClick={() => {
									formSearch.resetFields();
									formSearch.setFieldValue("catalog_id", sellerInfo?.catalog_id);
									onClickResetSearchFilter();
									// setParamsFilter({
									// 	...paramsFilter,
									// 	q: undefined,
									// 	platform_id: undefined,
									// 	payment_status: undefined,
									// 	payment_method_id: undefined,
									// 	from_date: undefined,
									// 	to_date: undefined,
									// 	page: 1,
									// 	limit: 10
									// });
								}}
							>
								<SvgIconRefresh />
								&nbsp;Đặt lại
							</div>
						</div>
					</div>
				</NavSearch>
				<Form.Item
					name="q"
					label="SKU"
					style={{
						width: features.includes("MODULE_PRODUCTS__LIST__CREATE")
							? "calc((100% - 528px) /3)"
							: "calc((100% - 400px) /3)",
						margin: "0"
					}}
				>
					<Input className="defaultInput" placeholder="Nhập tên, sku, barcode của sản phẩm" />
				</Form.Item>

				<Form.Item
					name="status"
					label="Trạng thái"
					style={{
						width: features.includes("MODULE_PRODUCTS__LIST__CREATE")
							? "calc((100% - 528px) /3)"
							: "calc((100% - 400px) /3)",
						margin: "0"
					}}
				>
					<Select
						defaultValue={null}
						options={[
							{ value: null, label: "Tất cả" },
							{ value: true, label: "Hiển thị" },
							{ value: false, label: "Ẩn" }
						]}
						className="defaultSelect"
					/>
				</Form.Item>
				<Form.Item
					name="product_status"
					label="Tình trạng"
					style={{
						width: features.includes("MODULE_PRODUCTS__LIST__CREATE")
							? "calc((100% - 528px) /3)"
							: "calc((100% - 400px) /3)",
						margin: "0"
					}}
				>
					<Select
						defaultValue={null}
						options={[
							{ value: null, label: "Tất cả" },
							{ label: "Mới", value: "1" },
							{ label: "Đang bán", value: "2" },
							{ label: "Hết hàng", value: "3" },
							{ label: "Ngừng bán", value: "4" },
							{ label: "Đặt trước", value: "5" }
						]}
						className="defaultSelect"
					/>
				</Form.Item>

				<button className="searchButton" style={{ margin: "19px 0 0 0" }}>
					<SvgIconSearch style={{ transform: "scale(0.8)" }} />
					&nbsp;Tìm kiếm
				</button>
				<button
					className="searchButton"
					onClick={() => {
						onClickResetSearchFilter();
						formSearch.resetFields();
						formSearch.setFieldValue("catalog_id", sellerInfo?.catalog_id);
					}}
					style={{ margin: "19px 0 0 0" }}
				>
					<SvgIconRefresh style={{ transform: "scale(0.8)" }} />
					&nbsp;Đặt lại
				</button>
				<button className="searchButton" style={{ margin: "19px 0 0 0" }} onClick={() => setOpenNav(true)}>
					<SvgFilter style={{ transform: "scale(0.6)" }} />
					&nbsp;Lọc nâng cao
				</button>
				{features.includes("MODULE_PRODUCTS__LIST__CREATE") && (
					<Link to={routerNames.PRODUCT_CREATE}>
						<button className="defaultButton " style={{ margin: "19px 0 0 0" }}>
							<SvgIconPlus style={{ path: "#fcd804", transform: "scale(0.8)" }} />
							&nbsp;Thêm mới
						</button>
					</Link>
				)}
			</Form>
		</div>
	);
};

export default ProductSearchFilterList;
