export const PHONE = 'phone';
export const TEXT = 'text';
export const PASSWORD = 'password';
export const EMAIL = 'email';
export const URL = 'url';
export const EMPTY = 'empty';
export const NEW_PASSWORD = 'new-password';
export const PHONEANDEMAIL = 'phoneAndEmail';
export const NUMBER = 'number';
export const OFF = 'off';

export const MESSAGE_VALIDATE = {
	text: {
		type: 'text',
		placeholder: '',
		message: 'Không được bỏ trống!'
	},
	phone: {
		type: 'number',
		placeholder: 'Nhập số điện thoại',
		message: 'Vui lòng nhập số điện thoại!',
		errorMess: 'Số điện thoại chưa đúng định dạng!'
	},
	email: {
		placeholder: 'Nhập email',
		message: 'Vui lòng nhập email!',
		errorMess: 'Email chưa đúng định dạng!'
	},
	phoneAndEmail: {
		// placeholder: "Nhập số điện thoại hoặc email",
		message: 'Vui lòng nhập số điện thoại hoặc email!'
		// errorMess: "Email chưa đúng định dạng!",
	},
	password: {
		placeholder: 'Nhập password',
		message: 'Vui lòng nhập password!',
		atleast: 'Mật khẩu tối thiểu tám ký tự',
		character:
			'Mật khẩu chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt'
	},
	url: {
		placeholder: 'Nhập url',
		message: 'Vui lòng nhập url!',
		errorMess: 'URL chưa đúng định dạng'
	},
	empty: {
		placeholder: '',
		message: 'Vui lòng nhập đầy đủ!'
	}
};

export const dataProduct_Type = [
	{ name: 'Thường', value: '1' },
	{ name: 'IMEI', value: '2' },
	{ name: 'Combo', value: '3' },
	{ name: 'Dịch vụ', value: '4' }
];

export const dataProductTypeDDV = [
	{ name: 'Hàng công ty', value: '1' },
	{ name: 'Hàng xách tay', value: '2' }
];

export const dataProductType = [
	{ name: 'Sản phẩm cha', value: '1' },
	{ name: 'Sản phẩm con', value: '2' },
	{ name: 'Sản phẩm combo', value: '3' },
	{ name: 'Sản phẩm độc lập', value: '4' }
];

export const dataProductFunction = [
	{ name: 'Sản phẩm cha', value: '1' },
	{ name: 'Sản phẩm con', value: '2' },
	{ name: 'Sản phẩm combo', value: '3' },
	{ name: 'Sản phẩm độc lập', value: '4' }
];

export const dataSourceOrder = [
	{ name: 'Zalo', value: '756128' },
	{ name: 'Youtube', value: '756129' },
	{ name: 'Facebook', value: '756130' },
	{ name: 'Hotline', value: '756131' },
	{ name: 'Order Online', value: '756132' },
	{ name: 'Website Review', value: '756133' },
	{ name: 'E-com', value: '756134' },
	{ name: 'Trực tiếp - Cửa hàng', value: '756135' },
	{ name: 'Nguồn khác', value: '756136' },
	{ name: 'Instagram', value: '756137' },
	{ name: 'Livestream', value: '756138' },
	{ name: 'Pre-Order', value: '756139' },
	{ name: 'Livechat', value: '756140' },
	{ name: 'Tiktok', value: '756141' },
	{ name: 'Lazada', value: '756142' },
	{ name: 'Shopee', value: '756143' }
];

export const dataOrderStatus = [
	{ name: 'Đơn được tạo nhưng chưa hoạt động', value: '0' },
	{ name: 'Đơn đã hoạt động, chờ xác nhận', value: '1' },
	{ name: 'Đã xác nhận', value: '2' },
	{ name: 'Đang chuẩn bị', value: '3' },
	{ name: 'Đang đóng gói', value: '4' },
	{ name: 'Đang vận chuyển', value: '5' },
	{ name: 'Không bắt máy', value: '6' },
	{ name: 'Thành công', value: '7' },
	{ name: 'Không thành công', value: '8' }
];

export const dataOrderType = [
	{ name: 'Mua tại quầy', value: '1' },
	{ name: 'Đặt trước', value: '2' },
	{ name: 'Tự vận chuyển', value: '3' }
];

export const dataPaymentOrder = [
	{ name: 'Tiền mặt', value: 'COD' },
	{ name: 'Chuyển khoản', value: 'TRANSFER' }
	// { name: 'Chuyển khoản ngân hàng', value: '2' },
	// { name: 'Momo', value: '3' },
	// { name: 'ZaloPay', value: '4' },
	// { name: 'Shopee Pay', value: '5' },
];

export const dataProductStatus = [
	{ name: 'Mới', value: '1' },
	{ name: 'Đang bán', value: '2' },
	{ name: 'Hết hàng', value: '3' },
	{ name: 'Ngừng bán', value: '4' },
	{ name: 'Đặt trước', value: '5' }
];

export const dataProductLevel = [
	{ name: 'Sản phẩm cha', value: '1' },
	{ name: 'Sản phẩm con', value: '2' },
	{ name: 'Sản phẩm combo', value: '3' },
	{ name: 'Sản phẩm độc lập', value: '4' }
];

export const dataStatus = [
	{ name: 'Hiển thị', value: 'A' },
	{ name: 'Ẩn', value: 'D' }
];

export const dataStatusActive = [
	{ name: 'Chưa áp dụng', value: '1' },
	{ name: 'Đang áp dụng', value: '2' },
	{ name: 'Hết hạn', value: '3' },
	{ name: 'Ngừng áp dụng', value: '4' }
];

