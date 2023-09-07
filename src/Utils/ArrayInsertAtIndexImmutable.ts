// https://stackoverflow.com/a/38181008/14813577
const ArrayInsertAtIndexImmutable = <T>(
	array: T[],
	index: number,
	value: T,
) => [...array.slice(0, index), value, ...array.slice(index)]

export default ArrayInsertAtIndexImmutable
