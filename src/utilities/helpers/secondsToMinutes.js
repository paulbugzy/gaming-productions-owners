/**
 * @description transform seconds to mm:ss format string
 * @param {string | number} seconds
 * @returns mm:ss
 */
export default function secondsToMinutes(seconds) {
	const secs = Number(seconds)

	if (Number.isNaN(secs)) return ''

	const remainedSeconds = secs % 60
	const mins = Math.floor(secs / 60)

	const secsStr = remainedSeconds >= 10 ? String(remainedSeconds) : `0${remainedSeconds}`
	const minsStr = mins >= 10 ? String(mins) : mins > 0 ? `0${mins}` : '00'

	return `${minsStr}:${secsStr}`
}
