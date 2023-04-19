import { Form, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifySuccess } from "src/components/notification";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
import SubHeader from "src/components/subHeader/SubHeader";
import TableStyledAntd from "src/components/table/TableStyled";
import { fetchProductsList, updateProductById } from "src/services/actions/product.actions";
import { AppState } from "src/types";
import routerNames from "src/utils/data/routerName";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import ProductButtonActionGroup from "../components/ProductButtonActionGroups";
import ProductSearchFilterList from "../components/ProductSearchFilterList";
import { columnsData, defaultSearchFilter } from "./data";

const ProductList = () => {
	const dispatch = useDispatch();
	const isMount = useIsMount();
	const [formSearch] = Form.useForm();
	const [paramsFilter, setParamsFilter] = useState<any>(defaultSearchFilter);
	const { stateProductsList, stateUpdateProductById } = useSelector((state: AppState) => state.productReducer);
	const features = localStorage.getItem("FEATURES") ? JSON.parse(localStorage.getItem("FEATURES") || "") : [];
	useEffect(() => {
		if (features.includes("MODULE_PRODUCTS__LIST__VIEWS")) {
			if (!stateUpdateProductById.isLoading) {
				dispatch(fetchProductsList(paramsFilter));
			}
		}
	}, [paramsFilter, stateUpdateProductById.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { success, data, isLoading, error } = stateProductsList;
		if (!isLoading) {
			if (success) {
			}
		}
	}, [stateProductsList.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { success, data, isLoading, error } = stateUpdateProductById;
		if (!isLoading) {
			if (success) {
				notifySuccess("Cập nhật trạng thái thành công");
			}
		}
	}, [stateUpdateProductById.isLoading]);

	const onChangePaging = (page: number, pageSize: number) => {
		const newParamsFilter = {
			...paramsFilter,
			page: page,
			limit: pageSize
		};
		setParamsFilter(newParamsFilter);
	};

	const onFinishSearchFilter = (values: any) => {
		let fakeCate = "";
		if (values?.categories) {
			for (let i = 0; i < values?.categories?.length; i++) {
				fakeCate = fakeCate + values?.categories[i]?.value + (i + 1 === values?.categories?.length ? "" : ",");
			}
		}
		if (Object.values(values).every((item) => item === undefined)) {
			return;
		}

		const dataFilterRequests = {
			...paramsFilter,
			...values,
			page: 1,
			category_ids: fakeCate.length > 0 ? fakeCate : undefined
		};
		delete dataFilterRequests.categories;
		setParamsFilter(dataFilterRequests);
	};

	const onClickResetSearchFilter = () => {
		setParamsFilter(defaultSearchFilter);
	};

	const changeStatus = (value: any, record: any) => {
		dispatch(updateProductById(record?.id, { status: value }));
	};
	return (
		<div className="mainPages productPage">
			<SubHeader breadcrumb={[{ text: "Quản lý sản phẩm" }, { text: "Sản phẩm", link: routerNames.PRODUCT }]} />
			<ProductSearchFilterList
				features={features}
				formSearch={formSearch}
				onClickResetSearchFilter={onClickResetSearchFilter}
				onFinishSearchFilter={onFinishSearchFilter}
			/>
			<div className="contentSection">
				<ProductButtonActionGroup />
				<TableStyledAntd
					scroll={{ y: "calc(100vh - 385px)" }}
					rowKey="supplier_id"
					bordered
					dataSource={stateProductsList?.data?.data ? [...stateProductsList?.data?.data] : []}
					pagination={false}
					loading={stateProductsList.isLoading || false}
					columns={columnsData({ changeStatus, features }) as any}
					widthCol1="5%"
					widthCol2="10%"
					widthCol3="5%"
					widthCol4="23%"
					widthCol5="9%"
					widthCol6="13%"
					widthCol7="8%"
					widthCol8="10%"
					widthCol10="8%"
				/>

				<PanigationAntStyled
					style={{ marginTop: "8px" }}
					current={paramsFilter.page}
					pageSize={paramsFilter.limit}
					showSizeChanger
					onChange={onChangePaging}
					showTotal={() => `Tổng ${stateProductsList?.data?.paging.total} sản phẩm `}
					total={stateProductsList?.data?.paging.total}
				/>
			</div>
		</div>
	);
};

export default ProductList;
