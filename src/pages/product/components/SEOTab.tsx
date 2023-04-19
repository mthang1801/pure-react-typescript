import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { Checkbox, Form, Image, Input, Modal, Select, Spin, Tag } from "antd";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import SvgNoImage from "src/assets/svg/Noimage";
import SvgIconExportFile from "src/assets/svg/SvgIconExportFile";
import SvgUploadImageBlock from "src/assets/svg/SvgUploadImageBlock";
import Editor2 from "src/components/editor/EditorV2";
import { notifyError } from "src/components/notification";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import { API_END_POINT, API_URL_CDN, API_URL_FE } from "src/services/api/config";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { checkIsLinkURLRegex, checkSlugValidation } from "src/utils/helpers/functions/textUtils";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { CreateProductContext } from "../create";
import UploadImages from "./UploadImages";
import UploadMetaImage from "./UploadMetaImage";
import UploadThumbnail from "./UploadThumbnail";
const SEOTab = ({
	metaImage,
	setMetaImage,
	thumbnailImage,
	setThumbnailImage,
	product,
	descriptionRef,
	promotionInfoRef,
	shortDescriptionRef,
	otherInfoRef,
	productLevel,
	setProductLevel,
	imagesList,
	setImagesList
}: any) => {
	const [metaTitle, setMetaTitle] = useState<string>("");
	const isMount = useIsMount();
	const [url, setUrl] = useState<string>("");
	const [metaDescription, setMetaDescription] = useState<string>("");
	const [canonical, setCanonical] = useState<string>("");
	const [metaKeywords, setMetaKeywords] = useState<string>("");
	const [loadingUpload, setLoadingUpload] = useState(false);
	const [loadingUploadThumbnail, setLoadingUploadThumbnail] = useState(false);
	const [visible, setVisible] = useState(false);
	const [visibleDelete, setVisibleDelete] = useState(false);
	const [selectedImage, setSelectedImage] = useState("");
	const [overplay, setOverplay] = useState(false);
	const [overplayThumbnail, setOverplayThumbnail] = useState(false);
	const [overplayImages, setOverplayImages] = useState<any[]>([]);
	useEffect(() => {
		let fakeArray = [];
		for (let i = 0; i < imagesList?.length; i++) {
			fakeArray.push({ visible: false, value: imagesList[i] });
		}
		setOverplayImages(fakeArray);
	}, [imagesList]);
	useEffect(() => {
		if (isMount) return;
		_renderPreviewMetaCard();
	}, [metaImage]);

	const _renderPreviewMetaCard = () => {
		return (
			<div className="flex space-x-2 items-start p-3 border rounded-md">
				{metaImage ? (
					<img className="w-[80px]" src={`${API_URL_CDN}${metaImage}`} alt="preview-meta-image" />
				) : (
					<SvgNoImage />
				)}
				<div>
					<div className="font-bold text-green-600">{metaTitle}</div>
					<div>{metaDescription}</div>
					<div>{metaKeywords}</div>
					{url && (
						<a className="text-blue-600 hover:text-blue-800" href={`${API_URL_FE}${url}`}>
							{`${API_URL_FE}${url}`}
						</a>
					)}
				</div>
			</div>
		);
	};
	const pushImage = async (e: any, item: any) => {
		const files = e.target?.files[0];
		if (!files) {
			return;
		}
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
			if (item === 1 || item === 3) {
				setLoadingUpload(true);
			}
			if (item === 2) {
				setLoadingUploadThumbnail(true);
			}

			try {
				const { data } = await axios.post(`${API_END_POINT}uploads`, bodyFormData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				});
				if (item === 1) {
					setMetaImage && setMetaImage(data?.data[0]);
					setLoadingUpload(false);
				}
				if (item === 2) {
					setThumbnailImage && setThumbnailImage(data?.data[0]);
					setLoadingUploadThumbnail(false);
				}
				if (item === 3) {
					setLoadingUpload(false);

					let arrayFake = [...imagesList, data?.data[0]] as any;
					setImagesList(arrayFake);
				}
				e.target.value = "";
			} catch (error) {
				if (item === 1) {
					setLoadingUpload(false);
				}
				if (item === 2) {
					setLoadingUploadThumbnail(false);
				}
				let msg = getMessageV1(`Lỗi ${error}`);
				return notifyError(msg);
			}
		} else {
			let msg = getMessageV1("Vui lòng chọn đúng file ảnh jpg / jpeg / png / svg / gif / ico", ", ");
			return notifyError(msg);
		}
	};

	return (
		<div style={{ display: "flex", justifyContent: "space-between" }}>
			<OverlaySpinner open={loadingUpload || loadingUploadThumbnail} text="Upload ảnh" />
			<Modal
				visible={visibleDelete}
				onCancel={() => setVisibleDelete(false)}
				onOk={() => {
					// removeImage();
					setVisibleDelete(false);
				}}
			>
				<div style={{ color: "red", fontWeight: "700" }}>Xác nhận xóa hình ảnh</div>
			</Modal>
			<Modal visible={visible} footer={null} onCancel={() => setVisible(false)}>
				<img alt={`${selectedImage}`} style={{ width: "100%" }} src={`${API_URL_CDN}${selectedImage}`} />
			</Modal>
			<div style={{ width: "calc(65% - 6.5px)" }}>
				{productLevel !== "2" && (
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
						<h4
							style={{ margin: "0", width: "100%", fontWeight: "400" }}
							onClick={() => console.log(descriptionRef?.current?.getContent())}
						>
							Mô tả ngắn
						</h4>
						<Editor2
							refEditor={shortDescriptionRef}
							initialValue={product?.short_description}
							// textareaName="promo_text"
							onInit={(evt: any, editor: any) => {
								if (shortDescriptionRef) {
									shortDescriptionRef.current = editor;
								}
							}}
							height={350}
							toolbar={
								"undo redo | formatselect | forecolor backcolor| " +
								"bold italic backcolor image link media | alignleft aligncenter alignright alignjustify |" +
								"removeformat | help preview table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol"
							}
						/>
						<h4
							style={{ margin: "8px 0 0 0", width: "100%", fontWeight: "400" }}
							onClick={() => console.log(descriptionRef?.current?.getContent())}
						>
							Nội dung
						</h4>
						<Editor2
							refEditor={descriptionRef}
							initialValue={product?.description}
							height={350}
							// textareaName="promo_text"
							onInit={(evt: any, editor: any) => {
								if (descriptionRef) {
									descriptionRef.current = editor;
								}
							}}
							toolbar={
								"undo redo | formatselect | forecolor backcolor| " +
								"bold italic backcolor image link media | alignleft aligncenter alignright alignjustify |" +
								"removeformat | help preview table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol"
							}
						/>
						<h4
							style={{ margin: "8px 0 0 0", width: "100%", fontWeight: "400" }}
							onClick={() => console.log(descriptionRef?.current?.getContent())}
						>
							Thông tin khác
						</h4>
						<Editor2
							refEditor={otherInfoRef}
							initialValue={product?.other_info}
							height={350}
							// textareaName="promo_text"
							onInit={(evt: any, editor: any) => {
								if (otherInfoRef) {
									otherInfoRef.current = editor;
								}
							}}
							toolbar={
								"undo redo | formatselect | forecolor backcolor| " +
								"bold italic backcolor image link media | alignleft aligncenter alignright alignjustify |" +
								"removeformat | help preview table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol"
							}
						/>
						<h4
							style={{ margin: "8px 0 0 0", width: "100%", fontWeight: "400" }}
							onClick={() => console.log(descriptionRef?.current?.getContent())}
						>
							Thông tin khuyến mãi
						</h4>
						<Editor2
							refEditor={promotionInfoRef}
							initialValue={product?.promotion_info}
							height={350}
							// textareaName="promo_text"
							onInit={(evt: any, editor: any) => {
								if (promotionInfoRef) {
									promotionInfoRef.current = editor;
								}
							}}
							toolbar={
								"undo redo | formatselect | forecolor backcolor| " +
								"bold italic backcolor image link media | alignleft aligncenter alignright alignjustify |" +
								"removeformat | help preview table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol"
							}
						/>
					</div>
				)}

				<div
					style={{
						padding: "16px",
						background: "#fff",
						borderRadius: "5px",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						flexWrap: "wrap",
						marginTop: "13px"
					}}
				>
					<div className="uploadImageBlock">
						<h4>Ảnh thumbnail</h4>
						<div className="bannerImage-body" style={{ width: "200px", height: "200px" }}>
							{loadingUploadThumbnail ? (
								<Spin />
							) : thumbnailImage ? (
								<div
									className="bannerImage-image"
									onMouseOver={() => setOverplayThumbnail(true)}
									onMouseLeave={() => setOverplayThumbnail(false)}
								>
									{overplayThumbnail && (
										<div className="overplay">
											<div>
												<EyeOutlined
													onClick={() => {
														setSelectedImage(thumbnailImage);
														setVisible(true);
													}}
												/>
											</div>
											<div>
												<DeleteOutlined onClick={() => setThumbnailImage("")} />
											</div>
										</div>
									)}
									<img src={`${API_URL_CDN}${thumbnailImage}`} alt="banner" />
								</div>
							) : (
								<>
									<label htmlFor="uploadThumbnail" className="uploadImage">
										<SvgUploadImageBlock />
										<div className="uploadImage-btn">
											<SvgIconExportFile />
											Tải ảnh lên
										</div>
										{"Dung lượng < 1MB"}
									</label>
									<input
										type="file"
										id="uploadThumbnail"
										onChange={(e) => pushImage(e, 2)}
										style={{ display: "none" }}
									/>
								</>
							)}
						</div>
					</div>
					{productLevel !== "2" && (
						<>
							<h4 style={{ width: "100%", margin: "8px 0 0 0" }}>Danh sách ảnh</h4>
							<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", flexWrap: "wrap" }}>
								{imagesList?.length > 0 &&
									imagesList?.map((x: any) => (
										<div className="uploadImageBlocks" style={{ marginRight: "8px" }}>
											<div className="bannerImage-body">
												<div
													className="bannerImage-image"
													onMouseOver={() => {
														let fakeArray = [...overplayImages];
														fakeArray = fakeArray.map((a: any) => (a.value === x ? { ...a, visible: true } : a));
														setOverplayImages(fakeArray);
													}}
													onMouseLeave={() => {
														let fakeArray = [...overplayImages];
														fakeArray = fakeArray.map((a: any) => (a.value === x ? { ...a, visible: false } : a));
														setOverplayImages(fakeArray);
													}}
												>
													{overplayImages.find((a: any) => a.value === x)?.visible && (
														<div className="overplay">
															<div>
																<EyeOutlined
																	onClick={() => {
																		setVisible(true);
																		setSelectedImage(x);
																	}}
																/>
															</div>
															<div>
																<DeleteOutlined
																	onClick={() => {
																		let fakeArray = [...overplayImages];
																		fakeArray = fakeArray.filter((a: any) => a.value !== x);
																		setOverplayImages(fakeArray);
																		let fakeArray2 = [...imagesList];
																		fakeArray2 = fakeArray2.filter((a: any) => a !== x);
																		setImagesList(fakeArray2);
																	}}
																/>
															</div>
														</div>
													)}
													<img src={`${API_URL_CDN}${x}`} alt="banner" />
												</div>
											</div>
										</div>
									))}
								<div className="uploadImageBlocks">
									<div className="bannerImage-body">
										<label htmlFor="uploadImages" className="uploadImage">
											<SvgUploadImageBlock />
											<div className="uploadImage-btn">
												<SvgIconExportFile />
												Tải ảnh lên
											</div>
											<span style={{ fontSize: "10px" }}>{"Dung lượng < 1MB"}</span>
										</label>
										<input
											type="file"
											id="uploadImages"
											onChange={(e) => pushImage(e, 3)}
											style={{ display: "none" }}
										/>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
			{productLevel !== "2" && (
				<div style={{ width: "calc(35% - 6.5px)" }}>
					<div style={{ padding: "16px", background: "#fff", borderRadius: "5px" }}>
						{/* <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
						<p style={{ margin: "0" }}>Page title</p>
						<p style={{ margin: "0" }}>Số ký tự đã dùng:{checkTitle?.length || 0}/60</p>
					</div> */}
						<Form.Item
							rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
							name="meta_title"
							label="Page title"
							style={{ margin: "0 0 13px 0" }}
						>
							<Input className="defaultInput" placeholder="Nhập page title" />
						</Form.Item>
						<Form.Item
							name="url"
							label="URL"
							rules={[
								{ required: true, pattern: checkSlugValidation, message: "Vui lòng đúng định dạng slug ../../.." }
							]}
							style={{ margin: "0 0 13px 0" }}
						>
							<Input className="defaultInput" placeholder="Nhập page title" />
						</Form.Item>
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
							rules={[{ required: true, pattern: checkIsLinkURLRegex, message: "Vui lòng nhập full link" }]}
							name="canonical"
							label="Canonical (Vui lòng nhập full link)"
							style={{ margin: "0 0 13px 0" }}
						>
							<Input className="defaultInput" />
						</Form.Item>
						<div className="uploadImageBlock">
							<h4>Meta image</h4>
							<div className="bannerImage-body">
								{loadingUpload ? (
									<Spin />
								) : metaImage ? (
									<div
										className="bannerImage-image"
										onMouseOver={() => setOverplay(true)}
										onMouseLeave={() => setOverplay(false)}
									>
										{overplay && (
											<div className="overplay">
												<div>
													<EyeOutlined
														onClick={() => {
															setVisible(true);
															setSelectedImage(metaImage);
														}}
													/>
												</div>
												<div>
													<DeleteOutlined onClick={() => setMetaImage("")} />
												</div>
											</div>
										)}
										<img
											src={`${API_URL_CDN}${metaImage}`}
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
										<input type="file" id="uploadImage" onChange={(e) => pushImage(e, 1)} style={{ display: "none" }} />
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SEOTab;
