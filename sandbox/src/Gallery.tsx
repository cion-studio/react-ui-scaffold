import React from 'react'
import { ConfirmButton, FreeButton, PanelButton } from '../../dist'
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
				/>
			</div>
			
			<div className="story">
				<PanelButton
					panelContent={()=><div style={{padding: '20px'}}>
						<ConfirmButton
							content={'Cion'}
							expandedContent={'Studio'}
						/>
					</div>}
				>Welcome</PanelButton>
			</div>
		</div>
	)
}
