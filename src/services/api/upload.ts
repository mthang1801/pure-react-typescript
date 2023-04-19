import axios from "axios";
import { acceptImageTypes } from "src/constants";
import { geneUniqueKey } from "src/utils/helpers/functions/textUtils";
import { API_END_POINT } from "./config";

export const uploadSingleImageToCDN = (file: any, object_id: string = geneUniqueKey(), object: string = "default") => {
	return new Promise(async (resolve: any, reject: any) => {
		console.log("type", file.type);
		if (acceptImageTypes.includes(file.type)) {
			const bodyFormData = new FormData();
			bodyFormData.append("files", file);
			bodyFormData.append("object_id", object_id);
			bodyFormData.append("object", object);
			try {
				const { data } = await axios.post(`${API_END_POINT}uploads`, bodyFormData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				});
				resolve(data);
			} catch (error: any) {
				reject(error.response.data.message);
			}
		}
		reject("Vui lòng chọn đúng file ảnh jpg / jpeg / png / svg / gif / ico");
	});
};
