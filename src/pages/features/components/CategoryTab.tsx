import { Checkbox, Form, Input, Modal, Radio, Select, Table, TreeSelect } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import { notifyError, notifySuccess, notifyWarning } from "src/components/notification";
import SellerContext from "src/context/sellerContext";
import { addCatesFeature } from "src/services/actions/attribute.actions";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import { API_CATEGORY } from "src/services/api/url.index";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";

const CategoryTab = ({ cates, features }: any) => {
	const { sellerInfo } = useContext(SellerContext) as any;

	const dispatch = useDispatch();
	const isMount = useIsMount();
	const [visible, setVisible] = useState(false);
	const [visibleDelete, setVisibleDelete] = useState(false);
	const [typeDelete, setTypeDelete] = useState<any>(false);
	const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
	const [treeData, setTreeData] = useState<any[]>([]);
	const paramsUrl = useParams() as any;
	const [deleteValue, setDeleteValue] = useState<any>(undefined);
	const [listCateOptions, setListCateOptions] = useState<any[]>([]);

	const { stateAddCatesFeature } = useSelector((e: AppState) => e.attributesReducer);
	useEffect(() => {
		if (isMount) return;
		const { isLoading, data, message, success, error } = stateAddCatesFeature;
		if (!isLoading) {
			if (success) {
				if (typeDelete) {
					let fakeArray = [...selectedCategories].filter((a: any) => a !== deleteValue);
					setListCateOptions((x: any) => x.filter((a: any) => a.value !== deleteValue));
					notifySuccess("Xoá danh mục thành công");
				} else {
					notifySuccess("Thêm danh mục thành công");
					setSelectedCategories([]);
				}
				setTypeDelete(false);
				setVisibleDelete(false);
				setVisible(false);
			}
			if (success === false || error) {
				return notifyError(message + "");
			}
		}
	}, [stateAddCatesFeature.isLoading]);

	useEffect(() => {
		if (cates && cates?.length > 0) {
			let fakeOptions = [];
			let fake = [];
			for (let i = 0; i < cates.length; i++) {
				fakeOptions.push({ value: cates[i].id, label: cates[i].category_name });
				fake.push(cates[i].id);
			}
			setListCateOptions(fakeOptions);
		}
	}, [cates]);

	useEffect(() => {
		const getCategories = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/${API_CATEGORY}`, params)) as any;
				let data = response["data"];
				for (let i = 0; i < data.length; i++) {
					data[i].value = data[i].category_id;
					data[i].key = data[i].category_id;
					data[i].title = data[i].category_name;
					let childrenLv1 = data[i].children || [];
					for (let j = 0; j < childrenLv1.length; j++) {
						childrenLv1[j].value = childrenLv1[j].category_id;
						childrenLv1[j].key = childrenLv1[j].category_id;
						childrenLv1[j].title = childrenLv1[j].category_name;
						let childrenLv2 = childrenLv1[j].children || [];
						for (let k = 0; k < childrenLv2.length; k++) {
							childrenLv2[k].value = childrenLv2[k].category_id;
							childrenLv2[k].key = childrenLv2[k].category_id;
							childrenLv2[k].title = childrenLv2[k].category_name;
							let childrenLv3 = childrenLv2[k].children || [];

							for (let m = 0; m < childrenLv3.length; m++) {
								childrenLv3[m].value = childrenLv3[m].category_id;
								childrenLv3[m].key = childrenLv3[m].category_id;
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
				catalog_id: sellerInfo?.catalog_id,
				page: 1,
				status: true
			};

			getCategories(paramsFilter);
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, [sellerInfo]);

	const onChangeCategories = (newValue: string[], value: any, value2: any) => {
		console.log(newValue, value, value2);
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

	const submitAddCates = () => {
		if (selectedCategories.length === 0) {
			return notifyWarning("Vui lòng chọn danh mục");
		}
		let cateParams = [...selectedCategories].map((x: any) => x.value);
		let params = {
			new_categories: cateParams
		};
		dispatch(addCatesFeature(paramsUrl?.id, params));
	};

	const removeValue = (e: any) => {
		setDeleteValue(e);
		setVisibleDelete(true);
		setTypeDelete(true);
	};

	const submitDeleteValue = () => {
		dispatch(addCatesFeature(paramsUrl?.id, { removed_categories: [deleteValue] }));
	};
	return (
		<>
			<Modal title="Thêm danh mục" visible={visible} onCancel={() => setVisible(false)} footer={null} width={900}>
				<TreeSelect
					{...tProps}
					className="defaultSelect"
					filterTreeNode={(search: any, item: any) => {
						return item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
					}}
					maxTagCount={"responsive"}
				/>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
						marginTop: "8px"
					}}
				>
					<div className="defaultButton" onClick={() => submitAddCates()}>
						<SvgIconStorage style={{ transform: "scale(0.7)" }} />
						&nbsp;Lưu
					</div>
				</div>
			</Modal>
			<Modal
				title="Xoá danh mục"
				onOk={() => submitDeleteValue()}
				visible={visibleDelete}
				onCancel={() => setVisibleDelete(false)}
				width={500}
			>
				<div>Chắc chắn xoá danh mục {listCateOptions.find((x: any) => x.value === deleteValue)?.label}</div>
			</Modal>
			<div
				style={{
					padding: "16px",
					borderRadius: "5px",
					background: "#fff",
					width: "100%",
					marginTop: "13px"
				}}
			>
				{features.includes("MODULE_PRODUCTS__FEATURES__UPDATE") && (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-end",
							marginBottom: "13px"
						}}
					>
						<div className="defaultButton" onClick={() => setVisible(true)}>
							<SvgIconPlus style={{ transform: "scale(0.8)" }} />
							&nbsp;Thêm danh mục
						</div>
					</div>
				)}
				{listCateOptions.length > 0 &&
					listCateOptions.map((x: any, index: any) => (
						<div
							style={{
								display: "flex",
								border: "1px solid rgb(242,242,242)",
								borderTop: index !== 0 ? "none" : "1px solid rgb(242,242,242)",
								alignItems: "center",
								padding: "4px 9px",
								justifyContent: "space-between"
							}}
						>
							<span>{x.label}</span>
							{features.includes("MODULE_PRODUCTS__FEATURES__UPDATE") && (
								<div className="searchButton" onClick={() => removeValue(x.value)}>
									Xóa
								</div>
							)}
						</div>
					))}
			</div>
		</>
	);
};

export default CategoryTab;
