import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { QuickTableCellProps } from '../QuickTable/types/QuickTableTypes'

export default function LinkCell({ cell, createUrl, row, createLinkText }:QuickTableCellProps) {
	const url = createUrl(cell, row)
	
	const isRelative = useMemo(() => url.startsWith('/'), [url])
	
	if (isRelative) {
		return <Link to={url}>{createLinkText ? createLinkText(cell, row) : cell}</Link>
	}
	
	return <a href={url} target='_blank' rel="noreferrer">{createLinkText ? createLinkText(cell, row) : cell}</a>
}
