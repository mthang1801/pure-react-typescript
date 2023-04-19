import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { Checkbox, Form, Input, Modal, Radio, Select, Spin, Switch, Table, TreeSelect } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import SvgBannerBin from "src/assets/svg/SvgBannerBin";
import SvgIconExportFile from "src/assets/svg/SvgIconExportFile";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import SvgImport from "src/assets/svg/SvgImport";
import SvgSort from "src/assets/svg/SvgSort";
import SvgUploadImageBlock from "src/assets/svg/SvgUploadImageBlock";
import Editor2 from "src/components/editor/EditorV2";
import { notifyError, notifySuccess, notifyWarning } from "src/components/notification";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
import SubHeader from "src/components/subHeader/SubHeader";
import TableStyledAntd from "src/components/table/TableStyled";
import { productLevelData } from "src/constants";
import { createOneCategory, getCategoryById, updateCategory } from "src/services/actions/category.actions";
import { fetchProductsList } from "src/services/actions/product.actions";
import { api } from "src/services/api/api.index";
import { API_END_POINT, API_URL, API_URL_CDN } from "src/services/api/config";
import { API_CATEGORY, API_PRODUCTS } from "src/services/api/url.index";
import { AppState } from "src/types";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { checkIsLinkURLRegex, checkSlugValidation } from "src/utils/helpers/functions/textUtils";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { columnsDataAddProducts, columnsDataProducts } from "./data";

