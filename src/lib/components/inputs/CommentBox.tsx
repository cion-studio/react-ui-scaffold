import React, { InputHTMLAttributes } from 'react'
import './inputs.css'

interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
	onEnter?(e: any): void,
	wide?: boolean,
	error?: any
}

const CommentBox = React.forwardRef<any, Props>(({
	onEnter,
	className,
	wide,
	error,
	...props
}, ref) => {

	function keyHandler(e: any) {
		if (e.key === 'Enter' && onEnter) {
			onEnter(e)
		}
	}

	const wideClass = wide ? 'wide' : ''

	return (
		<textarea
			{...props}
			ref={ref}
			onKeyPress={keyHandler}
			className={`${'input'} ${className} ${wideClass}  ${error && 'error'}`}
		/>
	)
})

export default CommentBox
