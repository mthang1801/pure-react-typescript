import { Checkbox, Input, InputNumber, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifyError, notifySuccess } from "src/components/notification";
import SubHeader from "src/components/subHeader/SubHeader";
import { getListConfigs, updateOneConfigs } from "src/services/actions/configSetting.actions";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import { getDistricts, getProvinces, getWards } from "src/services/api/locators";
import { API_STORES } from "src/services/api/url.index";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";

const ConfigSettingList = () => {
	const dispatch = useDispatch();
	const isMount = useIsMount();
	const [dataConfig, setDataConfig] = useState<any>([]);
	const [provincesList, setProvincesList] = useState<any[]>([]);
	const [districtsList, setDistrictsList] = useState<any[]>([]);
	const [wardsList, setWardsList] = useState<any[]>([]);
	const [storesList, setStoresList] = useState<any[]>([]);

	const [selectedProvince, setSelectedProvince] = useState<any>(null);
	const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
	const [selectedWard, setSelectedWard] = useState<any>(null);
	const [selectedTab, setSelectedTab] = useState<any>("Company");

	const { stateListConfigs, stateUpdateOneConfigs } = useSelector((e: AppState) => e.configsReducer);

	useEffect(() => {
		dispatch(getListConfigs());

		return () => {};
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
			setProvincesList(fakeList);
		});
	}, []);
	useEffect(() => {
		const getStores = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/${API_STORES}`, params)) as any;
				let data = response["data"];
				let fakeList = [];
				for (let i = 0; i < data.length; i++) {
					fakeList.push({
						...data[i],
						label: data[i]?.warehouse_name,
						value: data[i]?.id
					});
				}
				setStoresList(fakeList);
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};
		const timer = setTimeout(() => {
			getStores({ page: 1, limit: 10000, status: true });
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, []);
	useEffect(() => {
		if (selectedProvince) {
			getDistricts({ province_id: selectedProvince }).then((res) => {
				let fakeList = [];
				for (let i = 0; i < res.length; i++) {
					fakeList.push({
						label: res[i]?.district_name,
						value: res[i]?.id
					});
				}
				setDistrictsList(fakeList);
			});
		}
	}, [selectedProvince]);

	useEffect(() => {
		if (selectedDistrict) {
			getWards({ district_id: selectedDistrict }).then((res) => {
				let fakeList = [];
				for (let i = 0; i < res.length; i++) {
					fakeList.push({
						label: res[i]?.ward_name,
						value: res[i]?.id
					});
				}
				setWardsList(fakeList);
			});
		}
		setWardsList([]);
		setSelectedWard(null);
	}, [selectedDistrict]);
	const onSelectProvince = (value: any) => {
		setSelectedProvince(value);

		setDistrictsList([]);
		setWardsList([]);
		setSelectedDistrict(null);
		setSelectedWard(null);
	};

	const onSelectDistrict = (value: any) => {
		setSelectedDistrict(value);

		setWardsList([]);
		setSelectedWard(null);
	};

	const onSelectWard = (value: any) => {
		setSelectedWard(value);
	};
	useEffect((): void | undefined => {
		if (isMount) return;
		const { data, message, success, error } = stateListConfigs;
		if (success) {
			console.log(data?.data);
			setDataConfig(data?.data);
			let fakeArray = [...data?.data];
			let fakeSelectedProvince = fakeArray
				.find((x: any) => x.obj === "Company")
				?.children?.find((item: any) => item.obj_key === "Tỉnh/thành")?.obj_value;
			let fakeSelectedDistrict = fakeArray
				.find((x: any) => x.obj === "Company")
				?.children?.find((item: any) => item.obj_key === "Quận/huyện")?.obj_value;
			setSelectedProvince(fakeSelectedProvince);
			setSelectedDistrict(fakeSelectedDistrict);
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateListConfigs.isLoading]);

	useEffect((): void | undefined => {
		if (isMount) return;
		const { data, message, success, error } = stateUpdateOneConfigs;
		if (success) {
			notifySuccess("Cập nhật thiết lập thành công");
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateUpdateOneConfigs.isLoading]);

	const getOptionsByKey = (key: any) => {
		switch (key) {
			case "Tỉnh/thành":
				return provincesList;
			case "Quốc gia":
				return [];
			case "Quận/huyện":
				return districtsList;
			case "Phường/xã":
				return wardsList;
			case "Method of sending e-mails":
				return [
					{ label: "SMTP server", value: 0 },
					{ label: "Mail function", value: 1 }
				];
			case "SMTP server setting":
				break;
			case "Use Encrypted Connection":
				return [
					{ label: "None", value: 0 },
					{ label: "TLS", value: 1 },
					{ label: "SSL", value: 2 }
				];
			case "Phương thức tính thuế dựa trên":
				return [
					{ label: "Đơn giá", value: 0 },
					{ label: "Tổng giá sau chiết khấu", value: 1 }
				];
			case "Cho phép người bán khoá khách hàng":
				return [
					{ label: "Cho phép", value: 0 },
					{ label: "Ẩn nút đặt hàng", value: 1 },
					{ label: "Ẩn giá và nút đặt hàng", value: 2 }
				];
			case "Thumnail format":
				return [
					{ label: "None", value: 0 },
					{ label: "PNG", value: 1 },
					{ label: "JPG", value: 2 }
				];
			case "Kho hàng":
				return storesList;
			case "Yêu cầu giao hàng":
				return [
					{
						label: "Cho xem hàng, không cho thử",
						value: 1
					},
					{
						label: "Cho xem hàng, cho thử",
						value: 2
					},
					{
						label: "Không cho xem hàng",
						value: 3
					}
				];
			default:
				break;
		}
		return [{ label: "123", value: "1231" }];
	};

	const onChangeValue = (value: any, parent: any, children: any) => {
		let fakeArray = [...dataConfig];
		let fakeArrayItem = fakeArray
			.find((x: any) => x.obj === parent)
			?.children?.map((item: any) => (item.id === children?.id ? { ...item, obj_value: value } : item));
		fakeArray = fakeArray.map((x: any) => (x?.obj === parent ? { ...x, children: fakeArrayItem } : x));

		if (children?.obj_key === "Tỉnh/thành") {
			let fakeArrayItemDistrict = fakeArray
				.find((x: any) => x.obj === parent)
				?.children?.map((item: any) => (item.obj_key === "Quận/huyện" ? { ...item, obj_value: undefined } : item));
			fakeArray = fakeArray.map((x: any) => (x?.obj === parent ? { ...x, children: fakeArrayItemDistrict } : x));
		}
		if (children?.obj_key === "Tỉnh/thành" || children?.obj_key === "Quận/huyện") {
			let fakeArrayItemDistrict = fakeArray
				.find((x: any) => x.obj === parent)
				?.children?.map((item: any) => (item.obj_key === "Phường/xã" ? { ...item, obj_value: undefined } : item));
			fakeArray = fakeArray.map((x: any) => (x?.obj === parent ? { ...x, children: fakeArrayItemDistrict } : x));
		}
		setDataConfig(fakeArray);
	};

	const submitSave = () => {
		let params = [];
		for (let i = 0; i < dataConfig?.length; i++) {
			for (let j = 0; j < dataConfig[i]?.children?.length; j++) {
				params.push({
					id: dataConfig[i]?.children[j]?.id,
					obj_value: dataConfig[i]?.children[j]?.obj_value?.toString()
				});
			}
		}
		dispatch(updateOneConfigs({ settings: params }));
	};
	return (
		<div className="mainPages">
			<SubHeader breadcrumb={[{ text: "Thiết lập hệ thống" }, { text: "Thiết lập chung" }]} />
			<div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
				<div className="defaultButton" onClick={() => submitSave()}>
					Lưu
				</div>
			</div>
			<div style={{ display: "flex", justifyContent: "space-between", marginTop: "13px" }}>
				<div
					style={{
						background: "#fff",
						border: "1px solid rgb(243,243,243)",
						borderRadius: "5px",
						width: "200px",
						maxHeight: "190px",
						overflow: "hidden"
					}}
				>
					{dataConfig?.length > 0 &&
						dataConfig.map((item: any) => (
							<div
								style={{ cursor: "pointer", padding: "8px", background: item?.obj === selectedTab ? "#fcd804" : "" }}
								onClick={() => setSelectedTab(item?.obj)}
							>
								{item?.obj}
							</div>
						))}
				</div>
				<div
					style={{
						background: "#fff",
						border: "1px solid rgb(243,243,243)",
						borderRadius: "5px",
						width: "calc(100% - 213px)",
						padding: " 4px 8px"
					}}
				>
					{dataConfig?.find((x: any) => x.obj === selectedTab)?.children?.length > 0 &&
						dataConfig
							.find((x: any) => x.obj === selectedTab)
							?.children?.map((children: any) => (
								<div style={{ padding: "4px 6px" }}>
									<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
										<div style={{ minWidth: "30%" }}>{children?.obj_key}</div>
										{children?.obj_type === "text" ? (
											<Input
												className="defaultInput"
												value={children?.obj_value}
												onChange={(e: any) => onChangeValue(e.target.value, selectedTab, children)}
											/>
										) : children?.obj_type === "number" ? (
											<InputNumber
												className="defaultInputNumber"
												value={children?.obj_value}
												onChange={(e: any) => onChangeValue(e, selectedTab, children)}
												min={0}
												formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
												parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
											/>
										) : children?.obj_type === "checkbox" ? (
											<Checkbox
												checked={children?.obj_value}
												onChange={(e: any) => onChangeValue(e, selectedTab, children)}
											/>
										) : (
											<Select
												options={getOptionsByKey(children?.obj_key)}
												onChange={(e: any) => {
													onChangeValue(e, selectedTab, children);
													children?.obj_key === "Tỉnh/thành" && onSelectProvince(e);
													children?.obj_key === "Quận/huyện" && onSelectDistrict(e);
													children?.obj_key === "Phường/xã" && onSelectWard(e);
												}}
												className="defaultSelect"
												value={Number(children?.obj_value)}
											/>
										)}
									</div>
								</div>
							))}
				</div>
			</div>
		</div>
	);
};

export default ConfigSettingList;
