import { PlusOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Select } from "antd";
import React, { useState } from "react";
import SvgIconFilter from "src/assets/svg/SvgIconFilter";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import NavSearch from "src/components/navSearch/NavSearch";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import { CustomerRanking, CustomerTypeEnum } from "../../../constants/enum";

const { RangePicker } = DatePicker;

const CustomerSearch = ({ searchForm, submitSearch, submitRefresh, onAddNew, ref }: any) => {
	const statusesList = [
		{ label: "Tất cả", value: null },
		{ label: "Hoạt động", value: 1 },
		{ label: "Ngừng hoạt động", value: 2 }
	];

	const [openNav, setOpenNav] = useState(false);
	const rankingsList: any[] = Object.entries(CustomerRanking).map(([key, value]) => ({
		label: key,
		value: value
	}));
	rankingsList.unshift({ label: "Tất cả", value: null });

	const customerTypesList: any[] = Object.entries(CustomerTypeEnum).map(([key, val]) => ({ label: key, value: val }));
	customerTypesList.unshift({ label: "Tất cả", value: null });

	return (
		<div className="customers__search" style={{ padding: "8px 16px 16px 16px" }}>
			<OverlaySpinner open={openNav} onClickCallback={() => setOpenNav(false)} />
			<Form
				id="formSearch"
				form={searchForm}
				layout="vertical"
				className="customers__search__form"
				onFinish={submitSearch}
				ref={ref}
			>
				<NavSearch open={openNav}>
					<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
						<h4>Tìm kiếm nâng cao</h4>
						<h4 style={{ cursor: "pointer", transform: "scale(1.5)" }} onClick={() => setOpenNav(false)}>
							X
						</h4>
					</div>
					<div>
						<Form.Item name="picker" label="Lọc theo ngày tạo" style={{ margin: "4px 0 0 0", width: "100%" }}>
							<RangePicker className="defaultDate" format={"YYYY-MM-DD"} />
						</Form.Item>
						<Form.Item name="ranking" label="Thứ hạng" style={{ margin: "10px 0 0 0", width: "100%" }}>
							<Select
								className="defaultSelect"
								placeholder="Thứ hạng"
								options={rankingsList}
								defaultValue={null}
							></Select>
						</Form.Item>
						<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
							<button className="searchButton" style={{ width: "calc(50% - 4px)" }}>
								<SvgIconSearch style={{ transform: "scale(0.8)" }} />
								&nbsp; Tìm kiếm
							</button>
							<div
								className="searchButton"
								style={{ width: "calc(50% - 4px)" }}
								onClick={() => {
									searchForm.resetFields();
								}}
							>
								<SvgIconRefresh style={{ transform: "scale(0.8)" }} />
								&nbsp;Đặt lại
							</div>
						</div>
					</div>
				</NavSearch>
				<div style={{ width: "calc(40% - 177px)" }}>
					<Form.Item name="q" label="Tìm kiếm" style={{ margin: "0" }}>
						<Input className="defaultInput" placeholder="Tên, mã khách hàng, số điện thoại hoặc email" />
					</Form.Item>
				</div>
				<div style={{ width: "calc(30% - 176px)" }}>
					<Form.Item name="status" label="Trạng thái" style={{ margin: "0" }}>
						<Select
							className="defaultSelect"
							options={[
								{
									label: "Hoạt động",
									value: true
								},
								{
									label: "Ngừng hoạt động",
									value: false
								}
							]}
							style={{ borderRadius: "5px" }}
							placeholder="Trạng thái"
						></Select>
					</Form.Item>
				</div>

				<div style={{ width: "calc(30% - 177px)" }}>
					<Form.Item name="customer_type" label="Loại khách hàng" style={{ margin: "0" }}>
						<Select
							className="defaultSelect"
							placeholder="Thứ hạng"
							options={customerTypesList}
							defaultValue={null}
						></Select>
					</Form.Item>
				</div>

				<button
					className="searchButton "
					style={{ marginTop: "19px" }}
					onClick={submitSearch}
					type="submit"
					form="formSearch"
				>
					<SvgIconSearch style={{ transform: "scale(0.8)" }} />
					&nbsp; Tìm kiếm
				</button>

				<button className="searchButton" style={{ marginTop: "19px" }} onClick={submitRefresh}>
					<SvgIconRefresh style={{ transform: "scale(0.8)" }} />
					&nbsp;Đặt lại
				</button>
				<button className="searchButton" style={{ marginTop: "19px" }} onClick={() => setOpenNav(true)}>
					<SvgIconFilter style={{ transform: "scale(0.8)" }} />
					&nbsp;Lọc nâng cao
				</button>
				<button className="defaultButton  " style={{ marginTop: "19px" }} onClick={onAddNew}>
					<SvgIconPlus style={{ transform: "scale(0.8)" }} />
					&nbsp;Thêm mới
				</button>
			</Form>
		</div>
	);
};

export default CustomerSearch;
