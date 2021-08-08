import React from 'react'
import Loading from '../Loading/Loading'

export default function FreeButton({ loading, onClick, className, children, ...props }: any) {
	
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
