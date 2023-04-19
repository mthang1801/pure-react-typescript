import React, { useEffect, useState } from "react";
import Svg205 from "src/assets/svg/Svg205";
import SubHeader from "src/components/subHeader/SubHeader";
import TableStyledAntd from "src/components/table/TableStyled";
import { convertNumberWithCommas, removeSign } from "src/utils/helpers/functions/textUtils";
import { columnsData } from "./data";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import { Select } from "antd";
import Chart from "react-apexcharts";
import SvgCatalogs from "src/assets/svg/SvgCatalogs";
import Svg203 from "src/assets/svg/\bSvg203";
import Svg200 from "src/assets/svg/Svg200";
import Svg209 from "src/assets/svg/Svg209";
import Svg206 from "src/assets/svg/Svg206";
import Svg204 from "src/assets/svg/Svg204";
import Svg207 from "src/assets/svg/Svg207";
import Svg208 from "src/assets/svg/Svg208";
import Svg212 from "src/assets/svg/Svg212";
import { getProvinces } from "src/services/api/locators";
const TransportOverview = () => {
	const [listShippingUnits, setListShippingUnits] = useState<any[]>([]);
	const [filterOverview, setFilterOverview] = useState<any>(undefined);
	const [filterTable, setFilterTable] = useState<any>(undefined);
	const [filterBar, setFilterBar] = useState<any>(undefined);
	const [provinceList, setProvinceList] = useState<any[]>([]);
	const [dataOverview, setDataOverview] = useState<any>(undefined);
	const [dataPies, setDataPies] = useState<any[]>([]);
	const [dataTable, setDataTable] = useState<any[]>([]);
	const [dataLine, setDataLine] = useState<any>({
		time: [],
		color: [
			"rgb(0,117,164)",
			"rgb(241,36,56)",
			"rgb(0,185,107)",
			"#E5B43D",
			"#808A94",
			"rgb(0,20,107)",
			"rgb(0,197,214)",
			"rgb(50,97,116)",
			"rgb(180,97,36)",
			"rgb(180,97,180)"
		],
		data: [
			{
				name: "Đang giao hàng",
				data: []
			},
			{
				name: "Lỗi giao hàng",
				data: []
			},
			{
				name: "Giao thành công",
				data: []
			},
			{
				name: "Đã đóng gói",
				data: []
			},
			{
				name: "Chờ đóng gói",
				data: []
			},
			{
				name: "Đã chuyển hoàn",
				data: []
			},
			{
				name: "Đang chuyển hoàn",
				data: []
			},
			{
				name: "Đang vận chuyển",
				data: []
			},
			{
				name: "Chờ giao lại",
				data: []
			},
			{
				name: "Chờ lấy hàng",
				data: []
			}
		]
	});
	const [dataBarchart, setDataBarchart] = useState<any>({
		time: [],
		data: [
			{
				name: "NTL",
				data: []
			},
			{
				name: "NTX",
				data: []
			}
		]
	});
	useEffect(() => {
		const getAddProducts = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/transport-overview/statuses`, params)) as any;
				let data = response;
				setDataOverview(data?.data);
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};
		let params = { shipping_unit_id: filterOverview };
		getAddProducts(params);
	}, [filterOverview]);

	useEffect(() => {
		const getShippingUnits = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/shipping-units`, params)) as any;
				let data = response;
				let array = data?.data;
				let fakeData = [{ value: null, label: "Tất cả" }] as any;
				for (let i = 0; i < array?.length; i++) {
					fakeData.push({
						...array[i],
						label: array[i]?.shipping_unit,
						value: array[i]?.id
					});
				}
				setListShippingUnits(fakeData);
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};

		getShippingUnits();
	}, []);

	useEffect(() => {
		getProvinces().then((res) => {
			let fakeList = [];
			for (let i = 0; i < res.length; i++) {
				fakeList.push({
					label: res[i]?.province_name,
					value: res[i]?.id
				});
			}
			setProvinceList(fakeList);
		});
	}, []);

	useEffect(() => {
		const getAddProducts = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/transport-overview/proportion`, params)) as any;
				let data = response;

				let time = Object.entries(data?.data).map((item: any) => item[0]);
				let fakeArray = [...dataLine.data];
				for (let i = 0; i < Object.entries(data?.data).map((item: any) => item[1]).length; i++) {
					fakeArray[0]?.data?.push(Math.round(Object.entries(data?.data).map((item: any) => item[1])[i].Delivery));
					fakeArray[1]?.data?.push(Math.round(Object.entries(data?.data).map((item: any) => item[1])[i].DeliveryFail));
					fakeArray[2]?.data?.push(
						Math.round(Object.entries(data?.data).map((item: any) => item[1])[i].DeliverySuccess)
					);
					fakeArray[3]?.data?.push(Math.round(Object.entries(data?.data).map((item: any) => item[1])[i].Packaged));

					fakeArray[4]?.data?.push(Math.round(Object.entries(data?.data).map((item: any) => item[1])[i].Packaging));

					fakeArray[5]?.data?.push(Math.round(Object.entries(data?.data).map((item: any) => item[1])[i].Returned));
					fakeArray[6]?.data?.push(Math.round(Object.entries(data?.data).map((item: any) => item[1])[i].Returning));
					fakeArray[7]?.data?.push(Math.round(Object.entries(data?.data).map((item: any) => item[1])[i].Transporting));
					fakeArray[8]?.data?.push(
						Math.round(Object.entries(data?.data).map((item: any) => item[1])[i].WaitingDeliveryAgain)
					);
					fakeArray[9]?.data?.push(Math.round(Object.entries(data?.data).map((item: any) => item[1])[i].WaitingPickup));
					// fakeArray[0]?.data?.push(
					// 	Math.round(Object.entries(data?.data).map((item: any) => item[1])[i].Delivery * 100)
					// 		.toString()
					// 		.split(".")[0]
					// );
					// fakeArray[1]?.data?.push(
					// 	Math.round(Object.entries(data?.data).map((item: any) => item[1])[i].DeliveryFail * 100)
					// 		.toString()
					// 		.split(".")[0]
					// );
					// fakeArray[2]?.data?.push(
					// 	Math.round(Object.entries(data?.data).map((item: any) => item[1])[i].DeliverySuccess * 100)
					// 		.toString()
					// 		.split(".")[0]
					// );
					// fakeArray[3]?.data?.push(
					// 	Math.round(Object.entries(data?.data).map((item: any) => item[1])[i].Packaged * 100)
					// 		.toString()
					// 		.split(".")[0]
					// );

					// fakeArray[4]?.data?.push(
					// 	Math.round(Object.entries(data?.data).map((item: any) => item[1])[i].Packaging * 100)
					// 		.toString()
					// 		.split(".")[0]
					// );

					// fakeArray[5]?.data?.push(
					// 	Math.round(Object.entries(data?.data).map((item: any) => item[1])[i].Returned * 100)
					// 		.toString()
					// 		.split(".")[0]
					// );
					// fakeArray[6]?.data?.push(
					// 	Math.round(Object.entries(data?.data).map((item: any) => item[1])[i].Returning * 100)
					// 		.toString()
					// 		.split(".")[0]
					// );
					// fakeArray[7]?.data?.push(
					// 	Math.round(Object.entries(data?.data).map((item: any) => item[1])[i].Transporting * 100)
					// 		.toString()
					// 		.split(".")[0]
					// );
					// fakeArray[8]?.data?.push(
					// 	Math.round(Object.entries(data?.data).map((item: any) => item[1])[i].WaitingDeliveryAgain * 100)
					// 		.toString()
					// 		.split(".")[0]
					// );
					// fakeArray[9]?.data?.push(
					// 	Math.round(Object.entries(data?.data).map((item: any) => item[1])[i].WaitingPickup * 100)
					// 		.toString()
					// 		.split(".")[0]
					// );
				}
				for (let i = 0; i < fakeArray.length; i++) {
					fakeArray[i].data = fakeArray[i].data.reverse();
				}
				setDataLine({ ...dataLine, data: fakeArray, time: time.reverse() });
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};

		getAddProducts();
	}, []);

	useEffect(() => {
		const getAddProducts = async (params?: any) => {
			try {
				const response = (await api.get(
					`${API_URL}/transport-overview/weekly-general-report?s_province=${filterBar}
				`,
					params
				)) as any;
				let data = response;

				let time = Object.entries(data?.data).map((item: any) => item[0]);
				let dataArray = Object.entries(data?.data).map((item: any) => item[1]);
				let fakeArray = [
					...dataBarchart.data.map((item: any) => {
						return { ...item, data: [] };
					})
				];
				for (let i = 0; i < dataArray.length; i++) {
					fakeArray[0].data.push(
						Number(
							Object.entries(data?.data)
								.map((item: any) => item[1])
								[i].NTL.toString()
								.split(".")[0]
						)
					);
					fakeArray[1].data.push(
						Number(
							Object.entries(data?.data)
								.map((item: any) => item[1])
								[i].NTX.toString()
								.split(".")[0]
						)
					);
				}
				fakeArray[0].data.reverse();
				fakeArray[1].data.reverse();

				// console.log("Sfsadfdsa", { data: fakeArray, time: time.reverse() });
				setDataBarchart({ data: fakeArray, time: time.reverse() });
			} catch (error: any) {
				throw new Error(error?.response?.data?.message);
			}
		};

		getAddProducts();
	}, [filterBar]);

	useEffect(() => {
		const getDataTable = async (params?: any) => {
			try {
				const response = (await api.get(
					`${API_URL}/transport-overview/cod-carriage
				`,
					params
				)) as any;
				let data = response;
				setDataTable([
					...data?.data?.details,
					{
						...data?.data?.summary,
						forControlStatusName: "Tổng cộng"
					}
				]);
			} catch (error: any) {
				throw new Error(error?.response?.data?.message);
			}
		};
		let params = { shipping_unit_id: filterTable };
		getDataTable(params);
	}, [filterTable]);
	useEffect(() => {
		const getAddProducts = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/transport-overview/proportion-by-shipping-unit`, params)) as any;
				let data = response;
				setDataPies(Object.entries(data?.data));

				// setDataPies(Object.entries(data?.data));
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};

		getAddProducts();
	}, []);

	// useEffect(() => {
	// 	let fakeData = [];
	// 	for (let i = 0; i < 7; i++) {
	// 		let nowDate = new Date();
	// 		let newDate = nowDate.setDate(nowDate.getDate() - (7 - i));
	// 		fakeData.push({
	// 			id: i,
	// 			time: `${new Date(newDate).getDate()}/${new Date(newDate).getMonth()}`,
	// 			value1: 14 - i + parseInt((Math.random() * 100).toString().split(".")[0]),
	// 			value2: i + 20 + parseInt((Math.random() * 100).toString().split(".")[0])
	// 		});
	// 	}
	// 	setDataBarchart(fakeData);
	// 	console.log(fakeData);
	// }, [filterBar]);

	const getName = (value: any) => {
		switch (value) {
			case "NTL":
				return "Nhất tín Logistics";
			case "NTX":
				return "Nhất tín Express";

			default:
				return "Nhất tín Logistics";
		}
	};
	return (
		<div className="mainPages">
			<SubHeader breadcrumb={[{ text: "Cấu hình vận chuyển" }, { text: "Tổng quan vận chuyển" }]} />
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<div
					style={{
						width: "60%",
						background: "#fff",
						borderRadius: "5px",
						border: "1px solid rgb(212,212,212)",
						padding: "13px",
						display: "flex",
						justifyContent: "space-between",
						flexWrap: "wrap"
					}}
				>
					<div
						style={{
							width: "100%",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: "15px"
						}}
					>
						<h4>Tình hình vận chuyển</h4>
						<div style={{ display: "flex", alignItems: "center", minWidth: "40%" }}>
							<span style={{ width: "60px" }}>Đối tác</span>&nbsp;
							<Select
								showSearch
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								options={listShippingUnits}
								placeholder="Tất cả"
								className="defaultSelect"
								value={filterOverview}
								onChange={(e: any) => setFilterOverview(e)}
							/>
						</div>
					</div>
					<div
						style={{
							width: "calc((100% - 32px) / 5 )",
							display: "flex",
							alignItems: "center",
							borderRadius: "5px",
							border: "1px solid rgb(231,234,236)",
							background: "rgb(240,242,245)",
							flexDirection: "column",
							padding: "12px 8px 8px 8px"
						}}
					>
						<Svg205 fill="rgb(128,138,148)" style={{ transform: "scale(1.4)" }} />
						<div style={{ marginTop: "4px" }} className="breakOneLineNew">
							Chờ đóng gói
						</div>
						<div style={{ color: " #2980B0", fontWeight: "600" }}>{dataOverview?.waitingPackingCount || 0} đơn</div>
						<div style={{ color: " #808A94" }}>
							{convertNumberWithCommas(dataOverview?.waitingPackingAmount || "0")}&nbsp;đ
						</div>
					</div>
					<div
						style={{
							width: "calc((100% - 32px) / 5 )",
							display: "flex",
							alignItems: "center",
							borderRadius: "5px",
							border: "1px solid rgb(231,234,236)",
							background: "rgb(240,242,245)",
							flexDirection: "column",
							padding: "12px 8px 8px 8px"
						}}
					>
						<SvgCatalogs fill="rgb(128,138,148)" style={{ transform: "scale(1.4)" }} />
						<div style={{ marginTop: "4px" }} className="breakOneLineNew">
							Đã đóng gói
						</div>
						<div style={{ color: " #2980B0", fontWeight: "600" }}>{dataOverview?.packagedCount || 0} đơn</div>
						<div style={{ color: " #808A94" }}>
							{convertNumberWithCommas(dataOverview?.packagedAmount || "0")}&nbsp;đ
						</div>
					</div>
					<div
						style={{
							width: "calc((100% - 32px) / 5 )",
							display: "flex",
							alignItems: "center",
							borderRadius: "5px",
							border: "1px solid rgb(231,234,236)",
							background: "rgb(240,242,245)",
							flexDirection: "column",
							padding: "12px 8px 8px 8px"
						}}
					>
						<Svg203 fill="rgb(128,138,148)" style={{ transform: "scale(1.4)" }} />
						<div style={{ marginTop: "4px" }} className="breakOneLineNew">
							Chờ lấy hàng
						</div>
						<div style={{ color: " #2980B0", fontWeight: "600" }}>{dataOverview?.waitingPickingUpCount || 0} đơn</div>
						<div style={{ color: " #808A94" }}>
							{convertNumberWithCommas(dataOverview?.waitingPickingUpAmount || "0")}&nbsp;đ
						</div>
					</div>
					<div
						style={{
							width: "calc((100% - 32px) / 5 )",
							display: "flex",
							alignItems: "center",
							borderRadius: "5px",
							border: "1px solid rgb(231,234,236)",
							background: "rgb(240,242,245)",
							flexDirection: "column",
							padding: "12px 8px 8px 8px"
						}}
					>
						<Svg200 fill="rgb(128,138,148)" style={{ transform: "scale(1.4)" }} />
						<div style={{ marginTop: "4px" }} className="breakOneLineNew">
							Đang vận chuyển
						</div>
						<div style={{ color: " #2980B0", fontWeight: "600" }}>{dataOverview?.transportingCount || 0} đơn</div>
						<div style={{ color: " #808A94" }}>
							{convertNumberWithCommas(dataOverview?.transportingAmount || "0")}&nbsp;đ
						</div>
					</div>
					<div
						style={{
							width: "calc((100% - 32px) / 5 )",
							display: "flex",
							alignItems: "center",
							borderRadius: "5px",
							border: "1px solid rgb(231,234,236)",
							background: "rgb(240,242,245)",
							flexDirection: "column",
							padding: "12px 8px 8px 8px"
						}}
					>
						<Svg209 fill="rgb(128,138,148)" style={{ transform: "scale(1.4)" }} />
						<div style={{ marginTop: "4px" }} className="breakOneLineNew">
							Đang giao hàng
						</div>
						<div style={{ color: " #2980B0", fontWeight: "600" }}>{dataOverview?.deliveryCount || 0} đơn</div>
						<div style={{ color: " #808A94" }}>
							{convertNumberWithCommas(dataOverview?.deliveryAmount || "0")}&nbsp;đ
						</div>
					</div>
					<div
						style={{
							width: "calc((100% - 32px) / 5 )",
							display: "flex",
							alignItems: "center",
							borderRadius: "5px",
							border: "1px solid rgb(231,234,236)",
							background: "rgb(240,242,245)",
							flexDirection: "column",
							padding: "12px 8px 8px 8px",
							marginTop: "8px"
						}}
					>
						<Svg206 fill="rgb(128,138,148)" style={{ transform: "scale(1.4)" }} />
						<div style={{ marginTop: "4px" }} className="breakOneLineNew">
							Giao thành công
						</div>
						<div style={{ color: " #2980B0", fontWeight: "600" }}>{dataOverview?.deliverySuccessCount} đơn</div>
						<div style={{ color: " #808A94" }}>
							{convertNumberWithCommas(
								dataOverview?.deliverySuccessAmount ? dataOverview?.deliverySuccessAmount?.toString() : "0"
							)}
							&nbsp;đ
						</div>
					</div>
					<div
						style={{
							width: "calc((100% - 32px) / 5 )",
							display: "flex",
							alignItems: "center",
							borderRadius: "5px",
							border: "1px solid rgb(231,234,236)",
							background: "rgb(240,242,245)",
							flexDirection: "column",
							padding: "12px 8px 8px 8px",
							marginTop: "8px"
						}}
					>
						<Svg204 fill="rgb(128,138,148)" style={{ transform: "scale(1.4)" }} />
						<div style={{ marginTop: "4px" }} className="breakOneLineNew">
							Lỗi giao hàng
						</div>
						<div style={{ color: " #2980B0", fontWeight: "600" }}>{dataOverview?.deliveryFailCount || 0} đơn</div>
						<div style={{ color: " #808A94" }}>
							{convertNumberWithCommas(dataOverview?.deliveryFailAmount || "0")}&nbsp;đ
						</div>
					</div>
					<div
						style={{
							width: "calc((100% - 32px) / 5 )",
							display: "flex",
							alignItems: "center",
							borderRadius: "5px",
							border: "1px solid rgb(231,234,236)",
							background: "rgb(240,242,245)",
							flexDirection: "column",
							padding: "12px 8px 8px 8px",
							marginTop: "8px"
						}}
					>
						<Svg207 fill="rgb(128,138,148)" style={{ transform: "scale(1.4)" }} />
						<div style={{ marginTop: "4px" }} className="breakOneLineNew">
							Chờ giao lại
						</div>
						<div style={{ color: " #2980B0", fontWeight: "600" }}>
							{dataOverview?.waitingDeliveryAgainCount || 0} đơn
						</div>
						<div style={{ color: " #808A94" }}>
							{convertNumberWithCommas(dataOverview?.waitingDeliveryAgainAmount || "0")}&nbsp;đ
						</div>
					</div>
					<div
						style={{
							width: "calc((100% - 32px) / 5 )",
							display: "flex",
							alignItems: "center",
							borderRadius: "5px",
							border: "1px solid rgb(231,234,236)",
							background: "rgb(240,242,245)",
							flexDirection: "column",
							padding: "12px 8px 8px 8px",
							marginTop: "8px"
						}}
					>
						<Svg208 fill="rgb(128,138,148)" style={{ transform: "scale(1.4)" }} />
						<div style={{ marginTop: "4px" }} className="breakOneLineNew">
							Chuyển hoàn
						</div>
						<div style={{ color: " #2980B0", fontWeight: "600" }}>{dataOverview?.returningCount || 0} đơn</div>
						<div style={{ color: " #808A94" }}>
							{convertNumberWithCommas(dataOverview?.returningAmount || "0")}&nbsp;đ
						</div>
					</div>
					<div
						style={{
							width: "calc((100% - 32px) / 5 )",
							display: "flex",
							alignItems: "center",
							borderRadius: "5px",
							border: "1px solid rgb(231,234,236)",
							background: "rgb(240,242,245)",
							flexDirection: "column",
							padding: "12px 8px 8px 8px",
							marginTop: "8px"
						}}
					>
						<Svg212 fill="rgb(128,138,148)" style={{ transform: "scale(1.4)" }} />
						<div style={{ marginTop: "4px" }} className="breakOneLineNew">
							Đã chuyển hoàn
						</div>
						<div style={{ color: " #2980B0", fontWeight: "600" }}>{dataOverview?.returnedCount || 0} đơn</div>
						<div style={{ color: " #808A94" }}>
							{convertNumberWithCommas(dataOverview?.returnedAmount || "0")}&nbsp;đ
						</div>
					</div>
				</div>{" "}
				<div
					style={{
						width: "calc(40% - 13px)",
						background: "#fff",
						borderRadius: "5px",
						border: "1px solid rgb(212,212,212)",
						padding: "13px"
					}}
				>
					<div
						style={{
							marginBottom: "4px",
							width: "100%",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center"
						}}
					>
						<h4>Tình hình đối soát COD</h4>
						<div style={{ display: "flex", alignItems: "center", minWidth: "40%" }}>
							<span style={{ width: "80px" }}>Đối tác</span>&nbsp;
							<Select
								style={{ minWidth: "120px" }}
								showSearch
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								options={listShippingUnits}
								placeholder="Tất cả"
								className="defaultSelect"
								value={filterTable}
								onChange={(e: any) => setFilterTable(e)}
							/>
						</div>
					</div>
					<TableStyledAntd
						style={{ marginTop: "13px" }}
						rowKey="forControlStatusName"
						bordered
						dataSource={dataTable}
						pagination={false}
						loading={false}
						columns={columnsData() as any}
					/>
				</div>
			</div>
			<div style={{ marginTop: "13px", display: "flex", justifyContent: "space-between" }}>
				<div
					style={{
						width: "60%",
						background: "#fff",
						borderRadius: "5px",
						border: "1px solid rgb(212,212,212)",
						padding: "13px"
					}}
				>
					<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
						<div>
							<h4 style={{ margin: "0" }}>Tình hình vận chuyển</h4>
							<h4 style={{ color: "rgb(121,121,121", margin: "0" }}>Dữ liệu được tổng hợp trong tuần gần nhất</h4>
						</div>
						<div style={{ display: "flex", alignItems: "center", minWidth: "40%" }}>
							<span style={{ width: "80px" }}>Tỉnh giao</span>&nbsp;
							<Select
								style={{ minWidth: "120px" }}
								showSearch
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								options={provinceList}
								placeholder="Tất cả"
								className="defaultSelect"
								value={filterBar}
								onChange={(e: any) => setFilterBar(e)}
							/>
						</div>
					</div>
					<Chart
						type="bar"
						width="100%"
						height={300}
						series={[
							{
								name: "Nhất Tín Express",
								data: dataBarchart?.data?.find((x: any) => x.name === "NTX")?.data
							},
							{
								name: "Nhất Tín Logistics",
								data: dataBarchart?.data?.find((x: any) => x.name === "NTL")?.data
							}
						]}
						options={{
							colors: ["rgb(0,50,105)", "rgb(255,210,49)"],
							xaxis: {
								tickPlacement: "on",
								categories: dataBarchart?.time?.map(function (item: any) {
									return item;
								})
							},
							title: {
								text: "",
								style: {
									fontSize: "0px"
								}
							},
							grid: {
								borderColor: "#C4C4C4"
							},
							noData: {
								text: "No data!"
							},
							plotOptions: {
								bar: {
									dataLabels: {
										position: "top"
									}
								}
							},
							dataLabels: {
								offsetY: -25,
								style: {
									fontSize: "12px",
									colors: ["#304758"]
								}
							},
							chart: {
								events: {
									mounted: (chart: any) => {
										chart.windowResizeHandler();
									}
								},
								fontFamily: "open sans, Helvetica, Arial, sans-serif",
								toolbar: {
									tools: {
										download: true,
										selection: false,
										zoom: false,
										zoomin: false,
										zoomout: false,
										pan: false,
										reset: false,
										customIcons: []
									}
								}
							}
						}}
					/>
				</div>{" "}
				<div
					style={{
						width: "calc(40% - 13px)",
						background: "#fff",
						borderRadius: "5px",
						border: "1px solid rgb(212,212,212)",
						padding: "13px"
					}}
				>
					<h4 style={{ margin: "0" }}>Tỷ trọng phí vận chuyển</h4>

					<Chart
						type="donut"
						width="100%"
						height={312}
						series={dataPies.map((item: any) => item[1])}
						options={{
							labels: dataPies.map((item: any) => getName(item[0]?.split("_")[2])),
							colors: ["rgb(255,210,49)", "rgb(0,50,105)"],

							title: {
								text: "",
								style: {
									fontSize: "0px"
								}
							},
							grid: {
								borderColor: "#C4C4C4"
							},
							noData: {
								text: "No data!"
							},
							plotOptions: {
								pie: {
									donut: {
										labels: {
											show: true,
											total: {
												label: "Phí vận chuyển",
												showAlways: true,
												show: true,
												fontWeight: "600",
												formatter: () => {
													return "100%";
												}
											}
										}
									}
								}
							},
							dataLabels: {
								style: {
									fontSize: "12px",
									colors: ["#fff"]
								}
							},
							chart: {
								events: {
									mounted: (chart: any) => {
										chart.windowResizeHandler();
									}
								},
								fontFamily: "open sans, Helvetica, Arial, sans-serif",
								toolbar: {
									tools: {
										download: true,
										selection: false,
										zoom: false,
										zoomin: false,
										zoomout: false,
										pan: false,
										reset: false,
										customIcons: []
									}
								}
							}
						}}
					/>
				</div>
			</div>
			<div
				style={{
					background: "#fff",
					borderRadius: "5px",
					border: "1px solid rgb(212,212,212)",
					padding: "13px",
					marginTop: "13px"
				}}
			>
				<h4 style={{ margin: "0" }}>Tỷ trọng phí vận chuyển</h4>
				<h4 style={{ color: "rgb(121,121,121", margin: "0" }}>Dữ liệu được tổng hợp trong tuần gần nhất</h4>
				<Chart
					type="bar"
					width="100%"
					height={300}
					series={dataLine.data.map(function (item: any) {
						return {
							name: item.name,
							data: item.data
						};
					})}
					options={{
						chart: {
							stacked: true,
							stackType: "100%",
							toolbar: {
								show: false
							}
						},
						colors: dataLine.color,
						dataLabels: {
							enabled: true
						},

						grid: {
							borderColor: "#e7e7e7",
							row: {
								colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
								opacity: 0.5
							}
						},

						xaxis: {
							categories: dataLine.time.map(function (item: any) {
								return item;
							})
						},
						yaxis: {
							max: 100
						}
					}}
				/>
			</div>
		</div>
	);
};

export default TransportOverview;
