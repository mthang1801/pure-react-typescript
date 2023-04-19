import { UndoOutlined } from "@ant-design/icons";
import { Form, Input, notification, Select } from "antd";
import _ from "lodash";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import DIcon from "src/components/icons/DIcon";
import { arrayMoveImmutable } from "array-move";

import { notifyError, notifyWarning } from "src/components/notification";
import { uploadSingleImageToCDN } from "src/services/api/upload";
import routerNames from "src/utils/data/routerName";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { cartesian } from "src/utils/helpers/functions/utils";
import { AttributePurposeEnum } from "../../../constants/enum";
import { fetchAttributesList } from "../../../services/actions/attribute.actions";
import { AppState } from "../../../types";
import { mergeArray } from "../../../utils/helpers/functions/utils";
import { CreateProductContext } from "../create/index";
import { columnsChildrenProductsData, columnsChildrenProductsDataEdit, DragHandle } from "./data";
import TableStyledAntd from "src/components/table/TableStyled";
import colors from "src/utils/colors";
import SvgBin from "src/assets/svg/SvgBin";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import { API_URL_CDN } from "src/services/api/config";
const SortableItem = SortableElement((props: any) => <tr {...props} />);
const SortableBody = SortableContainer((props: any) => <tbody {...props} />);

const ChildrenProductsTab = ({
	isActive,
	product,
	form,
	getChildrenProductsCallback,
	variations,
	setVariations
}: any) => {
	const isMount = useIsMount();
	const dispatch = useDispatch();
	const paramsUrl = useParams() as any;
	const [selectedAttributes, setSelectedAttributes] = useState<any[]>([]);
	const [selectedValues, setSelectedValues] = useState<any[]>([]);
	const [attributesList, setAttributesList] = useState<any[]>([]);
	const { stateAttributesList } = useSelector((e: AppState) => e.attributesReducer);
	const [showAddMore, setShowAddMore] = useState<boolean>(false);
	const [showCreateButton, setShowCreateButton] = useState<boolean>(false);
	const [visibleAttributes, setVisibleAttributes] = useState<boolean>(true);
	const [openNotificationCreateAttributes, setOpenNotificationCreateAttributes] = useState(false);
	const [visibleImage, setVisibleImage] = useState(false);
	const [selectedImage, setSelectedImage] = useState("");
	const { showChildrenProductsTab, activeTab, setOpenModalImageOverlay, setImageOverlay } =
		useContext(CreateProductContext);

	const history = useHistory();
	useEffect(() => {
		const queryParams = {
			purposes: AttributePurposeEnum.VariationAsOneProduct,
			include_values: true
		};
		dispatch(fetchAttributesList(queryParams));
	}, []);

	useEffect(() => {
		if (isMount) return;
		const { error, message, data, success } = stateAttributesList;
		if (success) {
			console.log("2134", data.data);
			setAttributesList(data.data);
		}
	}, [stateAttributesList.isLoading]);

	useEffect(() => {
		if (activeTab === 3) {
			if (!attributesList.length) {
				setOpenNotificationCreateAttributes(true);
			}
		}
	}, [showChildrenProductsTab, activeTab]);

	useEffect(() => {
		if (isMount) return;
		showAttributesButtonAddMore();
		showButtonCreateChildrenProducts();
	}, [selectedValues.length, selectedAttributes.length, product]);

	const showAttributesButtonAddMore = () => {
		if (!selectedAttributes.length) return setShowAddMore(false);
		for (let selectedAttributeItem of selectedAttributes) {
			const selectedValuesByAttribute = selectedValues.filter(
				(selectedValueItem) => selectedValueItem.attribute_id === selectedAttributeItem.id
			);
			if (!selectedValuesByAttribute.length) {
				setShowAddMore(false);
				return;
			}
		}
		if (selectedAttributes.length >= attributesList.length) {
			setShowAddMore(false);
			return;
		}
		return setShowAddMore(true);
	};

	const showButtonCreateChildrenProducts = () => {
		if (!selectedAttributes.length) return setShowCreateButton(false);
		for (let selectedAttributeItem of selectedAttributes) {
			const selectedValuesByAttribute = selectedValues.filter(
				(selectedValueItem) => selectedValueItem.attribute_id === selectedAttributeItem.id
			);
			if (selectedValuesByAttribute.length) {
				return setShowCreateButton(true);
			}
		}
		return setShowCreateButton(false);
	};

	const onHandleChangeAttributes = (key: any, value: any) => {
		setSelectedAttributes((prevSelectedAttributes) => [
			...prevSelectedAttributes.filter((prevSelectedAttributeItem) => prevSelectedAttributeItem.key !== key),
			{ ...attributesList.find((attributeItem: any) => attributeItem.id == value), key }
		]);
		setSelectedValues((prevSelectedValues) =>
			prevSelectedValues.filter((prevSelectedValueItem) => prevSelectedValueItem.key != key)
		);
	};

	const onHandleAttributeValues = (key: any, values: any) => {
		console.log("key", key);
		const currentSelectedAttribute: any = selectedAttributes.find(
			(selectedAttributeItem: any) => selectedAttributeItem.key == key
		);

		if (!currentSelectedAttribute?.values?.length) return;

		let newArray = [...selectedValues];

		let fake = [];
		if (values.length === 0) {
			newArray = [];
		}
		for (let i = 0; i < values.length; i++) {
			newArray = newArray.filter((x: any) => x.key !== key);

			for (let j = 0; j < currentSelectedAttribute?.values?.length; j++) {
				if (values[i] === currentSelectedAttribute?.values[j]?.value) {
					fake.push({ ...currentSelectedAttribute?.values[j], key: key });
				}
			}
		}
		setSelectedValues([...newArray, ...fake]);
	};

	const onDeleteAttribute = (key: any) => {
		const currentSelectedAttribute = selectedAttributes.find(
			(selectedAttributeItem: any) => selectedAttributeItem.key === key
		);

		if (currentSelectedAttribute) {
			setSelectedValues((prevState) =>
				prevState.filter((selectedValueItem: any) => selectedValueItem.attribute_id !== currentSelectedAttribute.id)
			);
			setSelectedAttributes((prevState) =>
				prevState.filter((attributeItem: any) => currentSelectedAttribute.id != attributeItem.id)
			);
		}
	};

	const generateChildrenProductsByAttributesCollection = () => {
		if (!selectedAttributes.length) return;

		const groupAttrValues = cartesian(
			...Object.values(_.groupBy(selectedValues, "attribute_id")).map((value: any) =>
				value.map((_value: any) => _value.value_code)
			)
		);

		const groupAttrValueIds = cartesian(
			...Object.values(_.groupBy(selectedValues, "attribute_id")).map((value: any) =>
				value.map((_value: any) => ({ attribute_id: _value.attribute_id, value_id: _value.id }))
			)
		);
		let childrenProductsByAttrValues: any[] = [...variations];
		for (const [i, groupAttrValueItem] of groupAttrValues.entries()) {
			console.log(product);
			let fakeName = Array.isArray(groupAttrValueItem)
				? `${product?.product_name}-${groupAttrValueItem.join("-")}`
				: `${product?.product_name}-${groupAttrValueItem}`;
			console.log(variations);
			if (variations.some((childProduct: any) => childProduct?.product_name === fakeName)) {
				notifyWarning(`Sản phẩm con ${fakeName} đã tồn tại`);
				continue;
			} else {
				console.log("abdbfdbdf", groupAttrValueItem);
				childrenProductsByAttrValues = [
					...childrenProductsByAttrValues,
					{
						product_name: Array.isArray(groupAttrValueItem)
							? `${product?.product_name}-${groupAttrValueItem.join("-")}`
							: `${product?.product_name}-${groupAttrValueItem}`,
						sku: Array.isArray(groupAttrValueItem)
							? `${product?.sku}-${groupAttrValueItem.join("-")}`
							: `${product?.sku}-${groupAttrValueItem}`,
						barcode: Array.isArray(groupAttrValueItem)
							? `${product?.barcode}-${groupAttrValueItem.join("-")}`
							: `${product?.barcode}-${groupAttrValueItem}`,
						retail_price: product?.retail_price,
						wholesale_price: product?.wholesale_price,
						import_price: product?.import_price,
						return_price: product?.return_price,
						stock_quantity: 0,
						thumbnail: "",
						index: i,
						attributes: Array.isArray(groupAttrValueIds[i]) ? groupAttrValueIds[i] : [groupAttrValueIds[i]]
					}
				];
			}
		}

		setVariations(childrenProductsByAttrValues);
		form.setFieldValue("product_variations", childrenProductsByAttrValues);
		onRefreshChildrenProducts();
	};

	const [loadingUpload, setLoadingUpload] = useState<boolean>(false);

	const itemsRef = useRef<any[]>([]);

	const pushThumbnail = async (e: any, index: any) => {
		const file = e.target.files[0];
		let fakeArray = [...variations];
		let changeArray: any = [];
		setLoadingUpload(true);
		await uploadSingleImageToCDN(file)
			.then((data: any) => {
				changeArray = fakeArray.map((x: any) => (x.index === index ? { ...x, thumbnail: data?.data[0] } : x));
			})
			.catch((error: any) => notifyError(error))
			.finally(() => {
				setVariations(changeArray);
				setLoadingUpload(false);
			});
	};

	const deleteImageCallback = (index: any) => {
		let fakeArray = [...variations];
		let item = fakeArray.find((x) => x.index === index);
		item.thumbnail = "";
		setVariations(fakeArray.map((x: any) => (x.index === index ? item : x)));
	};
	const onClickThumbnail = (name: number) => {
		console.log(247, name);
		console.log(itemsRef.current);
	};

	const onChangeProductName = (e: any, index: number) => {
		const currentChildrenProducts = { ...variations };
		currentChildrenProducts[index].product_name = e.target.value;

		// setChildrenProducts(prevState => )
	};
	const onSortEnd = ({ oldIndex, newIndex }: any) => {
		if (oldIndex !== newIndex) {
			const newData = arrayMoveImmutable([].concat(variations as any), oldIndex, newIndex).filter((el) => !!el);
			let convertData = [...newData] as any;
			for (var i = 0; i < convertData.length; i++) {
				convertData[i].index = i + 1;
			}
			setVariations(convertData);
		}
	};

	const DraggableContainer = (props: any) => (
		<SortableBody
			useDragHandle
			disableAutoscroll
			helperClass="row-dragging"
			onSortEnd={onSortEnd}
			onSortStart={handleSortStart}
			{...props}
		/>
	);

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

	const DraggableBodyRow = ({ className, style, ...restProps }: any) => {
		// function findIndex base on Table rowKey props and should always be a right array index
		const index = variations.findIndex((x: any) => x.index === restProps["data-row-key"]);
		return <SortableItem index={index} {...restProps} />;
	};

	const onClickCreateChildrenProducts = (e: any) => {
		e.preventDefault();
		setVisibleAttributes(false);
		generateChildrenProductsByAttributesCollection();
	};

	const onRefreshChildrenProducts = () => {
		setSelectedAttributes([]);
		setSelectedValues([]);
		form.setFieldValue("fields", []);
	};

	const close = () => {
		console.log("Notification was closed. Either the close button was clicked or duration time elapsed.");
	};

	const openNotification = () => {
		const key = `open${Date.now()}`;
		const btn = (
			<button
				onClick={() => {
					notification.close(key);
					history.push({ pathname: routerNames.FEATURES_CREATE });
				}}
				className="searchButton"
			>
				Tạo thuộc tính
			</button>
		);
		notification.warning({
			message: "Không tìm thấy bộ thuộc tính để tạo SP con",
			description: "Vui lòng tạo bộ thuộc tính trước khi tạo sản phẩm con",
			btn,
			key,
			duration: 30,
			onClose: close
		});
	};

	const removeChildrenProduct = (e: any) => {
		let fakeArray = [...variations];
		let newArray = fakeArray.filter((x) => x.index !== e);
		setVariations(newArray);
	};

	const setValueCallback = (name: any, e: any, index: any) => {
		let fakeArray = [...variations];
		let item = fakeArray.find((x) => x.index === index);
		item[name] = Number(e) ? Number(e) : e;
		setVariations(fakeArray.map((x: any) => (x.index === index ? item : x)));
	};
	const visibleImageCallback = (thumbnail: any) => {
		setVisibleImage(true);
		setSelectedImage(thumbnail);
	};
	return (
		<>
			{visibleImage && (
				<div
					style={{
						width: "100vw",
						height: "100vh",
						position: "fixed",
						top: "0",
						left: "0",
						background: "rgba(0,0,0,0.2)",
						zIndex: "10000",
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					}}
					onClick={() => setVisibleImage(false)}
				>
					<img src={`${API_URL_CDN}/${selectedImage}`} alt={selectedImage} />
				</div>
			)}
			<OverlaySpinner text="Xử lý ảnh ..." open={loadingUpload} />
			{/* {openNotificationCreateAttributes && openNotification()} */}
			<div className="contentSection">
				<div className="bg-white border rounded-md w-full p-[13px]">
					<Form.List name="fields">
						{(fields, { add, remove }) => {
							if (!fields?.length) {
								if (attributesList?.length) add();
							}

							return (
								<div>
									{fields.map(({ key, name }: any) => {
										return (
											<div
												key={key}
												style={{
													marginBottom: "4px",
													display: "flex",
													alignItems: "center",
													justifyContent: "space-between"
												}}
											>
												<div style={{ width: "calc((100% - 136px) /2)" }}>
													<Form.Item label="Chọn thuộc tính" style={{ margin: "0" }}>
														<Select
															className="defaultSelect"
															placeholder="Chọn thuộc tính cho SP con"
															onChange={(value: any) => onHandleChangeAttributes(key, value)}
														>
															{attributesList
																.filter(
																	(attributeItem) =>
																		!selectedAttributes.some(
																			(selectedAttributeItem: any) => selectedAttributeItem.id == attributeItem.id
																		)
																)
																.map((attributeItem) => (
																	<Select.Option key={attributeItem.id} value={attributeItem.id}>
																		{attributeItem.attribute_name}
																	</Select.Option>
																))}
														</Select>
													</Form.Item>
												</div>
												<div style={{ width: "calc((100% - 136px) /2)" }}>
													<Form.Item label="Chọn Giá trị" style={{ margin: "0" }}>
														<Select
															id={`attribute-value-${key}`}
															mode="tags"
															fieldNames={{ label: "value_name", value: "value" }}
															className="defaultSelect"
															placeholder="Chọn giá trị thuộc tính cho SP con"
															onChange={(values: any) => onHandleAttributeValues(key, values)}
															value={selectedValues.filter((selectedValueItem: any) => selectedValueItem.key === key)}
															disabled={
																!selectedAttributes.some(
																	(selectedAttributeItem: any) => selectedAttributeItem?.key === key
																)
															}
															options={
																selectedAttributes.length &&
																selectedAttributes.some(
																	(selectedAttributeItem: any) => selectedAttributeItem?.key === key
																)
																	? selectedAttributes.find(
																			(selectedAttributeItem: any) => selectedAttributeItem?.key === key
																	  )?.values
																	: []
															}
														/>
													</Form.Item>
												</div>
												<div
													className="searchButton"
													style={{ marginTop: "21px" }}
													onClick={() => {
														onDeleteAttribute(key);
														remove(name);
													}}
												>
													<SvgBin fill="#000" />
												</div>
											</div>
										);
									})}
									<div style={{ display: "flex", alignItems: "center", marginTop: "4px" }}>
										{showAddMore && (
											<button
												className="defaultButton"
												style={{ marginRight: "8px" }}
												onClick={(e: any) => {
													e.preventDefault();
													add();
												}}
											>
												Thêm thuộc tính
											</button>
										)}
										{showCreateButton && (
											<div className="searchButton" onClick={(e: any) => onClickCreateChildrenProducts(e)}>
												Tạo sản phẩm
											</div>
										)}
									</div>
								</div>
							);
						}}
					</Form.List>

					{variations?.length > 0 && (
						<>
							<TableStyledAntd
								style={{ marginTop: "8px" }}
								rowKey="index"
								dataSource={[...variations] || []}
								bordered
								pagination={false}
								columns={
									paramsUrl.id
										? (columnsChildrenProductsDataEdit({
												pushThumbnail,
												removeChildrenProduct,
												setValueCallback,
												deleteImageCallback,
												visibleImageCallback
										  }) as any)
										: (columnsChildrenProductsData({
												pushThumbnail,
												removeChildrenProduct,
												setValueCallback,
												deleteImageCallback,
												visibleImageCallback
										  }) as any)
								}
								widthCol1="50px"
								widthCol2="110px"
								widthCol3="20%"
								widthCol4="calc((100% - 250px ) /10) "
								widthCol5="calc((100% - 250px ) /10)"
								widthCol6="calc((100% - 250px ) /10)"
								widthCol7="calc((100% - 250px ) /10)"
								widthCol8="calc((100% - 250px ) /10)"
								widthCol9="90px"
								components={{
									body: {
										wrapper: DraggableContainer,
										row: DraggableBodyRow
									}
								}}
							/>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default ChildrenProductsTab;
