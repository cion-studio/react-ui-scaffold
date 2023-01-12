import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useEffect } from 'react'
import './Popup.css'
import { createPortal } from 'react-dom'
import { usePopup } from './PopupProvider'

interface PopupProps {
	children: React.ReactNode;
	style?: React.CSSProperties;
	z?: number;
	visible?: boolean | any;
	setVisible(v:boolean): any;
	title?: any;
	className?: string;
	onExit?: Function;
}

export default function Popup({
	children,
	style,
	z=1,
	visible,
	setVisible,
	title,
	className,
	onExit,
}: PopupProps) {
	const { open, close } = usePopup()
	
	useEffect(() => {
		if (visible) {
			open()
		} else {
			close()
		}

		const handleEsc = (ev: KeyboardEvent) => {
			if (ev.key === 'Escape') {
				setVisible(false)
			}
		}
		window.addEventListener('keydown', handleEsc)
		return () => window.removeEventListener('keydown', handleEsc)
	}, [visible])
	
	const exit = useCallback(() => {
		if (onExit) {
			onExit({ setVisible })
		} else {
			setVisible(false)
		}
	}, [])
	
	const internalClickHandler = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation()
	}, [])
	
	if (!visible) {
		return null
	}
	
	return createPortal(
		<div className={'popupBG flexCenter '} onMouseDown={exit} style={{ zIndex: z+500 }}>
			<div className={'Popup ' + className} style={{ ...style }} onMouseDown={internalClickHandler}>
				<div className="titleBar">
					<div className="spacer"></div>
					
					<h1 className='hemi'>
						{title}
					</h1>

					<button className="button plain exitIcon" onClick={exit}>
						<FontAwesomeIcon icon={faTimes} />
					</button>
				</div>
				
				<div className="content">
					{children}
				</div>
				
			</div>
		</div>,
		document.getElementById('portalDestination-popupContainer') as Element
	)
}
