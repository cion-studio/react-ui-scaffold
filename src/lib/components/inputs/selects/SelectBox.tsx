import React, { CSSProperties } from 'react'
import '../inputs.css'
import './SelectBox.css'
import SelectPanelView from './_SelectPanelView'


export type SelectBoxOption = { label: string, value: any }

interface Props {
	onValueChange(newValue:SelectBoxOption):any
	value: SelectBoxOption,
	wide?: boolean,
	error?: any,
	className?: string,
	options: SelectBoxOption[],
	style?: CSSProperties
}

export default function SelectBox({
	className,
	value,
	wide,
	error,
	onValueChange,
	options,
	style,
}: Props) {
	return (
		<SelectPanelView
			wide={wide}
			error={error}
			className={className}
			value={value}
			onClickOption={onValueChange}
			options={options}
			style={style}
		/>
	)
}
