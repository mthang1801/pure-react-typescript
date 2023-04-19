/* eslint-disable */
import pickBy from 'lodash/pickBy';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';
import identity from 'lodash/identity';
import ShortUniqueId from 'short-unique-id';

export const numberWithCommas = (x: string) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
export const numberWithDot = (x: string) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
export const numberWithDotChange = (x: string) => {
	x = x.split('.').join('');
	return x;
	// return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export const numberWithCommasChange = (x: string) => {
	x = x.split(',').join('');
	return x;
	// return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export const numberWithCommasV1 = (value: string) => {
	if (value.length > 0 && value[0] === '0') {
		return value
			.slice(1, value.length)
			.replace(/\D/g, '')
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	} else {
		return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
};
export const numberOnly = (value: string) => {
	return value.toString().replace(/[a-z]*/g, '');
};

export const change_alias = (alias: string) => {
	var str = alias;
	str = str.toLowerCase();
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
	str = str.replace(/đ/g, 'd');
	str = str.replace(
		/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, //eslint-disable-line
		' '
	);
	str = str.replace(/ + /g, ' ');
	str = str.trim();
	return str;
};

// export const calculateProfit = (month, amount, profit) => {
//   let result = 0

//   result = Math.round(((((30 * month) / 365) * profit) / 100) * amount)

//   return result
// }

export const calculateProfit = (
	day: number,
	amount: number,
	profit: number
) => {
	let result = 0;

	result = Math.round((((day / 365) * profit) / 100) * amount);

	return result;
};

export const validatephone = (phone: string) => {
	const expression =
		/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;

	return expression.test(phone);
};
export const validatestrongpass = (pass: string) => {
	const expression = new RegExp('^(((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})');

	return expression.test(pass);
};
export const validatepass = (pass: string) => {
	const expression1 = /[A-Za-z\d@$!%*?&]{8,}$/;

	return expression1.test(pass);
};
export const validateEmail = (email: string) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

export function removeSign(str: string) {
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a'); //eslint-disable-line
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e'); //eslint-disable-line
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i'); //eslint-disable-line
	str = str.replace(/ò|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o'); //eslint-disable-line
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u'); //eslint-disable-line
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y'); //eslint-disable-line
	str = str.replace(/đ/g, 'd'); //eslint-disable-line
	str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A'); //eslint-disable-line
	str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E'); //eslint-disable-line
	str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I'); //eslint-disable-line
	str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O'); //eslint-disable-line
	str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U'); //eslint-disable-line
	str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y'); //eslint-disable-line
	str = str.replace(/Đ/g, 'D'); //eslint-disable-line
	return str;
}

export function validateMobile(phone: string) {
	let flag = false;
	phone = phone.replace('(+84)', '0'); //eslint-disable-line
	phone = phone.replace('+84', '0'); //eslint-disable-line
	phone = phone.replace('0084', '0'); //eslint-disable-line
	phone = phone.replace(/ /g, ''); //eslint-disable-line
	if (phone !== '') {
		let vnf_regex =
			/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/g; //eslint-disable-line
		if (vnf_regex.test(phone) === true && phone.length === 10) {
			flag = true;
		}
	}
	return flag;
}

export function isValid(string: string) {
	const re = /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$/g; //eslint-disable-line
	return re.test(removeSign(string));
}

export function regx(value: string) {
	// regx to validate currency number
	return `${value}`
		.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		.replace(/[a-zA-Z\^!@#$%^&*()_?-{};:'"/.<>+=-|ƠƯ]/, ''); //eslint-disable-line
}

export const removeFalsy = (input = {}) => {
	return pickBy(input, identity); //eslint-disable-line
};

export const findAndRemove = (arr = [], index = -1) => {
	if (index === -1) return arr;
	arr.splice(index, 1);
	return arr;
};

export function validatePassword(password: string) {
	return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
		password
	);
}

export const formatNumber = (number: number) => {
	return new Intl.NumberFormat('vi-VN').format(number);
};

export const removeUnicode = (str: string) => {
	return str
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/đ/g, 'd')
		.replace(/Đ/g, 'D')
		.replace(/[^a-zA-Z0-9 ]/g, '');
};

export const getAddressString = (
	a: string,
	w: string,
	d: string,
	p: string
) => {
	let ret = '';
	ret += `${a ? a + ', ' : ''}`; //eslint-disable-line
	ret += `${w ? w + ', ' : ''}`; //eslint-disable-line
	ret += `${d ? d + ', ' : ''}`; //eslint-disable-line
	ret += `${p ? p + ', ' : ''}`; //eslint-disable-line
	return ret.replace(/,$/, '').replace(/, $/, '');
};

export function validateURL(url: string) {
	const expression =
		/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
	const regex = new RegExp(expression);
	return Boolean(url.match(regex));
}

export const postMethod = (input = {}) => {
	return omitBy(input, isNil); //eslint-disable-line
};

export const exportPdf = (file: File) => {
	const url = window.URL.createObjectURL(
		new Blob([file], { type: 'application/pdf' })
	);
	const link = document.createElement('a');
	link.href = url;
	// link.setAttribute('download', 'Report_' + year + month + date + '.xlsx'); //or any other extension
	link.setAttribute('target', '_blank');
	document.body.appendChild(link);
	link.click();
};

export const exportExcel = (file: File, name: string = 'Report_') => {
	const url = window.URL.createObjectURL(new Blob([file]));
	const link = document.createElement('a');
	const newDate = new Date();
	const date = newDate.getDate();
	const month = newDate.getMonth() + 1;
	const year = newDate.getFullYear();
	link.href = url;
	link.setAttribute('download', name + year + month + date + '.xlsx'); //eslint-disable-line
	document.body.appendChild(link);
	link.click();
};

export const geneNameBank = (string: string) => {
	const stringRMS = removeSign(string);
	const convert = stringRMS.split(' ').join('');
	return convert.toUpperCase();
};

export const geneUniId = (id: any | undefined) => {
	const unique = `id${id}_${Math.random().toString(16).slice(2)}`;
	return unique;
};

export const parseCatchError = (error: any) => {
	const defaultMess = 'Lỗi! Vui lòng thử lại';
	return JSON.parse(JSON.stringify(error?.data?.message)) ?? defaultMess;
};
export const isVietnamesePhoneNumber = (number: string) => {
	if (number.length < 9 || number.length > 13) return false;

	return /^(((\+|)84)|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(
		number
	);
};
export const geneUniqueKey = () => {
	const uid = new ShortUniqueId();
	return uid();
};

export const convertNumberWithCommas = (str: string) => {
	return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const convertNumberWithDotChange = (str: string) => {
	return str.replace(/\$\s?|(,*)/g, '');
};

export const convertSpaceOnURL = (url: string) => {
	return url.replaceAll(' ', '%20');
};

export function getKeyByValue(object: any, value: string | number) {
	return Object.keys(object).find((key) => object[key] == value);
}

export function removeSignAllChacrter(str: string) {
	return str.replaceAll('[^\\d]', '');
}
