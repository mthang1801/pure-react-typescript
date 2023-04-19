/* eslint-disable */
import { Table } from "antd";
import { memo } from "react";
import styled from "styled-components";

interface TableStyledAntdInterfaces {
	widthCheckbox?: string;
	paddingItemHeader?: string;
	paddingItemBody?: string;
	heightHeader?: string;
	borderstyled?: string;
	margin?: string;
	widthCol1?: string;
	widthCol2?: string;
	widthCol3?: string;
	widthCol4?: string;
	widthCol5?: string;
	widthCol6?: string;
	widthCol7?: string;
	widthCol8?: string;
	widthCol9?: string;
	widthCol10?: string;
	widthCol11?: string;
	widthCol12?: string;
	widthCol13?: string;

	className?: string;
	minheight?: string;
}

const TableStyledAntd = ({ widthCheckbox, className, ...rest }: any) => {
	return <TableStyled {...rest} widthCheckbox={widthCheckbox} className={className} />;
};

TableStyledAntd.defaultProps = {
	widthCheckbox: "16px",
	paddingItemHeader: "4px 8pxpx",
	paddingItemBody: "4px 8px"
};
export default TableStyledAntd;

const TableStyled = styled(Table)<TableStyledAntdInterfaces>`
	border: ${(props) => props.borderstyled};
	border-radius: 5px;
	margin: ${(props) => props.margin};
	overflow: hidden;
	.ant-checkbox-inner {
		width: ${(props) => props.widthCheckbox}!important;
		height: ${(props) => props.widthCheckbox}!important;
	}
	.ant-spin-nested-loading {
		min-height: ${(props) => props.minheight}!important;
	}
	.ant-table-thead {
		height: ${(props) => props.heightHeader}!important;
		tr {
			${(props) =>
				props.widthCol1 &&
				`th:nth-child(1) {
            width:${props.widthCol1}!important;
			white-space:nowrap !important;
        }`}
			${(props) =>
				props.widthCol2 &&
				`th:nth-child(2) {
            width:${props.widthCol2}!important;
			white-space:nowrap !important;

        }`}
        ${(props) =>
				props.widthCol3 &&
				`th:nth-child(3) {
           width:${props.widthCol3}!important;
		   white-space:nowrap !important;

        }`}
        ${(props) =>
				props.widthCol4 &&
				`th:nth-child(4) {
            width:${props.widthCol4}!important;
			white-space:nowrap !important;

        }`}
        ${(props) =>
				props.widthCol5 &&
				`th:nth-child(5) {
            width:${props.widthCol5}!important;
			white-space:nowrap !important;

        }`}
        ${(props) =>
				props.widthCol6 &&
				`th:nth-child(6) {
            width:${props.widthCol6}!important;
			white-space:nowrap !important;

        }`}
        ${(props) =>
				props.widthCol7 &&
				`th:nth-child(7) {
            width:${props.widthCol7}!important;
			white-space:nowrap !important;

        }`}
        ${(props) =>
				props.widthCol8 &&
				`th:nth-child(8) {
            width:${props.widthCol8}!important;
            white-space:unset!important;

        }`}
        ${(props) =>
				props.widthCol9 &&
				`th:nth-child(9) {
            width:${props.widthCol9}!important;
			white-space:nowrap !important;

        }`}
        ${(props) =>
				props.widthCol10 &&
				`th:nth-child(10) {
            width:${props.widthCol10}!important;
			white-space:nowrap !important;

        }`}
        ${(props) =>
				props.widthCol11 &&
				`th:nth-child(11) {
              width:${props.widthCol11}!important;
			  white-space:nowrap !important;

          }`}
        ${(props) =>
				props.widthCol12 &&
				`th:nth-child(12) {
                width:${props.widthCol12}!important;
				white-space:nowrap !important;
                
            }`}
		}
		tr th.ant-table-cell {
			padding: ${(props) => props.paddingItemHeader}!important;
		}
	}

	.ant-table-tbody {
		tr {
			${(props) =>
				props.widthCol1 &&
				`td:nth-child(1) {
            width:${props.widthCol1}!important;
            white-space:unset!important;

        }`}
			${(props) =>
				props.widthCol2 &&
				`td:nth-child(2) {
            width:${props.widthCol2}!important;
            white-space:unset!important;

        }`}
        ${(props) =>
				props.widthCol3 &&
				`td:nth-child(3) {
           width:${props.widthCol3}!important;
           white-space:unset!important;

        }`}
        ${(props) =>
				props.widthCol4 &&
				`td:nth-child(4) {
            width:${props.widthCol4}!important;
            white-space:unset!important;

        }`}
        ${(props) =>
				props.widthCol5 &&
				`td:nth-child(5) {
            width:${props.widthCol5}!important;
            white-space:unset!important;

        }`}
        ${(props) =>
				props.widthCol6 &&
				`td:nth-child(6) {
            width:${props.widthCol6}!important;
            white-space:unset!important;

        }`}
        ${(props) =>
				props.widthCol7 &&
				`td:nth-child(7) {
            width:${props.widthCol7}!important;
            white-space:unset!important;

        }`}
        ${(props) =>
				props.widthCol8 &&
				`td:nth-child(8) {
            width:${props.widthCol8}!important;
            white-space:unset!important;

        }`}
        ${(props) =>
				props.widthCol9 &&
				`td:nth-child(9) {
            width:${props.widthCol9}!important;
            white-space:unset!important;

        }`}
        ${(props) =>
				props.widthCol10 &&
				`td:nth-child(10) {
            width:${props.widthCol10}!important;
            white-space:unset!important;

        }`}
        ${(props) =>
				props.widthCol11 &&
				`td:nth-child(11) {
              width:${props.widthCol11}!important;
            white-space:unset!important;

          }`}
        ${(props) =>
				props.widthCol12 &&
				`td:nth-child(12) {
                width:${props.widthCol12}!important;
            white-space:unset!important;

            }`}
            ${(props) =>
				props.widthCol13 &&
				`td:nth-child(13) {
                      width:${props.widthCol13}!important;
                  white-space:unset!important;
      
                  }`}
		}
	}
	.ant-table-tbody tr.ant-table-row {
		height: ${(props) => props.heightHeader}!important;
	}
	.ant-table-tbody > tr > td {
		padding: ${(props) => props.paddingItemBody}!important;
		word-break: break-word !important;
	}
	.ant-table-tbody > tr.ant-table-measure-row > td {
		padding: 0 !important;
		word-break: break-word !important;
	}
`;
