import React from 'react'
import './TabHeaders.css'

export type TabOption = {
	title: any,
	id: string,
}

interface Props{
	activeTabId: string,
	setActiveTabId(id:string): any,
	tabs: TabOption[],
	secondary?: boolean
}

export default function TabHeaders({ activeTabId, setActiveTabId, tabs, secondary }:Props) {
	return (
		<div className={`TabHeaders ${secondary ? 'secondary' : ''}`}>
			{tabs.map(th => <span
				className={`tabHeaderBox ${activeTabId === th.id ? 'activeTab' : ''}`}
				key={th.id}
				onClick={() => setActiveTabId(th.id)}
			>
				{th.title}
			</span>)}
		</div>
	)
}
