import { useRef } from "react";
import { API_URL_CDN } from "src/services/api/config";
import styled from "styled-components";

interface IImageOverlatParams {
	imgSrc: string;
	onClose: any;
	open: boolean;
}

const ImageOverlay = ({ imgSrc, onClose, open }: IImageOverlatParams): any => {
	const imgRef = useRef() as any;
	const onZoom = (e: any) => {
		e.stopPropagation();
		console.log(imgRef.current);
	};
	if (!open) return null;
	return (
		<Overlay onClick={onClose} open={open}>
			<img
				src={`${API_URL_CDN}/${imgSrc}`}
				onClick={onZoom}
				ref={imgRef}
				style={{ maxWidth: "100%", maxHeight: "100%" }}
			/>
		</Overlay>
	);
};

const Overlay = styled.div<any>`
	position: fixed; /* Sit on top of the page content */
	display: block; /* Hidden by default */
	width: 100%; /* Full width (cover the whole page) */
	height: 100%; /* Full height (cover the whole page) */
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
	z-index: 999999; /* Specify a stack order in case you're using a different order for other elements */
	cursor: pointer; /* Add a pointer on hover */
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: default;
`;

export default ImageOverlay;
