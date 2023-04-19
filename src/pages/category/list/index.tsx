/* eslint-disable */
import { Row, Col, Breadcrumb, Pagination, Table, Switch, Spin, Input, Form, Select, TreeSelect } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import {
	getCategoryById,
	getListCategory,
	updateCategory,
	updateIndexCategory
} from "src/services/actions/category.actions";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { notifyError, notifySuccess, notifyWarning } from "src/components/notification";
import { columnsCate, columnsCate2 } from "./data";
import routerNames from "src/utils/data/routerName";
import colors from "src/utils/colors";
import { convertNumberWithCommas, removeSign } from "src/utils/helpers/functions/textUtils";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
import TableStyledAntd from "src/components/table/TableStyled";
import { mergeArray } from "src/utils/helpers/functions/utils";
import { SortableContainer as sortableContainer, SortableElement } from "react-sortable-hoc";
import SubHeader from "src/components/subHeader/SubHeader";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import { API_URL } from "src/services/api/config";
import { api } from "src/services/api/api.index";
import { API_CATALOGS, API_CATEGORY } from "src/services/api/url.index";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import { updateOneCatalog, updateStatusCategoryCatalog } from "src/services/actions/catalogs.actions";
import SellerContext from "src/context/sellerContext";

const merge = (a: any, b: any, i = 0) => {
	let aa = [...a];
	return [...a.slice(0, i), ...b, ...aa.slice(i, aa.length)];
};

