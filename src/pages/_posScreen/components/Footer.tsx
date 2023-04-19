import React from "react";
import colors from "src/utils/colors";

const Footer = ({ footerClickCallback, listProduct }: any) => {
	return (
		<div
			style={{
				position: "fixed",
				background: colors.neutral_color_1_8,
				height: "56px",
				width: "100%",
				bottom: "0",
				left: "0",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "11px 20px"
			}}
		>
			<div className="searchButton" style={{ width: "calc((100% - 36px) / 9)" }} onClick={() => footerClickCallback(1)}>
				Thêm đơn
			</div>
			<div
				className="searchButton"
				style={{ width: "calc((100% - 36px) / 9)", cursor: listProduct?.length === 0 ? "not-allowed" : "pointer" }}
				onClick={() => listProduct?.length > 0 && footerClickCallback(2)}
			>
				Xoá toàn bộ sản phẩm
			</div>
			<div className="searchButton" style={{ width: "calc((100% - 36px) / 9)" }} onClick={() => footerClickCallback(3)}>
				Mã giảm giá (F6)
			</div>
			<div className="searchButton" style={{ width: "calc((100% - 36px) / 9)" }} onClick={() => footerClickCallback(4)}>
				Khuyến mãi (F7)
			</div>
			<div className="searchButton" style={{ width: "calc((100% - 36px) / 9)" }} onClick={() => footerClickCallback(5)}>
				Thông tin khách hàng
			</div>
			<div className="searchButton" style={{ width: "calc((100% - 36px) / 9)" }} onClick={() => footerClickCallback(6)}>
				Đổi trả hàng
			</div>
			<div className="searchButton" style={{ width: "calc((100% - 36px) / 9)" }} onClick={() => footerClickCallback(7)}>
				Xem báo cáo
			</div>
			<div className="searchButton" style={{ width: "calc((100% - 36px) / 9)" }} onClick={() => footerClickCallback(8)}>
				Xem danh sách đơn
			</div>
			<div className="searchButton" style={{ width: "calc((100% - 36px) / 9)" }} onClick={() => footerClickCallback(9)}>
				Thiết lập đơn
			</div>

			{/* <div
      style={{
        cursor: "pointer",
        marginRight: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      onClick={() => setSelectedTypeSell(1)}
      className={selectedTypeSell === 1 ? "activeTypeSell" : ""}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgb(237,240,243)",
          borderRadius: "50%",
          height: "34px",
          width: "34px"
        }}
      >
        <SvgFastSell />
      </span>
      &nbsp;Bán nhanh
    </div> */}
			{/* <div
      style={{
        cursor: "pointer",
        marginRight: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      onClick={() => setSelectedTypeSell(2)}
      className={selectedTypeSell === 2 ? "activeTypeSell" : ""}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgb(237,240,243)",
          borderRadius: "50%",
          height: "34px",
          width: "34px"
        }}
      >
        <SvgNormalSell style={{ transform: "scale(0.7)" }} />
      </span>
      &nbsp;Bán thường
    </div> */}
			{/* <div
      onClick={() => setSelectedTypeSell(3)}
      className={selectedTypeSell === 3 ? "activeTypeSell" : ""}
      style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgb(237,240,243)",
          borderRadius: "50%",
          height: "34px",
          width: "34px"
        }}
      >
        <SvgShip style={{ transform: "scale(0.9)" }} />
      </span>
      &nbsp;Bán giao hàng
    </div>*/}
		</div>
	);
};

export default Footer;
