import React, { useMemo } from 'react'
import { formatCurrency } from '../../utils/formatUtils'
import { QuickTableCellProps } from '../QuickTable/types/QuickTableTypes'
import { CELL_SPAN_STYLE } from './cellStyles'

export default function CurrencyCell({ cell, style, className }:QuickTableCellProps) {
	const display = useMemo(() => formatCurrency(cell), [cell])
	
	return (
		<span
			style={{
				...CELL_SPAN_STYLE,
				textAlign: 'center',
				...style,
			}}
			className={className}
		>
			{display}
		</span>
	)
}
