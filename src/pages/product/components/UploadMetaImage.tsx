import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useContext, useState } from "react";
import SvgUploadImage from "src/assets/svg/SvgUploadImage";
import { notifyError } from "src/components/notification";
import { API_URL_CDN } from "src/services/api/config";
import { uploadSingleImageToCDN } from "src/services/api/upload";
import { CreateProductContext } from "../create";

const UploadMetaImage = () => {
	const [overlay, setOverlay] = useState<boolean>(false);
	const { metaImage, setMetaImage, setOpenModalImageOverlay, setImageOverlay } = useContext(CreateProductContext);

	const [loadingUpload, setLoadingUpload] = useState<boolean>(false);
	const pushThumbnail = async (e: any) => {
		const file = e.target.files[0];
		setLoadingUpload(true);
		uploadSingleImageToCDN(file)
			.then((data: any) => {
				setMetaImage(data?.data[0]);
			})
			.catch((error) => notifyError(error))
			.finally(() => setLoadingUpload(false));
	};

	const removeThumbnail = () => {
		setMetaImage("");
	};

	const handleOpenOverlay = () => {
		setImageOverlay(metaImage);
		setOpenModalImageOverlay(true);
	};

	return (
		<label
			className="bannerImage-bodyNew"
			style={{
				width: "100%",
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
			htmlFor="uploadMetaImage"
		>
			{loadingUpload ? (
				<Spin />
			) : metaImage ? (
				<div className="bannerImage-image" onMouseOver={() => setOverlay(true)} onMouseLeave={() => setOverlay(false)}>
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
					<img src={`${API_URL_CDN}${metaImage}`} alt="icon" style={{ width: "100%" }} />
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
						htmlFor="uploadMetaImage"
					>
						<SvgUploadImage />
						<span style={{ marginTop: "4px", fontSize: "12px" }}>Ảnh: 1200x627px(px) - Dung lượng {"<"} 1MB </span>
					</label>
					<input type="file" id="uploadMetaImage" onChange={(e) => pushThumbnail(e)} style={{ display: "none" }} />
				</>
			)}
		</label>
	);
};

export default UploadMetaImage;
