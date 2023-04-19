import React from "react";
import SvgExport from "src/assets/svg/SvgExport";

const ImportFileComponent = () => {
	return (
		<div>
			<div>
				-&nbsp;Tải file mẫu nhập file <span>tại đây</span> (file cập nhật ngày 15/11/2022)
			</div>
			<div>-&nbsp;File nhập có dung lượng tối đa là 2MB và 1000 bản ghi</div>
			<label
				htmlFor="inputFile"
				style={{
					borderRadius: "5px",
					border: "dotted 1px #000",
					background: "rgb(232,232,232)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "60px",
					cursor: "pointer"
				}}
			>
				<SvgExport style={{ transform: "scale(0.7)" }} />
				&nbsp;Nhập file{" "}
			</label>
			<input type="file" id="inputFile" style={{ display: "none" }} />
			<div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "8px" }}>
				<div className="searchButton">Trở lại</div>
				<div className="defaultButton" style={{ marginLeft: "8px" }}>
					Xác nhận
				</div>
			</div>
		</div>
	);
};

export default ImportFileComponent;
