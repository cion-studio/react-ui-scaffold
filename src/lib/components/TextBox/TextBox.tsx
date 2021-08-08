import React from 'react'

interface SmartInputProps {
	className?: string
	onEnter?: Function
}

export default function TextBox(props: SmartInputProps) {
	
	function keyHandler(e: any){
		if (e.key==='Enter' && props.onEnter){
			props.onEnter(e)
		}

	}
	
	const newProps={ ...props }
	delete newProps.onEnter
	delete newProps.className
	
	return (
		<input {...newProps} onKeyDown={keyHandler} className={'input '+ props.className}/>
	)
}
