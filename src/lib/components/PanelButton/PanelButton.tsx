import React, { CSSProperties, useCallback, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './PanelButton.css'
import { PanelButtonContext } from './PanelButtonContext'

export type DropdownDirection = 'down' | 'right'

interface Props {
	panelContent: any,
	panelProps?: any,
	panelStyle?: CSSProperties,
	panelClassName?: string,
	children?: any,
	className?:string,
	style?:CSSProperties,
	direction?: DropdownDirection,
	autoClose?: boolean,
	widePanel?: boolean,
	onOpen?():any,
	onClose?():any,
}

export type PanelButtonRef = {
	open():void,
	close():void,
}

const PanelButton = React.forwardRef<PanelButtonRef, Props>(({
	panelContent,
	children,
	className,
	panelClassName,
	panelProps,
	panelStyle,
	style,
	direction='down',
	autoClose,
	widePanel,
	onOpen,
	onClose,
}, ref) => {
	const buttonRef = useRef<HTMLButtonElement>(null as any)
	const menuRef = useRef<HTMLDivElement>(null as any)
	const [isOpen, setIsOpen] = useState(false)
	
	const { z, hasParentMenu, parentOpen, parent } = useContext(PanelButtonContext)
	
	const [buttonWidth, setButtonWidth] = useState(() => buttonRef.current?.getBoundingClientRect().width)
	
	const position = useCallback(() => {
		if (menuRef.current && buttonRef.current && menuRef.current.style.display !== 'none') {
			menuRef.current.style.transform = 'none'
			const buttonRect = buttonRef.current.getBoundingClientRect()
			
			switch (direction) {
				case 'down': {
					menuRef.current.style.top = `${buttonRect.bottom + 5}px`
					menuRef.current.style.left = `${buttonRect.left}px`
					break
				} case 'right': {
					menuRef.current.style.top = `${buttonRect.top}px`
					menuRef.current.style.left = `${buttonRect.right + 5}px`
				}
			}
			
			const menuRect = menuRef.current.getBoundingClientRect()
			const diffX = window.innerWidth - menuRect.right
			const diffY = window.innerHeight - menuRect.bottom

			const tx = diffX < 0 ? diffX - 5 : 0
			const ty = diffY < 5 ? diffY - 5 : 0

			menuRef.current.style.transform = `translate(${tx}px, ${ty}px)`
		}
	}, [])
	
	const close = useCallback(() => {
		if (menuRef.current) {
			setIsOpen(false)
			menuRef.current.style.display = 'none'
			onClose && onClose()
		}
	}, [])
	
	useEffect(() => {
		if (hasParentMenu && !parentOpen) {
			close()
		}
	}, [hasParentMenu, parentOpen])
	
	const handleParentClick = useCallback((e:any) => {
		const isNotButton = (e.target !== buttonRef?.current) && !buttonRef?.current.contains(e.target)
		const isNotMenu = (e.target !== menuRef?.current) && !menuRef?.current.contains(e.target)
		
		if (isNotButton && isNotMenu) {
			close()
		}
	}, [])
	
	const open = () => {
		setIsOpen(true)
		menuRef.current.style.display = 'block'
		position()
		setButtonWidth(buttonRef.current?.getBoundingClientRect().width)
		onOpen && onOpen()
	}
	
	useImperativeHandle(ref, () => ({
		open,
		close,
	}))
	
	useEffect(() => {
		window.addEventListener('scroll', position, true)
		window.addEventListener('resize', close)
		
		return () => {
			window.removeEventListener('scroll', position)
			window.removeEventListener('resize', close)
		}
	},[])
	
	useEffect(() => {
		parent && parent.addEventListener('mousedown', handleParentClick)

		return () => {
			parent && parent.removeEventListener('mousedown', handleParentClick)
		}
	}, [parent])
	
	const buttonClickHandler = () => {
		if (!isOpen) {
			open()
		} else {
			close()
		}
	}
	
	const menuClickHandler = (e:any) => {
		e.stopPropagation()
		if (autoClose) {
			close()
		}
	}
	
	const MenuContent = panelContent
	
	return (
		<>
			<button
				className={`button ${className}`}
				type='button'
				style={style}
				ref={buttonRef}
				onClick={buttonClickHandler}
			>{children}</button>

			<PanelButtonContext.Provider value={{
				z: z + 1,
				hasParentMenu: true,
				parentOpen: isOpen,
				parent: menuRef.current,
			}}>
				{createPortal(<div
					ref={menuRef}
					className='panelContainer'
					onClick={menuClickHandler}
					onMouseDown={e => e.stopPropagation()}
					style={{
						zIndex: z,
					}}
				>
					<div
						className={`panelBody ${panelClassName}`}
						style={{
							...panelStyle,
							width: widePanel ? buttonWidth : undefined,
						}}
					>
						{typeof (panelContent) == 'function' ? <MenuContent {...panelProps} /> : panelContent}
					</div>
				</div>, document.body)}
			</PanelButtonContext.Provider>
		</>
	)
})

export default PanelButton
