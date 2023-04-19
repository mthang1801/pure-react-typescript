import routerNames from "src/utils/data/routerName";
import { CustomerTypeEnum, ProductLevelEnum, UserGenderEnum } from "./enum";

export const PHONE = "phone";
export const TEXT = "text";
export const PASSWORD = "password";
export const EMAIL = "email";
export const URL = "url";
export const EMPTY = "empty";
export const NEW_PASSWORD = "new-password";
export const PHONEANDEMAIL = "phoneAndEmail";
export const NUMBER = "number";
export const OFF = "off";

export const MESSAGE_VALIDATE = {
	text: {
		type: "text",
		placeholder: "",
		message: "Không được bỏ trống!"
	},
	phone: {
		type: "number",
		placeholder: "Nhập số điện thoại",
		message: "Vui lòng nhập số điện thoại!",
		errorMess: "Số điện thoại chưa đúng định dạng!"
	},
	email: {
		placeholder: "Nhập email",
		message: "Vui lòng nhập email!",
		errorMess: "Email chưa đúng định dạng!"
	},
	phoneAndEmail: {
		// placeholder: "Nhập số điện thoại hoặc email",
		message: "Vui lòng nhập số điện thoại hoặc email!"
		// errorMess: "Email chưa đúng định dạng!",
	},
	password: {
		placeholder: "Nhập password",
		message: "Vui lòng nhập password!",
		atleast: "Mật khẩu tối thiểu tám ký tự",
		character: "Mật khẩu chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt"
	},
	url: {
		placeholder: "Nhập url",
		message: "Vui lòng nhập url!",
		errorMess: "URL chưa đúng định dạng"
	},
	empty: {
		placeholder: "",
		message: "Vui lòng nhập đầy đủ!"
	}
};

export const dataProduct_Type = [
	{ name: "Thường", value: "1" },
	{ name: "IMEI", value: "2" },
	{ name: "Combo", value: "3" },
	{ name: "Dịch vụ", value: "4" }
];

export const dataProductTypeDDV = [
	{ name: "Hàng công ty", value: "1" },
	{ name: "Hàng xách tay", value: "2" }
];

export const dataProductType = [
	{ name: "Sản phẩm cha", value: "1" },
	{ name: "Sản phẩm con", value: "2" },
	{ name: "Sản phẩm combo", value: "3" },
	{ name: "Sản phẩm độc lập", value: "4" }
];

export const dataSourceOrder = [
	{ name: "Zalo", value: "1" },
	{ name: "Youtube", value: "2" },
	{ name: "Order Online", value: "3" },
	{ name: "Hotline", value: "4" },
	{ name: "Zalo", value: "5" },
	{ name: "Facebook", value: "6" },
	{ name: "Instagram", value: "7" },
	{ name: "Website DDV", value: "8" },
	{ name: "E-COM", value: "9" },
	{ name: "Trực tiếp - Cửa hàng", value: "10" }
];

export const dataOrderStatus = [
	{ name: "Đơn được tạo nhưng chưa hoạt động", value: "0" },
	{ name: "Đơn đã hoạt động, chờ xác nhận", value: "1" },
	{ name: "Đã xác nhận", value: "2" },
	{ name: "Đang chuẩn bị", value: "3" },
	{ name: "Đang đóng gói", value: "4" },
	{ name: "Đang vận chuyển", value: "5" },
	{ name: "Không bắt máy", value: "6" },
	{ name: "Thành công", value: "7" },
	{ name: "Không thành công", value: "8" }
];

export const dataOrderType = [
	{ name: "Mua tại quầy", value: "1" },
	{ name: "Đặt trước", value: "2" },
	{ name: "Tự vận chuyển", value: "3" },
	{ name: "Hãng vận chuyển", value: "4" }
];

export const dataPaymentOrder = [
	{ name: "Tiền mặt", value: "1" },
	{ name: "Chuyển khoản ngân hàng", value: "2" },
	{ name: "Momo", value: "3" },
	{ name: "ZaloPay", value: "4" },
	{ name: "Shopee Pay", value: "5" }
];

export const dataProductStatus = [
	{ name: "Mới", value: "1" },
	{ name: "Đang bán", value: "2" },
	{ name: "Hết hàng", value: "3" },
	{ name: "Ngừng bán", value: "4" }
];

export const dataStatus = [
	{ name: "Hiển thị", value: "A" },
	{ name: "Ẩn", value: "D" }
];

export const dataStatusActive = [
	{ name: "Chưa áp dụng", value: "1" },
	{ name: "Đang áp dụng", value: "2" },
	{ name: "Hết hạn", value: "3" },
	{ name: "Ngừng áp dụng", value: "4" }
];