export const dataStatusPaymentBill = [
	{ name: 'Chưa thanh toán', value: '1' },
	{ name: 'Thanh toán thành công', value: '2' },
	{ name: 'Thanh toán thất bại', value: '3' }
];

export const dataStatus_Type = [
	{ name: 'Demo', value: '1' },
	{ name: 'Like new', value: '2' },
	{ name: 'Đã sử dụng', value: '3' },
	{ name: 'Test', value: '4' }
];

export const dataTypeCustomer = [
	{ name: 'Khách lẻ', value: '1' },
	{ name: 'Khách buôn', value: '2' },
	{ name: 'Đại lý', value: '3' },
	{ name: 'Khách vip', value: '4' },
	{ name: 'Khách online', value: '5' }
];

export const dataTypeTabFlashSale = [
	{ name: 'Không hiển thị tab', value: '0' },
	{ name: 'Hiển thị tab', value: '1' }
];

export const dataGender = [
	{ name: 'Nam', value: '0' },
	{ name: 'Nữ', value: '1' }
];

export const dataPayReditType = [
	{ name: 'Tiền mặt', value: '1' },
	{ name: 'Chuyển khoản', value: '2' },
	{ name: 'Quẹt thẻ', value: '3' },
	{ name: 'Trả góp', value: '4' }
];

export const dataLogStatus = [
	{ name: 'Thành công', value: '1' },
	{ name: 'Thất bại', value: '2' },
	{ name: 'Đang đồng bộ', value: '3' }
];

export const dataInstallment = [
	{ name: 'SHINHAN FINANCE', value: '3' },
	{ name: 'HOME CREDIT', value: '2' },
	{ name: 'HD SAIGON', value: '1' }
];

export const dataMonthInstallment = [
	{ name: '3 tháng', value: 1 },
	{ name: '6 tháng', value: 2 },
	{ name: '12 tháng', value: 3 }
];

export const dataPercent1 = [
	{ name: '10%', value: 10 },
	{ name: '20%', value: 20 },
	{ name: '30%', value: 30 },
	{ name: '40%', value: 40 },
	{ name: '50%', value: 50 },
	{ name: '60%', value: 60 },
	{ name: '70%', value: 70 },
	{ name: '80%', value: 80 },
	{ name: '90%', value: 90 },
	{ name: '100%', value: 100 }
];

export const dataPercent1New = [
	{ label: '10%', value: 10 },
	{ label: '20%', value: 20 },
	{ label: '30%', value: 30 },
	{ label: '40%', value: 40 },
	{ label: '50%', value: 50 },
	{ label: '60%', value: 60 },
	{ label: '70%', value: 70 },
	{ label: '80%', value: 80 },
	{ label: '90%', value: 90 },
	{ label: '100%', value: 100 }
];
export const typeModule2 = {
	BOX_PRODUCT: 'BOX_PRODUCT',
	LIST_PRODUCTS: 'LIST_PRODUCTS',
	LIST_TABS: 'LIST_TABS',
	IMAGE_BACKGROUND: 'IMAGE_BACKGROUND',
	COLOR_BACKGROUND: 'COLOR_BACKGROUND'
};

export const typeModule4 = {
	BOX_MENU: 'BOX_MENU',
	LIST_COMPANY: 'LIST_COMPANY',
	LIST_PRICE: 'LIST_PRICE',
	LIST_PRODUCT: 'LIST_PRODUCT',
	BACKGROUND: 'BACKGROUND'
};

export const selectOptionsId = {
	name: 'name',
	value: 'id'
};

export const selectOptionsValue = {
	name: 'name',
	value: 'value'
};

export const selectOptionsValueAll = {
	name: 'name',
	value: undefined
};

export const selectCategoriesParent = {
	name: 'category',
	value: 'category_id'
};

export const OrderTypeEnum = Object.freeze({
	'Mua tại quầy': 1,
	'Đơn đặt trước': 2,
	'Trực tuyến': 3
});

export const reasonList = [
	{
		value: 1,
		label: 'Đã mua tại quầy'
	},
	{
		value: 2,
		label: 'Đơn trùng'
	},
	{
		value: 3,
		label: 'Đã mua nơi khác'
	},
	{
		value: 4,
		label: 'Không liên hệ được khách hàng'
	},
	{
		value: 5,
		label: 'Khách suy nghĩ thêm'
	},
	{
		value: 6,
		label: 'Hết hàng'
	},
	{
		value: 8,
		label: 'khách không đến'
	},
	{
		value: 9,
		label: 'Trả góp thất bại'
	},
	{
		value: 10,
		label: 'Thu cũ thất bại'
	},
	{
		value: 11,
		label: 'Khách không bắt máy'
	},
	{
		value: 12,
		label: 'Không đợi tại cửa hàng'
	},
	{
		value: 13,
		label: 'So sánh giá'
	},
	{
		value: 7,
		label: 'Lý do khác'
	}
];

export const emailRule = [
	{
		required: true,
		type: 'regexp',
		pattern:
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		message: 'email không hợp lệ'
	}
];

export const phoneRule = [
	{
		required: true,
		type: 'regexp',
		pattern:
			/((03|05|07|08|09)+([0-9]{8}))\b|((02)+([0-9]{9}))\b|(^(19)+([0-9]{6,8}))\b|(^(18)+([0-9]){6,8})\b/,
		message: 'Số điện thoại không đúng định dạng'
	}
];
