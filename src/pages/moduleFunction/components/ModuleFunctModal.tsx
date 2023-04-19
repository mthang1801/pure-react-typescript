import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row, Select, Spin, Switch } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Modal from "antd/lib/modal/Modal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import SvgUploadImage from "src/assets/svg/SvgUploadImage";
import { notifyError } from "src/components/notification";
import { routesNameData } from "src/constants";
import { APIMethodsEnum } from "src/constants/enum";
import message from "src/constants/message";
import { createModuleFunction, updateModuleFunction } from "src/services/actions/moduleFunction.action";
import { API_URL_CDN } from "src/services/api/config";
import { uploadSingleImageToCDN } from "src/services/api/upload";
import { convertToConsucutiveString } from "src/utils/helpers/functions/textUtils";
import ImageOverlay from "../../../components/custom/ImageOverlay";
import { ModuleFunctionActionTypesEnum } from "../../../constants/enum";
import { TypeModalEnum } from "../edit/data";

const ModuleFunctModal = ({ form, visible, setVisible, handleCancel, type, icon, setIcon, icon2, setIcon2 }: any) => {
	const [loadingUpload, setLoadingUpload] = useState<boolean>(false);
	const [loadingUpload2, setLoadingUpload2] = useState<boolean>(false);

	const [openModalIconOverlay, setModalOpenIconOverlay] = useState<boolean>(false);
	const [overlay, setOverlay] = useState<boolean>(false);
	const dispatch = useDispatch();
	const onChangeFunctCode = (e: any) => {
		form.setFieldValue("funct_code", convertToConsucutiveString(e.target.value).toUpperCase());
	};

	useEffect(() => {
		const formValues = form?.getFieldsValue();
		if (formValues?.level === 2 && type === TypeModalEnum.CREATE) {
			let functCode = formValues.funct_code + ModuleFunctionActionTypesEnum.VIEWS;
			form.setFieldValue("funct_code", functCode);
			form.setFieldValue("action", ModuleFunctionActionTypesEnum.VIEWS);
		}
	}, [visible]);

	const removeIcon = (value: any) => (value === 1 ? setIcon("") : setIcon2(""));
	const pushIcon = async (e: any, id: any) => {
		if (id === 1) {
			const file = e.target.files[0];
			setLoadingUpload(true);
			uploadSingleImageToCDN(file)
				.then((data: any) => {
					setIcon(data?.data[0]);
					form.setFieldValue("ui_icon", null);
				})
				.catch((error) => notifyError(error))
				.finally(() => setLoadingUpload(false));
		} else {
			const file = e.target.files[0];
			setLoadingUpload2(true);
			uploadSingleImageToCDN(file)
				.then((data: any) => {
					setIcon2(data?.data[0]);
				})
				.catch((error) => notifyError(error))
				.finally(() => setLoadingUpload2(false));
		}
	};

	const onSubmitForm = () => {
		const dataRequest = { ...form.getFieldsValue() };

		dataRequest.ui_icon = icon;

		dataRequest.active_icon = icon2;

		switch (type) {
			case TypeModalEnum.CREATE: {
				delete dataRequest.id;
				if (dataRequest.level !== 2) {
					dataRequest.method = "GET";
				}
				dispatch(createModuleFunction(dataRequest));
				break;
			}
			case TypeModalEnum.EDIT: {
				dataRequest.method = dataRequest.method || "GET";

				dispatch(updateModuleFunction(dataRequest.id, dataRequest));
				break;
			}
		}
		setIcon(null);
		setIcon2(null);
	};

	const level = form?.getFieldValue("level");

	const onChangeActions = (value: string) => {
		let functCode: string = form.getFieldValue("funct_code");

		if (
			Object.values<string>(ModuleFunctionActionTypesEnum).some((actionType: string) => functCode.includes(actionType))
		) {
			const pattern = new RegExp(`(${Object.values<string>(ModuleFunctionActionTypesEnum).join("|")})`, "g");
			functCode = functCode.replace(pattern, "");
			functCode = functCode + value;
			form.setFieldValue("funct_code", functCode);
		}
	};

	const onChangeRawFunctCode = (e: any) => {
		console.log("check", e);

		const initFunctCode = form.getFieldValue("init_funct_code");
		let rawFunctCode = convertToConsucutiveString(e).toUpperCase();

		let functCode: string =
			initFunctCode.split("__").length <= 1
				? initFunctCode.split("__")[0] + "__" + rawFunctCode
				: initFunctCode.split("__").slice(0, -1).join("__") + "__" + rawFunctCode;

		form.setFieldsValue({ funct_code: functCode, raw_funct_code: rawFunctCode });
	};

	return (
		<>
			<ImageOverlay
				open={openModalIconOverlay}
				imgSrc={icon}
				onClose={() => {
					setModalOpenIconOverlay(false);
				}}
			/>
			<Modal
				visible={visible}
				title={type === TypeModalEnum.CREATE ? "Tạo mới" : "Chi tiết"}
				centered
				footer={null}
				onCancel={handleCancel}
				width={600}
			>
				<Form
					form={form}
					id="funct-form"
					onFinish={onSubmitForm}
					layout="vertical"
					initialValues={{ status: true, display_on_website: true, method: APIMethodsEnum.GET }}
					style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}
				>
					<Form.Item name="id" style={{ display: "none" }}>
						<Input type="hidden" />
					</Form.Item>
					<Form.Item name="parent_id" style={{ display: "none" }}>
						<Input type="hidden" />
					</Form.Item>
					<Form.Item name="index" style={{ display: "none" }}>
						<Input type="hidden" />
					</Form.Item>
					<Form.Item name="ui_icon" style={{ display: "none" }}>
						<Input type="hidden" />
					</Form.Item>
					<Form.Item name="level" style={{ display: "none" }}>
						<Input type="hidden" />
					</Form.Item>
					<Form.Item
						label="Display name"
						name="funct_name"
						rules={[{ required: true, message: message.funct.functNameNotEmpty }]}
						style={{ marginBottom: "1rem", width: "calc(50% - 4px)" }}
					>
						<Input placeholder="Nhập display name" className="defaultInput" style={{ borderRadius: "5px" }} />
					</Form.Item>
					<Form.Item
						label="Function code (theo module)"
						name="funct_code"
						rules={[{ required: true, message: message.funct.functCodeNotEmpty }]}
						style={{ marginBottom: "1rem", width: "calc(50% - 4px)" }}
					>
						<Input
							placeholder="MODULE_VIEWS"
							className="defaultInput"
							onChange={onChangeFunctCode}
							style={{ borderRadius: "5px" }}
							disabled={[1, 2].includes(level)}
						/>
					</Form.Item>

					{level === 1 ? (
						<>
							<Form.Item
								name="init_funct_code"
								rules={[{ required: true, message: message.funct.functCodeNotEmpty }]}
								style={{ marginBottom: "1rem", display: "none" }}
							>
								<Input type="hidden" />
							</Form.Item>
							<Form.Item
								label="Function code"
								name="raw_funct_code"
								rules={[{ required: true, message: message.funct.functCodeNotEmpty }]}
								style={{ marginBottom: "1rem", width: "calc(50% - 4px)" }}
							>
								<Input
									placeholder="MODULE_VIEWS"
									className="defaultInput"
									onChange={(e: any) => {
										let check = e.target.value.indexOf("__");
										if (e?.target?.value === "_" || e?.target?.value === "__") {
											form.setFieldValue("raw_funct_code", "");
										} else if (e.target.value.indexOf("_") === 0) {
											form.setFieldValue("raw_funct_code", e?.target?.value?.replace("_", ""));
										} else if (check > 0) {
											form.setFieldValue("raw_funct_code", e.target.value.replaceAll("__", "_"));
										} else {
											onChangeRawFunctCode(e.target.value);
										}
									}}
									// onKeyPress={(e: any) => {
									// 	if (e.key === "_" && (e?.target?.value?.length === 1 || e?.target?.value?.length === 0)) {
									// 		form.setFieldValue("raw_funct_code", "");
									// 	}
									// }}
									onBlur={(e: any) => {
										if (e?.target?.value?.length === e.target.value.lastIndexOf("_") + 1) {
											console.log("ok2");

											onChangeRawFunctCode(e.target.value.slice(0, e.target.value.length - 1));
										}
									}}
									style={{ borderRadius: "5px" }}
								/>
							</Form.Item>
						</>
					) : null}
					{level === 2 ? (
						<Form.Item
							label="Actions"
							name="action"
							className="ordersPage__search__form__item"
							style={{ width: "calc(50% - 4px)", marginBottom: "1rem" }}
						>
							<Select
								placeholder="Lựa chọn actions cho chức năng"
								className="defaultSelect"
								style={{ border: "1px solid #bfc4c9", overflow: "hidden", marginBottom: 0 }}
								onChange={onChangeActions}
							>
								{Object.entries(ModuleFunctionActionTypesEnum).map(([key, val]) => (
									<Select.Option key={key} value={val}>
										{key}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					) : null}
					{level === 2 && (
						<Form.Item
							label="API Method"
							name="method"
							className="ordersPage__search__form__item"
							style={{ width: "calc(50% - 4px)", marginBottom: "1rem" }}
						>
							<Select
								placeholder="Phương thức request"
								className="defaultSelect"
								style={{ border: "1px solid #bfc4c9", overflow: "hidden", marginBottom: 0 }}
								defaultValue={APIMethodsEnum.GET}
							>
								{Object.entries(APIMethodsEnum).map(([key, val]) => (
									<Select.Option key={key} value={val}>
										{key}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					)}

					{level === 2 && (
						<Form.Item
							label="API Route"
							name="api_route"
							rules={[{ required: true, message: message.funct.functAPIRouteNotEmpty }]}
							style={{ width: "calc(50% - 4px)", marginBottom: "1rem" }}
						>
							<Input placeholder="/api/v1/{module}" className="defaultInput" style={{ borderRadius: "5px" }} />
						</Form.Item>
					)}
					{level !== 2 ? (
						<Form.Item
							label="UI Route"
							name="ui_route"
							rules={[{ required: true, message: message.funct.functUIRouteNotEmpty }]}
							style={{ marginBottom: "1rem", width: "calc(50% - 4px)" }}
						>
							<Input placeholder="Đường dẫn UI đến chức năng" className="defaultInput" />
						</Form.Item>
					) : null}
					{level !== 2 && (
						<div style={{ width: "100%", display: "flex" }}>
							<Form.Item label="Icon" style={{ fontWeight: 500, width: "50%", margin: "0" }}>
								<label
									className="bannerImage-bodyNew"
									style={{
										width: "80px",
										height: "80px",
										cursor: "pointer",
										marginBottom: "8px"
									}}
									htmlFor="uploadImage"
								>
									{loadingUpload ? (
										<Spin />
									) : icon ? (
										<div
											className="bannerImage-image"
											onMouseOver={() => setOverlay(true)}
											onMouseLeave={() => setOverlay(false)}
										>
											{overlay && (
												<div className="overplay">
													<div onClick={() => setModalOpenIconOverlay(true)}>
														<EyeOutlined />
													</div>
													<div
														onClick={(e) => {
															e.preventDefault();
															removeIcon(1);
														}}
													>
														<DeleteOutlined />
													</div>
												</div>
											)}
											<img src={`${API_URL_CDN}${icon}`} alt="icon" />
										</div>
									) : (
										<>
											<label
												style={{
													marginTop: "4px",
													fontSize: "10px",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													flexDirection: "column",
													cursor: "pointer"
												}}
												htmlFor="uploadImage"
											>
												<SvgUploadImage />
												<span style={{ marginTop: "4px" }}>20x20 (px)</span>
											</label>
											<input
												type="file"
												id="uploadImage"
												onChange={(e) => pushIcon(e, 1)}
												style={{ display: "none" }}
											/>
										</>
									)}
								</label>
							</Form.Item>
							<Form.Item label="Active icon" style={{ fontWeight: 500, width: "50%", margin: "0" }}>
								<label
									className="bannerImage-bodyNew"
									style={{
										width: "80px",
										height: "80px",
										cursor: "pointer",
										marginBottom: "8px"
									}}
									htmlFor="uploadImage2"
								>
									{loadingUpload2 ? (
										<Spin />
									) : icon2 ? (
										<div
											className="bannerImage-image"
											onMouseOver={() => setOverlay(true)}
											onMouseLeave={() => setOverlay(false)}
										>
											{overlay && (
												<div className="overplay">
													<div onClick={() => setModalOpenIconOverlay(true)}>
														<EyeOutlined />
													</div>
													<div
														onClick={(e) => {
															e.preventDefault();
															removeIcon(2);
														}}
													>
														<DeleteOutlined />
													</div>
												</div>
											)}
											<img src={`${API_URL_CDN}${icon2}`} alt="icon" />
										</div>
									) : (
										<>
											<label
												style={{
													marginTop: "4px",
													fontSize: "10px",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													flexDirection: "column",
													cursor: "pointer"
												}}
												htmlFor="uploadImage2"
											>
												<SvgUploadImage />
												<span style={{ marginTop: "4px" }}>20x20 (px)</span>
											</label>
											<input
												type="file"
												id="uploadImage2"
												onChange={(e) => pushIcon(e, 2)}
												style={{ display: "none" }}
											/>
										</>
									)}
								</label>
							</Form.Item>
						</div>
					)}
					<div
						style={{
							marginTop: "8px",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							width: "100%"
						}}
					>
						<div className="center">
							<span>Trạng thái</span>&nbsp;&nbsp;
							<Form.Item name="status" valuePropName="checked" style={{ margin: "0" }}>
								<Switch defaultChecked={true} />
							</Form.Item>{" "}
						</div>

						<div>
							<button className="defaultButton" type="submit" style={{ marginLeft: "auto" }}>
								<SvgIconStorage style={{ transform: "scale(0.7)" }} />
								&nbsp;Lưu
							</button>
						</div>
					</div>
				</Form>
			</Modal>
		</>
	);
};

export default ModuleFunctModal;
