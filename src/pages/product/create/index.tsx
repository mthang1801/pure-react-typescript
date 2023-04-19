import { Form, notification } from "antd";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import ImageOverlay from "src/components/custom/ImageOverlay";
import SubHeader from "src/components/subHeader/SubHeader";
import SellerContext from "src/context/sellerContext";
import { createProduct } from "src/services/actions/product.actions";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import { API_CATEGORY } from "src/services/api/url.index";
import routerNames from "src/utils/data/routerName";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { notifyError, notifySuccess, notifyWarning } from "../../../components/notification/index";
import { ProductLevelEnum, ProductStatusEnum, ProductTypeEnum } from "../../../constants/enum";
import { AppState } from "../../../types";
import ChildrenProductsTab from "../components/ChildrenProductsTab";
import GroupProduct from "../components/GroupProduct";
import HistoryTab from "../components/HistoryTab";
import InformationTab from "../components/InformationTab";
import SEOTab from "../components/SEOTab";
import Stickers from "../components/Stickers";
import WarrantyTab from "../components/WarrantyTab";

export const CreateProductContext = createContext<any>({});

const ProductCreate = () => {
	const { sellerInfo } = useContext(SellerContext) as any;

	const history = useHistory();
	const [activeTab, setActiveTab] = useState(1);
	const [childrenProducts, setChildrenProducts] = useState<any>([]);
	const dispatch = useDispatch();

	const [formCreate] = Form.useForm();
	const isMount = useIsMount();
	const [thumbnail, setThumbnail] = useState<string>("");
	const [metaImage, setMetaImage] = useState<string>("");
	const [selectedParent, setSelectedParent] = useState<any>(undefined);
	const [productLevel, setProductLevel] = useState(undefined);
	const [imagesList, setImagesList] = useState<any[]>([]);
	const [product, setProduct] = useState<any>(undefined);

	const [redirectType, setRedirectType] = useState(300);
	const [selectedCatalog, setSelectedCatalog] = useState<any>(undefined);
	const [openModalImageOverlay, setOpenModalImageOverlay] = useState<boolean>(false);
	const [imageOverlay, setImageOverlay] = useState<string>("");
	const [metaKeywords, setMetaKeywords] = useState<string[]>([]);
	const [variations, setVariations] = useState<any[]>([]);
	const { stateCreateProduct } = useSelector((e: AppState) => e.productReducer);
	const [attributes, setAttributes] = useState<any[]>([]);
	const [attributeParams, setAttributeParams] = useState<any[]>([]);
	const [thumbnailImage, setThumbnailImage] = useState<any>("");
	const shortDescriptionRef = useRef<any>(null);
	const descriptionRef = useRef<any>(null);
	const otherInfoRef = useRef<any>(null);
	const promotionInfoRef = useRef<any>(null);

	useEffect(() => {
		if (productLevel === "1") {
			formCreate.setFieldValue("stock_quantity", 0);
		}
	}, [productLevel]);

	useEffect(() => {
		formCreate.setFieldValue("catalog_id", sellerInfo?.catalog_id);
	}, [sellerInfo]);
	useEffect(() => {
		if (isMount) return;
		const { success, message, error } = stateCreateProduct;
		if (success) {
			history.push("/products");
			notifySuccess(`${message}`);
		}
		if (success === false || error) {
			notifyError(`${message}`);
		}
	}, [stateCreateProduct.isLoading]);

	const onFinishCreateProduct = (values: any) => {
		console.log(values);
		let metaKeywords = "";
		if (productLevel !== "2") {
			for (let i = 0; i < values?.meta_keywords?.length; i++) {
				if (i === values?.meta_keywords?.length - 1) {
					metaKeywords = metaKeywords + values?.meta_keywords[i];
				} else {
					metaKeywords = metaKeywords + values?.meta_keywords[i] + "; ";
				}
			}
		}

		let attri = [...attributeParams].map((x: any) =>
			x.value_ids ? { ...x, value_ids: JSON.stringify(x.value_ids) } : x
		);
		let count = 0;
		for (let i = 0; i < variations.length; i++) {
			count = count + Number(variations[i]?.stock_quantity);
		}
		let fakeCategory = [];
		for (let i = 0; i < values?.categories?.length; i++) {
			fakeCategory.push(values?.categories[i].value);
		}
		const dataRequest = {
			...values,
			image_urls: imagesList,
			product_variations: variations,
			categories_list: fakeCategory,
			attributes: attri,
			product_level: values?.product_level,
			stock_quantity: values?.product_level === "1" ? count : values?.stock_quantity,
			parent_id: values?.product_level === "2" ? selectedParent?.id : undefined,
			meta_keywords: metaKeywords,
			description: descriptionRef?.current?.getContent(),
			short_description: shortDescriptionRef?.current?.getContent(),
			promotion_info: promotionInfoRef?.current?.getContent(),
			other_info: otherInfoRef?.current?.getContent(),
			thumbnail: thumbnailImage,
			meta_image: metaImage
		};
		delete dataRequest.fields;
		console.log(dataRequest);

		dispatch(createProduct(dataRequest));
	};

	const providerValue: any = {
		thumbnail,
		setThumbnail,
		imagesList,
		setImagesList,
		metaImage,
		setMetaImage,
		setOpenModalImageOverlay,
		openModalImageOverlay,
		imageOverlay,
		setImageOverlay,
		metaKeywords,
		setMetaKeywords,
		redirectType,
		setRedirectType,
		formCreate,
		activeTab
	};
	const getChildrenProductsCallback = (values: any) => {
		setChildrenProducts(values);
	};
	return (
		<CreateProductContext.Provider value={providerValue}>
			<div className="mainPages productPage__create">
				<ImageOverlay
					open={openModalImageOverlay}
					imgSrc={imageOverlay}
					onClose={() => {
						setImageOverlay("");
						setOpenModalImageOverlay(false);
					}}
				/>
				<SubHeader
					breadcrumb={[
						{ text: "Quản lý sản phẩm" },
						{ text: "Sản phẩm", link: routerNames.PRODUCT },
						{ text: "Chi tiết", link: routerNames.PRODUCT_CREATE }
					]}
				/>
				<div className="productPage__create__buttons mb-[8px]">
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
									product?.sku && product?.barcode && product?.product_name
										? setActiveTab(4)
										: notifyWarning("Vui lòng nhập sku, barcode, tên sp cha trước khi tạo sản phẩm con!")
								}
								style={{ marginRight: "8px" }}
							>
								Sản phẩm con
							</div>
						)}
						{productLevel !== "2" && (
							<div className={activeTab === 3 ? "defaultButton" : "searchButton"} onClick={() => setActiveTab(3)}>
								Bảo hành & vận chuyển
							</div>
						)}
					</div>
					<div className="productPage__create__buttons__right">
						<button className="defaultButton bg-black" type="submit" form="create-prduct-form">
							<SvgIconStorage style={{ transform: "scale(0.7)" }} />
							&nbsp;Lưu
						</button>
					</div>
				</div>
				<Form
					layout="vertical"
					form={formCreate}
					id="create-prduct-form"
					className="productPage__create__form"
					style={{ marginTop: "13px" }}
					onFinish={onFinishCreateProduct}
					onFinishFailed={(values: any) => {
						console.log(values);
						notifyWarning("Vui lòng nhập đủ thông tin các tab");
					}}
					initialValues={{
						product_type: ProductTypeEnum["Thông Thường"],
						product_level: ProductLevelEnum["Sản phẩm độc lập"],
						status: true,
						product_status: ProductStatusEnum.Mới,
						stock_quantity: 0,
						virtual_stock_quantity: 0,
						catalog_id: sellerInfo?.user_type !== "admin" ? sellerInfo?.catalog_id : undefined
					}}
				>
					<div style={{ display: activeTab === 1 ? "block" : "none" }}>
						<InformationTab
							attributes={attributes}
							setAttributes={setAttributes}
							setAttributeParams={setAttributeParams}
							attributeParams={attributeParams}
							selectedParent={selectedParent}
							setSelectedParent={setSelectedParent}
							setProductLevel={setProductLevel}
							productLevel={productLevel}
							product={product}
							setProduct={setProduct}
							setActiveTab={setActiveTab}
							form={formCreate}
							setSelectedCatalog={setSelectedCatalog}
							selectedCatalog={selectedCatalog}
						/>
					</div>
					<div style={{ display: activeTab === 2 ? "block" : "none" }}>
						<SEOTab
							promotionInfoRef={promotionInfoRef}
							otherInfoRef={otherInfoRef}
							shortDescriptionRef={shortDescriptionRef}
							descriptionRef={descriptionRef}
							metaImage={metaImage}
							setMetaImage={setMetaImage}
							thumbnailImage={thumbnailImage}
							setThumbnailImage={setThumbnailImage}
							productLevel={productLevel}
							setProductLevel={setProductLevel}
							imagesList={imagesList}
							setImagesList={setImagesList}
						/>
					</div>{" "}
					<div style={{ display: activeTab === 3 ? "block" : "none" }}>
						<WarrantyTab form={formCreate} productLevel={productLevel} product={product} />
					</div>{" "}
					<div style={{ display: activeTab === 4 ? "block" : "none" }}>
						<ChildrenProductsTab product={product} variations={variations} setVariations={setVariations} />
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
		</CreateProductContext.Provider>
	);
};

export default ProductCreate;
