import { Checkbox, Form, Input, Radio, Select, Table } from "antd";
import { stringify } from "querystring";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import { notifyError, notifySuccess, notifyWarning } from "src/components/notification";
import SubHeader from "src/components/subHeader/SubHeader";
import { getProductById, getProductLogs, updateProductById } from "src/services/actions/product.actions";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import ChildProduct from "../components/ChildProduct";
import ChildrenProductsTab from "../components/ChildrenProductsTab";
import GroupProduct from "../components/GroupProduct";
import HistoryTab from "../components/HistoryTab";
import InformationTab from "../components/InformationTab";
import SEOTab from "../components/SEOTab";
import Stickers from "../components/Stickers";
import WarrantyTab from "../components/WarrantyTab";
import { columnsData } from "./data";

const ProductCreate = () => {
	const [updateForm] = Form.useForm();
	const isMount = useIsMount();
	const dispatch = useDispatch();
	const paramsUrl = useParams() as any;
	const history = useHistory();
	const [productData, setProductData] = useState<any>(undefined);
	const [metaImage, setMetaImage] = useState<any>("");
	const [thumbnailImage, setThumbnailImage] = useState<any>("");
	const [othersImages, setOthersImages] = useState<any[]>([]);
	const [attributes, setAttributes] = useState<any[]>([]);
	const [selectedParent, setSelectedParent] = useState<any>(undefined);
	const [attributeParams, setAttributeParams] = useState<any[]>([]);
	const [variations, setVariations] = useState<any[]>([]);
	const [childrenProducts, setChildrenProducts] = useState<any>([]);
	const [selectedCatalog, setSelectedCatalog] = useState<any>(undefined);

	const [productLevel, setProductLevel] = useState(undefined);
	const [imagesList, setImagesList] = useState<any[]>([]);
	const shortDescriptionRef = useRef<any>(null);
	const descriptionRef = useRef<any>(null);
	const otherInfoRef = useRef<any>(null);
	const promotionInfoRef = useRef<any>(null);

	const { stateGetProductById, stateUpdateProductById } = useSelector((e: AppState) => e.productReducer);
	const features = localStorage.getItem("FEATURES") ? JSON.parse(localStorage.getItem("FEATURES") || "") : [];

	useEffect(() => {
		if (features.includes("MODULE_PRODUCTS__LIST__VIEW_DETAIL")) {
			dispatch(getProductById(paramsUrl?.id));
		} else {
			notifyWarning("Bạn không được quyền truy cập");
			history.push("/products");
		}
	}, [paramsUrl?.id]);

	const [countDispatch, setCountDispatch] = useState(1);
	useEffect(() => {
		if (productLevel === "1" && countDispatch > 2) {
			updateForm.setFieldValue("stock_quantity", 0);
		}
		setCountDispatch((countDispatch) => countDispatch + 1);
	}, [productLevel]);

	useEffect(() => {
		if (!stateUpdateProductById.isLoading) {
			dispatch(getProductLogs(paramsUrl?.id));
		}
	}, [paramsUrl?.id, stateUpdateProductById.isLoading]);
	useEffect(() => {
		if (isMount) return;
		const { success, message, error } = stateUpdateProductById;
		if (success) {
			setActiveTab(1);
			notifySuccess(`${message}`);
		}
		if (success === false || error) {
			notifyError(`${message}`);
		}
	}, [stateUpdateProductById.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { success, data, isLoading, error } = stateGetProductById;
		if (!isLoading) {
			if (success) {
				setProductData(data?.data);
				let listAttriFake = [];

				setSelectedParent(data?.data?.product_config);
				let selectedFake = [];
				for (let i = 0; i < data?.data?.categories_list?.length; i++) {
					selectedFake.push(data?.data?.categories_list[i]?.id);
				}
				let dataParams = [];
				for (let i = 0; i < data?.data?.attributes?.length; i++) {
					listAttriFake.push({
						...data?.data?.attributes[i],
						values: data?.data?.attributes[i]?.attribute?.values,
						filter_type: data?.data?.attributes[i]?.attribute?.filter_type
					});
					dataParams.push({
						attribute_id: data?.data?.attributes[i]?.attribute_id,
						value_ids: JSON.parse(data?.data?.attributes[i]?.value_ids),
						text_value: data?.data?.attributes[i]?.text_value
					});
				}
				if (data?.data?.product_variations?.length) {
					setVariations(data?.data?.product_variations);
				}
				setAttributes(listAttriFake.filter((x: any) => x?.attribute?.purposes !== "3"));
				setAttributeParams(dataParams);
				setMetaImage(data?.data?.meta_image);
				setThumbnailImage(data?.data?.thumbnail);
				setProductLevel(data?.data?.product_level);
				setSelectedCatalog(data?.data?.catalog_id);
				let fakeImages = [];
				for (let i = 0; i < data?.data?.image_urls?.length; i++) {
					fakeImages.push(data?.data?.image_urls[i]?.path_url);
				}
				setImagesList(fakeImages);
				updateForm.setFieldsValue({
					unit_id: data?.data?.unit_id,
					sku: data?.data?.sku,
					barcode: data?.data?.barcode,
					product_name: data?.data?.product_name,
					product_type: data?.data?.product_type,
					product_level: data?.data?.product_level,
					catalog_id: data?.data?.catalog_id,
					product_status: data?.data?.product_status,
					stock_quantity: data?.data?.stock_quantity,
					virtual_stock_quantity: data?.data?.virtual_stock_quantity,
					retail_price: Number(data?.data?.retail_price),
					wholesale_price: Number(data?.data?.wholesale_price),
					import_price: Number(data?.data?.import_price),
					return_price: Number(data?.data?.return_price),
					status: data?.data?.status,
					allow_installment: data?.data?.allow_installment,
					categories: selectedFake,
					warranty_address: data?.data?.warranty_address,
					warranty_months: data?.data?.warranty_months,
					warranty_note: data?.data?.warranty_note,
					warranty_phone: data?.data?.warranty_phone,
					weight: data?.data?.weight,
					width: data?.data?.width,
					length: data?.data?.length,
					height: data?.data?.height,

					url: data?.data?.url,
					meta_title: data?.data?.meta_title,
					meta_keywords: data?.data?.meta_keywords?.split("; "),
					meta_description: data?.data?.meta_description,
					canonical: data?.data?.canonical
				});
			} else if (success === false || error) {
			}
		}
	}, [stateGetProductById.isLoading]);

	const [activeTab, setActiveTab] = useState(1);
	const getMetaImageCallback = (values: any) => {
		console.log(values);
	};

	const submitEdit = (values: any) => {
		let metaKeywords = "";

		if (productLevel !== "2") {
			for (let i = 0; i < values.meta_keywords.length; i++) {
				if (i === values.meta_keywords.length - 1) {
					metaKeywords = metaKeywords + values.meta_keywords[i];
				} else {
					metaKeywords = metaKeywords + values.meta_keywords[i] + "; ";
				}
			}
		}
		let attri = [...attributeParams].map((x: any) =>
			x.value_ids ? { ...x, value_ids: JSON.stringify(x.value_ids) } : x
		);
		let fakeArray = [];
		if (productLevel === "1") {
			fakeArray = [...variations].map((x: any) => ({
				...x,
				retail_price: Number(x.retail_price),
				wholesale_price: Number(x.wholesale_price),
				return_price: Number(x.return_price),
				import_price: Number(x.import_price)
			}));
		}
		let count = 0;
		for (let i = 0; i < variations.length; i++) {
			count = count + Number(variations[i]?.stock_quantity);
		}
		let fakeCategory = [];
		for (let i = 0; i < values?.categories?.length; i++) {
			fakeCategory.push(values?.categories[i]?.value || values?.categories[i]);
		}
		let params = {
			...values,
			stock_quantity: values?.product_level === "1" ? count : values?.stock_quantity,
			product_variations: productLevel === "1" ? fakeArray : undefined,
			parent_id: values?.product_level === "2" ? selectedParent?.id : undefined,
			thumbnail: thumbnailImage,
			meta_image: metaImage,
			image_urls: imagesList,
			meta_keywords: metaKeywords,
			categories_list: fakeCategory,
			attributes: attri,
			description: descriptionRef?.current?.getContent(),
			short_description: shortDescriptionRef?.current?.getContent(),
			other_info: otherInfoRef?.current?.getContent(),
			promotion_info: promotionInfoRef?.current?.getContent()
		};

		dispatch(updateProductById(paramsUrl?.id, params));
	};

	const getChildrenProductsCallback = (values: any) => {
		setChildrenProducts(values);
	};
	return (
		<div className="mainPages productPage__create">
			<SubHeader
				breadcrumb={[{ text: "Quản lý sản phẩm" }, { text: "Sản phẩm", link: "/products" }, { text: "Chi tiết" }]}
			/>
			<div className="productPage__create__buttons">
				<div className="productPage__create__buttons__left">
					<div
						className={activeTab === 1 ? "defaultButton" : "searchButton"}
						onClick={() => setActiveTab(1)}
						style={{ marginRight: "8px" }}
					>
						Thông tin sản phẩm
					</div>
					<div
						className={activeTab === 2 ? "defaultButton" : "searchButton"}
						onClick={() => setActiveTab(2)}
						style={{ marginRight: "8px" }}
					>
						SEO
					</div>
					{productLevel === "1" && (
						<div
							className={activeTab === 4 ? "defaultButton" : "searchButton"}
							onClick={() =>
								productData?.sku && productData?.barcode && productData?.product_name
									? setActiveTab(4)
									: notifyWarning("Vui lòng nhập sku, barcode, tên sp cha trước khi tạo sản phẩm con!")
							}
							style={{ marginRight: "8px" }}
						>
							Sản phẩm con
						</div>
					)}
					{productLevel !== "2" && (
						<div
							className={activeTab === 3 ? "defaultButton" : "searchButton"}
							onClick={() => setActiveTab(3)}
							style={{ marginRight: "8px" }}
						>
							Bảo hành & vận chuyển
						</div>
					)}
					{/* <div
						className={activeTab === 5 ? "defaultButton" : "searchButton"}
						onClick={() => setActiveTab(5)}
						style={{ marginRight: "8px" }}
					>
						Sticker
					</div>
					<div
						className={activeTab === 6 ? "defaultButton" : "searchButton"}
						onClick={() => setActiveTab(6)}
						style={{ marginRight: "8px" }}
					>
						Nhóm sản phẩm
					</div> */}
					{features.includes("MODULE_PRODUCTS__LIST__VIEW_LOGS") && (
						<div className={activeTab === 7 ? "defaultButton" : "searchButton"} onClick={() => setActiveTab(7)}>
							Lịch sử
						</div>
					)}
				</div>
				{features.includes("MODULE_PRODUCTS__LIST__UPDATE") && (
					<div className="productPage__create__buttons__right">
						<div className="defaultButton" onClick={() => updateForm.submit()}>
							<SvgIconStorage style={{ transform: "scale(0.7)" }} />
							&nbsp;Lưu
						</div>
					</div>
				)}
			</div>

			<Form
				form={updateForm}
				onFinish={submitEdit}
				id="updateForm"
				layout="vertical"
				className="productPage__create__form"
				style={{ marginTop: "13px" }}
			>
				<div style={{ display: activeTab === 1 ? "block" : "none" }}>
					<InformationTab
						selectedParent={selectedParent}
						setSelectedParent={setSelectedParent}
						attributes={attributes}
						setAttributes={setAttributes}
						setAttributeParams={setAttributeParams}
						attributeParams={attributeParams}
						product={productData}
						setProduct={setProductData}
						setProductLevel={setProductLevel}
						productLevel={productLevel}
						setActiveTab={setActiveTab}
						setSelectedCatalog={setSelectedCatalog}
						selectedCatalog={selectedCatalog}
						form={updateForm}
					/>
				</div>
				<div style={{ display: activeTab === 2 ? "block" : "none" }}>
					<SEOTab
						promotionInfoRef={promotionInfoRef}
						otherInfoRef={otherInfoRef}
						shortDescriptionRef={shortDescriptionRef}
						descriptionRef={descriptionRef}
						product={productData}
						metaImage={metaImage}
						setMetaImage={setMetaImage}
						thumbnailImage={thumbnailImage}
						setThumbnailImage={setThumbnailImage}
						productLevel={productLevel}
						setProductLevel={setProductLevel}
						imagesList={imagesList}
						setImagesList={setImagesList}
						form={updateForm}
					/>
				</div>{" "}
				<div style={{ display: activeTab === 3 ? "block" : "none" }}>
					<WarrantyTab form={updateForm} productLevel={productLevel} product={productData} />
				</div>{" "}
				<div style={{ display: activeTab === 4 ? "block" : "none" }}>
					<ChildrenProductsTab product={productData} variations={variations} setVariations={setVariations} />
				</div>{" "}
				<div style={{ display: activeTab === 5 ? "block" : "none" }}>
					<Stickers />
				</div>{" "}
				<div style={{ display: activeTab === 6 ? "block" : "none" }}>
					<GroupProduct />
				</div>{" "}
				<div style={{ display: activeTab === 7 ? "block" : "none" }}>
					<HistoryTab />
				</div>{" "}
			</Form>
		</div>
	);
};

export default ProductCreate;
