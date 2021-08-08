import React from 'react'

interface DateBoxProps {
	className: string
}

export default function DateBox(props: DateBoxProps) {
	const newProps = {
		...props,
		className: 'DateBox input ' + props.className
	}
	
	return (
		<input type="date" {...newProps}/>
	)
}
