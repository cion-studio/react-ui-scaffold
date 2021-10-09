import React, { useState } from 'react'
import radioContext from '../Contexts/radioContext'
import { v4 as uuid } from 'uuid'

interface RadioGroupProps {
	children: any
	onChange: Function
	defaultValue?: string
	locked?: boolean
	groupID?: any
	value: any
}

export default function RadioGroup(props: RadioGroupProps) {
	
	const [groupName] = useState(uuid)
	
	function onChange(v: any){
		if (props.onChange){
			props.onChange(v, props.groupID)
		}
	}
	
	const radioData = {
		onChange: onChange,
		groupName: groupName,
		defaultValue: props.defaultValue,
		value: props.value,
	}
	
	return (
		<radioContext.Provider value={radioData}>
			{props.children}
		</radioContext.Provider>
	)
}
