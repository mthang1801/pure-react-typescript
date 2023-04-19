import { AttributeFilterTypeEnum, AttributeTypeEnum } from 'src/constants/enum';

export const AttributeTypesOptions = Object.entries(AttributeTypeEnum).map(
	(k, v) => ({ label: k[0], value: v })
);

export const AttributeFilterTypesOptions = Object.entries(AttributeFilterTypeEnum).map(
	(k, v) => ({ label: k[0], value: v })
);
