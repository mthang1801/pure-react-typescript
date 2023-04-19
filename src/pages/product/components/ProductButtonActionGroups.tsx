import SvgExport from "src/assets/svg/SvgExport";
import SvgImport from "src/assets/svg/SvgImport";
import SvgSort from "src/assets/svg/SvgSort";

const ProductButtonActionGroup = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "flex-end",
				marginBottom: "8px"
			}}
		>
			<div className="searchButton" style={{ marginRight: "8px", cursor: "not-allowed" }}>
				<SvgImport style={{ transform: "scale(0.7)" }} />
				&nbsp; Tải file mẫu
			</div>
			<div className="searchButton" style={{ marginRight: "8px", cursor: "not-allowed" }}>
				<SvgImport style={{ transform: "scale(0.7)" }} />
				&nbsp; Nhập file
			</div>
			<div className="searchButton" style={{ marginRight: "8px", cursor: "not-allowed" }}>
				<SvgExport style={{ transform: "scale(0.7)" }} />
				&nbsp; Xuất file
			</div>
			<div className="searchButton" style={{ cursor: "not-allowed" }}>
				<SvgSort style={{ transform: "scale(0.7)" }} />
				&nbsp; Sắp xếp
			</div>
		</div>
	);
};

export default ProductButtonActionGroup;
