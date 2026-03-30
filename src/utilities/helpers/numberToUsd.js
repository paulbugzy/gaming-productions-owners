/**
 * @param {number | string} number
 * @returns format number as USD format. ex: $1,234
 */
export default function numberToUsd(number, digits = 0) {
	if (!number && number !== 0) return ''
	return number.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})
}
