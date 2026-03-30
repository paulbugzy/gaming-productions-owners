/**
 * @param {number | string} number
 * @returns number string with commas
 */
export default function numberWithCommas(number) {
	if (!number && number !== 0) return ''
	const x = `${number}`
	const parts = x.split('.')
	const reg = /\B(?=(\d{3})+(?!\d))/g
	parts[0] = parts[0].replace(reg, ',')
	return parts.join('.')
}
