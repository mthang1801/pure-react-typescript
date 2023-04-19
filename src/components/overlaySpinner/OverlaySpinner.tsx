/* eslint-disable */
import { Spin } from "antd";
interface OverlaySpinnerInterfaces {
	spin?: any;
	onClickCallback?: any;
	open: any;
	position?: any;
	text?: any;
}
const OverlaySpinner = ({ open, spin, onClickCallback, text, position }: OverlaySpinnerInterfaces) => {
	const onClick = () => {
		if (onClickCallback) {
			onClickCallback();
		}
	};
	if (open) {
		return (
			<div className="overlaySpinner" onClick={() => onClick()} style={{ position: position ? position : "fixed" }}>
				<div>{spin && <Spin size="large" />}</div>
				{text && (
					<div className="waveLoading">
						{text.length > 0 &&
							[...text].map((x: any, index: any) => (
								<span style={{ ["--c" as any]: index + 1 }} key={index}>
									{text[index]}
								</span>
							))}
					</div>
				)}
			</div>
		);
	} else {
		return null;
	}
};

export default OverlaySpinner;
