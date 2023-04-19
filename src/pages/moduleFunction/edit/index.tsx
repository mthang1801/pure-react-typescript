import { Col, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import { notifyError } from "src/components/notification";
import SubHeader from "src/components/subHeader/SubHeader";
import { getModuleFunctionById, updateModuleFunction } from "src/services/actions/moduleFunction.action";
import { AppState } from "src/types";
import routerNames from "src/utils/data/routerName";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import ImageOverlay from "../../../components/custom/ImageOverlay";
import FormFunction from "../components/FormFunctions";
import FormModuleFunction from "../components/FormModule";
import { TypeModalEnum } from "./data";

const ModuleFunctionsEdit = () => {
	const dispatch = useDispatch();
	const isMount = useIsMount();
	const [imageOverlay, setImageOverlay] = useState<string>("");
	const [openImageOverlay, setOpenImageOverlay] = useState<boolean>(false);
	const [funct, setFunct] = useState<any>(null);
	const [tabIndex, setTabIndex] = useState<number>(1);
	const [visibleModal, setVisibleModal] = useState<boolean>(false);
	const [typeModal, setTypeModal] = useState<TypeModalEnum>(TypeModalEnum.CREATE);
	const [form] = Form.useForm();
	const [editForm] = Form.useForm();

	const paramsUrl = useParams() as any;
	useEffect(() => {
		dispatch(getModuleFunctionById(paramsUrl.id));
	}, [paramsUrl.id]);

	const { stateModuleFunctionById, stateUpdateModuleFunction } = useSelector((e: AppState) => e.moduleFunctionsReducer);

	useEffect(() => {
		if (isMount) return;
		const { data, message, success, error } = stateUpdateModuleFunction;
		if (success) {
		}
		if (error || success === false) {
			notifyError(`${message}`);
		}
	}, [stateUpdateModuleFunction.isLoading]);
	useEffect(() => {
		if (isMount) return;
		const { success, data, message, error, isLoading } = stateModuleFunctionById;
		if (!isLoading) {
			if (success) {
				setFunct(data?.data);
				editForm.setFieldsValue({
					funct_name: data?.data?.funct_name,
					funct_code: data?.data?.funct_code,
					status: data?.data?.status,
					ui_route: data?.data?.ui_route
				});
			}
			if (success === false || error) {
				notifyError(`${message}`);
			}
		}
	}, [stateModuleFunctionById.isLoading]);

	return (
		<>
			<ImageOverlay open={openImageOverlay} imgSrc={imageOverlay} onClose={() => setOpenImageOverlay(false)} />

			<div className="mainPages moduleFunctions_edit">
				<SubHeader
					breadcrumb={[
						{ text: "Thiết lập hệ thống" },
						{ text: "Module Function", link: routerNames.MODULE_FUNCTIONS },
						{ text: funct?.funct_name }
					]}
				/>

				<FormFunction
					currentFunct={funct}
					setImageOverlay={setImageOverlay}
					setOpenImageOverlay={setOpenImageOverlay}
					visibleModal={visibleModal}
					setVisibleModal={setVisibleModal}
					typeModal={typeModal}
					setTypeModal={setTypeModal}
					form={form}
					editForm={editForm}
				/>
			</div>
		</>
	);
};

export default ModuleFunctionsEdit;
