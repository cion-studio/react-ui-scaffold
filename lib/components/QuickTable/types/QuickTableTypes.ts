import React, { FC } from 'react'

export interface QuickTableCellProps<RowType=any, CellType=any>{
	row: RowType,
	cell: CellType,
	headers: QuickTableHeaders,
	headerID: string,
	index: number,
	[otherProp: string]: any
}

export interface QuickTableHeaderDefinition{
	title: string,
	width?: number,
	headerStyle?: React.CSSProperties,
	component?: FC<QuickTableCellProps>,
	props?: {
		[id: string]: any
	},
	format?(cell:any, row:any): any,
	cellStyle?(cell:any, row:any): React.CSSProperties
}

export type QuickTableHeaders = { [id: string]: QuickTableHeaderDefinition }
