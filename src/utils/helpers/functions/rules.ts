export const emailRule = [
	{
		required: true,
		type: "regexp",
		pattern:
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		message: "email không hợp lệ"
	}
]


export const phoneRule = [
	{
		required: true,
		type: "regexp",
		pattern:
			/((03|05|07|08|09)+([0-9]{8}))\b|((02)+([0-9]{9}))\b|(^(19)+([0-9]{6,8}))\b|(^(18)+([0-9]){6,8})\b/,
		message: "Số điện thoại không đúng định dạng"
	}
]