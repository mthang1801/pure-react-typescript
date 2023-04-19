import { Spin } from 'antd';
import './styles.less';
interface OverlaySpinnerInterface {
	spin?: any;
	onClickCallback?: any;
	open: any;
	text?: any;
}
const OverlaySpinner = ({
	open,
	spin,
	onClickCallback,
	text
}: OverlaySpinnerInterface) => {
	const onClick = () => {
		if (onClickCallback) {
			onClickCallback();
		}
	};
	if (open) {
		return (
			<div className="overlaySpinner" onClick={() => onClick()}>
				<div>{spin && <Spin size="large" />}</div>
				{text && (
					<div className="waveLoading">
						<span style={{ ['--c' as any]: 1 }}>Đ</span>
						<span style={{ ['--c' as any]: 2 }}>a</span>
						<span style={{ ['--c' as any]: 3 }}>n</span>
						<span style={{ ['--c' as any]: 4 }}>g</span>
						<span style={{ ['--c' as any]: 5 }}>&nbsp;</span>
						<span style={{ ['--c' as any]: 6 }}>x</span>
						<span style={{ ['--c' as any]: 7 }}>ử</span>
						<span style={{ ['--c' as any]: 8 }}>&nbsp;</span>
						<span style={{ ['--c' as any]: 9 }}>l</span>
						<span style={{ ['--c' as any]: 10 }}>ý</span>
						<span style={{ ['--c' as any]: 11 }}>.</span>
						<span style={{ ['--c' as any]: 12 }}>.</span>
						<span style={{ ['--c' as any]: 13 }}>.</span>
					</div>
				)}
			</div>
		);
	} else {
		return null;
	}
};

export default OverlaySpinner;
