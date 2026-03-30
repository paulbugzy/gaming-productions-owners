import { cva, cx } from 'class-variance-authority'
import PropTypes from 'prop-types'

const headerVariants = cva(
	/* base style */
	'px-3 py-3.5 whitespace-nowrap text-left text-sm font-semibold text-gray-900',
	{
		variants: {
			isFirst: {
				true: 'pl-4 pr-3 sm:pl-3'
			},
			isLast: {
				true: 'pl-3 pr-4 sm:pr-3'
			}
		},
		defaultVariants: {}
	}
)

const colVariants = cva(
	/* base style */
	'whitespace-nowrap px-3 py-4 text-sm text-gray-500',
	{
		variants: {
			isFirst: {
				true: 'pl-4 pr-3 sm:pl-3'
			},
			isLast: {
				true: 'pl-3 pr-4 sm:pr-3'
			}
		},
		defaultVariants: {}
	}
)

const Table = ({ columns, data, striped }) => {
	return (
		<div className="flow-root">
			<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
					<table className="min-w-full divide-y divide-gray-300">
						<thead>
							<tr>
								{columns?.map((header, index) => {
									const { headerClassName, headerStyle, label } = header
									const isFirst = index === 0
									const isLast = index === header.length - 1
									return (
										<th
											key={index}
											scope="col"
											className={headerVariants({ className: headerClassName, isFirst, isLast })}
											style={headerStyle}
										>
											{label}
										</th>
									)
								})}
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{data?.map((item, itemIndex) => (
								<tr key={itemIndex} className={cx(striped && 'even:bg-gray-50')}>
									{columns?.map((col, colIndex) => {
										const { formatter, name, colClassName, colStyle } = col
										const value = item[name]
										const content = formatter ? formatter(value) : value
										const isFirst = colIndex === 0
										const isLast = colIndex === columns.length - 1

										return (
											<td
												key={colIndex}
												className={colVariants({ className: colClassName, isFirst, isLast })}
												style={colStyle}
											>
												{content}
											</td>
										)
									})}
								</tr>
							))}

							{(!data || data.length === 0) && (
								<tr className="h-[100px] sm:h-[150px] border-b-2 border-gray-100">
									<td
										colSpan={columns.length + 1}
										className="py-4 text-sm font-light text-center text-gray-500"
									>
										No data available.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

Table.propTypes = {
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			name: PropTypes.string.isRequired,
			headerClassName: PropTypes.string,
			headerStyle: PropTypes.object,
			colClassName: PropTypes.string,
			colStyle: PropTypes.object,
			formatter: PropTypes.func
		})
	).isRequired,
	data: PropTypes.array,
	striped: PropTypes.bool
}

Table.defaultProps = {}

export default Table
