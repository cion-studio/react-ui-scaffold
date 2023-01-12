import React, { useRef, useState } from 'react'
import Loading from '../../Loading/Loading'
import '../inputs.css'
import TextBox from '../TextBox'
import { SelectBoxOption } from './SelectBox'
import './SelectBox.css'
import SelectPanelView from './_SelectPanelView'

interface Props {
	onValueChange(newValue: SelectBoxOption): any
	value: SelectBoxOption,
	wide?: boolean,
	error?: any,
	className?: string,
	options: SelectBoxOption[],
	fetchOptions(searchString: string): Promise<SelectBoxOption[]> | SelectBoxOption[],
}

export default function AsyncSelectSearch({
	className,
	value,
	wide,
	error,
	onValueChange,
	fetchOptions,
}: Props) {
	const textBoxRef = useRef<HTMLInputElement>()
	const [search, setSearch] = useState('')
	const [isLoading, setIsLoading] = useState(true)

	const [filteredOptions, setFilteredOptions] = useState<SelectBoxOption[]>([])
	
	const debounced = useRef<any>()
	
	const changeHandler = async (e:any) => {
		setSearch(e.target.value)
		
		clearTimeout(debounced.current)
		setIsLoading(true)
		
		debounced.current = setTimeout(async () => {
			const newOptions = await fetchOptions(e.target.value)
			setFilteredOptions(newOptions)
			setIsLoading(false)
		}, 500)
	}
	
	const openHandler = () => {
		textBoxRef.current && textBoxRef.current.focus()
		
		debounced.current = setTimeout(async () => {
			const newOptions = await fetchOptions('')
			setFilteredOptions(newOptions)
			setIsLoading(false)
		}, 0)
	}

	return (
		<SelectPanelView
			wide={wide}
			error={error}
			className={className}
			value={value}
			onClickOption={onValueChange}
			options={filteredOptions}
			onOpen={openHandler}
			onClose={() => textBoxRef.current && textBoxRef.current.blur()}
		>
			<div className="searchContainer">
				<TextBox
					placeholder='Search'
					wide
					ref={textBoxRef}
					value={search}
					onChange={changeHandler}
				/>
				{isLoading && <Loading className='spinner'/>}
				<div className="line"></div>
			</div>
		</SelectPanelView>
	)
}
