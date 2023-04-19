import { Form, Input, Select, TreeSelect } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import { notifyError } from "src/components/notification";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
import SubHeader from "src/components/subHeader/SubHeader";
import TableStyledAntd from "src/components/table/TableStyled";

import { AttributeFilterTypeVietnameseEnum, AttributeTypeEnum } from "src/constants/enum";
import { fetchAttributesList, updateAttribute } from "src/services/actions/attribute.actions";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import { API_CATEGORY } from "src/services/api/url.index";
import { AppState } from "src/types";
import routerNames from "src/utils/data/routerName";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { notifySuccess } from "../../../components/notification/index";
import { attributesListColumns } from "./data";
const { Option } = Select;

const FeaturesList = () => {
	const [formSearch] = Form.useForm();
	const isMount = useIsMount();
	const dispatch = useDispatch();

	const { stateAttributesList, stateUpdateAttribute } = useSelector((e: AppState) => e.attributesReducer);
	const features = localStorage.getItem("FEATURES") ? JSON.parse(localStorage.getItem("FEATURES") || "") : [];

	const [attributesList, setAttributesList] = useState<any[]>([]);

	const [paramsFilter, setParamsFiler] = useState<any>({
		q: "",
		page: 1,
		limit: 10,
		status: undefined,
		category_ids: undefined,
		purposes: undefined,
		filter_type: undefined
	});
	const [treeData, setTreeData] = useState<any[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
	useEffect(() => {
		if (features.includes("MODULE_PRODUCTS__FEATURES__VIEWS")) {
			dispatch(fetchAttributesList(paramsFilter));
		}
	}, [paramsFilter]);

	useEffect(() => {
		if (isMount) return;
		const { data, message, success, error } = stateAttributesList;
		if (success) {
			setAttributesList(data.data);
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateAttributesList.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { data, message, success, error } = stateUpdateAttribute;
		if (success) {
			notifySuccess("Cập nhật thành công.");
		}
		if (success === false || error) {
			notifyError(`Cập nhật không thành công, ${message}`);
			dispatch(fetchAttributesList(paramsFilter));
		}
	}, [stateUpdateAttribute.isLoading]);

	const onFilterStatus = (value: string) => {
		setParamsFiler((prevState: any) => ({ ...prevState, status: value }));
	};

	const onChangePurpose = (value: string) => {
		setParamsFiler((prevState: any) => ({ ...prevState, purposes: value }));
	};

	const onChangeAttributeType = (value: string) => {
		setParamsFiler((prevState: any) => ({
			...prevState,
			filter_type: value
		}));
	};

	const onSubmitSearchFilter = (values: any) => {
		let category_ids = selectedCategories.join(",");

		setParamsFiler({
			...paramsFilter,
			page: 1,
			q: values?.q,
			status: values?.status,
			category_ids: category_ids.length > 0 ? category_ids : undefined,
			filter_type: values?.filter_type
		});
	};

	const onChangePaging = (page: number, pageSize: number) => {
		setParamsFiler({
			...paramsFilter,
			page,
			limit: pageSize
		});
	};

	const onResetFilterParams = () => {
		setParamsFiler({
			q: undefined,
			page: 1,
			limit: 10,
			status: undefined,
			category_ids: undefined,
			purposes: undefined,
			filter_type: undefined
		});
		setSelectedCategories([]);
		formSearch.resetFields();
	};

	const onChangeStatus = (id: number, checked: boolean) => {
		dispatch(updateAttribute(id, { status: checked }));
	};

	useEffect(() => {
		const getCategories = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/${API_CATEGORY}`, params)) as any;
				let data = response["data"];
				for (let i = 0; i < data.length; i++) {
					data[i].value = data[i].id;
					data[i].key = data[i].id;
					data[i].title = data[i].category_name;
					let childrenLv1 = data[i].children || [];
					for (let j = 0; j < childrenLv1.length; j++) {
						childrenLv1[j].value = childrenLv1[j].id;
						childrenLv1[j].key = childrenLv1[j].id;
						childrenLv1[j].title = childrenLv1[j].category_name;
						let childrenLv2 = childrenLv1[j].children || [];
						for (let k = 0; k < childrenLv2.length; k++) {
							childrenLv2[k].value = childrenLv2[k].id;
							childrenLv2[k].key = childrenLv2[k].id;
							childrenLv2[k].title = childrenLv2[k].category_name;
							let childrenLv3 = childrenLv2[k].children || [];

							for (let m = 0; m < childrenLv3.length; m++) {
								childrenLv3[m].value = childrenLv3[m].id;
								childrenLv3[m].key = childrenLv3[m].id;
								childrenLv3[m].title = childrenLv3[m].category_name;
							}
						}
					}
				}
				setTreeData(data);
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};
		const timer = setTimeout(() => {
			let paramsFilter = {
				limit: 10000,
				page: 1,
				status: true
			};

			getCategories(paramsFilter);
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	const onChangeCategories = (newValue: string[], value: any, value2: any) => {
		setSelectedCategories(newValue);
	};

	const tProps = {
		treeData: [...treeData],
		value: [...selectedCategories],
		onChange: onChangeCategories,
		treeCheckable: true,
		showCheckedStrategy: TreeSelect.SHOW_ALL,
		treeCheckStrictly: true,
		showSearch: true,
		placeholder: "Chọn danh mục",
		style: {
			width: "100%"
		}
	};

	return (
		<div className="mainPages productPage">
			<SubHeader breadcrumb={[{ text: "Quản lý sản phẩm" }, { text: "Features" }]} />
			<div className="ordersPage__search" style={{ padding: "8px 16px 16px 16px" }}>
				<Form
					id="formSearch"
					form={formSearch}
					layout="vertical"
					onFinish={onSubmitSearchFilter}
					style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}
				>
					<Form.Item
						name="q"
						label="Tìm kiếm"
						style={{ margin: "0", width: "calc(((100% - 408px) / 5 ) * 2)", minWidth: "120px" }}
					>
						<Input className="defaultInput" placeholder="Nhập tên, mã thuộc tính" />
					</Form.Item>
					<Form.Item
						name="category_ids"
						label="Danh mục"
						style={{
							margin: "0",
							width: features.includes("MODULE_PRODUCTS__FEATURES__CREATE")
								? "calc((100% - 408px) / 5 )"
								: "calc((100% - 180px) / 5 )",
							minWidth: "120px"
						}}
					>
						<TreeSelect
							maxTagCount={"responsive"}
							{...tProps}
							className="defaultSelect"
							filterTreeNode={(search: any, item: any) => {
								return item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
							}}
							onChange={(e: any) => {
								let fakeArray = [];
								for (let i = 0; i < e?.length; i++) {
									fakeArray.push(e[i]?.value);
								}
								setSelectedCategories(fakeArray);
							}}
						/>
					</Form.Item>
					<Form.Item
						name="status"
						label="Trạng thái"
						style={{
							margin: "0",
							width: features.includes("MODULE_PRODUCTS__FEATURES__CREATE")
								? "calc((100% - 408px) / 5 )"
								: "calc((100% - 180px) / 5)",
							minWidth: "120px"
						}}
					>
						<Select className="defaultSelect" placeholder="Tất cả" onChange={onFilterStatus}>
							<Option value="true">Hoạt động</Option>
							<Option value="false">Ngừng hoạt động</Option>
						</Select>
					</Form.Item>
					<Form.Item
						name="filter_type"
						label="Kiểu lọc"
						style={{
							margin: "0",
							width: features.includes("MODULE_PRODUCTS__FEATURES__CREATE")
								? "calc((100% - 408px) / 5 )"
								: "calc((100% - 180px) / 5 )",
							minWidth: "120px"
						}}
					>
						<Select className="defaultSelect" placeholder="Tất cả" onChange={onChangeAttributeType}>
							{Object.entries(AttributeFilterTypeVietnameseEnum).map(([key, val], i) => (
								<Option value={val} key={key}>
									{key}
								</Option>
							))}
						</Select>
					</Form.Item>

					{/* <Form.Item name="purposes" label="Mục đích" className="ordersPage__search__form__item hidden xl:block">
						<Select className="defaultSelect" placeholder="Tất cả" onChange={onChangePurpose}>
							<Option value="">""</Option>
							{Object.entries(AttributePurposeEnum).map(([key, val], i) => (
								<Option value={val} key={key}>
									{key}
								</Option>
							))}
						</Select>
							</Form.Item> */}

					<button className="searchButton " style={{ marginTop: "19px" }}>
						<SvgIconSearch style={{ transform: "scale(0.8)" }} />
						&nbsp;Tìm kiếm
					</button>
					<button className="searchButton  " onClick={onResetFilterParams} style={{ marginTop: "19px" }}>
						<SvgIconRefresh style={{ transform: "scale(0.8)" }} />
						&nbsp;Đặt lại
					</button>
					{features.includes("MODULE_PRODUCTS__FEATURES__CREATE") && (
						<Link to={routerNames.FEATURES_CREATE} style={{ marginTop: "19px" }}>
							<div className="defaultButton">
								<SvgIconPlus style={{ transform: "scale(0.8)" }} />
								&nbsp;Thêm mới
							</div>
						</Link>
					)}
				</Form>
			</div>
			<div className="contentSection">
				<TableStyledAntd
					scroll={{ y: "calc(100vh - 340px)" }}
					rowKey="id"
					dataSource={attributesList || []}
					bordered
					loading={stateAttributesList.isLoading || false}
					columns={attributesListColumns({ onChangeStatus, features }) as any}
					pagination={false}
					widthCol1="50px"
					widthCol2="15%"
					widthCol3="20%"
					widthCol4="calc(20% - 30px)"
					widthCol5="calc(20% - 30px)"
					widthCol6="calc(20% - 30px)"
					widthCol7="100px"
				/>
				<PanigationAntStyled
					style={{ marginTop: "0.5rem" }}
					current={paramsFilter.page}
					pageSize={paramsFilter.limit}
					onChange={onChangePaging}
					showSizeChanger
					showTotal={() => `Tổng ${stateAttributesList?.data?.paging.total} features `}
					total={stateAttributesList?.data?.paging.total}
				/>
			</div>
		</div>
	);
};

export default FeaturesList;
