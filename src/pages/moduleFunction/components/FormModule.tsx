import { DeleteRowOutlined, EyeOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row, Select, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SvgUploadImage from "src/assets/svg/SvgUploadImage";
import { notifyError, notifySuccess } from "src/components/notification";
import { APIMethodsEnum } from "src/constants/enum";
import message from "src/constants/message";
import { getModuleFunctionById, updateModuleFunction } from "src/services/actions/moduleFunction.action";
import { API_URL_CDN } from "src/services/api/config";
import { uploadSingleImageToCDN } from "src/services/api/upload";
import { AppState } from "src/types";
import { convertToConsucutiveString } from "src/utils/helpers/functions/textUtils";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";

const { Option } = Select;

const FormModuleFunction = ({ setOpenImageOverlay, setImageOverlay, form }: any) => {
	const dispatch = useDispatch();
	const isMount = useIsMount();

	const [overlay, setOverlay] = useState(false);
	const [image, setImage] = useState<string>("");

	const [loadingUpload, setLoadingUpdate] = useState(false);
	const paramsURL = useParams() as any;
	const [funct, setFunct] = useState<any>(null);
	useEffect(() => {
		dispatch(getModuleFunctionById(paramsURL.id));
	}, []);

	const { stateModuleFunctionById, stateCreateModuleFunction, stateUpdateModuleFunction } = useSelector(
		(e: AppState) => e.moduleFunctionsReducer
	);

	useEffect(() => {
		if (isMount) return;
		const { success, data, message, error } = stateModuleFunctionById;
		if (success) {
			form.setFieldsValue(data?.data);
			setImage(data?.data.ui_icon);
			setFunct(data?.data);
		}
	}, [stateModuleFunctionById.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { data, message, success, error } = stateUpdateModuleFunction;
		if (success) {
		}
		if (error || success === false) {
			notifyError(`${message}`);
		}
	}, [stateUpdateModuleFunction.isLoading]);

	const removeFunctIcon = (e: any) => {
		e.preventDefault();
		setImage("");
	};

	const pushImage = async (e: any) => {
		const file = e.target.files[0];
		setLoadingUpdate(true);
		uploadSingleImageToCDN(file)
			.then((data: any) => {
				console.log(data);
				setImage(data?.data[0]);
			})
			.catch((error) => notifyError(error))
			.finally(() => setLoadingUpdate(false));
	};

	const onOpenImageOverlay = (image: string) => {
		setOpenImageOverlay(true);
		setImageOverlay(image);
	};

	const onSubmit = () => {
		const dataRequest: any = form.getFieldsValue();
		if (image) {
			dataRequest.ui_icon = image;
		}

		dispatch(updateModuleFunction(paramsURL.id, dataRequest));
	};

	const onChangeFunctCode = (e: any) => {
		form.setFieldValue("funct_code", convertToConsucutiveString(e.target.value).toUpperCase());
	};

	return (
		<Form
			form={form}
			id="module-form"
			onFinish={onSubmit}
			layout="vertical"
			initialValues={{
				status: true
			}}
			className="moduleFunctions__detail__form"
		>
			<div className="contentSection">
				<div
					className="moduleFunctions__detail"
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						flexWrap: "wrap",
						margin: "0"
					}}
				>
					<Form.Item
						label="Tên chức năng"
						name="funct_name"
						rules={[{ required: true, message: message.funct.functNameNotEmpty }]}
						style={{ margin: "0 0 13px 0", width: "calc((100% - 16px) / 3)" }}
					>
						<Input placeholder="Nhập nội dung" className="defaultInput" />
					</Form.Item>
					<Form.Item
						label="Mã chức năng"
						name="funct_code"
						rules={[{ required: true, message: message.funct.functCodeNotEmpty }]}
						style={{ margin: "0 0 13px 0", width: "calc((100% - 16px) / 3)" }}
					>
						<Input placeholder="MODULE_VIEWS" className="defaultInput" onChange={onChangeFunctCode} />
					</Form.Item>
					<Form.Item
						label="API Method"
						name="method"
						rules={[{ required: true, message: message.funct.functAPIMethodNotEmpty }]}
						style={{ margin: "0 0 13px 0", width: "calc((100% - 16px) / 3)" }}
					>
						<Select
							placeholder="Phương thức request"
							className="defaultSelect"
							// style={{ border: "1px solid #bfc4c9", overflow: "hidden", marginBottom: 0 }}
						>
							{Object.entries(APIMethodsEnum).map(([key, val]) => (
								<Option key={key} value={val}>
									{key}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						label="API Route"
						name="api_route"
						rules={[{ required: true, message: message.funct.functAPIRouteNotEmpty }]}
						style={{ margin: "0 0 13px 0", width: "calc((100% - 16px) / 3)" }}
					>
						<Input placeholder="/api/v1/{module}" className="defaultInput" />
					</Form.Item>
					<Form.Item
						label="UI Route"
						name="ui_route"
						rules={[{ required: true, message: message.funct.functUIRouteNotEmpty }]}
						style={{ margin: "0 0 13px 0", width: "calc((100% - 16px) / 3)" }}
					>
						<Input placeholder="Đường dẫn UI đến chức năng" className="defaultInput" />
					</Form.Item>
					<Form.Item
						label="Các API từ module khác được sử dụng cho module"
						name="relative_ids"
						style={{ margin: "0 0 13px 0", width: "calc((100% - 16px) / 3)" }}
					>
						<Input placeholder="Các API được sử dụng" className="defaultInput" />
					</Form.Item>
					<Form.Item label="Mô tả Chức năng" name="description" style={{ margin: "0 0 13px 0", width: "100%" }}>
						<TextArea placeholder="Mô tả chức năng" className="defaultInput" />
					</Form.Item>
					<div>
						<h4 style={{ marginBottom: "0px" }}>Icon:</h4>
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
							) : image ? (
								<div
									className="bannerImage-image"
									onMouseOver={() => setOverlay(true)}
									onMouseLeave={() => setOverlay(false)}
								>
									{overlay && (
										<div className="overplay">
											<div>
												<EyeOutlined onClick={() => onOpenImageOverlay(image)} />
											</div>
											<div onClick={removeFunctIcon}>
												<DeleteRowOutlined />
											</div>
										</div>
									)}
									<img src={`${API_URL_CDN}${image}`} alt="banner" />
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
									<input type="file" id="uploadImage" onChange={(e) => pushImage(e)} style={{ display: "none" }} />
								</>
							)}
						</label>
					</div>
				</div>
			</div>
		</Form>
	);
};

export default FormModuleFunction;
