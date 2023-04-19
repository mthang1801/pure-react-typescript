import { InputNumber } from "antd";
import React from "react";
import SvgBin from "src/assets/svg/SvgBin";
import { notifyWarning } from "src/components/notification";
import colors from "src/utils/colors";

const ApplyForType1 = ({
	applyAll,
	applyFor,
	entityList,
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
	console.log(entityList[0]?.details[indexItem - 1]?.total_price_to);
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
						width: "calc((100% - 80px) / 3)",
						borderRight: "1px solid rgb(212,212,212)",
						padding: "4px 8px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<InputNumber
						min={indexItem === 0 ? 0 : entityList[0]?.details[indexItem - 1]?.total_price_to + 1}
						max={1000000000}
						value={item.total_price_from}
						onChange={(e: any) => handleChangeValueFrom(item, e)}
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
						className="defaultInputNumber"
					/>
				</div>
				<div
					style={{
						width: "calc((100% - 80px) / 3)",
						borderRight: "1px solid rgb(212,212,212)",
						padding: "4px 8px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<InputNumber
						min={0}
						max={1000000000}
						value={item.total_price_to}
						onChange={(e: any) => handleChangeValueTo(item, e)}
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
						className="defaultInputNumber"
					/>
				</div>
				<div
					style={{
						width: "calc((100% - 80px) / 3)",
						borderRight: "1px solid rgb(212,212,212)",
						padding: "4px 8px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<InputNumber
						min={0}
						max={item.discount_type === 1 ? 100 : 1000000000}
						defaultValue={0}
						value={item.discount_amount}
						onChange={(e: any) => handleChangeAmount(item, e)}
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
									onClick={() => handleChangeType(item, 1)}
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
									onClick={() => handleChangeType(item, 2)}
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
						padding: "4px 8px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
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
						width: "calc((100% - 80px) / 3)",
						borderRight: "1px solid rgb(212,212,212)",
						padding: "4px 8px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<InputNumber
						min={indexItem === 0 ? 0 : entityList[0]?.details[indexItem - 1]?.total_price_to + 1}
						max={1000000000}
						onBlur={(e: any) =>
							indexItem !== 0 &&
							Number(e.target.value?.replaceAll(",", "")) < entityList[0]?.details[indexItem - 1]?.total_price_to + 1 &&
							notifyWarning("Giá trị không hợp lệ")
						}
						value={item.total_price_from}
						onChange={(e: any) => handleChangeValueFrom(item, e)}
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
						className="defaultInputNumber"
					/>
				</div>
				<div
					style={{
						width: "calc((100% - 80px) / 3)",
						borderRight: "1px solid rgb(212,212,212)",
						padding: "4px 8px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<InputNumber
						min={0}
						max={1000000000}
						value={item.total_price_to}
						onChange={(e: any) => handleChangeValueTo(item, e)}
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
						className="defaultInputNumber"
					/>
				</div>
				<div
					style={{
						width: "calc((100% - 80px) / 3)",
						borderRight: "1px solid rgb(212,212,212)",
						padding: "4px 8px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<InputNumber
						min={0}
						max={item.discount_type === 1 ? 100 : 1000000000}
						defaultValue={0}
						value={item.discount_amount}
						onChange={(e: any) => handleChangeAmount(item, e)}
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
						className="defaultInputNumberAddon"
						style={{ overflow: "hidden", width: "100%" }}
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
									onClick={() => handleChangeType(item, 1)}
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
									onClick={() => handleChangeType(item, 2)}
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
						padding: "4px 8px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
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

export default ApplyForType1;
