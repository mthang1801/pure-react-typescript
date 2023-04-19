export const columnsData = () => {
	return [
		{
			title: "Kênh bán hàng",
			dataIndex: "scheduler_id",
			key: "scheduler_id",
			render: (scheduler_id: string, record: any, index: number) => {
				return <div>{scheduler_id}</div>;
			}
		},
		{
			title: "Số lượng",
			dataIndex: "scheduler_interval",
			key: "scheduler_interval",

			render: (scheduler_interval: string, record: any, index: number) => {
				return <div>{scheduler_interval}</div>;
			}
		},

		{
			title: "Đồng bộ",
			dataIndex: "desc",
			key: "desc",
			render: (desc: string, record: any, index: number) => {
				return <div>{desc}</div>;
			}
		}
	];
};

export const defaultTextEditors = {
	short_description: "",
	description: "",
	other_info: "",
	promotion_info: "",
	promotion_note: "",
	hover_info: ""
};

export const catalogsList = [	
	{ value: 1, label: "Điện tử - điện lạnh" },
	{ value: 2, label: "Smart Phone & Tablet" },
	{ value: 3, label: "SmartTV" },
	{ value: 4, label: "Mẹ và bé" }
];


export const categoriesList = [
	{ value: 1, label: "Điện thoại & máy tính bảng" },
	{ value: 2, label: "Samsung galaxy" },
	{ value: 3, label: "Apple iPhone" },
	{ value: 4, label: "Laptop" }
]