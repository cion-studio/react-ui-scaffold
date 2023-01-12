import React from 'react'

interface InfoTabProps {
	children: any
	tabTitle?: string
	className?: string,
	tabID: string
	style?: object
}

export default function InfoTab(props: InfoTabProps) {
	
	return (	
		<div className = {`InfoTab ${props.tabID} ${props.className}`} style = {props.style}>
			{props.children}
		</div>
			
	)
}
