import React, { InputHTMLAttributes } from 'react'
import './inputs.css'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	onEnter?(e: any): void,
	wide?: boolean,
	error?: any
}

export default React.forwardRef<any, Props>(({
	className,
	wide,
	error,
	...props
}, ref) => {

	const wideClass = wide ? 'wide' : ''

	return (
		<input
			{...props}
			ref={ref}
			type='date'
			className={`${'input'} ${className} ${wideClass} ${error && 'error'}`}
		/>
	)
})
