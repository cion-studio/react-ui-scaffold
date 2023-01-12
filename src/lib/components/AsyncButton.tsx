import React, { useState } from 'react'
import FreeButton from './FreeButton/FreeButton'

export default function AsyncButton({ onClick, ...props }:any) {
	const [isLoading, setIsLoading] = useState(false)
	
	const clickHandler = async () => {
		try {
			setIsLoading(true)
			await onClick()
		} catch (_err) {
			setIsLoading(false)
		}
		
		setIsLoading(false)
	}
	
	return (
		<FreeButton
			onClick={clickHandler}
			loading={isLoading}
			type='button'
			{...props}
		/>
	)
}
