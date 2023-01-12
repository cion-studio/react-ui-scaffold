import React from 'react'
import { QuickTableCellProps } from '../QuickTable/types/QuickTableTypes'
import { CELL_SPAN_STYLE } from './cellStyles'

export default function ClickToCopy({ cell }:QuickTableCellProps) {
	
	const clickHandler =() => {
		navigator.clipboard.writeText(cell)
	}
	
	return (
		<span
			onClick={clickHandler}
			style={{
				...CELL_SPAN_STYLE,
				cursor: 'pointer',
			}}
		>
			{cell}
		</span>
	)
}
