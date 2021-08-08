import React, { useContext, useState } from 'react'
import ReactDOM from 'react-dom'
import menuContext from '../Contexts/menuContext'
import './MenuButton.css'
import { Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

interface DropMenuProps {
	style: object
	menuStyle: any
	className: string
	menuClass: string
	onClickBody: React.MouseEventHandler<HTMLDivElement>
	MenuContent: any
	menuProps: object
}

const dropMenu = React.forwardRef(
	(props: DropMenuProps, ref: any) => {
		const menuMaxWidth = props.menuStyle && props.menuStyle.width ? null : '180px'

		return (
			<menuContext.Provider value={{ submenu: true }}>
				<div
					ref={ref}
					className={props.className + ' Menu ' + props.menuClass}
					style={{ maxWidth: menuMaxWidth, ...props.style, ...props.menuStyle }}
					onClick={props.onClickBody}
				>
					{typeof (props.MenuContent) == 'function' ? <props.MenuContent {...props.menuProps} /> : props.MenuContent}
				</div>
			</menuContext.Provider>
		)
	}
)

dropMenu.displayName = 'dropMenu'

enum Direction {
	Left = 'left',
	Right = 'right',
	Up = 'up',
	Down = 'down'
}

interface MenuButtonProps {
	onOpen?: Function
	onClose?: Function
	direction?: Direction
	notifications?: number
	notificationStyle?: object
	menuContent: any
	menuProps?: object
	menuStyle?: object
	className?: string
	style?: object
	children?: any
	title?: string,
	permanent?:boolean,
}

export default function MenuButton(props: MenuButtonProps) {

	const [toggling, setToggling] = useState(false)

	//handles both onOpen and onClose
	function toggleHandler(isOpen: boolean) {

		if (!toggling && isOpen && props.onOpen) {
			props.onOpen()

		} else if (!toggling && props.onClose && !isOpen) {
			props.onClose()
			setToggling(true)
		}

		//Prevent spamming
		setTimeout(() => setToggling(false), 300)
	}

	//check if it's inside of another menu, if so render as a submenu
	const parentMenuData: any = useContext(menuContext)
	const icon = parentMenuData.submenu ? <span className='subMenuIcon'>
		<FontAwesomeIcon icon={faCaretRight} />
	</span> : null


	let direction = props.direction
	if (parentMenuData.submenu) {
		direction = Direction.Right
	}

	const notifications = props.notifications && props.notifications < 99 ? props.notifications : '99+'
	const notificationBadge = props.notifications ?
		<span className='notifications' style={props.notificationStyle}>{notifications}</span>
		: null

	//button
	const dropButton = React.forwardRef(({ onClick }: { onClick: any}, ref: any) => {

		function clickHandler(e: any) {
			e.preventDefault()
			onClick(e)
		}

		return (
			<button
				className={'MenuButton ' + props.className}
				onClick={clickHandler}
				ref={ref}
				style={props.style}
				title={props.title}
			>
				{notificationBadge}
				{props.children}
				{icon}

			</button>
		)
	})

	dropButton.displayName = 'dropButton'

	//Prevent submenus from sticking around after their parent has closed
	function onClickBody() {
		if (parentMenuData.submenu || !props.permanent) {
			document.body.click()
		}
	}

	return (

		<span className='menuButtonContainer'>
			<Dropdown drop={direction} onToggle={toggleHandler}>

				<Dropdown.Toggle as={dropButton} />

				{ReactDOM.createPortal(<Dropdown.Menu
					as={dropMenu}
					MenuContent={props.menuContent}
					menuProps={props.menuProps || {}}
					menuStyle={props.menuStyle}
					style={{}}
					menuClass={''}
					onClickBody={onClickBody}
				/>, document.body)}

			</Dropdown>
		</span>

	)
}
