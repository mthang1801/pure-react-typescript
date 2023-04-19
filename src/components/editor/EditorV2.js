import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
// import helpers from 'src/helper/helpers';
import axios from "axios";
import { notifyError, notifyWarning } from "../notification";
import { API_END_POINT, API_URL } from "src/services/api/config";
import { API_UPLOADS, API_UPLOAD_IMAGES } from "src/services/api/url.index";
import { api } from "src/services/api/api.index";
import { Modal, Spin } from "antd";
import OverlaySpinner from "../overlaySpinner/OverlaySpinner";

export default function Editor2(props) {
	const { refEditor, initialValue, textareaName, onInit, toolbar, disabled, height } = props;
	const VALID_LIST_FILE_TYPE = ["pdf", "doc", "docx", "xls", "xlsx", ".zip"];

	const token_cdn = "FzQScmQ7LXswQdH6KtcgTTJUBguYK4";

	const dispatch = useDispatch();

	const editorRef = useRef(null);

	const [errorMess, setErrorMess] = useState(null);
	const [loading, setLoading] = useState(false);

	const [currentTypeFile, setCurrentTypeFile] = useState(null);

	const [content, setContent] = useState("");

	const isDone = (_) => {
		// return store.dispatch({
		//   type: "GET_RESPONSE",
		// });
	};

	const onHandleUpload = async (file) => {
		let valid = false;
		let end_file = file.name.split(".").pop().toLowerCase();
		const isLt = file.size / 1024 / 1024;
		let url = null;

		if (VALID_LIST_FILE_TYPE.includes(end_file) && isLt <= 10) {
			// setCurrentTypeFile("file");
			// valid = true;
			// url = await onHandleUploadFile(file);
			// return url;
			notifyError("Chỉ được upload file hình !");
		}
		if ((file.type === "image/jpeg" || file.type === "image/png") && isLt <= 2) {
			setCurrentTypeFile("image");
			valid = true;
			console.log(file);
			url = await onHandleUploadImg(file);
			return url;
		}

		// if (!valid) {
		//   setCurrentTypeFile("cloud-file");
		//   onShowPopupDrive(`File ${file.name} không phù hợp`);
		// }
	};

	// const onHandleUploadFile = async (file) => {
	//   const _apiUrl = CDN_URL + "upload_file.php";
	//   let formData = new FormData();
	//   axios.defaults.headers.common["Authorization"] = token_cdn;
	//   delete axios.defaults.headers.common["app_id"];

	//   formData.append("file", file);

	//   let res = await axios.post(_apiUrl, formData, {
	//     headers: {
	//       "Content-Type": "multipart/form-data",
	//     },
	//   });
	//   isDone();
	//   if (res.status === 200) {
	//     let url = res?.data?.replace("true|", "");
	//     return CDN_URL + url;
	//   }
	//   return null;
	// }

	const onHandleUploadImg = async (file) => {
		const res = await api.postMultipart(`${API_END_POINT}${API_UPLOADS}`, {
			files: file
		});
		if (res?.statusCode === 200 && res?.data.length !== 0) {
			return res?.data[0];
		}
		return null;
	};

	// const onGetFile = (data) => {

	//   let currentContent = content;
	//   let url = data[0]?.url;
	//   let name = data[0]?.name;
	//   currentContent += `<br/><a href="${url}" style="color: black" target='blank'>${name}</a>`;
	//   setContent(currentContent);
	// }

	// const handleEditorChange = (content) => {
	//   debugger
	//   setContent(content);
	// };

	return (
		<>
			{/* {loading && <div className='loading_modal_tiny_parent'>
        <div className='loading_modal_tiny_child'>
          <Spin />
        </div>
      </div>} */}
			<OverlaySpinner text open={loading} />

			<Editor
				ref={refEditor}
				// value={content}
				apiKey="jtpz02pz1alo4bc3q01ccoyc48zwo2kc6sg6ipmtq42fmljz"
				onInit={onInit}
				toolbar={toolbar}
				initialValue={initialValue}
				textareaName={textareaName}
				init={{
					width: "100%",
					height: height ? height : 300,
					menubar: "view insert table",
					selector: "textarea.advcodedemo",
					toolbar: "code",
					plugins: [
						"advlist autolink lists link image charmap print preview anchor",
						"searchreplace visualblocks code fullscreen",
						"insertdatetime media table paste advcode help wordcount"
					],
					// toolbar: 'bold italic backcolor | image file link | alignleft aligncenter alignright alignjustify | undo redo ',
					// toolbar: 'undo redo | formatselect | ' + ' image file link | ' +
					//   'bold italic backcolor image link media | alignleft aligncenter ' +
					//   'alignright alignjustify | bullist numlist outdent indent ',
					content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
					file_picker_types: "file image media",
					automatic_uploads: true,
					file_picker_callback: function (cb, value, meta) {
						var input = document.createElement("input");
						input.setAttribute("type", "file");
						input.setAttribute("accept", "*");

						input.onchange = async function () {
							let file = this.files[0];

							try {
								setLoading(true);
								let url = await onHandleUpload(file);
								if (url) {
									setLoading(false);
									cb(url);
								}
							} catch (error) {
								setLoading(false);
								notifyError("Không thể upload hình ảnh");
							}
						};
						input.click();
					},
					// setup: function (ed) {
					//   ed.on('keydown', function (e) {
					//     if (13 === e.keyCode && !e.shiftKey) {
					//       let a = ed.getContent();
					//       alert(a);
					//       e.preventDefault();
					//     }
					//   });
					// }
					content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
				}}
				disabled={disabled}
				// onEditorChange={handleEditorChange}
			/>
			{/* {errorMess ? <DriveBox errorMess={errorMess} callBack={onGetFile}/> : null} */}
		</>
	);
}
