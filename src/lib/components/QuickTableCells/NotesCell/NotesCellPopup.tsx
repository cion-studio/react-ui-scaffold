import React, { useState } from 'react'
import AsyncButton from '../../AsyncButton'
import CommentBox from '../../inputs/CommentBox'
import Popup from '../../Popup/Popup'

interface Props{
	notes: any,
	row: any,
	isOpen: boolean,
	setIsOpen(p:boolean):void
	onEdit?(row: any, newValue: string): Promise<any> | any
}

export default function NotesCellPopup({ isOpen, setIsOpen, notes, onEdit, row }:Props) {
	const [text, setText] = useState(notes)
	
	const submitHandler = async () => {
		if (onEdit) {
			await onEdit(row, text)
			setIsOpen(false)
		}
	}
	
	return (
		<Popup
			visible={isOpen}
			setVisible={setIsOpen}
			title='Notes'
			style={{
				minWidth: 'min(100%, 500px)',
			}}
		>
			{onEdit ? <>
				<CommentBox
					wide
					value={text}
					onChange={e => setText(e.target.value)}
				/>
				<AsyncButton
					className='wide'
					onClick={submitHandler}
				>Save</AsyncButton>
			</> : notes}
		</Popup>
	)
}
