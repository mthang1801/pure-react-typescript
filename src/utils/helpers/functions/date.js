import moment from "moment";
export const dateFormatYMD = "YYYY-MM-DD";
export const dateFormatDMY = "DD-MM-YYYY";
export const dateFormatYMD_hms = "YYYY-MM-DD hh:mm:ss";
export const dateFormatYMD_hm = "YYYY-MM-DD hh:mm";
export const dateFormatYMD_hmsA = "YYYY-MM-DD hh:mm:ss a";
export const dateFormatYMD_hms24h = "YYYY-MM-DD HH:mm:ss";
export const dateFormatDMY_hms24h = "DD-MM-YYYY HH:mm:ss";
export const dateFormat_hms24h = "HH:mm:ss";
export const dateFormatDM_hms = "DD/MM hh:mm:ss";
export const dateFormatDM_hm = "DD/MM hh:mm";

export const startOfMonth = (dateFormat) =>
	moment()
		.startOf("month")
		.format(dateFormat ? dateFormat : dateFormatYMD);
export const endOfMonth = (dateFormat) =>
	moment()
		.endOf("month")
		.format(dateFormat ? dateFormat : dateFormatYMD);
export const startOfLastMonth = (dateFormat) =>
	moment()
		.subtract(1, "months")
		.startOf("month")
		.format(dateFormat ? dateFormat : dateFormatYMD);
export const endOfLastMonth = (dateFormat) =>
	moment()
		.subtract(1, "months")
		.endOf("month")
		.format(dateFormat ? dateFormat : dateFormatYMD);
export const startOfWeek = (dateFormat) =>
	moment()
		.startOf("week")
		.format(dateFormat ? dateFormat : dateFormatYMD);
export const endOfWeek = (dateFormat) =>
	moment()
		.endOf("week")
		.format(dateFormat ? dateFormat : dateFormatYMD);
export const beforeThirtyDays = (dateFormat) =>
	moment()
		.subtract(30, "days")
		.format(dateFormat ? dateFormat : dateFormatYMD);
export const start7Day = (dateFormat) =>
	moment()
		.subtract(7, "days")
		.format(dateFormat ? dateFormat : dateFormatYMD);
export const start14Day = (dateFormat) =>
	moment()
		.subtract(14, "days")
		.format(dateFormat ? dateFormat : dateFormatYMD);
export const start30Day = (dateFormat) =>
	moment()
		.subtract(30, "days")
		.format(dateFormat ? dateFormat : dateFormatYMD);
export const yesterday = (dateFormat) =>
	moment()
		.subtract(1, "days")
		.format(dateFormat ? dateFormat : dateFormatYMD);
export const tomorrow = (dateFormat) =>
	moment()
		.add(1, "days")
		.format(dateFormat ? dateFormat : dateFormatYMD);
export const nowDate = (dateFormat) => moment().format(dateFormat ? dateFormat : dateFormatYMD);
export const fromDate = (dateFormat) => moment(beforeThirtyDays, dateFormat ? dateFormat : dateFormatYMD);
export const toDate = (dateFormat) => moment(nowDate, dateFormat ? dateFormat : dateFormatYMD);

const padTo2Digits = (num) => {
	return num.toString().padStart(2, "0");
};

export const formatDate = (date) => {
	return (
		[date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join("-") +
		" " +
		[padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes()), padTo2Digits(date.getSeconds())].join(":")
	);
};

export const ISO8601Formats = (timestamp: Date) => moment(new Date(timestamp)).format(dateFormatYMD_hms24h);

export const formatDateYMD = (timestamp: Date) => moment(new Date(timestamp)).format(dateFormatYMD);

export const formatDateYMDHM = (timestamp: Date) => moment(new Date(timestamp)).format(dateFormatYMD_hm);
