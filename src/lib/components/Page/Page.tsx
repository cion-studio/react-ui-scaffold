import React from 'react'
import './Page.css'
import Loading from '../Loading/Loading'
import PageMessage from './Support/PageMessage/PageMessage'

interface PageProps {
	className?: String
	children?: any
	loading?: any
	error?: any
	message?: any
}

export default function Page({
	className,
	children,
	loading,
	error,
	message,
}: PageProps){
	
	if (error) {
		return (
			<div className={className + ' Page flexCenter full error'}>
				{error}
			</div>
		)
	}
	
	if (loading){
		return (
			<div className={className + ' Page flexCenter full'}>
				<Loading/>
			</div>
		)
	}
	
	return (
		<div className={className + ' Page'}>
			<PageMessage message={message}/>
			{children}
		</div>
	)
}