export const dataStatusPaymentBill = [
	{ name: "Chưa thanh toán", value: "1" },
	{ name: "Thanh toán thành công", value: "2" },
	{ name: "Thanh toán thất bại", value: "3" }
];

export const dataStatus_Type = [
	{ name: "Demo", value: "1" },
	{ name: "Like new", value: "2" },
	{ name: "Đã sử dụng", value: "3" },
	{ name: "Test", value: "4" }
];

export const dataTypeCustomer = [
	{ name: "Khách lẻ", value: "1" },
	{ name: "Khách buôn", value: "2" },
	{ name: "Đại lý", value: "3" },
	{ name: "Khách vip", value: "4" },
	{ name: "Khách online", value: "5" }
];

export const dataTypeTabFlashSale = [
	{ name: "Không hiển thị tab", value: "0" },
	{ name: "Hiển thị tab", value: "1" }
];

export const dataGender = [
	{ name: "Nam", value: "0" },
	{ name: "Nữ", value: "1" }
];

export const selectOptionsId = {
	name: "name",
	value: "id"
};

export const selectOptionsValue = {
	name: "name",
	value: "value"
};

export const transports = [
	{
		label: "Nhất Tín Express",
		value: 1
	},
	{
		label: "Shopee Express",
		value: 2
	},
	{
		label: "Giao hàng nhanh",
		value: 3
	},
	{
		label: "Giao hàng tiết kiệm",
		value: 4
	},
	{
		label: "Nija Văn",
		value: 5
	}
];

export const paymentMethods = [
	{
		label: "Tiền mặt",
		value: 1
	},
	{
		label: "COD",
		value: 2
	},
	{
		label: "Quẹt thẻ",
		value: 3
	},
	{
		label: "Chuyển khoản",
		value: 4
	}
];

export const gendersList = Object.entries(UserGenderEnum).map(([key, val]) => ({ label: key, value: val }));

export const customerTypesList = Object.entries(CustomerTypeEnum).map(([key, val]) => ({ label: key, value: val }));

export const routerNotAuth = [routerNames.ACTIVE_OTP];

export const acceptImageTypes = [
	"image/svg+xml",
	"image/png",
	"image/svg",
	"image/jpeg",
	"image/jpg",
	"image/gif",
	"image/ico"
];

export const inProgressStatus = [
	{
		value: 1,
		label: "Mới"
	},
	{
		value: 2,
		label: "Thanh toán thất bại"
	},
	{
		value: 16,
		label: "Đã huỷ"
	}
];

export const confirmedStatus = [
	{
		value: 3,
		label: "Đã xác nhận"
	},
	{
		value: 4,
		label: "Thanh toán thành công"
	}
];

export const packagedStatus = [
	{
		value: 5,
		label: "Chờ đóng gói"
	},
	{
		value: 6,
		label: "Đã đóng gói"
	}
];

export const shippingStatus = [
	{
		value: 7,
		label: "Chờ lấy hàng"
	},
	{
		value: 8,
		label: "Đang vận chuyển"
	},
	{
		value: 9,
		label: "Đang giao hàng"
	},
	{
		value: 10,
		label: "Giao thành công"
	},
	{
		value: 11,
		label: "Lỗi giao hàng"
	},
	{
		value: 12,
		label: "Chờ giao lại"
	}
];

export const failShipStatus = [
	{
		value: 13,
		label: "Đang chuyển hoàn"
	},
	{
		value: 14,
		label: "Đã chuyển hoàn"
	}
];

export const completedStatus = [
	{
		value: 15,
		label: "Giao thành công"
	}
];

export const totalStatus = [
	{
		value: 1,
		label: "Mới"
	},
	{
		value: 2,
		label: "Thanh toán thất bại"
	},
	{
		value: 3,
		label: "Đã xác nhận"
	},
	{
		value: 4,
		label: "Thanh toán thành công"
	},
	{
		value: 5,
		label: "Chờ đóng gói"
	},
	{
		value: 6,
		label: "Đã đóng gói"
	},
	{
		value: 7,
		label: "Chờ lấy hàng"
	},
	{
		value: 8,
		label: "Đang vận chuyển"
	},
	{
		value: 9,
		label: "Đang giao hàng"
	},
	{
		value: 10,
		label: "Giao thành công"
	},
	{
		value: 11,
		label: "Lỗi giao hàng"
	},
	{
		value: 12,
		label: "Chờ giao lại"
	},
	{
		value: 13,
		label: "Đang chuyển hoàn"
	},
	{
		value: 14,
		label: "Đã chuyển hoàn"
	},
	{
		value: 15,
		label: "Hoàn thành"
	},
	{
		value: 16,
		label: "Đã Huỷ"
	},
	{
		value: 17,
		label: "Yêu cầu huỷ"
	}
];

export const messageRequired = "Vui lòng không bỏ trống!";