const CategoryEdit = () => {
	const [formCreate] = Form.useForm();
	const [formFilter] = Form.useForm();
	const [formFilterAdd] = Form.useForm();
	const history = useHistory() as any;
	const paramsUrl = useParams() as any;
	const dispatch = useDispatch();
	const descriptionRef = useRef() as any;
	const isMount = useIsMount();
	const [treeData, setTreeData] = useState<any[]>([]);
	const [loadingUpload, setLoadingUpload] = useState(false);
	const [overplay, setOverplay] = useState(false);
	const [visibleDelete, setVisibleDelete] = useState(false);
	const [image, setImage] = useState<any>("");
	const [visible, setVisible] = useState(false);
	const [loadingCategory, setLoadingCategory] = useState(false);
	const [overplayCategory, setOverplayCategory] = useState(false);
	const [visibleDeleteCategory, setVisibleDeleteCategory] = useState(false);
	const [imageCategory, setImageCategory] = useState<any>("");
	const [visibleCategory, setVisibleCategory] = useState(false);
	const [checkTitle, setCheckTitle] = useState<any>(undefined);
	const [dataCategoryById, setCategoryById] = useState<any>(undefined);
	const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
	const [tabIndex, setTabIndex] = useState(1);
	const [openAddProduct, setOpenAddProduct] = useState(false);
	const [openDeleteProduct, setOpenDeleteProduct] = useState(false);
	const [isLoadingAddProducts, setIsLoadingAddProducts] = useState<any>(false);
	const { stateCategoryById, stateUpdateCategory } = useSelector((e: AppState) => e.categoriesReducer);
	const [loadingAddProducts, setLoadingAddProducts] = useState(false);
	const [productsList, setProductsList] = useState<any[]>([]);
	const [productsAddList, setProductsAddList] = useState<any>({
		data: [],
		total: 0
	});

	const [paramsAddFilter, setParamsAddFilter] = useState<any>({
		q: undefined,
		page: 1,
		limit: 10
	});
	const [paramsFilter, setParamsFilter] = useState<any>({
		category_ids: paramsUrl?.id,
		q: undefined,
		status: undefined,
		product_status: undefined,
		page: 1,
		limit: 10
	});
	const { stateProductsList } = useSelector((state: AppState) => state.productReducer);
	const features = localStorage.getItem("FEATURES") ? JSON.parse(localStorage.getItem("FEATURES") || "") : [];

	useEffect(() => {
		if (!isLoadingAddProducts) {
			dispatch(fetchProductsList(paramsFilter));
		}
	}, [paramsFilter, isLoadingAddProducts]);

	useEffect(() => {
		if (isMount) return;
		const { success, data, isLoading, error } = stateProductsList;
		if (!isLoading) {
			if (success) {
				setProductsList(data.data);
			}
		}
	}, [stateProductsList.isLoading]);

	useEffect(() => {
		if (features.includes("MODULE_PRODUCTS__CATEGORIES__VIEW_DETAIL")) {
			if (!stateUpdateCategory.isLoading) {
				dispatch(getCategoryById(paramsUrl.id));
			}
		} else {
			notifyWarning("Bạn không được quyền truy cập");
			history.push("/categories");
		}
	}, [paramsUrl.id, stateUpdateCategory.isLoading]);

	useEffect((): void | undefined => {
		if (isMount) return;
		const { data, message, success, error, isLoading } = stateUpdateCategory;
		if (!isLoading) {
			if (success) {
				notifySuccess("Cập nhập thành công!");
			}
			if (success === false || error) {
				return notifyError(message + "");
			}
		}
	}, [stateUpdateCategory.isLoading]);

	useEffect((): void | undefined => {
		if (isMount) return;
		const { data, message, success, error } = stateCategoryById;
		if (success) {
			setCategoryById(data?.data);
			let metaKeywords = data?.data?.meta_keywords?.split("; ");
			setCheckTitle(data?.data?.meta_title);
			setImage(data?.data?.meta_image);
			setImageCategory(data?.data?.category_image);
			setSelectedCategories(data?.data?.parent_id ? data?.data?.parent_id : undefined);
			formCreate.setFieldsValue({
				category_name: data?.data?.category_name,
				url: data?.data?.url,
				status: data?.data?.status,
				parent_id: data?.data?.parent_id ? data?.data?.parent_id : undefined,
				meta_title: data?.data?.meta_title,
				meta_description: data?.data?.meta_description,
				meta_keywords: metaKeywords,
				canonical: data?.data?.canonical,
				redirect_url: data?.data?.redirect_url,
				redirect_type: data?.data?.redirect_type === 300 ? true : false
			});
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateCategoryById.isLoading]);

	useEffect(() => {
		const getCategories = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/${API_CATEGORY}`, params)) as any;
				let data = response["data"];
				for (let i = 0; i < data.length; i++) {
					data[i].value = data[i].id;
					data[i].key = data[i].id;
					data[i].title = data[i].category_name;
					let childrenLv1 = data[i].children || [];
					for (let j = 0; j < childrenLv1.length; j++) {
						childrenLv1[j].value = childrenLv1[j].id;
						childrenLv1[j].key = childrenLv1[j].id;
						childrenLv1[j].title = childrenLv1[j].category_name;
						let childrenLv2 = childrenLv1[j].children || [];
						for (let k = 0; k < childrenLv2.length; k++) {
							childrenLv2[k].value = childrenLv2[k].id;
							childrenLv2[k].key = childrenLv2[k].id;
							childrenLv2[k].title = childrenLv2[k].category_name;
							let childrenLv3 = childrenLv2[k].children || [];

							for (let m = 0; m < childrenLv3.length; m++) {
								childrenLv3[m].value = childrenLv3[m].id;
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
			getCategories();
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	useEffect(() => {
		const getAddProducts = async (params?: any) => {
			setLoadingAddProducts(true);

			try {
				const response = (await api.get(`${API_URL}/${API_PRODUCTS}`, params)) as any;
				let data = response;
				setLoadingAddProducts(false);
				setProductsAddList({
					data: data?.data,
					total: data?.paging?.total
				});
			} catch (error: any) {
				setLoadingAddProducts(false);

				throw new Error(error.response.data.message);
			}
		};

		const timer = setTimeout(() => {
			if (openAddProduct) {
				getAddProducts(paramsAddFilter);
			}
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, [paramsAddFilter, openAddProduct]);

	const removeImage = () => {
		setImage("");
	};

	const removeImageCategory = () => {
		setImageCategory("");
	};
	const onChangeCategories = (newValue: string[], value: any, value2: any) => {
		setSelectedCategories(newValue.length > 0 ? [newValue[newValue.length - 1]] : []);
	};
	const tProps = {
		treeData: [...treeData],
		value: selectedCategories,
		onChange: onChangeCategories,
		multiple: false,
		treeCheckable: true,
		showCheckedStrategy: TreeSelect.SHOW_ALL,
		treeCheckStrictly: true,
		showSearch: true,
		placeholder: "Chọn danh mục",
		style: {
			width: "100%"
		}
	};

	const pushImageCategory = async (e: any) => {
		const files = e.target?.files[0];
		if (
			files &&
			(files.type === "image/png" ||
				files.type === "image/svg" ||
				files.type === "image/jpeg" ||
				files.type === "image/jpg" ||
				files.type === "image/gif" ||
				files.type === "image/ico")
		) {
			const bodyFormData = new FormData();
			bodyFormData.append("files", files);
			setLoadingCategory(true);
			try {
				const { data } = await axios.post(`${API_END_POINT}uploads`, bodyFormData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				});
				setLoadingCategory(false);
				setImageCategory(data?.data[0]);
			} catch (error) {
				setLoadingCategory(false);

				let msg = getMessageV1(`Lỗi ${error}`);
				return notifyError(msg);
			}
		} else {
			let msg = getMessageV1("Vui lòng chọn đúng file ảnh jpg / jpeg / png / svg / gif / ico", ", ");
			return notifyError(msg);
		}
	};

	const pushImage = async (e: any) => {
		const files = e.target?.files[0];
		if (
			files &&
			(files.type === "image/png" ||
				files.type === "image/svg" ||
				files.type === "image/jpeg" ||
				files.type === "image/jpg" ||
				files.type === "image/gif" ||
				files.type === "image/ico")
		) {
			const bodyFormData = new FormData();
			bodyFormData.append("files", files);
			bodyFormData.append("object_id", "1");
			bodyFormData.append("object", "stickers");
			setLoadingUpload(true);
			try {
				const { data } = await axios.post(`${API_END_POINT}uploads`, bodyFormData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				});
				setLoadingUpload(false);
				setImage(data?.data[0]);
			} catch (error) {
				setLoadingUpload(false);

				let msg = getMessageV1(`Lỗi ${error}`);
				return notifyError(msg);
			}
		} else {
			let msg = getMessageV1("Vui lòng chọn đúng file ảnh jpg / jpeg / png / svg / gif / ico", ", ");
			return notifyError(msg);
		}
	};

	const submitCreateCategory = (values: any) => {
		let metaKeywords = "";
		for (let i = 0; i < values.meta_keywords.length; i++) {
			if (i === values.meta_keywords.length - 1) {
				metaKeywords = metaKeywords + values.meta_keywords[i];
			} else {
				metaKeywords = metaKeywords + values.meta_keywords[i] + "; ";
			}
		}
		let fakeAtrributes = dataCategoryById?.attributes;
		fakeAtrributes = fakeAtrributes?.map((x: any) => {
			let a = x;
			delete a.values;
			return a;
		}) as any;
		let params = {
			attributes: fakeAtrributes,
			category_name: values?.category_name,
			description: descriptionRef?.current?.getContent(),
			url: values?.url,
			status: values?.status,
			parent_id: selectedCategories?.length > 0 ? selectedCategories[0]?.value : undefined,
			meta_title: checkTitle,
			meta_description: values?.meta_description,
			meta_keywords: metaKeywords,
			canonical: values?.canonical,
			meta_image: image,
			category_image: imageCategory,
			redirect_url: "redirect_url",
			redirect_type: 300
		};
		dispatch(updateCategory(paramsUrl.id, params));
	};

	const onChangeStatus = () => {};

	const submitFilter = (values: any) => {
		setParamsFilter({
			...paramsFilter,
			q: values.q,
			product_level: values.product_level,
			status: values.status,
			page: 1,
			limit: 10
		});
	};

	const submitFilterAdd = (values: any) => {
		console.log(values);
		setParamsAddFilter({
			q: values.q,
			page: 1,
			limit: 10
		});
	};
	const onChangePaging = (page: number, pageSize: number) => {
		const newParamsFilter = {
			...paramsFilter,
			page: page,
			limit: pageSize
		};
		setParamsFilter(newParamsFilter);
	};

	const onChangePagingAdd = (page: number, pageSize: number) => {
		const newParamsFilter = {
			...paramsAddFilter,
			page: page,
			limit: pageSize
		};
		setParamsAddFilter(newParamsFilter);
	};

	const [addSelectedRowKeys, setAddSelectedRowKeys] = useState<any[]>([]);
	const [addSelectedRows, setAddSelectedRows] = useState<any[]>([]);
	const [addSelectedDeleteRowKeys, setAddSelectedDeleteRowKeys] = useState<any[]>([]);
	const [addSelectedDeleteRows, setAddSelectedDeleteRows] = useState<any[]>([]);
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

	const rowSelectionDelete = {
		selectedRowKeys: addSelectedDeleteRowKeys,
		onSelect: (_record: any, _selected: boolean, _selectedRows: any) => {
			if (_selected) {
				setAddSelectedDeleteRowKeys([...addSelectedDeleteRowKeys, _record.id]);
				setAddSelectedDeleteRows([...addSelectedDeleteRows, _record]);
			} else {
				setAddSelectedDeleteRowKeys([...addSelectedDeleteRowKeys.filter((e: any) => e !== _record?.id)]);
				setAddSelectedDeleteRows([...addSelectedDeleteRows.filter((e: any) => e?.id !== _record?.id)]);
			}
		},
		onSelectAll: (_selected: boolean, _selectedRows: any, _changeRows: any) => {
			if (_selected) {
				let _rowkeys = _changeRows.map((e: any) => e.id);
				let _rows = _changeRows;
				setAddSelectedDeleteRowKeys([...addSelectedDeleteRowKeys, ..._rowkeys]);
				setAddSelectedDeleteRows([...addSelectedDeleteRows, ..._rows]);
			} else {
				let _rowKeys: any[] = addSelectedDeleteRowKeys;
				let _rows: any[] = addSelectedDeleteRows;
				_changeRows.forEach((e: any) => {
					_rowKeys = _rowKeys.filter((item) => item !== e.id);
					_rows = _rows.filter((item) => item?.id !== e?.id);
				});

				setAddSelectedDeleteRowKeys(_rowKeys);
				setAddSelectedDeleteRows(_rows);
			}
		}
	};

	const handleAddProductToCategory = async () => {
		if (addSelectedRowKeys.length > 0) {
			try {
				let params = {
					new_products: addSelectedRowKeys,
					updated_products: [],
					removed_products: [],
					removed_cascade: false
				};
				setIsLoadingAddProducts(true);
				const response = (await api.put(`${API_URL}/categories/${paramsUrl?.id}/update-products`, params)) as any;

				if (response.success) {
					setAddSelectedRowKeys([]);
					setAddSelectedRows([]);
					notifySuccess("Cập nhật thành công");
					setOpenAddProduct(false);
					setIsLoadingAddProducts(false);
					setTabIndex(2);
					formFilterAdd.resetFields();
					setParamsAddFilter({
						q: undefined,
						page: 1,
						limit: 10
					});
				}
			} catch (error: any) {
				setIsLoadingAddProducts(false);
				throw new Error(error.response.data.message);
			}
		} else {
			notifyWarning("Vui lòng chọn sản phẩm để thêm");
		}
	};

	const handleDeleteProductToCategory = async () => {
		if (addSelectedDeleteRowKeys.length > 0) {
			try {
				let params = {
					new_products: [],
					updated_products: [],
					removed_products: addSelectedDeleteRowKeys,
					removed_cascade: false
				};
				setIsLoadingAddProducts(true);
				const response = (await api.put(`${API_URL}/categories/${paramsUrl?.id}/update-products`, params)) as any;

				if (response.success) {
					setAddSelectedRowKeys([]);
					setAddSelectedRows([]);
					notifySuccess("Cập nhật thành công");
					setOpenDeleteProduct(false);
					setIsLoadingAddProducts(false);
					setTabIndex(2);
				}
			} catch (error: any) {
				setIsLoadingAddProducts(false);
				throw new Error(error.response.data.message);
			}
		} else {
			notifyWarning("Vui lòng chọn sản phẩm để xoá");
		}
	};
	return (
		<div className="mainPages categoryPage__create">
			<Modal
				visible={visibleDelete}
				onCancel={() => setVisibleDelete(false)}
				onOk={() => {
					removeImage();
					setVisibleDelete(false);
				}}
			>
				<div style={{ color: "red", fontWeight: "700" }}>Xác nhận xóa hình ảnh</div>
			</Modal>
			<Modal
				visible={visibleDeleteCategory}
				onCancel={() => setVisibleDeleteCategory(false)}
				onOk={() => {
					removeImageCategory();
					setVisibleDeleteCategory(false);
				}}
			>
				<div style={{ color: "red", fontWeight: "700" }}>Xác nhận xóa hình ảnh</div>
			</Modal>
			<Modal
				visible={openDeleteProduct}
				onCancel={() => setOpenDeleteProduct(false)}
				onOk={() => {
					handleDeleteProductToCategory();
				}}
			>
				<div style={{ color: "red", fontWeight: "700" }}>Xác nhận gỡ sản phẩm khỏi danh mục!</div>
			</Modal>
			<Modal visible={visible} footer={null} onCancel={() => setVisible(false)}>
				<img alt={`${image}`} style={{ width: "100%" }} src={`${API_URL_CDN}${image}`} />
			</Modal>
			<Modal visible={visibleCategory} footer={null} onCancel={() => setVisibleCategory(false)}>
				<img alt={`${imageCategory}`} style={{ width: "100%" }} src={`${API_URL_CDN}${imageCategory}`} />
			</Modal>
			<Modal
				title="Thêm sản phẩm vào danh mục"
				visible={openAddProduct}
				footer={null}
				onCancel={() => setOpenAddProduct(false)}
				width={900}
				centered
			>
				<Form
					form={formFilterAdd}
					id="formFilterAdd"
					onFinish={submitFilterAdd}
					style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
				>
					<Form.Item name="q" style={{ width: "calc(100% - 128px)", margin: "0" }}>
						<Input
							onKeyDown={(e: any) => {
								if (e.key === "Enter") {
									formFilterAdd.submit();
								}
							}}
							className="defaultInput"
							placeholder="Nhập tên sản phẩm, barcode, sku"
						/>
					</Form.Item>
					<div className="searchButton" onClick={() => formFilterAdd.submit()}>
						<SvgIconSearch />
						&nbsp;Tìm kiếm
					</div>
				</Form>
				<div style={{ marginTop: "8px", maxHeight: "60vh", overflowY: "scroll" }}>
					<TableStyledAntd
						style={{ marginTop: "8px" }}
						rowKey="id"
						dataSource={productsAddList?.data?.length > 0 ? productsAddList?.data : []}
						bordered
						loading={loadingAddProducts}
						pagination={false}
						columns={columnsDataAddProducts() as any}
						rowSelection={rowSelection}
					/>
				</div>
				<PanigationAntStyled
					style={{ marginTop: "8px" }}
					current={paramsAddFilter.page}
					pageSize={paramsAddFilter.limit}
					showSizeChanger
					onChange={onChangePagingAdd}
					showTotal={() => `Tổng ${productsAddList?.total} sản phẩm `}
					total={productsAddList?.total}
				/>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: "8px" }}>
					<div
						className="searchButton"
						onClick={() => {
							formFilterAdd.resetFields();
							setParamsAddFilter({
								q: undefined,
								page: 1,
								limit: 10
							});
						}}
					>
						<SvgIconRefresh />
						&nbsp;Làm mới
					</div>

					<div className="defaultButton" style={{ marginLeft: "8px" }} onClick={() => handleAddProductToCategory()}>
						<SvgIconPlus style={{ transform: "scale(0.7)" }} />
						&nbsp;Thêm vào danh sách
					</div>
				</div>
			</Modal>
			<SubHeader
				breadcrumb={[{ text: "Quản lý sản phẩm" }, { text: "Danh mục", link: "/categories" }, { text: "Chi tiết" }]}
			/>
			<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
				<div style={{ display: "flex", alignItems: "center" }}>
					<div onClick={() => setTabIndex(1)} className={tabIndex === 1 ? "defaultButton" : "searchButton"}>
						Thông tin danh mục
					</div>
					<div
						onClick={() => setTabIndex(2)}
						style={{ marginLeft: "8px" }}
						className={tabIndex === 2 ? "defaultButton" : "searchButton"}
					>
						Danh sách sản phẩm
					</div>
				</div>
				{features.includes("MODULE_PRODUCTS__CATEGORIES__UPDATE") && (
					<div onClick={() => formCreate.submit()} className="defaultButton">
						<SvgIconStorage style={{ transform: "scale(0.7)" }} />
						&nbsp;Lưu
					</div>
				)}
			</div>
			{tabIndex === 1 && (
				<Form
					onFinish={submitCreateCategory}
					layout="vertical"
					id="formCreate"
					form={formCreate}
					style={{ display: "flex", justifyContent: "space-between" }}
					initialValues={{
						status: false
					}}
				>
					<div style={{ width: "calc(65% - 6.5px)" }}>
						<div
							style={{
								padding: "16px",
								background: "#fff",
								borderRadius: "5px",
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								flexWrap: "wrap"
							}}
						>
							<Form.Item
								label="Tên danh mục"
								style={{ width: "calc(50% - 4px)" }}
								name="category_name"
								rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
							>
								<Input className="defaultInput" placeholder="Nhập tên danh mục" />
							</Form.Item>
							<Form.Item
								label="URL"
								style={{ width: "calc(50% - 4px)" }}
								name="url"
								rules={[
									{ required: true, pattern: checkSlugValidation, message: "Vui lòng đúng định dạng slug ../../.." }
								]}
							>
								<Input className="defaultInput" placeholder="Nhập URL" />
							</Form.Item>
							<h4
								style={{ margin: "0", width: "100%", fontWeight: "400" }}
								onClick={() => console.log(descriptionRef?.current?.getContent())}
							>
								Mô tả ngắn
							</h4>
							<Editor2
								refEditor={descriptionRef}
								initialValue={dataCategoryById?.description}
								// textareaName="promo_text"
								onInit={(evt: any, editor: any) => (descriptionRef.current = editor)}
								toolbar={
									"undo redo | formatselect | forecolor backcolor| " +
									"bold italic backcolor image link media | alignleft aligncenter alignright alignjustify |" +
									"removeformat | help preview table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol"
								}
							/>
							<div style={{ marginTop: "8px", width: "100%" }}>
								<p style={{ margin: "0" }}>Thuộc tính</p>
								{dataCategoryById?.attributes?.length > 0 &&
									dataCategoryById?.attributes?.map((x: any, index: any) => (
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
												style={{ width: "calc(100% - 70px)" }}
												disabled
												value={x?.attribute_name}
											/>
											<Switch
												checked={x.status}
												onChange={(e: any) => {
													let fakeArray = [...dataCategoryById?.attributes];
													fakeArray = fakeArray.map((item: any) => (item.id === x.id ? { ...item, status: e } : item));
													setCategoryById({ dataCategoryById, attributes: fakeArray });
												}}
											/>
										</div>
									))}
							</div>
						</div>
					</div>
					<div style={{ width: "calc(35% - 6.5px)" }}>
						<div style={{ padding: "16px", background: "#fff", borderRadius: "5px" }}>
							<Form.Item label="Trạng thái hiển thị" style={{ margin: "0" }} name="status">
								<Radio.Group>
									<Radio value={true} style={{ marginRight: "16px" }}>
										Hiển thị
									</Radio>
									<Radio value={false}>Ẩn</Radio>
								</Radio.Group>
							</Form.Item>
						</div>
						<div style={{ padding: "16px", background: "#fff", borderRadius: "5px", marginTop: "13px" }}>
							<Form.Item label="Danh mục" style={{ margin: "0" }} name="parent_id">
								<TreeSelect
									disabled={stateCategoryById?.data?.data?.parent_id}
									{...tProps}
									className="defaultSelect hiddenCloseIconTreeData"
									filterTreeNode={(search: any, item: any) => {
										return item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
									}}
									placeholder="Chọn danh mục cha"
								/>
							</Form.Item>
						</div>
						<div style={{ padding: "16px", background: "#fff", borderRadius: "5px", marginTop: "13px" }}>
							<div className="uploadImageBlock">
								<h4>Ảnh danh mục</h4>
								<div className="bannerImage-body" style={{ width: "150px", height: "150px" }}>
									{loadingCategory ? (
										<Spin />
									) : imageCategory ? (
										<div
											className="bannerImage-image"
											onMouseOver={() => setOverplayCategory(true)}
											onMouseLeave={() => setOverplayCategory(false)}
										>
											{overplayCategory && (
												<div className="overplay">
													<div onClick={() => setVisibleCategory(true)}>
														<EyeOutlined />
													</div>
													<div onClick={() => setVisibleDeleteCategory(true)}>
														<DeleteOutlined />
													</div>
												</div>
											)}
											<img src={`${API_URL_CDN}${imageCategory}`} alt="banner" />
										</div>
									) : (
										<>
											<label htmlFor="uploadImageCategory" className="uploadImage">
												<SvgUploadImageBlock />
												<div className="uploadImage-btn">
													<SvgIconExportFile />
													Tải ảnh lên
												</div>
												{"Dung lượng < 1MB"}
											</label>
											<input
												type="file"
												id="uploadImageCategory"
												onChange={(e) => pushImageCategory(e)}
												style={{ display: "none" }}
											/>
										</>
									)}
								</div>
							</div>
						</div>
						<div style={{ padding: "16px", background: "#fff", borderRadius: "5px", marginTop: "13px" }}>
							<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
								<p style={{ margin: "0" }}>Page title</p>
								<p style={{ margin: "0" }}>Số ký tự đã dùng:{checkTitle?.length || 0}/60</p>
							</div>
							<Input
								className="defaultInput"
								placeholder="Nhập page title"
								value={checkTitle}
								onChange={(e: any) => {
									e.target.value?.length < 61 && setCheckTitle(e.target.value);
								}}
							/>
							<Form.Item style={{ margin: "0 0 13px 0" }}>
								<Checkbox>Create permanent redirect for old URL</Checkbox>
							</Form.Item>
							<Form.Item
								name="meta_description"
								label="Meta description"
								style={{ margin: "0 0 13px 0" }}
								rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
							>
								<Input.TextArea style={{ borderRadius: "5px" }} placeholder="Nhập meta description" />
							</Form.Item>
							<Form.Item
								name="meta_keywords"
								label="Meta keywords"
								style={{ margin: "0 0 13px 0" }}
								rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
							>
								<Select mode="tags" className="defaultSelect" />
							</Form.Item>
							<Form.Item
								name="canonical"
								label="Canonical (Vui lòng nhập full link)"
								style={{ margin: "0 0 13px 0" }}
								rules={[{ required: true, pattern: checkIsLinkURLRegex, message: "Vui lòng nhập full link" }]}
							>
								<Input className="defaultInput" />
							</Form.Item>
							<div className="uploadImageBlock">
								<h4>Meta image</h4>
								<div className="bannerImage-body">
									{loadingUpload ? (
										<Spin />
									) : image ? (
										<div
											className="bannerImage-image"
											onMouseOver={() => setOverplay(true)}
											onMouseLeave={() => setOverplay(false)}
										>
											{overplay && (
												<div className="overplay">
													<div onClick={() => setVisible(true)}>
														<EyeOutlined />
													</div>
													<div onClick={() => setVisibleDelete(true)}>
														<DeleteOutlined />
													</div>
												</div>
											)}
											<img
												src={`${API_URL_CDN}${image}`}
												alt="banner"
												style={{ maxHeight: "200px", maxWidth: "100%" }}
											/>
										</div>
									) : (
										<>
											<label htmlFor="uploadImage" className="uploadImage">
												<SvgUploadImageBlock />
												<div className="uploadImage-btn">
													<SvgIconExportFile />
													Tải ảnh lên
												</div>
												{"Dung lượng < 1MB"}
											</label>
											<input type="file" id="uploadImage" onChange={(e) => pushImage(e)} style={{ display: "none" }} />
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				</Form>
			)}
			{tabIndex === 2 && (
				<div>
					<Form
						form={formFilter}
						onFinish={submitFilter}
						id="formFilter"
						layout="vertical"
						style={{
							padding: "8px 16px 16px 16px",
							background: "#fff",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							borderRadius: "5px",
							flexWrap: "wrap"
						}}
					>
						<Form.Item
							name="q"
							label="Tìm kiếm"
							style={{
								margin: "0",
								minWidth: "120px",
								width: features.includes("MODULE_PRODUCTS__CATEGORIES__UPDATE_PRODUCT_CATEGORY")
									? "calc((100% - 520px) /3)"
									: "calc((100% - 272px) /3)"
							}}
						>
							<Input
								onKeyDown={(e: any) => {
									if (e.key === "Enter") {
										formFilter.submit();
									}
								}}
								className="defaultInput"
								placeholder="Tên sản phẩm, barcode, sku"
							/>
						</Form.Item>
						<Form.Item
							name="product_level"
							label="Loại sản phẩm"
							style={{
								margin: "0",
								minWidth: "120px",
								width: features.includes("MODULE_PRODUCTS__CATEGORIES__UPDATE_PRODUCT_CATEGORY")
									? "calc((100% - 520px) /3)"
									: "calc((100% - 272px) /3)"
							}}
						>
							<Select options={productLevelData} className="defaultSelect" placeholder="Chọn loại sản phẩm" />
						</Form.Item>
						<Form.Item
							name="status"
							label="Trạng thái"
							style={{
								margin: "0",
								minWidth: "120px",
								width: features.includes("MODULE_PRODUCTS__CATEGORIES__UPDATE_PRODUCT_CATEGORY")
									? "calc((100% - 520px) /3)"
									: "calc((100% - 272px) /3)"
							}}
						>
							<Select
								options={[
									{ label: "Hiển thị", value: true },
									{ label: "Ẩn", value: false }
								]}
								className="defaultSelect"
								placeholder="Chọn trạng thái"
							/>
						</Form.Item>
						<div className="searchButton" style={{ marginTop: "20px" }} onClick={() => formFilter.submit()}>
							<SvgIconSearch />
							&nbsp;Tìm kiếm
						</div>
						<div
							className="searchButton"
							style={{ marginTop: "20px" }}
							onClick={() => {
								formFilter.resetFields();
								setParamsFilter({
									category_ids: paramsUrl.id,
									q: undefined,
									status: undefined,
									product_status: undefined,
									page: 1,
									limit: 10
								});
							}}
						>
							<SvgIconRefresh />
							&nbsp;Làm mới
						</div>
						{features.includes("MODULE_PRODUCTS__CATEGORIES__UPDATE_PRODUCT_CATEGORY") && (
							<div className="defaultButton" style={{ marginTop: "20px" }} onClick={() => setOpenAddProduct(true)}>
								<SvgIconPlus style={{ transform: "scale(0.7)" }} />
								&nbsp;Thêm sản phẩm vào danh mục
							</div>
						)}
					</Form>
					<div className="contentSection">
						<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
							{features.includes("MODULE_PRODUCTS__CATEGORIES__UPDATE_PRODUCT_CATEGORY") && (
								<div
									className="searchButton"
									style={{ marginRight: "8px" }}
									onClick={() => {
										addSelectedDeleteRowKeys.length > 0
											? setOpenDeleteProduct(true)
											: notifyWarning("Vui lòng chọn sản phẩm để xoá");
									}}
								>
									<SvgBannerBin />
									&nbsp;Xoá
								</div>
							)}
							<div className="searchButton" style={{ marginRight: "8px" }}>
								<SvgImport style={{ transform: "scale(0.7)" }} />
								&nbsp;Xuất file
							</div>
							<div className="searchButton">
								<SvgSort style={{ transform: "scale(0.7)" }} />
								&nbsp;Sắp xếp
							</div>
						</div>
						<TableStyledAntd
							style={{ marginTop: "8px" }}
							rowKey="id"
							dataSource={productsList?.length > 0 ? productsList : []}
							bordered
							pagination={false}
							columns={columnsDataProducts({ onChangeStatus }) as any}
							rowSelection={rowSelectionDelete}
						/>

						<PanigationAntStyled
							style={{ marginTop: "8px" }}
							current={paramsFilter.page}
							pageSize={paramsFilter.limit}
							showSizeChanger
							onChange={onChangePaging}
							showTotal={() => `Tổng ${stateProductsList?.data?.paging.total} sản phẩm `}
							total={stateProductsList?.data?.paging.total}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default CategoryEdit;
