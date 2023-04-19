export function getKeyByValue(object : any, value : string | number) {
  return Object.keys(object).find(key => object[key] == value);
}

export const removeMoreThanOneSpace = (str : string) => str.replace(/\s\s+/g, ' ');

export const mergeArray = (initArr: any[], insertedArr: any[], index: number) => {
	const _initArr = [...initArr];
	return [...initArr.slice(0, index), ...insertedArr, ..._initArr.slice(index, initArr.length)];
};

export const cartesian =
  (...a : any) => a.reduce((a:any, b:any) => a.flatMap((d:any) => b.map((e:any) => [d, e].flat())));
