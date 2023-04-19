import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useContext, useState } from "react";
import SvgUploadImage from "src/assets/svg/SvgUploadImage";
import { notifyError } from "src/components/notification";
import { API_URL_CDN } from "src/services/api/config";
import { uploadSingleImageToCDN } from "src/services/api/upload";
import { CreateProductContext } from "../create";

const UploadThumbnail = () => {
	const { thumbnail, setThumbnail, setOpenModalImageOverlay, setImageOverlay } = useContext(CreateProductContext);
	const [overlay, setOverlay] = useState<boolean>(false);
	const [loadingUpload, setLoadingUpload] = useState<boolean>(false);
	const pushThumbnail = async (e: any) => {
		const file = e.target.files[0];
		setLoadingUpload(true);
		uploadSingleImageToCDN(file)
			.then((data: any) => {
				setThumbnail(data?.data[0]);
			})
			.catch((error) => notifyError(error))
			.finally(() => setLoadingUpload(false));
	};

	const removeThumbnail = () => {
		setThumbnail("");
	};

	const handleOpenOverlay = () => {
		setImageOverlay(thumbnail);
		setOpenModalImageOverlay(true);
	};

	return (
		<label
			className="bannerImage-bodyNew"
			style={{
				width: "200px",
				height: "200px",
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
			htmlFor="uploadThumbnail"
		>
			{loadingUpload ? (
				<Spin />
			) : thumbnail ? (
				<div className="bannerImage-image" onMouseEnter={() => setOverlay(true)} onMouseLeave={() => setOverlay(false)}>
					{overlay && (
						<div className="overplay">
							<div onClick={handleOpenOverlay}>
								<EyeOutlined />
							</div>
							<div
								onClick={(e) => {
									e.preventDefault();
									removeThumbnail();
								}}
							>
								<DeleteOutlined />
							</div>
						</div>
					)}
					<img src={`${API_URL_CDN}${thumbnail}`} alt="icon" style={{ width: "100%" }} />
				</div>
			) : (
				<>
					<label
						style={{
							marginTop: "4px",
							fontSize: "12px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "column",
							cursor: "pointer"
						}}
						htmlFor="uploadThumbnail"
					>
						<SvgUploadImage />
						<span style={{ marginTop: "4px" }}>600x600(px)</span>
					</label>
					<input type="file" id="uploadThumbnail" onChange={(e) => pushThumbnail(e)} style={{ display: "none" }} />
				</>
			)}
		</label>
	);
};

export default UploadThumbnail;
