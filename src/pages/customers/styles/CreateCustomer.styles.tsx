import styled from "styled-components";

export const Container = styled.div.attrs((props) => ({
	...props
}))`
	margin: 0;
	.ant-form-item-required::before{
		display: none !important;
	}

`;

export const Wrapper = styled.div.attrs((props) => ({
	...props
}))`
	background-color: white;
	.ant-form-item {
		margin-bottom: 10px !important;
	}
	& .edit {
		&-row {
			display: flex;
			justify-content: space-between;
			flex-wrap: nowrap;
			flex: 1 1;
		}
		&-item {
			&:not(:first-child) {
				margin-left: 5px;
			}
			&__lg {
				flex: 20%;
			}
			&__md {
				flex: 15%;
			}
		}
	}
	& .row {
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
		flex: 1 1;
		margin-top: 0;
		& .item {
			width: 48%;
		}

		& .ant-form-item:not(:first-child) {
			margin-left: 16px;
		}

		input,
		.ant-select-selector {
			border-radius: 5px;
		}
	}
	& .ant-form-item-row {
		display: block;
		& label {
			height: unset;
		}
		& .ant-picker {
			width: 100%;
		}
	}
`;

export const Title = styled.h4`
	font-size: 18px;
	font-weight: 600;
	margin: 0;
`;

export const ButtonAddress = styled.div`
	background-color: #f0f2f5;
	border-radius: 2px;
	color: #2980b0;
	padding: 10px;
	fontsize: 14px;
	margin-top: 12px;
	margin-bottom: 12px;
	padding: 10px;
	cursor: pointer;
	display : flex;
	align-items : center;
`;

export const AddressType = styled.div`
	.ant-row {
		display: flex;
		align-items: center;
	}
	ant-col {
		margin-top: 10px;
	}
`;

