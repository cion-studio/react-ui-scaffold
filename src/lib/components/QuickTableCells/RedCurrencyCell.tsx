import React from 'react'
import { QuickTableCellProps } from '../QuickTable/types/QuickTableTypes'
import CurrencyCell from './CurrencyCell'

export default function RedCurrencyCell(props:QuickTableCellProps) {
	return (
		<CurrencyCell
			{...props}
			style={{
				...props.style,
				color: props.cell > 0.01 ? 'var(--negativeAccentColor)' : '',
			}}
		/>
	)
}
