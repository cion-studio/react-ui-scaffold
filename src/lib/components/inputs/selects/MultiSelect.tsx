import React from 'react'
import { SelectBoxOption } from './SelectBox'
import SelectPanelView from './_SelectPanelView'

interface Props {
	onValuesChange(newValues: any[]): any
	values: any[],
	wide?: boolean,
	error?: any,
	className?: string,
	options: SelectBoxOption[]
}

export default function MultiSelect({
	onValuesChange,
	values,
	wide,
	error,
	className,
	options,
}:Props) {
	const clickHandler = (opt:SelectBoxOption) => {
		if (values.includes(opt.value)) {
			return onValuesChange(values.filter(v => v!==opt.value))
		}
		
		onValuesChange([...values, opt.value])
	}
	
	return (
		<SelectPanelView
			wide={wide}
			error={error}
			className={className}
			values={values}
			onClickOption={clickHandler}
			options={options}
			keepOpen
		/>
	)
}
