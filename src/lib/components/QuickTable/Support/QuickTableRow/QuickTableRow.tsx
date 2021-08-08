import React from 'react'
import './QuickTableRow.css'

interface QuickTableRowProps {
	row: any
	headers: any
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
				
				if (headers[h].component){
					const Comp = headers[h].component
					
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
				
				if (headers[h].format){
					cellContents = headers[h].format(row[h], row)
				}
				
				let appliedStyle = headers[h].cellStyle ? headers[h].cellStyle(row[h], row) : {}
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
