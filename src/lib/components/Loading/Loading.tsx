import React from 'react'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Loading.css'

interface LoadingProps {
	className?: string
	style?: object
	animation?: string
	children?: any
}

export default function Loading(props: LoadingProps) {
	return (
		<span className={'Loading ' + props.className} style={props.style} >
			<span className={props.animation ? props.animation : 'rotate'}>
				{props.children ? props.children : <FontAwesomeIcon icon={faCircleNotch} />}
			</span>
		</span>
	)
}
