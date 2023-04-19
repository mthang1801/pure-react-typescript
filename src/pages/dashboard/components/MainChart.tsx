import Chart from "react-apexcharts";
import colors from "src/utils/colors";

const MainChart = () => {
	return (
		<Chart
			type="bar"
			width="100%"
			height={500}
			series={[
				{
					name: "Tổng đơn hàng theo tháng",
					data: [100, 200, 232, 132, 422, 134, 100, 200, 232, 132, 322, 256]
				},
				{
					name: "Tổng khách hàng theo tháng",
					data: [100, 200, 232, 132, 422, 134, 200, 232, 132, 422, 134, 100]
				}
			]}
			options={{
				dataLabels: {
					style: {
						colors: [colors.neutral_color_1_1, "#fff"]
					}
				},
				colors: [colors.primary_color_1_1, colors.neutral_color_1_1],
				xaxis: {
					tickPlacement: "on",
					categories: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"]
				},
				title: {
					text: "Tổng đơn hàng theo tháng - Tổng khách hàng theo tháng",
					style: {
						fontSize: "16px"
					}
				},
				grid: {
					borderColor: "#C4C4C4"
				},
				noData: {
					text: "No data!"
				},
				chart: {
					events: {
						mounted: (chart: any) => {
							chart.windowResizeHandler();
						}
					},

					foreColor: "#373d3f",
					toolbar: {
						tools: {
							download: true,
							selection: false,
							zoom: false,
							zoomin: false,
							zoomout: false,
							pan: false,
							reset: false,
							customIcons: []
						}
					}
				}
			}}
		/>
	);
};

export default MainChart;
