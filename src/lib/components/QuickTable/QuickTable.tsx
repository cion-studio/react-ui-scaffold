import React from 'react'
import './QuickTable.css'
import QuickTableRow from './Support/QuickTableRow/QuickTableRow'

interface QuickTableProps {
	data: any[]
	headers: any
	defaultWidth?: number
	headerStyle: object
	primaryKey: string
	className?: string
	cellStyle?: Function
	rowStyle?: Function
	rowClassName: string
	hover?: boolean
}

export default function QuickTable({
	data,
	headers,
	primaryKey,
	defaultWidth = 100,
	headerStyle,
	cellStyle = () => {},
	rowStyle = () => {},
	className,
	rowClassName,
	hover
}: QuickTableProps){
	const hoverClass = hover ? ' hover ' : ''
	
	return (
		<div className={'QuickTable ' + className}>
			<div className="tableHeaders">
				{Object.keys(headers).map(h => {
					const wd = headers[h].width || defaultWidth
					
					return <span
						key={h}
						style={{ ...headerStyle, ...headers[h].headerStyle, width: wd }}
						className="cellContainer headerCell"
					>
						<span className="cell">
							{headers[h].title}
						</span>
					</span>
				})}
			</div>
			
			<div className="tableBody">
				{data.map((r, idx) => {
					return <QuickTableRow
						index={idx}
						className={rowClassName + hoverClass}
						cellStyle={cellStyle}
						headers={headers}
						key={r[primaryKey]}
						row={r}
						defaultWidth={defaultWidth}
						rowStyle={rowStyle}
					/>
				})}
			</div>
		</div>
	)
}
