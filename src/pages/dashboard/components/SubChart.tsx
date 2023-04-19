import Chart from "react-apexcharts";
import colors from "src/utils/colors";

const SubChart = () => {
	return (
		<Chart
			type="bar"
			width="100%"
			height={510}
			series={[
				{
					name: "Tổng doanh thu",
					data: [103, 240, 332, 432, 422, 534, 800, 700, 632, 932]
				}
			]}
			options={{
				colors: [colors.primary_color_1_1],
				xaxis: {
					tickPlacement: "on",
					categories: [
						"Iphone 13 xanh Alpine",
						"Galaxy S22 Ultra",
						"Macbook Air M1 ",
						"Oppo Reno7",
						"Air pods Pro 2021",
						"Latop Acer",
						"Samsung galaxy A23",
						"Xiaomi Redmi 10 ",
						"Samsung Galaxy Z Flip3 5G",
						"Iphone 13 128GB 5G"
					],
					labels: {
						show: true,
						align: "middle",
						minWidth: 0,
						maxWidth: 140,
						style: {
							colors: [],
							fontSize: "12px",
							fontFamily: "Helvetica, Arial, sans-serif",
							fontWeight: 600,
							cssClass: "apexcharts-yaxis-label"
						},

						offsetX: 0,
						offsetY: 0,
						rotate: 0
					} as any,
					crosshairs: {
						show: true,
						position: "back",
						stroke: {
							color: "#b6b6b6",
							width: 3,
							dashArray: 0
						}
					}
				},

				yaxis: {
					show: true,
					showAlways: true,
					showForNullSeries: true,
					seriesName: undefined,
					forceNiceScale: false,
					floating: false,
					decimalsInFloat: undefined,
					labels: {
						show: true,
						align: "left",
						minWidth: 0,
						maxWidth: 140,
						style: {
							colors: [],
							fontSize: "12px",
							fontFamily: "Helvetica, Arial, sans-serif",
							fontWeight: 400,
							cssClass: "apexcharts-yaxis-label"
						},

						offsetX: 6,
						offsetY: 0,
						rotate: 0
					},

					crosshairs: {
						show: true,
						position: "back",
						stroke: {
							color: "#b6b6b6",
							width: 1,
							dashArray: 0
						}
					},
					tooltip: {
						enabled: true,
						offsetX: 0
					}
				},
				grid: {
					show: true,
					borderColor: "#C4C4C4",
					strokeDashArray: 7,
					position: "back",
					xaxis: {
						lines: {
							show: true
						}
					},
					yaxis: {
						lines: {
							show: false
						}
					},
					row: {
						colors: undefined,
						opacity: 0.5
					},
					column: {
						colors: undefined,
						opacity: 0.5
					},
					padding: {
						top: 0,
						right: 10,
						bottom: 0,
						left: 0
					}
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
					toolbar: {
						tools: {
							download: false,
							selection: false,
							zoom: false,
							zoomin: false,
							zoomout: false,
							pan: false,
							reset: false,
							customIcons: []
						}
					}
				},
				plotOptions: {
					bar: {
						borderRadius: 4,
						horizontal: true,
						dataLabels: {
							position: "top"
						}
					}
				} as any,
				dataLabels: {
					enabled: true,
					enabledOnSeries: undefined,
					formatter: (val: any) => {
						return `+ ${val}`;
					},
					textAnchor: "start",
					distributed: false,
					offsetX: 13,
					offsetY: 0,
					style: {
						fontSize: "14px",
						fontFamily: "Helvetica, Arial, sans-serif",
						fontWeight: "bold",
						colors: ["rgb(223,81,84)"]
					}
				}
			}}
		/>
	);
};

export default SubChart;
