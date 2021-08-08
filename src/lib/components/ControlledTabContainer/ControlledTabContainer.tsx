import React from 'react'
import './ControlledTabContainer.css'

interface ControlledTabContainerProps {
	children?: any
	activeTab: string
	onTabChange?: Function
	locked?: boolean
	style?: object
	singleMount?: boolean
}

export default function ControlledTabContainer(props: ControlledTabContainerProps) {

	return (
		<div className="ControlledTabContainer" style={props.style}>
			{React.Children.map(props.children, (child) => {
				
				if ((props.activeTab !== child.props.tabID) && props.singleMount){
					return null
				}
				
				if (!child.props.hidden) {
					return (<div
						className='tabWrapper'
						style={props.activeTab === child.props.tabID ? {} : { display: 'None' }}
					>
						{child}
					</div>)
				} else return null
			})}
			
		</div>
	)
}

