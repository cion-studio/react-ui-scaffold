import React from 'react'
import { SelectBoxOption } from './SelectBox'
import SelectPanelView from './_SelectPanelView'

interface Props {
	onValuesChange(newValues: any[]): any
	values: SelectBoxOption[],
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
		const alreadyActive = values.find(v => v.value === opt.value)
		
		if (alreadyActive) {
			return onValuesChange(values.filter(v => v.value!==opt.value))
		}
		
		onValuesChange([...values, opt])
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
