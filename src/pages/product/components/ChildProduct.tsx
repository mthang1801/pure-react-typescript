import { Form, Input, InputNumber } from "antd";
import { useContext, useEffect, useState } from "react";
import DIcon from "src/components/icons/DIcon";
import { CreateProductContext } from "../create";
import { DragHandle } from "./data";
import UploadChildProductThumbnail from "./UploadChildProductThumbnail";

const ChildProduct = ({ name, remove, move }: any) => {
	const [thumbnail, setThumbnail] = useState<string>("");
	const { form } = useContext(CreateProductContext);

	useEffect(() => {
		if (form && form.getFieldValue("product_variations") && name) {
			const variationsValues = form.getFieldValue("product_variations");
			variationsValues[name].thumbnail = thumbnail || "";
			form.setFieldValue("product_variations", variationsValues);
		}
	}, [thumbnail]);

	return (
		<li className="list-none flex items-center space-x-2 py-[13px] hover:bg-slate-100 h-[64px]">
			<div className="w-[5%] flex justify-center items-center">
				<DragHandle />
			</div>
			<div className="w-[5%] justify-center items-center">
				<Form.Item name={[name, "thumbnail"]}>
					<UploadChildProductThumbnail thumbnail={thumbnail} setThumbnail={setThumbnail} />
				</Form.Item>
			</div>
			<div className="w-[15%]">
				<Form.Item name={[name, "product_name"]}>
					<Input placeholder="Nhập Tên của SP" className="productPage__create__form__child__input" />
				</Form.Item>
			</div>
			<div className="w-[15%]">
				<Form.Item name={[name, "sku"]}>
					<Input placeholder="Nhập SKU của SP" className="productPage__create__form__child__input" />
				</Form.Item>
			</div>
			<div className="w-[15%]">
				<Form.Item name={[name, "barcode"]}>
					<Input placeholder="Nhập bar code của SP" className="productPage__create__form__child__input" />
				</Form.Item>
			</div>
			<div className="w-[8%]">
				<Form.Item name={[name, "stock_quantity"]}>
					<InputNumber
						className="productPage__create__form__child__input"
						min={0}
						placeholder="Số lượng"
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
					/>
				</Form.Item>
			</div>
			<div className="w-[8%]">
				<Form.Item name={[name, "retail_price"]}>
					<InputNumber
						className="productPage__create__form__child__input"
						min={0}
						placeholder="Nhập giá bán lẻ"
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
					/>
				</Form.Item>
			</div>
			<div className="w-[8%]">
				<Form.Item name={[name, "wholesale_price"]}>
					<InputNumber
						className="productPage__create__form__child__input"
						min={0}
						placeholder="Nhập giá bán sỉ"
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}						
					/>
				</Form.Item>
			</div>
			<div className="w-[8%]">
				<Form.Item name={[name, "import_price"]}>
					<InputNumber
						className="productPage__create__form__child__input"
						min={0}
						placeholder="Nhập giá nhập hàng"
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
					/>
				</Form.Item>
			</div>
			<div className="w-[8%]">
				<Form.Item name={[name, "return_price"]}>
					<InputNumber
						className="productPage__create__form__child__input"
						min={0}
						placeholder="Nhập giá thu hồi"
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
					/>
				</Form.Item>
			</div>

			<div className="w-[5%] cursor-pointer" onClick={() => remove(name)}>
				<DIcon icon="trash" />
			</div>
			<div>
				<Form.Item name={[name, "attributes"]}>
					<Input type="hidden" />
				</Form.Item>
			</div>
		</li>
	);
};

export default ChildProduct;
