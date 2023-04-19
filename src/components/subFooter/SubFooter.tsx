import { Select } from "antd";
import arrow from "../../assets/images/arrow.svg";

interface Breadcrumb {
  text: string;
}
interface PageInfo {
  total: any;
  pageSize: any;
}
interface SubFooterProps {
  getPageCallback: any;
  pageInfo: PageInfo;
  currentPage: number;
  getPagesizeCallback: any;
}

const pageSizeOptions = [
  { label: 10, value: 10 },
  { label: 20, value: 20 },
  { label: 40, value: 40 },
];
const SubFooter = ({
  getPageCallback,
  pageInfo,
  currentPage,
  getPagesizeCallback,
}: SubFooterProps) => {
  const getPage = (data: any) => {
    if (getPageCallback) {
      getPageCallback(data);
    }
  };
  const getPagesize = (data: any) => {
    if (getPagesizeCallback) {
      getPagesizeCallback(data);
    }
  };
  return (
    <div className="subFooter">
      <div className="pageSize">
        <span>Số lượng SP / Trang:</span>

        <Select
          value={pageInfo.pageSize}
          options={pageSizeOptions}
          onChange={(e) => getPagesize(e)}
          suffixIcon={<img src={arrow} alt="" />}
        />
      </div>
    </div>
  );
};

export default SubFooter;
