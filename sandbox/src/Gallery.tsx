import React, { useState } from 'react'
import { ConfirmButton, FreeButton, MultiSelect, PanelButton, SelectBox, SelectSearchBox } from '../../dist'
import { SelectBoxOption } from '../../dist/components/inputs/selects/SelectBox'
import './Gallery.css'

export default function Gallery() {
	const [value, setValue] = useState<SelectBoxOption>({ label: 'Test 3', value: 3 })
	const [values, setValues] = useState<SelectBoxOption[]>([{ label: 'Test 3', value: 3 }])
	
	console.log(values)
	
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
			
			<div className="story">
				<SelectBox
					wide
					options={[
						{label: 'Test 1', value: 1},
						{label: 'Test 2', value: 2},
						{label: 'Test 3', value: 3},
					]}
					onValueChange={setValue}
					value={value}
				/>
				
				<SelectSearchBox
					wide
					options={[
						{ label: 'Test 1', value: 1 },
						{ label: 'Test 2', value: 2 },
						{ label: 'Test 3', value: 3 },
					]}
					onValueChange={setValue}
					value={value}
				/>
				<MultiSelect
					wide
					values={values}
					onValuesChange={setValues}
					options={[
						{ label: 'Test 1', value: 1 },
						{ label: 'Test 2', value: 2 },
						{ label: 'Test 3', value: 3 },
					]}
				/>
			</div>
		</div>
	)
}
