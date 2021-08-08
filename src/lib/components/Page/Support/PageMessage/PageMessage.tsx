import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Loading from '../../../Loading/Loading'
import './PageMessage.css'

interface PageMessageProps {
	message: any
}

export default function PageMessage({ message }: PageMessageProps) {
	
	const [showMessage, setShowMessage] = useState(true)
	const [debounced, setDebounced] = useState<any>()
	
	
	//Show new messages and then hide them after 4s
	useEffect(() => {
		setShowMessage(true)
		clearTimeout(debounced)
		
		if (message && (!message.sticky)){
			const hideCommand = setTimeout(() => {
				setShowMessage(false)
			}, 4000)
			
			setDebounced(hideCommand)
		}
		
	},[message])
	
	if ((!message?.content) || (!showMessage)) {
		return null
	}
	
	function messageClickHandler() {
		if (message.onClick) {
			message.onClick()
		}
	}

	const messageClass = message.onClick ? 'clickable' : ''
	
	return (
		<div className="PageMessage flexX">
			<div
				className={'message ' + messageClass}
				style={{
					color: message.color,
					borderColor: message.color,
					...message.style
				}}
				onClick={messageClickHandler}
			>
				<span className="loadingContainer">
					{message.loading ? <Loading /> : null}
					{message.icon ? <FontAwesomeIcon icon={message.icon}/> : null}
				</span>
				
				{message.content}
			</div>
		</div>
	)
}
