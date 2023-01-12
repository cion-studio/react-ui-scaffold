import React, { createContext, useContext, useState } from 'react'

const PopupContext = createContext<{
	open():void,
	close():void,
}>(null as any)

interface Props{
	children:any,
	className?: string,
}

export default function PopupProvider({ children, className }:Props) {
	const [hasPopup, setHasPopup] = useState(false)
	
	const contentClass = hasPopup ? ' appBackground ' : ''
	
	const open = () => setHasPopup(true)
	const close = () => setHasPopup(false)
	
	return (
		<PopupContext.Provider value={{
			open,
			close,
		}}>
			<div id='portalDestination-popupContainer' className={`portalDestination ${className || ''}`}></div>

			<div className={`appContents  ${contentClass}`}>
				{children}
			</div>
		</PopupContext.Provider>
	)
}

export function usePopup() {
	const v = useContext(PopupContext)
	if (!v) {
		throw new Error('usePopup outside provider!')
	}
	
	return v
}
