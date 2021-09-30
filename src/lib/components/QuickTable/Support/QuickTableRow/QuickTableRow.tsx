import React from 'react'
import { QuickTableHeaders } from '../../types/QuickTableTypes'
import './QuickTableRow.css'

interface QuickTableRowProps {
	row: any
	headers: QuickTableHeaders
	defaultWidth: number | string
	cellStyle: any
	rowStyle: Function
	className: string
	index: any
}

export default function QuickTableRow({
	row,
	headers,
	defaultWidth,
	cellStyle,
	rowStyle,
	className,
	index
}: QuickTableRowProps){
	const appliedRowStyle = rowStyle(row)
	
	return (
		<div className={'QuickTableRow ' + className} style={appliedRowStyle}>
			
			{Object.keys(headers).map(h => {
				const wd = headers[h].width || defaultWidth
				
				let cellContents
				
				const Comp = headers[h].component
				
				if (Comp){
					cellContents = <Comp
						row={row}
						cell={row[h]}
						headers={headers}
						headerID = {h}
						key = {h}
						index={index}
						{...headers[h].props}
					/>
					
				} else {
					cellContents = row[h]
				}
				
				const formatter = headers[h].format
				
				if (formatter){
					cellContents = formatter(row[h], row)
				}
				
				const styler = headers[h].cellStyle
				
				let appliedStyle = styler ? styler(row[h], row) : {}
				appliedStyle = { ...appliedStyle, ...cellStyle(row[h], row) }

				
				return <span className="cellContainer" style={{ width: wd }} key={h}>
					<span className="cell" style={appliedStyle}>
						{cellContents}
					</span>
				</span>
			})}
		</div>
	)
}
