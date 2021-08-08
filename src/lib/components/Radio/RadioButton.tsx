import React, { useContext } from 'react'
import './RadioButton.css'
import radioContext from '../Contexts/radioContext'

interface RadioButtonProps {
	children?: any
	labelValue?: string
	value: any,
	style?: object,
	labelStyle?: object,
	buttonStyle?: object,
	tabIndex?: any,
	inputRef?: any,
	className?: string,
}

export default function RadioButton(props: RadioButtonProps) {
	
	const radioData: any = useContext(radioContext)
	

	//handles the clicking of the radio button - for locked radio buttons
	function clickHandler(e: any) {
		e.preventDefault()
		radioData.onChange(props.value)
	}
	
	return (
		<span className={'RadioButton flexY ' + props.className} style={props.style} onClick={clickHandler}>
			
			<input
				type="radio"
				className={'input'}
				defaultChecked={radioData.value !== undefined ? undefined : radioData.defaultValue === props.value}
				name = {radioData.groupName}
				value = {props.value}
				style={props.buttonStyle}
				checked = {radioData.value !== undefined ? (radioData.value === props.value) : undefined}
				readOnly={radioData.value !== undefined}
				tabIndex={props.tabIndex}
				ref = {props.inputRef}
			/>
			<label
				style={props.labelStyle}
			>
				{props.children}
				{props.labelValue}
			</label>
			
		</span>
	)
}
