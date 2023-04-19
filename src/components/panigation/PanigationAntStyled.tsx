/* eslint-disable */
import styled from "styled-components";
import { Pagination, PaginationProps } from "antd";

interface PaginationStyledInterfaces extends PaginationProps {}
const PanigationAntStyled = ({ ...rest }: PaginationStyledInterfaces) => {
  return <PaginationStyled {...rest} />;
};

export default PanigationAntStyled;

const PaginationStyled = styled(Pagination)`
  position: relative;
  width: 100%;	
  text-align: right;
  // .ant-pagination-total-text {
  //   position: absolute;
  //   left: 0;
  // }
  .ant-pagination-item-link {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
`;
