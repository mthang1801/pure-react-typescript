import { Breadcrumb, Row } from "antd";
import { Link } from "react-router-dom";
import { geneUniqueKey } from "src/utils/helpers/functions/textUtils";
interface Breadcrumb {
	text: string;
	link?: string;
}
interface Button {
	text?: string;
	class?: string;
	form?: any;
	htmlType?: any;
	link?: string;
	onClick?: any;
	svg?: any;
}
interface SubHeaderProps {
	breadcrumb: Breadcrumb[];
	button?: Button[];
}
const SubHeader = ({ breadcrumb, button }: SubHeaderProps) => {
	const onClickButton = (data: number) => {
		if (button && button[data] && button[data].onClick) {
			button[data].onClick();
		}
	};
	return (
		<Row justify="space-between" style={{ padding: " 0 0 8px 0 ", width: "100%" }} className="subHeader">
			<Breadcrumb>
				{breadcrumb.length > 0 &&
					breadcrumb.map((bread, index) => (
						<Breadcrumb.Item key={index} className={(index === breadcrumb.length - 1 ? "mainLink" : "") as string}>
							{bread.link ? (
								<Link to={bread.link} className="subLink">
									{bread.text}
								</Link>
							) : (
								bread.text
							)}
						</Breadcrumb.Item>
					))}
			</Breadcrumb>
			<div className="btnGroup">
				{button &&
					button.map((btn, index) =>
						btn?.link ? (
							<Link to={btn.link as any} key={geneUniqueKey()}>
								<button className={btn.class}>
									{btn.svg && btn.svg}
									<span>{btn.text}</span>
								</button>
							</Link>
						) : (
							<button
								style={{ cursor: "pointer" }}
								className={btn.class}
								onClick={() => onClickButton(index)}
								form={btn.form}
								key={geneUniqueKey()}
							>
								{btn.svg && btn.svg}
								<span>{btn.text}</span>
							</button>
						)
					)}
			</div>
		</Row>
	);
};

export default SubHeader;
