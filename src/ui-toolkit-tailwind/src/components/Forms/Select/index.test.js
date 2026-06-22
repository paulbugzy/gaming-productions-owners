/* eslint-env jest */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Select from './index'

const alpha = { id: 1, name: 'Alpha Lounge' }
const beta = { id: 2, name: 'Beta Lounge' }

const optionsFor = items =>
	items.map(item => ({
		label: item.name,
		value: item
	}))

describe('Select', () => {
	it('keeps the selected label when refreshed options contain a new object with the same id', () => {
		const { rerender } = render(
			<Select options={optionsFor([alpha, beta])} value={beta} onChange={jest.fn()} />
		)

		expect(screen.getByRole('button')).toHaveTextContent('Beta Lounge')

		rerender(
			<Select
				options={optionsFor([
					{ id: 1, name: 'Alpha Lounge' },
					{ id: 2, name: 'Beta Lounge' }
				])}
				value={beta}
				onChange={jest.fn()}
			/>
		)

		expect(screen.getByRole('button')).toHaveTextContent('Beta Lounge')
	})
})
