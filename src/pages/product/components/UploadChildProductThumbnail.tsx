import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useContext, useState } from "react";
import SvgUploadImage from "src/assets/svg/SvgUploadImage";
import { notifyError } from "src/components/notification";
import { API_URL_CDN } from "src/services/api/config";
import { uploadSingleImageToCDN } from "src/services/api/upload";
import { CreateProductContext } from "../create";

const UploadChildProductThumbnail = ({ thumbnail, setThumbnail }: any) => {
	const { setOpenModalImageOverlay, setImageOverlay } = useContext(CreateProductContext);
	const [overlay, setOverlay] = useState<boolean>(false);
	const [loadingUpload, setLoadingUpload] = useState<boolean>(false);

	const pushThumbnail = async (e: any) => {
		e.preventDefault();
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

	const handleOpenOverlay = (e: any) => {
		e.preventDefault();
		setImageOverlay(thumbnail);
		setOpenModalImageOverlay(true);
	};

	return (
		<label
			className="bannerImage-bodyNew"
			style={{
				width: "48px",
				height: "48px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
				fontSize: "12px"
			}}
			htmlFor="uploadThumbnail"
		>
			{loadingUpload ? (
				<Spin />
			) : thumbnail ? (
				<div className="bannerImage-image" onMouseEnter={() => setOverlay(true)} onMouseLeave={() => setOverlay(false)}>
					{overlay && (
						<div className="overplay text-black flex w-[32px]" style={{ width: "48px" }}>
							<div onClick={handleOpenOverlay} style={{ padding: 8 }}>
								<EyeOutlined style={{ transform: "scale(0.5)", color: "white" }} />
							</div>
							<div
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									removeThumbnail();
								}}
								style={{ padding: 8 }}
							>
								<DeleteOutlined style={{ transform: "scale(0.5)", color: "white" }} />
							</div>
						</div>
					)}
					<img src={`${API_URL_CDN}${thumbnail}`} alt="icon" style={{ width: "100%" }} />
				</div>
			) : (
				<div>
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
						onClick={(e:any) => console.log("here")}
					>
						<SvgUploadImage />
					</label>
					<input type="file" id="uploadThumbnail" onChange={(e) => pushThumbnail(e)} style={{ display: "none" }} />
				</div>
			)}
		</label>
	);
};

export default UploadChildProductThumbnail;
