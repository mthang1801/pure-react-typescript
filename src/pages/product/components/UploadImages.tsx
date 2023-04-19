import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Col, Row, Spin } from "antd";
import { useContext, useState } from "react";
import SvgUploadImage from "src/assets/svg/SvgUploadImage";
import { notifyError } from "src/components/notification";
import { API_URL_CDN } from "src/services/api/config";
import { uploadSingleImageToCDN } from "src/services/api/upload";
import { CreateProductContext } from "../create";

const UploadImages = () => {
	const { images, setImages, setOpenModalImageOverlay, setImageOverlay } = useContext(CreateProductContext);
	const [loadingUpload, setLoadingUpload] = useState<boolean>(false);
	const [overlay, setOverlay] = useState<number>(-1);
	const removeImageItem = (index: number) => {
		setImages((prevImages: string[]) => prevImages.filter((_: string, i: number) => i !== index));
	};

	const pushImage = async (e: any) => {
		const file = e.target.files[0];
		setLoadingUpload(true);
		uploadSingleImageToCDN(file)
			.then((data: any) => {
				const imageUrl = data.data[0];
				if (checkImageURLUnique(imageUrl)) {
					setImages((prevImages: string[]) => [...prevImages, imageUrl]);
				}
			})
			.catch((error: any) => notifyError(error))
			.finally(() => setLoadingUpload(false));
	};

	const checkImageURLUnique = (imageUrl: string): boolean => {
		if (images.includes(imageUrl)) {
			notifyError("Hình ảnh đã tồn tại trong bộ sưu tập");
			return false;
		}
		return true;
	};

	const handleOpenOverlay = (index: number) => {
		setImageOverlay(images[index]);
		setOpenModalImageOverlay(true);
	};

	const _uploadImage = (
		<label
			className="bannerImage-bodyNew"
			style={{
				width: "80px",
				height: "80px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
				border: "1px dotted #000",
				background: "rgb(240, 242, 245)",
				borderRadius: "5px",
				fontSize: "12px",
				cursor: "pointer",
				padding: 0
			}}
			htmlFor="uploadImage"
		>
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
				{loadingUpload ? (
					<div>
						<Spin />
					</div>
				) : (
					<>
						<SvgUploadImage />
						<span style={{ marginTop: "4px" }}>600x600(px)</span>{" "}
					</>
				)}
			</label>

			<input type="file" id="uploadImage" onChange={(e) => pushImage(e)} style={{ display: "none" }} />
		</label>
	);

	return (
		<Row justify="start" align="middle" gutter={[8, 8]}>
			{images?.length
				? images?.map((imageItem: string, i: number) => (
						<Col span={8} md={6} lg={4} xl={3} xxl={2}>
							<label
								className="bannerImage-bodyNew"
								style={{
									width: "80px",
									height: "80px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									flexDirection: "column",
									border: "1px dotted #000",
									background: "rgb(240, 242, 245)",
									borderRadius: "5px",
									fontSize: "12px",
									cursor: "pointer",
									padding: 0
								}}
								htmlFor="uploadImage"
							>
								{imageItem && (
									<div
										className="bannerImage-image"
										onMouseEnter={() => setOverlay(i)}
										onMouseLeave={() => setOverlay(-1)}
									>
										{overlay === i && (
											<div className="overplay">
												<div
													onClick={(e) => {
														e.preventDefault();
														handleOpenOverlay(i);
													}}
												>
													<EyeOutlined />
												</div>
												<div
													onClick={(e) => {
														e.preventDefault();
														removeImageItem(i);
													}}
												>
													<DeleteOutlined />
												</div>
											</div>
										)}
										<img src={`${API_URL_CDN}${imageItem}`} alt="icon" style={{ width: "100%" }} />
									</div>
								)}
							</label>
						</Col>
				  ))
				: null}
			{images?.length < 10 && (
				<Col span={8} md={6} lg={4} xl={3} xxl={2}>
					{_uploadImage}
				</Col>
			)}
		</Row>
	);
};

export default UploadImages;
