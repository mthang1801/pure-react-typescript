import { Image, InputNumber } from "antd";
import React from "react";
import SvgBin from "src/assets/svg/SvgBin";
import { API_URL_CDN } from "src/services/api/config";
import colors from "src/utils/colors";
import NoImage from "src/assets/images/no-image.jpg";
import { notifyWarning } from "src/components/notification";
const ApplyForType4 = ({
	applyAll,
	indexItem,
	item,
	entity,
	handleChangeValueTo,
	handleChangeValueFrom,
	handleChangeType,
	handleChangeAmount,
	removeRecord,
	handleAddRecordItem,
	entityList
}: any) => {
	return applyAll ? (
		<>
			<div
				style={{
					border: "1px solid rgb(212,212,212)",
					borderTop: "unset",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between"
				}}
				key={indexItem}
			>
				<div
					style={{
						width: "calc(((100% - 140px) / 4) + 60px)",
						padding: "0 4px",
						borderRight: "1px solid rgb(212,212,212)",
						height: "42px"
					}}
				>
					<div style={{ display: "flex", alignItems: "center", height: "100%" }}>Toàn bộ sản phẩm</div>
				</div>
				<div
					style={{
						width: "calc((100% - 140px) / 4)",
						padding: "2px 4px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRight: "1px solid rgb(212,212,212)",
						height: "42px"
					}}
				>
					<InputNumber
						min={indexItem === 0 ? 0 : entityList[0]?.details[indexItem - 1]?.quantity_to + 1}
						max={1000000000}
						onBlur={(e: any) =>
							indexItem !== 0 &&
							Number(e.target.value?.replaceAll(",", "")) < entityList[0]?.details[indexItem - 1]?.quantity_to + 1 &&
							notifyWarning("Giá trị không hợp lệ")
						}
						value={item.quantity_from}
						onChange={(e: any) => handleChangeValueFrom(item, e, entity)}
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
						parser={(value: any) => value!.replace(/\$\s?|(\.*)/g, "")}
						className="defaultInputNumber"
					/>
				</div>
				<div
					style={{
						width: "calc((100% - 140px) / 4)",
						padding: "2px 4px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRight: "1px solid rgb(212,212,212)",
						height: "42px"
					}}
				>
					<InputNumber
						min={0}
						max={1000000000}
						value={item.quantity_to}
						onChange={(e: any) => handleChangeValueTo(item, e, entity)}
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
						parser={(value: any) => value!.replace(/\$\s?|(\.*)/g, "")}
						className="defaultInputNumber"
					/>
				</div>
				<div
					style={{
						width: "calc((100% - 140px) / 4)",
						padding: "2px 4px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRight: "1px solid rgb(212,212,212)",
						height: "42px"
					}}
				>
					<InputNumber
						min={0}
						max={item.discount_type === 1 ? 100 : 1000000000}
						defaultValue={0}
						value={item.discount_amount}
						onChange={(e: any) => handleChangeAmount(item, e, entity)}
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
						className="defaultInputNumberAddon"
						style={{ overflow: "hidden" }}
						addonBefore={
							<div style={{ display: "flex", width: "81px", alignItems: "center" }}>
								<div
									style={{
										height: "34px",
										width: "40px",
										display: "flex",
										justifyContent: "center",
										background: item.discount_type === 1 ? colors.primary_color_1_1 : "rgb(240,242,245)",
										alignItems: "center",
										cursor: "pointer"
									}}
									onClick={() => handleChangeType(item, 1, entity)}
								>
									%
								</div>
								<div style={{ height: "34px", width: "1px", background: "rgb(212,212,212)" }} />
								<div
									style={{
										height: "34px",
										width: "calc(50%)",
										display: "flex",
										justifyContent: "center",

										background: item.discount_type === 2 ? colors.primary_color_1_1 : "rgb(240,242,245)",
										alignItems: "center",
										cursor: "pointer"
									}}
									onClick={() => handleChangeType(item, 2, entity)}
								>
									VNĐ
								</div>
							</div>
						}
					/>
				</div>
				<div
					style={{
						width: "80px",
						padding: "2px 4px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "42px"
					}}
				>
					<div
						style={{
							cursor: "pointer",
							border: "1px solid rgb(212,212,212)",
							borderRadius: "2px",
							width: "30px",
							height: "30px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						}}
						onClick={() => removeRecord(item, entity)}
					>
						<SvgBin style={{ transform: "scale(0.7)" }} fill="rgb(212,212,212)" />
					</div>
				</div>
			</div>
		</>
	) : (
		<>
			<div
				style={{
					border: "1px solid rgb(212,212,212)",
					borderTop: "unset",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between"
				}}
				key={indexItem}
			>
				<div
					style={{
						width: "60px",
						padding: "2px 4px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRight: "1px solid rgb(212,212,212)",
						height: "60px"
					}}
				>
					<Image
						style={{ height: "50px", width: "auto", maxWidth: "100%", objectFit: "contain" }}
						alt={item?.thumbnail}
						src={item?.thumbnail ? `${API_URL_CDN}${item?.thumbnail}` : NoImage}
						preview={{ className: "modalImage" }}
					/>
				</div>
				<div
					style={{
						width: "calc((100% - 140px) / 4)",
						padding: "2px 4px",
						borderRight: "1px solid rgb(212,212,212)",
						height: "60px"
					}}
				>
					<div> {item.product_name}</div>
					<div style={{ fontSize: "12px" }}>
						<p style={{ margin: "0" }}>SKU:&nbsp;{item.sku}</p>
						<p style={{ margin: "0" }}>Barcode:&nbsp;{item.barcode}</p>
					</div>
				</div>
				<div
					style={{
						width: "calc((100% - 140px) / 4)",
						padding: "2px 4px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRight: "1px solid rgb(212,212,212)",
						height: "60px"
					}}
				>
					<InputNumber
						min={indexItem === 0 ? 0 : entityList[0]?.details[indexItem - 1]?.quantity_to + 1}
						max={1000000000}
						onBlur={(e: any) =>
							indexItem !== 0 &&
							Number(e.target.value?.replaceAll(",", "")) < entityList[0]?.details[indexItem - 1]?.quantity_to + 1 &&
							notifyWarning("Giá trị không hợp lệ")
						}
						value={item.quantity_from}
						onChange={(e: any) => handleChangeValueFrom(item, e, entity)}
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
						parser={(value: any) => value!.replace(/\$\s?|(\.*)/g, "")}
						className="defaultInputNumber"
					/>
				</div>
				<div
					style={{
						width: "calc((100% - 140px) / 4)",
						padding: "2px 4px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRight: "1px solid rgb(212,212,212)",
						height: "60px"
					}}
				>
					<InputNumber
						min={0}
						max={1000000000}
						value={item.quantity_to}
						onChange={(e: any) => handleChangeValueTo(item, e, entity)}
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
						parser={(value: any) => value!.replace(/\$\s?|(\.*)/g, "")}
						className="defaultInputNumber"
					/>
				</div>
				<div
					style={{
						width: "calc((100% - 140px) / 4)",
						padding: "2px 4px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRight: "1px solid rgb(212,212,212)",
						height: "60px"
					}}
				>
					<InputNumber
						min={0}
						max={item.discount_type === 1 ? 100 : 1000000000}
						defaultValue={0}
						value={item.discount_amount}
						onChange={(e: any) => handleChangeAmount(item, e, entity)}
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
						className="defaultInputNumberAddon"
						style={{ overflow: "hidden" }}
						addonBefore={
							<div style={{ display: "flex", width: "81px", alignItems: "center" }}>
								<div
									style={{
										height: "34px",
										width: "40px",
										display: "flex",
										justifyContent: "center",
										background: item.discount_type === 1 ? colors.primary_color_1_1 : "rgb(240,242,245)",
										alignItems: "center",
										cursor: "pointer"
									}}
									onClick={() => handleChangeType(item, 1, entity)}
								>
									%
								</div>
								<div style={{ height: "34px", width: "1px", background: "rgb(212,212,212)" }} />
								<div
									style={{
										height: "34px",
										width: "calc(50%)",
										display: "flex",
										justifyContent: "center",

										background: item.discount_type === 2 ? colors.primary_color_1_1 : "rgb(240,242,245)",
										alignItems: "center",
										cursor: "pointer"
									}}
									onClick={() => handleChangeType(item, 2, entity)}
								>
									VNĐ
								</div>
							</div>
						}
					/>
				</div>
				<div
					style={{
						width: "80px",
						padding: "2px 4px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "60px"
					}}
				>
					<div
						style={{
							cursor: "pointer",
							border: "1px solid rgb(212,212,212)",
							borderRadius: "2px",
							width: "30px",
							height: "30px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						}}
						onClick={() => removeRecord(item, entity)}
					>
						<SvgBin style={{ transform: "scale(0.7)" }} fill="rgb(212,212,212)" />
					</div>
				</div>
			</div>
		</>
	);
};

export default ApplyForType4;
