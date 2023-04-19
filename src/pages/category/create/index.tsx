import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { Checkbox, Form, Input, Modal, Radio, Select, Spin, TreeSelect } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SvgIconExportFile from "src/assets/svg/SvgIconExportFile";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import SvgUploadImageBlock from "src/assets/svg/SvgUploadImageBlock";
import Editor2 from "src/components/editor/EditorV2";
import { notifyError, notifySuccess } from "src/components/notification";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import SubHeader from "src/components/subHeader/SubHeader";
import SellerContext from "src/context/sellerContext";
import { updateOneCatalog } from "src/services/actions/catalogs.actions";
import { createOneCategory } from "src/services/actions/category.actions";
import { api } from "src/services/api/api.index";
import { API_END_POINT, API_URL, API_URL_CDN } from "src/services/api/config";
import { API_CATEGORY } from "src/services/api/url.index";
import { AppState } from "src/types";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { checkIsLinkURLRegex, checkSlugValidation } from "src/utils/helpers/functions/textUtils";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";

const CategoryCreate = () => {
	const { sellerInfo } = useContext(SellerContext) as any;

	const [formCreate] = Form.useForm();
	const dispatch = useDispatch();
	const history = useHistory();
	const isMount = useIsMount();
	const descriptionRef = useRef() as any;
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

	const { stateCreateCategory } = useSelector((e: AppState) => e.categoriesReducer);
	const { stateUpdateOneCatalog } = useSelector((e: AppState) => e.catalogsReducer);
	useEffect((): void | undefined => {
		if (isMount) return;
		const { data, message, success, error, isLoading } = stateCreateCategory;
		if (!isLoading) {
			if (success) {
				notifySuccess("Tạo thành công!");
				console.log("datacreate", data);
				if (sellerInfo.user_type !== "admin") {
					dispatch(
						updateOneCatalog(sellerInfo.catalog_id, {
							category_ids: [data?.data?.id]
						})
					);
				} else {
					history.push("/categories");
				}
			}
			if (success === false || error) {
				return notifyError(message + "");
			}
		}
	}, [stateCreateCategory.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { isLoading, data, message, success, error } = stateUpdateOneCatalog;
		if (!isLoading) {
			if (success) {
				notifySuccess("Thêm danh mục vào ngành hàng thành công");
				history.push("/categories");
			}
		}

		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateUpdateOneCatalog.isLoading]);

	useEffect(() => {
		const getCategories = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/${API_CATEGORY}`, params)) as any;
				let data = response["data"];
				for (let i = 0; i < data.length; i++) {
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
			getCategories({
				catalog_id: sellerInfo.catalog_id,
				status: true,
				limit: 10000,
				page: 1
			});
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, [sellerInfo]);

	const removeImage = () => {
		setImage("");
	};

	const removeImageCategory = () => {
		setImageCategory("");
	};
	const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
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

		let params = {
			category_name: values?.category_name,
			description: descriptionRef?.current?.getContent(),
			url: values?.url,
			status: values?.status,
			parent_id: selectedCategories[0]?.value,
			meta_title: checkTitle,
			meta_description: values?.meta_description,
			meta_keywords: metaKeywords,
			canonical: values?.canonical,
			meta_image: image,
			category_image: imageCategory,
			redirect_url: "redirect_url",
			redirect_type: 300
		};
		dispatch(createOneCategory(params));
	};
	return (
		<div className="mainPages categoryPage__create">
			<OverlaySpinner open={stateUpdateOneCatalog.isLoading} text="Thêm danh mục vào ngành hàng" />
			<OverlaySpinner open={stateCreateCategory.isLoading} text="Đang tạo danh mục" />

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
			<Modal visible={visible} footer={null} onCancel={() => setVisible(false)}>
				<img alt={`${image}`} style={{ width: "100%" }} src={`${API_URL_CDN}${image}`} />
			</Modal>
			<Modal visible={visibleCategory} footer={null} onCancel={() => setVisibleCategory(false)}>
				<img alt={`${imageCategory}`} style={{ width: "100%" }} src={`${API_URL_CDN}${imageCategory}`} />
			</Modal>
			<SubHeader breadcrumb={[{ text: "Quản lý sản phẩm" }, { text: "Danh mục" }]} />
			<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
				<div style={{ display: "flex", alignItems: "center" }}>
					<div className="defaultButton">Thông tin danh mục</div>
				</div>

				<div onClick={() => formCreate.submit()} className="defaultButton">
					<SvgIconStorage style={{ transform: "scale(0.7)" }} />
					&nbsp;Lưu
				</div>
			</div>
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
							initialValue={""}
							// textareaName="promo_text"
							onInit={(evt: any, editor: any) => (descriptionRef.current = editor)}
							toolbar={
								"undo redo | formatselect | forecolor backcolor| " +
								"bold italic backcolor image link media | alignleft aligncenter alignright alignjustify |" +
								"removeformat | help preview table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol"
							}
						/>
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
						<Form.Item label="Danh mục" style={{ margin: "0" }}>
							<TreeSelect
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
							rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
							name="meta_description"
							label="Meta description"
							style={{ margin: "0 0 13px 0" }}
						>
							<Input.TextArea style={{ borderRadius: "5px" }} placeholder="Nhập meta description" />
						</Form.Item>
						<Form.Item
							rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
							name="meta_keywords"
							label="Meta keywords"
							style={{ margin: "0 0 13px 0" }}
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
										<img src={`${API_URL_CDN}${image}`} alt="banner" style={{ maxHeight: "200px", maxWidth: "100%" }} />
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
		</div>
	);
};

export default CategoryCreate;
