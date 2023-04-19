import { Image, InputNumber } from "antd";
import React from "react";
import SvgBin from "src/assets/svg/SvgBin";
import { API_URL_CDN } from "src/services/api/config";
import colors from "src/utils/colors";
import NoImage from "src/assets/images/no-image.jpg";
const ApplyForType3 = ({
	applyAll,
	indexItem,
	item,
	entity,
	handleChangeValueTo,
	handleChangeValueFrom,
	handleChangeType,
	handleChangeAmount,
	removeRecord,
	handleAddRecordItem
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
						min={0}
						max={1000000000}
						value={item.quantity_from}
						onChange={(e: any) => handleChangeValueFrom(item, e, entity)}
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
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
						defaultValue={0}
						value={item.max_use_quantity}
						onChange={(e: any) => handleChangeValueTo(item, e, entity)}
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
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
						height: "50px"
					}}
				>
					<Image
						style={{ height: "50px", width: "auto", maxWidth: "100%", objectFit: "contain" }}
						alt={item?.category_image}
						src={item?.category_image ? `${API_URL_CDN}${item?.category_image}` : NoImage}
						preview={{ className: "modalImage" }}
					/>
				</div>
				<div
					style={{
						width: "calc((100% - 140px) / 4)",
						padding: "2px 4px",
						borderRight: "1px solid rgb(212,212,212)",
						height: "50px"
					}}
				>
					<div style={{ display: "flex", height: "100%", alignItems: "center" }}> {item.category_name}</div>
				</div>
				<div
					style={{
						width: "calc((100% - 140px) / 4)",
						padding: "2px 4px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRight: "1px solid rgb(212,212,212)",
						height: "50px"
					}}
				>
					<InputNumber
						min={0}
						max={1000000000}
						defaultValue={0}
						value={item.quantity_from}
						onChange={(e: any) => handleChangeValueFrom(item, e, entity)}
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
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
						height: "50px"
					}}
				>
					<InputNumber
						min={0}
						max={1000000000}
						value={item.max_use_quantity}
						onChange={(e: any) => handleChangeValueTo(item, e, entity)}
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
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
						height: "50px"
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
						height: "50px"
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

export default ApplyForType3;