const CateList = () => {
	const { sellerInfo } = useContext(SellerContext) as any;
	const dispatch = useDispatch();
	const history = useHistory();
	const isMount = useIsMount();
	const refInputSearch = useRef<any>(null);
	const [searchForm] = Form.useForm();
	const { stateListCategory, stateCategoryById, stateUpdateIndexCategory, stateUpdateCategory } = useSelector(
		(e: AppState) => e.categoriesReducer
	);
	const { stateUpdateStatusCategoryCatalog } = useSelector((e: AppState) => e.catalogsReducer);
	const [loading, setLoading] = useState<boolean>(false);
	const [rowSelectId, setRowSelectId] = useState<any>(null);
	const [dataSource, setDataSource] = useState<any[]>([]);
	const [paramsFilter, setParamsFilter] = useState<any>({
		status: undefined,
		catalog_id: undefined,
		page: 1,
		limit: 10
	});

	useEffect(() => {
		if (sellerInfo?.user_type !== "admin") {
			searchForm.setFieldValue("catalog_id", sellerInfo?.catalog_id);
			setParamsFilter({ ...paramsFilter, catalog_id: sellerInfo?.catalog_id });
		}
	}, [sellerInfo]);
	const features = localStorage.getItem("FEATURES") ? JSON.parse(localStorage.getItem("FEATURES") || "") : [];

	const [arrayIndex, setArrayIndex] = useState<any[]>([]);
	/****************************START**************************/
	/*                         Life Cycle                      */

	// useEffect(() => {
	// 	if (isMount) return;
	// 	const { data, message, success, error } = stateListCategory;
	// 	if (success) {
	// 		// if (
	// 		//   paramsFilter.search === undefined ||
	// 		//   paramsFilter.search.length === 0
	// 		// ) {
	// 		//   let result = data?.categories.map((e: any) => ({ ...e, children: [] }));
	// 		//   setDataSource(result || []);
	// 		// } else {
	// 		console.log(data);

	// 		// }
	// 	}
	// 	if (success === false || error) {
	// 		setLoading(false);
	// 		let msg = getMessageV1(message, ", ");
	// 		return notifyError(msg);
	// 	}
	// }, [stateListCategory.isLoading]);
	useEffect(() => {
		if (isMount) return;
		const { data, message, success, error, isLoading } = stateUpdateStatusCategoryCatalog;
		if (!isLoading) {
			if (success) {
				notifySuccess("Cập nhật trạng thái thành công!");
			}
		}

		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateUpdateStatusCategoryCatalog.isLoading]);
	useEffect(() => {
		if (isMount) return;
		const { data, isLoading, message, success, error } = stateListCategory;
		if (!isLoading) {
			if (success) {
				let dataCate = data?.data;
				let fakeArray = [];
				setDataSource(data?.data);
				setLoading(false);

				for (let i = 0; i < dataCate?.length; i++) {
					fakeArray.push({
						catalog_id: paramsFilter.catalog_id,
						category_id: dataCate[i]?.category_id,
						category_index: dataCate[i]?.category_index
					});
					for (let j = 0; j < dataCate[i]?.children?.length; j++) {
						fakeArray.push({
							catalog_id: paramsFilter.catalog_id,
							category_id: dataCate[i]?.children[j]?.category_id,
							category_index: dataCate[i]?.children[j]?.category_index
						});
						for (let k = 0; k < dataCate[i]?.children[j]?.children?.length; k++) {
							fakeArray.push({
								catalog_id: paramsFilter.catalog_id,
								category_id: dataCate[i]?.children[j]?.children[k]?.category_id,
								category_index: dataCate[i]?.children[j]?.children[k]?.category_index
							});
							for (let m = 0; m < dataCate[i]?.children[j]?.children[k]?.children?.length; m++) {
								fakeArray.push({
									catalog_id: paramsFilter.catalog_id,
									category_id: dataCate[i]?.children[j]?.children[k]?.children[m]?.category_id,
									category_index: dataCate[i]?.children[j]?.children[k]?.children[m]?.category_index
								});
							}
						}
					}
				}
				setArrayIndex(fakeArray);
			}
			if (success === false || error) {
				setLoading(false);
				let msg = getMessageV1(message, ", ");
				return notifyError(msg);
			}
		}
	}, [stateListCategory.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { isLoading, message, success, error } = stateUpdateIndexCategory;
		if (!isLoading) {
			if (success) {
				notifySuccess("Đổi vị trí thành công");
			}
			if (success === false || error) {
				let msg = getMessageV1(message, ", ");
				return notifyError(msg);
			}
		}
	}, [stateUpdateIndexCategory.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { isLoading, message, success, error } = stateUpdateCategory;
		if (!isLoading) {
			if (success) {
				notifySuccess("Đổi trạng thái thành công");
			}
			if (success === false || error) {
				let msg = getMessageV1(message, ", ");
				return notifyError(msg);
			}
		}
	}, [stateUpdateCategory.isLoading]);

	useEffect(() => {
		if (
			features.includes("MODULE_PRODUCTS__CATEGORIES__VIEWS") &&
			!stateUpdateStatusCategoryCatalog.isLoading &&
			!stateUpdateIndexCategory.isLoading &&
			!stateUpdateCategory.isLoading &&
			!stateUpdateIndexCategory.isLoading
		) {
			dispatch(getListCategory(paramsFilter));
			setDataSource([]);
		}
	}, [
		paramsFilter,
		stateUpdateStatusCategoryCatalog.isLoading,
		stateUpdateIndexCategory.isLoading,
		stateUpdateCategory.isLoading,
		stateUpdateIndexCategory.isLoading
	]);

	/**************************** END **************************/

	/****************************START**************************/
	/*                          Function                       */

	// const onSortStart = (props: any) => {
	// 	const tds = document.getElementsByClassName("row-dragging")[0].childNodes;
	// 	if (tds) {
	// 		props.node.childNodes.forEach((node: any, idx: any) => {
	// 			let htmlElement = tds.item(idx) as HTMLElement;
	// 			htmlElement.style.width = `${node.offsetWidth}px`;
	// 			htmlElement.style.backgroundColor = "#DFE2E4";
	// 			htmlElement.style.padding = "12px";
	// 		});
	// 	}
	// };

	// const onSortEnd = ({ oldIndex, newIndex }: any) => {
	// 	let _functsList = [...dataSource];
	// 	if (oldIndex !== newIndex) {
	// 		const movingItem = _functsList[oldIndex];
	// 		_functsList.splice(oldIndex, 1);
	// 		_functsList = mergeArray(_functsList, [movingItem], newIndex);
	// 	}
	// 	setDataSource(_functsList);
	// 	onUpdateIndexes(_functsList);
	// };
	// const onUpdateIndexes = (_functsList: any) => {
	// 	const newFunctsPosition = _functsList.map((functItem: any, i: number) => {
	// 		return { id: functItem.id, index: i };
	// 	});

	// 	;
	// };

	// const SortableContainer = sortableContainer((props: any) => <tbody {...props} />);
	// const SortableItem = SortableElement((props: any) => {
	// 	return <tr {...props} />;
	// });
	// const DraggableContainer = (props: any) => (
	// 	<SortableContainer
	// 		useDragHandle
	// 		disableAutoscroll
	// 		helperClass="row-dragging"
	// 		onSortEnd={onSortEnd}
	// 		onSortStart={onSortStart}
	// 		hideSortableGhost={true}
	// 		{...props}
	// 	/>
	// );
	// const DraggableBodyRow = ({ className, style, ...restProps }: any) => {
	// 	console.log("res", restProps);
	// 	const index = dataSource.findIndex((x) => x.index === restProps["data-row-key"]);
	// 	return <SortableItem index={index} {...restProps} />;
	// };

	const checkDataChildren = (arr: any) => {
		let a = arr.map((e: any) => {
			if (e.category_id === rowSelectId) {
				let _childrenCategories: any;
				if (stateCategoryById.data?.childrenCategories && stateCategoryById.data?.childrenCategories?.length > 0) {
					_childrenCategories = stateCategoryById.data?.childrenCategories.map((item: any) => ({
						...item,
						children: []
					}));
				} else {
					_childrenCategories = undefined;
				}
				return {
					...e,
					children: _childrenCategories
				};
			}
			if (e?.children && e?.children.length > 0) {
				return { ...e, children: [...checkDataChildren(e.children)] };
			} else {
				return e;
			}
		});
		return a;
	};

	const handleOnChangeFilter = (updateParams: any) => {
		setParamsFilter({ ...paramsFilter, ...updateParams });
	};

	const btnVisbleFilter = () => {
		// setVisibleFilter(prev => !prev);
		return notifyWarning("Tính năng đang cập nhật !");
	};

	const onChangePaging = (page: number, pageSize: number) => {
		handleOnChangeFilter({
			page: page,
			limit: pageSize
		});
	};

	const editStatus = (value: any, record: any) => {
		if (!paramsFilter?.catalog_id) {
			dispatch(updateCategory(record.id, { status: value }));
		} else {
			dispatch(
				updateStatusCategoryCatalog(record.id, {
					status: value
				})
			);
		}
	};

	const submitSearch = (values: any) => {
		setParamsFilter({ ...paramsFilter, status: values?.status, catalog_id: values?.catalog_id, page: 1 });
	};
	/**************************** END **************************/

	/****************************START**************************/
	/*                         Component                       */

	// const _renderTable = () => {
	//   return (
	//     <div className="tableCategory">
	//       <DTable
	//         rowKey={'category_id'}
	//         bordered
	//         columns={columnsDataParent({ dispatch, history })}
	//         childrenColumnName={'children'}
	//         // expandable={rowSelection()}
	//         dataSource={dataSource}
	//         defaultExpandAllRows
	//         loading={
	//           stateListCategory.isLoading ||
	//           stateUpdateListCategory.isLoading ||
	//           loading
	//         }
	//         pagination={false}
	//         footer={_renderPaging}
	//         // components={{
	//         //   body: {
	//         //     wrapper: DraggableContainer,
	//         //     row: (val: any) => DraggableBodyRow(val)
	//         //   }
	//         // }}
	//       />
	//     </div>
	//   )
	// }

	const columns = [
		{
			title: "Danh mục",
			dataIndex: "category",
			key: "category"
		}
	];

	const [selectedCatalogs, setSelectedCatalogs] = useState<any[]>([]);

	const onChangeCatalogs = (newValue: string[], value: any, value2: any) => {
		setSelectedCatalogs(newValue);
	};

	const [catalogs, setCatalogs] = useState<any[]>([]);
	useEffect(() => {
		const getCatalogs = async (params?: any) => {
			let paramsFilter = {
				limit: 10000,
				page: 1
			};
			try {
				const response = (await api.get(`${API_URL}/${API_CATALOGS}`, paramsFilter)) as any;
				let data = response["data"];
				let fakeArray = [];
				for (let i = 0; i < data?.length; i++) {
					fakeArray.push({
						value: data[i]?.id,
						label: data[i]?.catalog_name
					});
				}
				setCatalogs(fakeArray);
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};
		const timer = setTimeout(() => {
			getCatalogs();
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	/**************************** END **************************/

	/****************************START**************************/
	/*                        Return Page                      */

	const changeIndex = (value: any, record: any) => {
		console.log(record);
		let paramsArray = [...arrayIndex];
		paramsArray = paramsArray.map((x: any) =>
			x.category_id === record.category_id ? { ...x, category_index: value } : x
		);
		console.log(paramsArray);
		setArrayIndex(paramsArray);
	};
	return (
		<div className="mainPages scheduler">
			<SubHeader breadcrumb={[{ text: "Thiết lập hệ thống" }, { text: "Danh mục" }]} />
			<div className="supplierList__search" style={{ padding: "8px 16px 16px 16px" }}>
				<Form
					layout="vertical"
					form={searchForm}
					id="searchForm"
					className="supplierList__search__form"
					onFinish={submitSearch}
				>
					<Form.Item
						className="supplierList__search__form__input"
						label="Ngành hàng"
						name="catalog_id"
						style={{ width: "calc((100% - 256px)/2)", margin: "0" }}
					>
						<Select
							filterOption={(input: any, option: any) =>
								removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
							}
							showSearch
							options={catalogs}
							disabled={sellerInfo?.user_type !== "admin"}
							className="defaultSelect"
							placeholder="Chọn ngành hàng"
						/>
					</Form.Item>
					<Form.Item style={{ width: "calc((100% - 256px)/2)", margin: "0" }} label="Trạng thái" name="status">
						<Select
							options={[
								{ label: "Hoạt động", value: true },
								{ label: "Ngừng hoạt động", value: false }
							]}
							className="defaultSelect"
							placeholder="Chọn trạng thái"
						/>
					</Form.Item>
					<button className="searchButton" style={{ marginTop: "19px" }} type="submit" form="searchForm">
						<SvgIconSearch style={{ transform: "scale(0.8)" }} />
						&nbsp;Tìm kiếm
					</button>
					<div
						className="searchButton"
						style={{ marginTop: "19px" }}
						onClick={() => {
							searchForm.resetFields();
							setParamsFilter({
								status: undefined,
								catalog_id: sellerInfo?.user_type !== "admin" ? sellerInfo?.catalog_id : undefined,
								page: 1,
								limit: 10
							});
							if (sellerInfo?.user_type !== "admin") {
								searchForm.setFieldValue("catalog_id", sellerInfo?.catalog_id);
							}
						}}
					>
						<SvgIconRefresh style={{ transform: "scale(0.8)" }} />
						&nbsp;Đặt lại
					</div>
				</Form>
				<div style={{ display: "flex", marginTop: "19px" }}>
					{paramsFilter.catalog_id && features.includes("MODULE_PRODUCTS__CATEGORIES__UPDATE_INDEX") && (
						<div
							className="defaultButton"
							style={{ marginRight: "8px" }}
							onClick={() => dispatch(updateIndexCategory({ categories: arrayIndex }))}
						>
							<SvgIconStorage style={{ transform: "scale(0.7)" }} />
							&nbsp;Lưu vị trí
						</div>
					)}
					{features.includes("MODULE_PRODUCTS__CATEGORIES__CREATE") && (
						<button className="defaultButton" onClick={() => history.push("/categories/create")}>
							<SvgIconPlus style={{ transform: "scale(0.7)" }} />
							&nbsp;Thêm mới
						</button>
					)}
				</div>
			</div>
			<div className="contentBody" style={{ marginTop: "16px" }}>
				<div className="tableCategory">
					{paramsFilter.catalog_id ? (
						<TableStyledAntd
							scroll={{ y: "calc(100vh - 305px)" }}
							rowKey={"id"}
							defaultExpandAllRows={paramsFilter?.children?.length > 0 ? true : false}
							bordered
							columns={columnsCate({ editStatus, changeIndex, arrayIndex, features }) as any}
							dataSource={dataSource}
							loading={stateListCategory.isLoading || false}
							pagination={false}
							expandable={{
								expandIconColumnIndex: 1
							}}
							widthCol1="7%"
							widthCol2="31%"
							widthCol3="25%"
							widthCol4="25%"
							widthCol5="11%"
						/>
					) : (
						<TableStyledAntd
							scroll={{ y: "calc(100vh - 305px)" }}
							rowKey={"id"}
							defaultExpandAllRows={paramsFilter?.children?.length > 0 ? true : false}
							bordered
							columns={columnsCate2({ editStatus, arrayIndex, features }) as any}
							dataSource={dataSource}
							loading={stateListCategory.isLoading || false}
							pagination={false}
							expandable={{
								expandIconColumnIndex: 0
							}}
							widthCol1="31%"
							widthCol2="25%"
							widthCol3="25%"
							widthCol4="11%"
						/>
					)}

					<PanigationAntStyled
						style={{ marginTop: "8px" }}
						current={paramsFilter.page}
						pageSize={paramsFilter.limit}
						showSizeChanger
						onChange={onChangePaging}
						showTotal={() => `Tổng ${stateListCategory?.data?.paging?.total || 0} danh mục `}
						total={stateListCategory?.data?.paging?.total || 0}
					/>
				</div>
			</div>
		</div>
	);

	/**************************** END **************************/
};

export default CateList;
/* eslint-disable */
