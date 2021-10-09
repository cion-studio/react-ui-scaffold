import React, { useState } from 'react'
import './ConfirmButton.css'

interface ConfirmButtonProps {
	hidden: boolean,
	locked: boolean,
	onClick: Function,
	style: object,
	expandedStyle: object,
	className: string,
	content: any,
	expandedContent: any,
	purpose: string,
	loading: boolean,
	title: string,
	onExpand: Function,
	onCollapse: Function,
	disabled: boolean
}

export default function ConfirmButton(props: ConfirmButtonProps) {
	
	const [expanded, setExpanded] = useState(false)
	
	function clickHandler(e: React.MouseEvent<HTMLElement>){
		if (expanded){
			if (props.onClick){props.onClick(e)}
			setExpanded(false)
			if (props.onCollapse){ props.onCollapse()}
		} else {
			e.stopPropagation()
			setExpanded(true)
			if (props.onExpand){props.onExpand(e)}
			e.stopPropagation()
		}
	}
	
	function blurHandler(){
		setExpanded(false)
		if (props.onCollapse){ props.onCollapse()}
	}
	
	const expandedClass = expanded ? ' expanded ' : ''
	return (
		<button
			className = {props.className + ' ConfirmButton ' + expandedClass + 'button'}
			title={props.title}
			disabled = {props.disabled}
			hidden = {props.hidden}
			onClick = {clickHandler}
			style = {expanded ? { ...props.style, ...props.expandedStyle } : props.style}
			onBlur = {blurHandler}
		>
			{expanded ? props.expandedContent : props.content}
		</button>
	)
}
