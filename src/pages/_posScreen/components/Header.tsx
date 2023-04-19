import { Input } from "antd";
import React from "react";
import SvgCloseIcon from "src/assets/svg/SvgCloseIcon";
import SvgHome from "src/assets/svg/SvgHome";
import SvgIconExpand from "src/assets/svg/SvgIconExpand";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgScan from "src/assets/svg/SvgScan";
import colors from "src/utils/colors";
import { convertNumberWithCommas } from "src/utils/helpers/functions/textUtils";

const Header = ({
	history,
	filterProduct,
	setFilterProduct,
	showProduct,
	setShowProduct,
	listProduct,
	setListProduct,
	bills,
	removeBill,
	selectedBill,
	setSelectedBill,
	handleClickProduct,
	addNewBill
}: any) => {
	return (
		<div
			style={{
				zIndex: "105",
				position: "fixed",
				background: colors.primary_color_1_1,
				height: "54px",
				width: "100%",
				top: "0",
				left: "0",
				padding: "14px 20px 4px 20px"
			}}
		>
			<div style={{ display: "flex", alignItems: "center" }}>
				<div onClick={() => history.push("")} className="searchButton" style={{ marginRight: "8px" }}>
					<SvgHome style={{ transform: "scale(0.7)" }} />
					&nbsp;Trở về
				</div>
				<div style={{ width: "400px", marginRight: "8px", position: "relative" }}>
					<Input
						className="defaultInput"
						onChange={(e: any) => {
							setFilterProduct(e.target.value);
							if (e.target.value.length > 0) {
								setShowProduct(true);
							} else {
								setShowProduct(false);
								setListProduct([]);
							}
						}}
						value={filterProduct}
						onClick={() => setShowProduct(false)}
						placeholder="Nhập SKU, barcode, tên sản phẩm"
					/>
					{showProduct && (
						<div className="installStore__create__body__left__information__showProduct__table">
							{/* <div
                    className="installStore__create__body__left__information__showProduct__table__add"
                    onClick={() => setOpenModalAdd(true)}
                  >
                    <SvgIconPlus fill="#000" />
                    &nbsp;&nbsp;Thêm mới sản phẩm
                  </div> */}
							{listProduct.length > 0 ? (
								listProduct.map((x: any) => (
									<div
										style={{
											padding: "4px 8px",

											cursor: "pointer"
										}}
										onClick={() => {
											handleClickProduct(x);
											setShowProduct(false);
										}}
									>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between"
											}}
										>
											<div>{x.product_name}</div>
											<div style={{ color: "red" }}>
												{x.retail_price ? convertNumberWithCommas(x.retail_price) : 0}
												&nbsp;đ
											</div>
										</div>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
												fontSize: "12px"
											}}
										>
											<div>SKU: {x?.sku}</div>
											<div>Tồn: {x?.virtual_stock_quantity}</div>
										</div>
									</div>
								))
							) : (
								<div>Không có sản phẩm</div>
							)}
						</div>
					)}
				</div>

				<div
					style={{
						marginRight: "8px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						cursor: "pointer"
					}}
				>
					<SvgScan />
				</div>

				<div style={{ position: "relative", transform: "translateY(-18px)" }}>
					{bills.length > 0 &&
						bills.map((x: any, index: any) => (
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									background: selectedBill === x.id ? "rgb(237,240,243)" : "#001529",
									height: "40px",
									padding: "10px",
									position: "absolute",
									width: "118px",
									borderTopLeftRadius: "5px",
									borderTopRightRadius: "5px",
									left: index * 119,
									cursor: "pointer",
									color: selectedBill === x.id ? "#001529" : "#fff"
								}}
							>
								<span style={{ fontWeight: "500" }} onClick={() => setSelectedBill(x.id)}>
									Hoá đơn {index + 1}
								</span>
								&nbsp;
								<SvgCloseIcon
									fill="rgb(212,212,212)"
									style={{ transform: "scale(0.6)", zIndex: 1 }}
									onClick={() => removeBill(x)}
								/>
							</div>
						))}
					<div
						style={{
							position: "absolute",
							top: bills.length === 0 ? "6px " : "8px",

							left: bills.length === 0 ? 0 : bills.length * 119 + 8,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							background: "#001529",
							borderRadius: "50%",
							width: "24px",
							height: "24px",
							cursor: "pointer"
						}}
						onClick={() => addNewBill()}
					>
						<SvgIconPlus style={{ transform: "scale(0.7)" }} fill={colors.primary_color_1_1} />
					</div>
				</div>

				<div>
					<SvgIconExpand />
				</div>
			</div>
		</div>
	);
};

export default Header;
