import React from 'react'
import TextBox from '../inputs/TextBox'
import { QuickTableCellProps } from '../QuickTable/types/QuickTableTypes'

interface Props extends QuickTableCellProps {
	onEdit?(row:any, newDate: Date): Promise<any> | any
}

export default function DateCell({ cell, onEdit, row }: Props) {
	const editHandler = async (e:any) => {
		if (onEdit) {
			await onEdit(row, new Date(e.target.value))
		}
	}
	
	const value = cell?.split('T')[0] || ''

	return <TextBox
		type="date"
		className="wide"
		value={value}
		onChange={editHandler}
	/>
}
