export enum AttributeFilterTypeEnum {
	"TextOrNumber" = "1",
	"Radio" = "2",
	"Checkbox" = "3"
}
export enum AttributeFilterTypeVietnameseEnum {
	"Dạng text hoặc number" = "1",
	"Chọn một option" = "2",
	"Chọn nhiều options" = "3"
}

export enum AttributeTypeEnum {
	"Checkbox" = "1",
	"DataSelector" = "2",
	"NumberSlide" = "3",
	"Color" = "4"
}

export enum AttributeTypeVietnameseEnum {
	"Chọn và nhập dữ liệu" = "1",
	"Color" = "2"
}

export enum AttributePurposeEnum {
	"ProductSearchViaFilters" = "1",
	"VariationsAsSeperateProducts" = "2",
	"VariationAsOneProduct" = "3",
	"Brand,Author,Etc" = "4"
}

export enum AttributePurposeVietnameseEnum {
	"Tìm kiếm sản phẩm thông qua bộ lọc" = "1",
	"Các biến thể của các sản phẩm riêng biệt" = "2",
	"Tuỳ biến của một sản phẩm" = "3",
	"Thương hiệu, tác giả,..." = "4"
}

export enum APIMethodsEnum {
	"GET" = "GET",
	"POST" = "POST",
	"PUT" = "PUT",
	"DELETE" = "DELETE"
}

export enum CustomerRanking {
	"Thường" = "1",
	"Bạc" = "3",
	"Vàng" = "3",
	"Kim Cương" = "4"
}

export enum CustomerTypeEnum {
	"Khách thường" = "1",
	"Nhà bán sỉ" = "2",
	"Nhà bán lẻ" = "3",
	"Nhà cung cấp" = "4"
}

export enum UserGenderEnum {
	"Nam" = "Male",
	"Nữ" = "Female",
	"Khác" = "Others"
}

export enum CustomerAddressTypesEnum {
	"Nhà riêng" = "1",
	"Cơ quan" = "2"
}

export enum ModuleFunctionActionTypesEnum {
	"VIEWS" = "__VIEWS",
	"CREATE" = "__CREATE",
	"UPDATE" = "__UPDATE",
	"UPDATE_STATUS" = "__UPDATE_STATUS",
	"IMPORT" = "__IMPORT",
	"EXPORT" = "__EXPORT",
	"VIEW_DETAIL" = "__VIEW_DETAIL",
	"CANCEL" = "__CANCEL",
	"REPORT_STATUS" = "__REPORT_STATUS",
	"VIEW_LOGS" = "__VIEW_LOGS",
	"UPDATE_INDEX" = "__UPDATE_INDEX",
	"UPDATE_ATTRIBUTE_INDEX" = "__UPDATE_ATTRIBUTE_INDEX",
	"UPDATE_ATTRIBUTE_CATEGORY" = "__UPDATE_ATTRIBUTE_CATEGORY",
	"UPDATE_CATALOG_CATEGORY" = "__UPDATE_CATALOG_CATEGORY",
	"UPDATE_PRODUCT_CATEGORY" = "__UPDATE_PRODUCT_CATEGORY"
}

export enum ProductTypeEnum {
	"Thông Thường" = "1",
	"IMEI" = "2",
	"Combo" = "3",
	"Dịch vụ" = "4"
}

export enum ProductLevelEnum {
	"Sản phẩm độc lập" = "3",
	"Sản phẩm cha" = "1",
	"Sản phẩm con" = "2"
}

export enum ProductStatusEnum {
	"Mới" = "1",
	"Đang bán" = "2",
	"Hết hàng" = "3",
	"Ngừng bán" = "4",
	"Đặt trước" = "5"
}
