const dayjs = require('dayjs')

/**
 * Formats a date in the "MMM D YYYY" format.
 *
 * @param {Date|number|string} date - The input date to format.
 * @returns {string} The formatted date string.
 */
export default function displayDate(date) {
	const formattedDate = dayjs(date).format('MMM D YYYY')
	return formattedDate
}
