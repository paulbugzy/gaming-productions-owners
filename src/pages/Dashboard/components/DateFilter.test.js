import dayjs from 'dayjs'

import { latestUsablePerformanceDay } from './DateFilter'

describe('DateFilter', () => {
	it('uses the latest available performance date when yesterday has no imported data', async () => {
		const endDay = latestUsablePerformanceDay(
			'2026-06-20',
			dayjs('2026-06-22T15:00:00')
		)

		expect(endDay.format('YYYY-MM-DD')).toBe('2026-06-20')
	})
})
