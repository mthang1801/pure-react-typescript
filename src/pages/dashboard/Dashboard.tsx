import { Select } from "antd";
import SubHeader from "src/components/subHeader/SubHeader";
import colors from "src/utils/colors";
import InformationItem from "./components/InformationItem";
import MainChart from "./components/MainChart";
import SubChart from "./components/SubChart";
import { dataTop, mainFilter, subFilter } from "./data";
const styleInformationItem = {
	background: "#fff",
	padding: "16px",
	width: "calc(( 100% - 16px ) / 3 )",
	subbackground: colors.primary_color_1_1,
	subheight: "60px",
	subwidth: "60px",
	svgscale: 1,
	svgcolor: colors.neutral_color_1_1
};

function Dashboard() {
	return (
		<div className="mainPages dashboard">
			{/* <SubHeader breadcrumb={[{ text: "Dashboard" }]} />
      <div className="mainContent">
        <div className="mainContent__left">
          <div className="mainContent__left__topContent">
            {dataTop &&
              dataTop.map((item, index) => (
                <InformationItem
                  {...styleInformationItem}
                  value={item.value}
                  svg={item.svg}
                  label={item.label}
                  key={index}
                />
              ))}
          </div>
          <div className="mainContent__left__chart">
            <MainChart />
            <div className="mainContent__left__chart-filter">
              <Select options={mainFilter} defaultValue={2} />
            </div>
          </div>
        </div>
        <div className="mainContent__right">
          <div className="mainContent__right__content">
            <h4>Top 10 sản phẩm bán chạy </h4>
            <div className="mainContent__right__content__filter">
              <Select
                options={[
                  { label: "Doanh thu", value: 1 },
                  { label: "Số lượng", value: 2 },
                ]}
                defaultValue={1}
              />
              <Select options={subFilter} defaultValue={1} />
            </div>
            <div className="mainContent__right__content__chart">
              <SubChart />
              <div className="mainContent__right__content__chart-unit">
                ( triệu đồng )
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="subContent">
        <div className="subContent__left">
          <h4>Thông tin tồn kho</h4>
        </div>
        <div className="subContent__right">
          <h4>Đơn hàng mới cập nhật</h4>
        </div>
      </div> */}
		</div>
	);
}

export default Dashboard;
