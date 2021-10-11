import React from 'react'

interface SmartInputProps {
	className?: string
	onEnter?: Function,
	style?: React.CSSProperties,
	[prop:string]: any,
}

export default function TextBox({ className, onEnter, style, ...moreProps }: SmartInputProps) {
	
	function keyHandler(e: any){
		if (e.key==='Enter' && onEnter){
			onEnter(e)
		}

	}
	
	return (
		<input {...moreProps} onKeyDown={keyHandler} className={`input ${className}`} style={style}/>
	)
}
