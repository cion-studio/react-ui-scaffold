import React from 'react'
import Loading from '../Loading/Loading'

interface FreeButtonProps{
	loading?: boolean,
	onClick?: any,
	className?: string,
	children: any,
	[name:string]: any,
}

export default function FreeButton({ loading, onClick, className, children, ...props }: FreeButtonProps) {
	
	function clickHandler(){
		if (onClick && !loading){
			onClick()
		}
	}
	
	return (
		<button
			{...props}
			className={'button FreeButton ' + className}
			onClick={clickHandler}
		>
			{loading ? <Loading/> : children}
		</button>
	)
}
