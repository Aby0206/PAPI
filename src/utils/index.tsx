import { NullableParam } from 'src/types';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import moment from 'moment';

export const getDefaultIfEmpty = (val?: string | null, dafaultValue = '-') =>
	val?.trim() ? val : dafaultValue;

export const getDate = (
	date?: NullableParam<string>,
	format: string = 'DD-MMM-YYYY'
) => {
	return date ? dayjs(date).format(format) : '-';
};
export const capitalizeFirst = (input: string) => {
	const capitalizedString = input.charAt(0).toUpperCase() + input.slice(1);
	return capitalizedString || input;
};

export const getCookieValue = (cookieName: string, defaultValue = '') => {
	const cookieValue = Cookies.get(cookieName);
	return cookieValue ?? defaultValue;
};
export const setCookieValue = (
	cookieName: string,
	cookieValue: any,
	defaultValue = ''
) => {
	let value =
		(typeof cookieValue !== 'string' && JSON.stringify(cookieValue)) ||
		cookieValue;
	Cookies.set(cookieName, value ?? defaultValue, { secure: false });
};

export const removeCookieValue = (cookieName: string) => {
	Cookies.remove(cookieName);
};
export const clearCookieData = () => {
	removeCookieValue('access');
	removeCookieValue('refresh');
	removeCookieValue('permissions');
	removeCookieValue('roles');
};

export const getLoggedUserId = () => {
	return Cookies.get('user_id');
};

export const getValueWithLabel = (
	value?: NullableParam<number>,
	singularLabel?: string,
	pluralLabel?: string
) => {
	if (value !== undefined && value !== null) {
		return `${value} ${(value <= 1 && singularLabel) || pluralLabel}`;
	} else {
		return `- ${singularLabel}`;
	}
};

export const toBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = reject;
	});
};

export const getUuid = () => uuidv4();

export const generateUniqueIds = (n: number) => {
	const uniqueIds: string[] = [];
	for (let i = 0; i < n; i++) {
		const uniqueId = uuidv4();
		uniqueIds.push(uniqueId);
	}
	return uniqueIds;
};

export const generateArray = (
	count: number,
	singularLabel: string,
	pluralLabel: string
) => {
	if (!Number.isInteger(count) || count < 0) {
		throw new Error(
			'Invalid input: The number of years must be a non-negative integer.'
		);
	}
	const generatedArray = Array.from({ length: count + 1 }, (_, i) => ({
		id: i,
		name: `${i} ${i === 1 || i === 0 ? singularLabel : pluralLabel}`,
		value: i,
	}));
	return generatedArray;
};

export const flattenErrorObject = (errorObj: any): Record<string, string> => {
	const flattenObject = (
		obj: any,
		parentKey = '',
		result: Record<string, string> = {}
	) => {
		for (const key in obj) {
			if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
				if (
					Object.keys(obj[key]).every((k) => k === 'code' || k === 'message')
				) {
					result[`${parentKey}${key}`] = obj[key].message;
				} else {
					flattenObject(obj[key], `${parentKey}${key}.`, result);
				}
			} else {
				result[`${parentKey}${key}`] = obj[key];
			}
		}
		return result;
	};

	const { dict_errors: dictErrors, list_errors: listErrors } = errorObj;
	const flattenedObj = flattenObject({ ...dictErrors, ...listErrors });
	return flattenedObj;
};


export const formatDate = (date: any) => {
	return moment(date).format("DD-MMM-YYYY")
}
