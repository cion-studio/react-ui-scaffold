import React from 'react'
import Proptypes from 'prop-types'
import { v4 as uuid } from 'uuid'

interface CheckButtonProps {
	value: any;
	onChange: Function;
	disabled: boolean;
	checked: boolean;
	defaultChecked?: boolean;
	style: object;
	className: string;
	children: React.ReactNode;
}

export default function CheckButton(props: CheckButtonProps) {
	
	const checkID = uuid()
	
	function clickHandler(e: any, id: any) {
		if (!props.disabled){
			const cb: any = document.getElementById(id)
			if (e.target !== cb) {cb.checked = !cb.checked}
			
			if (props.onChange){props.onChange(cb.checked, props.value)}
		}
	}
	
	const spanStyle: any = {
		textAlign: 'left',
		paddingLeft: '7px',
	}
	
	return (<button
		onClick={(e) => clickHandler(e, checkID)}
		style ={{
			backgroundColor:'inherit',
			textAlign: 'left',
			...props.style
		}}
		className={props.className}
	>

		<input
			type='checkbox'
			defaultChecked={props.defaultChecked}
			id={checkID}
			value={props.value}
			style={{ cursor: 'pointer', }}
			disabled = {props.disabled}
			checked = {props.checked}
			readOnly = {props.checked !== undefined ? true : false}
		/>
		<span style={spanStyle}>{props.children}</span>
		

	</button>)
	
}


CheckButton.propTypes = {
	value: Proptypes.any,
	onChange: Proptypes.func,
	disabled: Proptypes.bool,
	checked: Proptypes.bool,
	style: Proptypes.object,
	className: Proptypes.string
}