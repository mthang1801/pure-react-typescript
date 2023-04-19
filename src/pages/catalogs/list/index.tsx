import { Form, Input, InputNumber, Modal, Select, Switch, Table, TreeSelect } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SortableContainer as sortableContainer, SortableElement } from "react-sortable-hoc";
import SvgArrow from "src/assets/svg/SvgArrow";
import SvgExpand from "src/assets/svg/SvgExpand";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import { notifyError, notifySuccess, notifyWarning } from "src/components/notification";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
import SubHeader from "src/components/subHeader/SubHeader";
import TableStyledAntd from "src/components/table/TableStyled";
import {
	createOneCatalog,
	getListCatalogs,
	getOneCatalogById,
	updateIndexCatalog,
	updateOneCatalog,
	updateStatusCategoryCatalog
} from "src/services/actions/catalogs.actions";
import { createOneScheduler, getListSchedulers, updateOneScheduler } from "src/services/actions/user.actions";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import { API_CATEGORY } from "src/services/api/url.index";
import { AppState } from "src/types";
import colors from "src/utils/colors";
import { platforms } from "src/utils/helpers/functions/data";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { mergeArray } from "src/utils/helpers/functions/utils";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";
import { columnsData } from "./data";
const Catalogs = () => {
	const dispatch = useDispatch();
	const history = useHistory() as any;
	const isMount = useIsMount();
	const [searchForm] = Form.useForm();
	const [createForm] = Form.useForm();
	const [updateForm] = Form.useForm();

	const [visibleCreate, setVisibleCreate] = useState(false);
	const [visibleUpdate, setVisibleUpdate] = useState(false);
	const [categories, setCategories] = useState<any[]>([]);
	const [removeCategories, setRemoveCategories] = useState<any[]>([]);
	const [listSchedulers, setListSchedulers] = useState<any[]>([]);
	const [selectedEdit, setSelectedEdit] = useState<any>({});
	const [paramsFilter, setParamsFilter] = useState({
		q: undefined,
		status: undefined,
		page: 1,
		limit: 10
	});
	const features = localStorage.getItem("FEATURES") ? JSON.parse(localStorage.getItem("FEATURES") || "") : [];
	const {
		stateListCatalogs,
		stateCreateOneCatalog,
		stateUpdateOneCatalog,
		stateCatalogById,
		stateUpdateStatusCategoryCatalog,
		stateUpdateIndexCatalog
	} = useSelector((e: AppState) => e.catalogsReducer);
	useEffect(() => {
		if (features.includes("MODULE_PRODUCTS__CATALOGS__VIEWS")) {
			if (!stateCreateOneCatalog.isLoading && !stateUpdateOneCatalog.isLoading) {
				dispatch(getListCatalogs(paramsFilter));
			}
		} else {
			notifyWarning("Bạn không được quyền truy cập");
			history.push("/");
		}
	}, [paramsFilter, stateCreateOneCatalog.isLoading, stateUpdateOneCatalog.isLoading]);

	useEffect((): void | undefined => {
		if (isMount) return;
		const { data, message, success, error } = stateListCatalogs;
		if (success) {
			setListSchedulers(data?.data);
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateListCatalogs.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { data, message, success, error } = stateUpdateIndexCatalog;
		if (success) {
			notifySuccess("Cập nhật vị trí thành công");
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateUpdateIndexCatalog.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { data, message, success, error } = stateCreateOneCatalog;
		if (success) {
			notifySuccess("Tạo thành công");
			setVisibleCreate(false);
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateCreateOneCatalog.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { isLoading, data, message, success, error } = stateUpdateOneCatalog;
		if (!isLoading) {
			if (success) {
				notifySuccess("Cập nhật thành công");
				setVisibleUpdate(false);
				// dispatch(getOneCatalogById({ id: selectedEdit.id }));
				setSelectedCategories([]);
			}
		}

		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateUpdateOneCatalog.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { data, message, success, error, isLoading } = stateUpdateStatusCategoryCatalog;
		if (!isLoading) {
			if (success) {
				notifySuccess("Cập nhật trạng thái thành công!");
				dispatch(getOneCatalogById({ id: selectedEdit.id }));
			}
		}

		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateUpdateStatusCategoryCatalog.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { data: mainData, message, success, error } = stateCatalogById;
		if (success) {
			const data = mainData?.data;
			console.log("data", data);
			updateForm.setFieldsValue({
				name: data?.catalog_name,
				status: data?.status
			});
			let cateFake = data?.categories;
			for (let i = 0; i < cateFake.length; i++) {
				cateFake[i].checked = true;

				let childrenLv1 = cateFake[i].children || [];
				for (let j = 0; j < childrenLv1.length; j++) {
					childrenLv1[j].checked = true;
					let childrenLv2 = childrenLv1[j].children || [];
					for (let k = 0; k < childrenLv2.length; k++) {
						childrenLv2[k].checked = true;
					}
				}
			}
			setCategories(cateFake);
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateCatalogById.isLoading]);

	const [treeData, setTreeData] = useState<any[]>([]);
	useEffect(() => {
		const getCategories = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/${API_CATEGORY}`, { status: true })) as any;
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
			getCategories();
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	const handleCancelCreate = () => {
		setVisibleCreate(false);
		createForm.resetFields();
	};

	const handleCancelUpdate = () => {
		setVisibleUpdate(false);
		updateForm.resetFields();
	};
	const handleSubmitSearch = (values: any) => {
		setParamsFilter({ ...paramsFilter, ...values, page: 1 });
	};
	const submitCreate = (values: any) => {
		dispatch(
			createOneCatalog({
				catalog_name: values.name,
				status: values.status
			})
		);
	};

	const submitUpdate = (values: any) => {
		dispatch(
			updateOneCatalog(selectedEdit?.id, {
				catalog_name: values.name,
				status: values.status
			})
		);
	};

	const onChangePaging = (page: number, pageSize: number) => {
		setParamsFilter({
			...paramsFilter,

			page: page,
			limit: pageSize
		});
	};

	const editRecord = (values: any) => {
		setVisibleUpdate(true);
		setSelectedEdit(values);
		dispatch(getOneCatalogById({ id: values.id }));
	};

	const editStatus = (values: any, record: any) => {
		dispatch(
			updateOneCatalog(record.id, {
				status: values
			})
		);
	};

	const [selectedCategories, setSelectedCategories] = useState<any[]>([]);

	const onChangeCategories = (newValue: string[], value: any, value2: any) => {
		console.log(newValue, value, value2);
		setSelectedCategories(newValue);
	};

	const tProps = {
		treeData: [...treeData],
		value: selectedCategories,
		onChange: onChangeCategories,
		treeCheckable: true,
		showCheckedStrategy: TreeSelect.SHOW_ALL,
		showSearch: true,
		placeholder: "Chọn danh mục",
		style: {
			width: "100%"
		}
	};

	const handleSetChecked = (id: any) => {
		let cateFake = [...categories];
		for (let i = 0; i < cateFake.length; i++) {
			if (id === cateFake[i].id) {
				cateFake[i].checked = !cateFake[i].checked;
			}

			let childrenLv1 = cateFake[i].children || [];
			for (let j = 0; j < childrenLv1.length; j++) {
				if (id === childrenLv1[j].id) {
					childrenLv1[j].checked = !childrenLv1[j].checked;
				}
				let childrenLv2 = childrenLv1[j].children || [];
				for (let k = 0; k < childrenLv2.length; k++) {
					if (id === childrenLv2[k].id) {
						childrenLv2[k].checked = !childrenLv2[k].checked;
					}
				}
			}
		}
		setCategories(cateFake);
	};

	const handleSortStart = (props: { node: any }) => {
		const tds = document.getElementsByClassName("row-dragging")[0].childNodes;
		if (tds) {
			props.node.childNodes.forEach((node: any, idx: any) => {
				let htmlElement = tds.item(idx) as HTMLElement;
				htmlElement.style.width = `${node.offsetWidth}px`;
				htmlElement.style.backgroundColor = colors.neutral_color_1_6;
				htmlElement.style.padding = "4px 21px 4px 21px";
			});
		}
	};

	const onSortEnd = ({ oldIndex, newIndex }: any) => {
		let _functsList = [...listSchedulers];
		if (oldIndex !== newIndex) {
			const movingItem = _functsList[oldIndex];
			_functsList.splice(oldIndex, 1);
			_functsList = mergeArray(_functsList, [movingItem], newIndex);
		}
		setListSchedulers(_functsList);
	};

	const SortableContainer = sortableContainer((props: any) => <tbody {...props} />);
	const SortableItem = SortableElement((props: any) => {
		return <tr {...props} />;
	});
	const DraggableContainer = (props: any) => {
		return (
			<SortableContainer
				useDragHandle
				disableAutoscroll
				helperClass="row-dragging"
				onSortEnd={onSortEnd}
				onSortStart={handleSortStart}
				{...props}
			/>
		);
	};

	const DraggableBodyRow = (restProps: any) => {
		let index: number | undefined;
		index = listSchedulers?.findIndex((x: any) => x.index === restProps["data-row-key"]);
		return <SortableItem index={index} {...restProps} />;
	};

	const onUpdateIndexes = (array: any) => {
		const newFunctsPosition = array.map((functItem: any, i: number) => {
			return { id: functItem.id, index: i };
		});

		dispatch(updateIndexCatalog({ catalogs: newFunctsPosition }));
	};
	return (
		<div className="mainPages scheduler">
			<Modal
				visible={visibleCreate}
				title={"Thêm mới"}
				centered
				className="modalEditSender"
				footer={null}
				onCancel={() => handleCancelCreate()}
				width={500}
			>
				<Form
					form={createForm}
					id="createForm"
					onFinish={submitCreate}
					layout="vertical"
					initialValues={{
						status: false
					}}
				>
					<Form.Item
						label="Tên ngành hàng"
						name="name"
						style={{ width: "100%", margin: "0 0 13px 0" }}
						rules={[{ required: true, message: "Vui lòng không bỏ trống!" }]}
					>
						<Input placeholder="Nhập tên ngành hàng" className="defaultInput" />
					</Form.Item>

					<div className="center" style={{ marginTop: "8px" }}>
						<div className="center">
							<span>Trạng thái</span>&nbsp;&nbsp;
							<Form.Item name="status" valuePropName="checked" style={{ margin: "0" }}>
								<Switch />
							</Form.Item>
						</div>
						<button type="submit" form="createForm" className="defaultButton">
							<SvgIconStorage style={{ transform: "scale(0.7)" }} />
							&nbsp; Lưu
						</button>
					</div>
				</Form>
			</Modal>
			<Modal
				visible={visibleUpdate}
				title={"Chi tiết"}
				centered
				className="modalEditSender"
				footer={null}
				onCancel={() => handleCancelUpdate()}
				width={600}
			>
				<Form form={updateForm} id="updateForm" onFinish={submitUpdate} layout="vertical">
					<Form.Item
						label="Tên ngành hàng"
						name="name"
						style={{ width: "100%", margin: "0 0 13px 0" }}
						rules={[{ required: true, message: "Vui lòng không bỏ trống!" }]}
					>
						<Input placeholder="Nhập tên ngành hàng" className="defaultInput" />
					</Form.Item>
					{features.includes("MODULE_PRODUCTS__CATALOGS__UPDATE") && (
						<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
							<div style={{ width: "calc(100% - 128px)" }}>
								<TreeSelect
									{...tProps}
									multiple
									maxTagCount={"responsive"}
									className="defaultSelect"
									filterTreeNode={(search: any, item: any) => {
										return item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
									}}
								/>
							</div>
							<div
								className="defaultButton"
								style={{ marginTop: "-6px" }}
								onClick={() => {
									if (selectedCategories.length > 0) {
										dispatch(
											updateOneCatalog(selectedEdit.id, {
												catalog_name: selectedEdit.catalog_name,
												status: selectedEdit.status,
												category_ids: selectedCategories
											})
										);
									} else {
										notifyWarning("Vui lòng chọn danh mục");
									}
								}}
							>
								<SvgIconPlus style={{ transform: "scale(0.8)" }} />
								&nbsp;Thêm
							</div>
						</div>
					)}

					<h4>Danh sách danh mục thuộc ngành hàng</h4>
					{categories.length > 0 ? (
						<>
							<div style={{ maxHeight: "400px", overflowY: "auto" }}>
								{categories.map((x: any, index: any) => {
									return (
										<>
											<div
												style={{
													width: "100%",
													border: "1px solid rgb(212,212,212)",
													borderTop: index === 0 ? "1px solid rgb(212,212,212)" : "none",
													padding: "4px 9px",
													display: "flex",
													alignItems: "center",
													justifyContent: "space-between"
												}}
											>
												<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
													<span
														style={{ width: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}
													>
														{x?.children?.length > 0 && (
															<SvgExpand
																style={{
																	transform: x.checked ? "scale(0.8)" : "scale(0.8) rotate(270deg)",
																	cursor: "pointer"
																}}
																onClick={() => handleSetChecked(x.id)}
															/>
														)}
													</span>
													{x.category_name}
												</div>
												<Switch
													checked={x.status}
													onChange={(e: any) => dispatch(updateStatusCategoryCatalog(x.id, { status: e }))}
												/>
											</div>
											{x?.children?.length > 0 &&
												x.checked &&
												x.children.map((x: any, index: any) => {
													return (
														<>
															<div
																style={{
																	width: "100%",
																	border: "1px solid rgb(212,212,212)",
																	borderTop: "none",
																	padding: "4px 9px",
																	display: "flex",
																	alignItems: "center",
																	justifyContent: "space-between"
																}}
															>
																<div
																	style={{
																		marginLeft: "16px",
																		display: "flex",
																		alignItems: "center",
																		justifyContent: "space-between"
																	}}
																>
																	<span
																		style={{
																			width: "24px",
																			display: "flex",
																			alignItems: "center",
																			justifyContent: "center"
																		}}
																	>
																		{x?.children?.length > 0 && (
																			<SvgExpand
																				style={{
																					transform: x.checked ? "scale(0.8)" : "scale(0.8) rotate(270deg)",
																					cursor: "pointer"
																				}}
																				onClick={() => handleSetChecked(x.id)}
																			/>
																		)}
																	</span>
																	{x.category_name}
																</div>
																<Switch
																	disabled={!features.includes("MODULE_PRODUCTS__CATALOGS__UPDATE_CATALOG_CATEGORY")}
																	checked={x.status}
																	onChange={(e: any) => dispatch(updateStatusCategoryCatalog(x.id, { status: e }))}
																/>
															</div>
															{x?.children?.length > 0 &&
																x.checked &&
																x.children.map((x: any, index: any) => {
																	return (
																		<>
																			<div
																				style={{
																					width: "100%",
																					border: "1px solid rgb(212,212,212)",
																					borderTop: "none",
																					padding: "4px 9px",
																					display: "flex",
																					alignItems: "center",
																					justifyContent: "space-between"
																				}}
																			>
																				<div
																					style={{
																						marginLeft: "32px",
																						display: "flex",
																						alignItems: "center",
																						justifyContent: "space-between"
																					}}
																				>
																					<span
																						style={{
																							width: "24px",
																							display: "flex",
																							alignItems: "center",
																							justifyContent: "center"
																						}}
																					>
																						{x?.children?.length > 0 && (
																							<SvgExpand
																								style={{
																									transform: x.checked ? "scale(0.8)" : "scale(0.8) rotate(270deg)",
																									cursor: "pointer"
																								}}
																								onClick={() => handleSetChecked(x.id)}
																							/>
																						)}
																					</span>
																					{x.category_name}
																				</div>
																				<Switch
																					disabled={
																						!features.includes("MODULE_PRODUCTS__CATALOGS__UPDATE_CATALOG_CATEGORY")
																					}
																					checked={x.status}
																					onChange={(e: any) =>
																						dispatch(updateStatusCategoryCatalog(x.id, { status: e }))
																					}
																				/>
																			</div>
																			{x?.children?.length > 0 &&
																				x.checked &&
																				x.children.map((x: any, index: any) => {
																					return (
																						<div
																							style={{
																								width: "100%",
																								border: "1px solid rgb(212,212,212)",
																								borderTop: "none",
																								padding: "4px 9px",
																								display: "flex",
																								alignItems: "center",
																								justifyContent: "space-between"
																							}}
																						>
																							<div
																								style={{
																									marginLeft: "48px",
																									display: "flex",
																									alignItems: "center",
																									justifyContent: "space-between"
																								}}
																							>
																								<span
																									style={{
																										width: "24px",
																										display: "flex",
																										alignItems: "center",
																										justifyContent: "center"
																									}}
																								>
																									{x?.children?.length > 0 && (
																										<SvgExpand style={{ transform: "scale(0.8)", cursor: "pointer" }} />
																									)}
																								</span>
																								{x.category_name}
																							</div>
																							<Switch
																								disabled={
																									!features.includes(
																										"MODULE_PRODUCTS__CATALOGS__UPDATE_CATALOG_CATEGORY"
																									)
																								}
																								checked={x.status}
																								onChange={(e: any) =>
																									dispatch(updateStatusCategoryCatalog(x.id, { status: e }))
																								}
																							/>
																						</div>
																					);
																				})}
																		</>
																	);
																})}
														</>
													);
												})}
										</>
									);
								})}
							</div>
						</>
					) : (
						<div
							style={{
								width: "100%",
								height: "40px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								border: "1px solid rgb(212,212,212)",
								padding: "2px 9px",
								borderRadius: "5px"
							}}
						>
							Trống
						</div>
					)}
					<div className="center" style={{ marginTop: "8px" }}>
						<div className="center">
							<span>Trạng thái</span>&nbsp;&nbsp;
							<Form.Item name="status" valuePropName="checked" style={{ margin: "0" }}>
								<Switch disabled={!features.includes("MODULE_PRODUCTS__CATALOGS__UPDATE")} />
							</Form.Item>
						</div>
						{features.includes("MODULE_PRODUCTS__CATALOGS__UPDATE") && (
							<button type="submit" form="updateForm" className="defaultButton">
								<SvgIconStorage style={{ transform: "scale(0.7)" }} />
								&nbsp; Lưu
							</button>
						)}
					</div>
				</Form>
			</Modal>
			<SubHeader breadcrumb={[{ text: "Thiết lập hệ thống" }, { text: "Ngành hàng" }]} />
			<div className="configPlatform__search" style={{ padding: "7px 16px 8px 16px" }}>
				<Form
					layout="vertical"
					form={searchForm}
					id="searchForm"
					onFinish={handleSubmitSearch}
					className="configPlatform__search__form"
					style={{ height: "69px" }}
				>
					<Form.Item
						className="configPlatform__search__form__select"
						label="Tìm kiếm"
						name="q"
						style={{ transform: "translateY(-3px)", width: "calc(100% - 256px)" }}
					>
						<Input placeholder="Tìm kiếm" className="defaultInput" />
					</Form.Item>

					<button className="searchButton" style={{ marginTop: "15px" }}>
						<SvgIconSearch style={{ transform: "scale(0.8)" }} />
						&nbsp;Tìm kiếm
					</button>
					<div
						className="searchButton"
						style={{ marginTop: "15px" }}
						onClick={() => {
							searchForm.resetFields();
							setParamsFilter({
								q: undefined,
								status: undefined,
								page: 1,
								limit: 10
							});
						}}
					>
						<SvgIconRefresh style={{ transform: "scale(0.8)" }} />
						&nbsp;Đặt lại
					</div>
				</Form>
				<div style={{ display: "flex", marginTop: "13px" }}>
					{features.includes("MODULE_PRODUCTS__CATALOGS__UPDATE_INDEX") && (
						<div
							className="defaultButton"
							style={{ marginRight: "8px" }}
							onClick={() => onUpdateIndexes(listSchedulers)}
						>
							<SvgIconStorage style={{ transform: "scale(0.7)" }} />
							&nbsp;Lưu vị trí
						</div>
					)}
					{features.includes("MODULE_PRODUCTS__CATALOGS__CREATE") && (
						<button className="defaultButton" onClick={() => setVisibleCreate(true)}>
							<SvgIconPlus style={{ transform: "scale(0.8)" }} />
							&nbsp;Thêm mới
						</button>
					)}
				</div>
			</div>
			<div className="contentSection">
				<TableStyledAntd
					scroll={{ y: "calc(100vh - 345px)" }}
					rowKey="index"
					dataSource={listSchedulers || []}
					bordered
					pagination={false}
					columns={columnsData({ editRecord, editStatus, features }) as any}
					components={{
						body: {
							wrapper: DraggableContainer,
							row: DraggableBodyRow
						}
					}}
					widthCol1="5%"
					widthCol2="10%"
					widthCol3="25%"
					widthCol4="25%"
					widthCol5="25%"
					widthCol6="10%"
				/>
				<PanigationAntStyled
					style={{ marginTop: "8px" }}
					current={paramsFilter.page}
					pageSize={paramsFilter.limit}
					showSizeChanger
					onChange={onChangePaging}
					showTotal={() => `Tổng ${stateListCatalogs?.data?.paging?.total} ngành hàng `}
					total={stateListCatalogs?.data?.paging?.total}
				/>
			</div>
		</div>
	);
};

export default Catalogs;