export const PRODUCT_LEVEL = Object.freeze([
	{
		product_level: ProductLevelEnum["Sản phẩm cha"],
		label: "Sản phẩm cha",
		icon: "productParent",
		color: ""
	},
	{
		product_level: ProductLevelEnum["Sản phẩm con"],
		label: "Sản phẩm con",
		icon: "productChild",
		color: ""
	},
	{
		product_level: ProductLevelEnum["Sản phẩm độc lập"],
		label: "Sản phẩm độc lập",
		icon: "productSingle",
		color: ""
	}
]);

export const customerTypes = [
	{
		label: "Khách thường",
		value: "1"
	},
	{
		label: "Nhà bán sỉ",
		value: "2"
	},
	{
		label: "Nhà bán lẻ",
		value: "3"
	},
	{
		label: "Nhà cung cấp",
		value: "4"
	}
];

export const platformsList = [
	{
		label: "POS",
		value: 8
	},
	{
		label: "Zalo",
		value: 18268186
	},
	{
		label: "Facebook",
		value: 18268187
	},
	{
		label: "Google",
		value: 18268188
	},
	{
		label: "Instagram",
		value: 18268189
	},
	{
		label: "Youtube",
		value: 18268190
	}
];

// const paymentStatus= [
// 	{
// 		value:"1",
// 		label:""
// 	}
// ]

export const productLevelData = [
	{
		label: "Sản phẩm cha",
		value: 1
	},
	{
		label: "Sản phẩm con",
		value: 2
	},
	{
		label: "Sản phẩm độc lập",
		value: 3
	}
];

export const routesNameData = [
	{
		label: routerNames.PLATFORM,
		value: routerNames.PLATFORM
	},
	{
		label: routerNames.PLATFORM_EDIT,
		value: routerNames.PLATFORM_EDIT
	},
	{
		label: routerNames.SCHEDULER,
		value: routerNames.SCHEDULER
	},
	{
		label: routerNames.CRON,
		value: routerNames.CRON
	},
	{
		label: routerNames.MODULE_FUNCTIONS,
		value: routerNames.MODULE_FUNCTIONS
	},
	{
		label: routerNames.MODULE_FUNCTIONS_EDIT,
		value: routerNames.MODULE_FUNCTIONS_EDIT
	},
	{
		label: routerNames.ORDERS_CREATE,
		value: routerNames.ORDERS_CREATE
	},
	{
		label: routerNames.ORDERS_EDIT,
		value: routerNames.ORDERS_EDIT
	},
	{
		label: routerNames.ORDERS,
		value: routerNames.ORDERS
	},
	{
		label: routerNames.PRODUCT,
		value: routerNames.PRODUCT
	},
	{
		label: routerNames.PRODUCT_CREATE,
		value: routerNames.PRODUCT_CREATE
	},
	{
		label: routerNames.PRODUCT_EDIT,
		value: routerNames.PRODUCT_EDIT
	},
	{
		label: routerNames.INSTALL_STORE,
		value: routerNames.INSTALL_STORE
	},
	{
		label: routerNames.INSTALL_STORE_CREATE,
		value: routerNames.INSTALL_STORE_CREATE
	},
	{
		label: routerNames.INSTALL_STORE_EDIT,
		value: routerNames.INSTALL_STORE_EDIT
	},
	{
		label: routerNames.STORE,
		value: routerNames.STORE
	},
	{
		label: routerNames.STORE_EDIT,
		value: routerNames.STORE_EDIT
	},
	{
		label: routerNames.SUPPLIER,
		value: routerNames.SUPPLIER
	},
	{
		label: routerNames.FEATURES,
		value: routerNames.FEATURES
	},
	{
		label: routerNames.FEATURES_CREATE,
		value: routerNames.FEATURES_CREATE
	},
	{
		label: routerNames.FEATURES_EDIT,
		value: routerNames.FEATURES_EDIT
	},
	{
		label: routerNames.CATALOGS,
		value: routerNames.CATALOGS
	},
	{
		label: routerNames.CATEGORIES,
		value: routerNames.CATEGORIES
	},
	{
		label: routerNames.CATEGORIES_CREATE,
		value: routerNames.CATEGORIES_CREATE
	},
	{
		label: routerNames.CATEGORIES_EDIT,
		value: routerNames.CATEGORIES_EDIT
	},
	{
		label: routerNames.CUSTOMERS,
		value: routerNames.CUSTOMERS
	},
	{
		label: routerNames.CUSTOMERS_EDIT,
		value: routerNames.CUSTOMERS_EDIT
	},
	{
		label: routerNames.CUSTOMERS_CREATE,
		value: routerNames.CUSTOMERS_CREATE
	},
	{
		label: routerNames.POS,
		value: routerNames.POS
	}
];
