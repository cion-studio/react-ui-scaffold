import React from 'react'
import { ConfirmButton, FreeButton, MenuButton } from '../../dist'
import './Gallery.css'

export default function Gallery() {
	return (
		<div className='Gallery'>
			<h1>Gallery</h1>
			
			<div className="story">
				<FreeButton className='positive'>Hello world</FreeButton>
				<FreeButton className='negative'>Hello world</FreeButton>
				<FreeButton disabled>Hello world</FreeButton>
				<FreeButton>Hello world</FreeButton>
			</div>
			
			<div className="story">
				<ConfirmButton
					content={'Test'}
					expandedContent={'Confirm'}
					loading
				/>
			</div>
			
			<div className="story">
				<MenuButton
					menuContent={()=><div style={{padding: '20px'}}>
						<ConfirmButton
							content={'Cion'}
							expandedContent={'Studio'}
						/>
					</div>}
				>Welcome</MenuButton>
			</div>
		</div>
	)
}
