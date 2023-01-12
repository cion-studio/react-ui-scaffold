import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { QuickTableCellProps } from '../../QuickTable/types/QuickTableTypes'
import { CELL_SPAN_STYLE } from '../cellStyles'
import NotesCellPopup from './NotesCellPopup'

interface Props extends QuickTableCellProps {
	onEdit?(row:any, newValue:string): Promise<any> | any
}

export default function NotesCell({
	cell,
	onEdit,
	row,
}: Props) {
	const [isOpen, setIsOpen] = useState(false)
	
	return (
		<>
			<NotesCellPopup
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				notes={cell}
				onEdit={onEdit}
				key={`${isOpen}`}
				row={row}
			/>
			<span
				style={{
					...CELL_SPAN_STYLE,
					cursor: 'pointer',
					minWidth: '100px',
				}}
				title={cell}
				onClick={() => setIsOpen(true)}
			>
				{(cell && cell.trim) ? cell : <button className="button plain light" onClick={() => setIsOpen(true)}>
					<FontAwesomeIcon icon={faPlus} />
				</button>}
			</span>
		</>
		
	)
}
