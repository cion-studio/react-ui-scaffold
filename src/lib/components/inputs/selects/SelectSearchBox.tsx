import React, { CSSProperties, useMemo, useRef, useState } from 'react'
import Line from '../../../Line/Line'
import '../inputs.css'
import TextBox from '../TextBox'
import { SelectBoxOption } from './SelectBox'
import './SelectBox.css'
import SelectPanelView from './_SelectPanelView'

interface Props {
	onValueChange(newValue: SelectBoxOption): any
	value: any,
	wide?: boolean,
	error?: any,
	className?: string,
	options: SelectBoxOption[],
	style?: CSSProperties
}

export default function SelectSearchBox({
	className,
	value,
	wide,
	error,
	onValueChange,
	options,
	style,
}: Props) {
	const textBoxRef = useRef<HTMLInputElement>()
	const [search, setSearch] = useState('')
	
	const filteredOptions = useMemo(() => {
		const q = search.toLowerCase().trim()
		if (!q) {
			return options
		}
		
		return options.filter(opt => {
			return opt.label.toLowerCase().includes(q)
		})
	}, [search, options])
	
	return (
		<SelectPanelView
			wide={wide}
			error={error}
			className={className}
			value={value}
			onClickOption={onValueChange}
			options={options}
			filteredOptions={filteredOptions}
			onOpen={() => textBoxRef.current && textBoxRef.current.focus()}
			onClose={() => textBoxRef.current && textBoxRef.current.blur()}
			style={style}
		>
			<div className="searchContainer">
				<TextBox
					placeholder='Search'
					wide
					ref={textBoxRef}
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
				<Line/>
			</div>
		</SelectPanelView>
	)
}
