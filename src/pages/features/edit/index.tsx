import { Form } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import SubHeader from "src/components/subHeader/SubHeader";
import { getAttributeById, updateAttribute } from "src/services/actions/attribute.actions";
import { AppState } from "src/types";
import routerNames from "src/utils/data/routerName";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { notifyError, notifySuccess, notifyWarning } from "../../../components/notification/index";
import CategoryTab from "../components/CategoryTab";
import InformationTab from "../components/InformationTab";
import "./data";
const FeaturesEdit = () => {
	const history = useHistory();
	const [activeTab, setActiveTab] = useState(1);
	const { stateAttributeById, stateUpdateAttribute } = useSelector((e: AppState) => e.attributesReducer);
	const { stateAddCatesFeature } = useSelector((e: AppState) => e.attributesReducer);
	const features = localStorage.getItem("FEATURES") ? JSON.parse(localStorage.getItem("FEATURES") || "") : [];

	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const [attribute, setAttribute] = useState<any>(null);
	const paramsURL = useParams() as any;
	const isMount = useIsMount();
	const [values, setValues] = useState<any[]>([]);
	const [removeValues, setRemoveValues] = useState<any[]>([]);
	const [attributeValues, setAttributeValues] = useState<any[]>([]);
	const [attributeType, setAttributeType] = useState<any>("1");
	useEffect(() => {
		if (features.includes("MODULE_PRODUCTS__FEATURES__VIEW_DETAIL")) {
			if (!stateAddCatesFeature.isLoading) {
				dispatch(getAttributeById(paramsURL.id));
			}
		} else {
			notifyWarning("Bạn không được quyền truy cập");
			history.push("/features");
		}
	}, [paramsURL.id, stateAddCatesFeature.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { data, message, success, error } = stateAttributeById;
		if (success) {
			form.setFieldsValue({
				attribute_code: data?.data?.attribute_code,
				attribute_name: data?.data?.attribute_name,
				status: data?.data?.status,
				values: data?.data?.values || [],
				attribute_type: data?.data?.attribute_type,
				filter_type: data?.data?.filter_type,
				purposes: data?.data?.purposes
			});
			setAttributeType(data?.data?.attribute_type);
			setAttribute(data);
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateAttributeById.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { data, message, success, error } = stateUpdateAttribute;
		if (success) {
			notifySuccess("Cập nhật thành công");
			history.push("/features");
		}
	}, [stateUpdateAttribute.isLoading]);

	const getNewValues = (currentValues: any[]) =>
		currentValues
			.filter((valueItem) => typeof valueItem.id !== "number")
			.map((valueItem) => valueItem.value)
			.reverse();

	const getUpdatedValues = (currentValues: any[]) =>
		currentValues
			.filter((valueItem) => typeof valueItem.id === "number")
			.map((item) => ({ id: item.id, value: item.value }));

	const getRemovedValues = (prevValues: any[], currentValues: any[]) =>
		prevValues
			.filter((prevValueItem) => !currentValues.some((currentValueItem) => currentValueItem.id === prevValueItem.id))
			.map((item) => item.id);

	const validation = () => {
		const fieldsValue = form.getFieldsValue();
		let isValid = true;
		if (!fieldsValue.attribute_name) {
			notifyError("Tên thuộc tính là bắt buộc");
			isValid = false;
		}

		if (!fieldsValue.attribute_code) {
			notifyError("Mã thuộc tính là bắt buộc và duy nhất so với các thuộc tính khác");
			isValid = false;
		}

		if (!fieldsValue.purposes) {
			notifyError("Thuộc tính cần có mục tiêu cụ thể");
			isValid = false;
		}

		if (!fieldsValue.attribute_type) {
			notifyError("Feature type là bắt buộc");
			isValid = false;
		}

		if (!fieldsValue.filter_type) {
			notifyError("Filter type là bắt buộc");
			isValid = false;
		}

		if (values.length === 0) {
			notifyError("Giá trị thuộc tính không được để trống");
			isValid = false;
		}

		return isValid;
	};
	const onSave = () => {
		const fieldsValue = form.getFieldsValue();

		if (!validation()) {
			return;
		}
		for (let i = 0; i < values.length; i++) {
			if (!values[i].value_name) {
				values[i].value_name = values[i].value;
			}
			if (!values[i].value_code) {
				values[i].value_code = values[i].value;
			}
		}
		const dataRequest = {
			attribute_name: fieldsValue.attribute_name,
			attribute_code: fieldsValue.attribute_code,
			status: fieldsValue.status,
			attribute_type: fieldsValue.attribute_type,
			filter_type: fieldsValue.filter_type,
			purposes: fieldsValue.purposes,
			updated_values: values,
			removed_values: removeValues
		};
		dispatch(updateAttribute(paramsURL.id, dataRequest));
	};

	const getValuesCallback = (values: any) => {
		setValues(values);
	};

	const removeValueCallback = (values: any) => {
		setRemoveValues([...removeValues, values]);
	};
	return (
		<div className="mainPages featuresPage__create">
			<SubHeader
				breadcrumb={[
					{ text: "Quản lý sản phẩm" },
					{ text: "Features", link: routerNames.FEATURES },
					{ text: "Chi tiết" }
				]}
			/>
			<div className="featuresPage__create__buttons">
				<div className="featuresPage__create__buttons__left">
					<div
						className={activeTab === 1 ? "defaultButton" : "searchButton"}
						onClick={() => setActiveTab(1)}
						style={{ marginRight: "8px" }}
					>
						Thông tin chung
					</div>
					<div
						className={activeTab === 2 ? "defaultButton" : "searchButton"}
						onClick={() => setActiveTab(2)}
						style={{ marginRight: "8px" }}
					>
						Danh mục
					</div>
				</div>
				{features.includes("MODULE_PRODUCTS__FEATURES__UPDATE") && (
					<div className="featuresPage__create__buttons__right">
						{activeTab === 1 && (
							<button className="defaultButton" onClick={onSave}>
								<SvgIconStorage style={{ transform: "scale(0.7)" }} />
								&nbsp;Lưu
							</button>
						)}
					</div>
				)}
			</div>
			<Form layout="vertical" className="featuresPage__create__form">
				{activeTab === 1 && (
					<InformationTab
						form={form}
						attributeValues={attributeValues}
						setAttributeValues={setAttributeValues}
						getValuesCallback={getValuesCallback}
						removeValueCallback={removeValueCallback}
						attributeType={attributeType}
						setAttributeType={setAttributeType}
					/>
				)}
				{activeTab === 2 && <CategoryTab features={features} cates={stateAttributeById?.data?.data?.categories} />}
			</Form>
		</div>
	);
};

export default FeaturesEdit;
