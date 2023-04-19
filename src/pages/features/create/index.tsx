import { Form } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import SubHeader from "src/components/subHeader/SubHeader";
import { AttributeFilterTypeEnum, AttributePurposeEnum, AttributeTypeEnum } from "src/constants/enum";
import { createAttribute } from "src/services/actions/attribute.actions";
import { AppState } from "src/types";
import routerNames from "src/utils/data/routerName";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { notifyError, notifySuccess, notifyWarning } from "../../../components/notification/index";
import CategoryTab from "../components/CategoryTab";
import InformationTab from "../components/InformationTab";

const FeaturesCreate = () => {
	const [activeTab, setActiveTab] = useState(1);
	const [form] = Form.useForm();
	const isMount = useIsMount();
	const { stateCreateAttribute } = useSelector((e: AppState) => e.attributesReducer);
	const history = useHistory();
	const dispatch = useDispatch();
	const [values, setValues] = useState<any[]>([]);
	const [attributeValues, setAttributeValues] = useState<any[]>([]);
	const [attributeType, setAttributeType] = useState<any>("1");
	useEffect(() => {
		console.log("values", values);
	}, [values]);
	useEffect(() => {
		if (isMount) return;
		const { message, error, success } = stateCreateAttribute;
		if (success) {
			notifySuccess("Tạo thuộc tính thành công.");
			history.push({ pathname: `${routerNames.FEATURES}` });
		}
		if (success === false || error) {
			notifyError(`Tạo thuộc tính không thành công, ${message}`);
		}
	}, [stateCreateAttribute.isLoading]);

	useEffect(() => {
		form.setFieldsValue({
			attribute_name: "",
			attribute_code: "",
			status: true,
			attribute_type: AttributeTypeEnum.Checkbox,
			filter_type: AttributeFilterTypeEnum.TextOrNumber,
			purposes: AttributePurposeEnum.ProductSearchViaFilters,
			values: []
		});
	}, []);

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
		if (!validation()) {
			return;
		}
		let fake = [...values];
		for (let i = 0; i < values.length; i++) {
			if (fake?.filter((x: any) => x.value === values[i].value).length > 1) {
				return notifyWarning("Giá trị là duy nhất, vui lòng không để trùng");
			}
			if (fake?.filter((x: any) => x.value_name === values[i].value_name).length > 1) {
				return notifyWarning("Tên giá trị là duy nhất, vui lòng không để trùng");
			}
		}
		const fieldsValue = form.getFieldsValue();
		const dataRequest = {
			attribute_name: fieldsValue.attribute_name.trim(),
			attribute_code: fieldsValue.attribute_code.trim(),
			status: fieldsValue.status,
			attribute_type: fieldsValue.attribute_type,
			filter_type: fieldsValue.filter_type,
			purposes: fieldsValue.purposes,
			values: values
		};
		dispatch(createAttribute(dataRequest));
	};
	const getValuesCallback = (values: any) => {
		setValues(values);
	};
	return (
		<div className="mainPages featuresPage__create">
			<SubHeader breadcrumb={[{ text: "Quản lý sản phẩm" }, { text: "Features" }, { text: "Tạo mới" }]} />
			<div className="featuresPage__create__buttons">
				<div className="featuresPage__create__buttons__left">
					<div
						className={activeTab === 1 ? "defaultButton" : "searchButton"}
						onClick={() => setActiveTab(1)}
						style={{ marginRight: "8px" }}
					>
						Thông tin chung
					</div>
				</div>
				<div className="featuresPage__create__buttons__right">
					<button className="defaultButton bg-black" type="button" onClick={onSave}>
						<SvgIconStorage style={{ transform: "scale(0.7)" }} />
						&nbsp;Lưu
					</button>
				</div>
			</div>
			<Form layout="vertical" className="featuresPage__create__form">
				{activeTab === 1 && (
					<InformationTab
						attributeValues={attributeValues}
						setAttributeValues={setAttributeValues}
						attributeType={attributeType}
						setAttributeType={setAttributeType}
						form={form}
						getValuesCallback={getValuesCallback}
					/>
				)}
			</Form>
		</div>
	);
};

export default FeaturesCreate;
