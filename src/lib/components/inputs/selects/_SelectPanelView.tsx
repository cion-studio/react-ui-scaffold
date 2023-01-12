import { faCaretDown, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { CSSProperties, useEffect, useMemo, useRef, useState } from 'react'
import PanelButton, { PanelButtonRef } from '../../PanelButton/PanelButton'
import { SelectBoxOption } from './SelectBox'

interface BaseProps {
	options: SelectBoxOption[],
	filteredOptions?: SelectBoxOption[],
	onClickOption(v:SelectBoxOption):any,
	wide?:boolean,
	className?:string,
	error?:boolean,
	children?:any,
	onOpen?():void,
	onClose?():void,
	keepOpen?: boolean,
	style?: CSSProperties
}

interface PropsWithSingleValue extends BaseProps {
	value: any
	values?: null | undefined
}

interface PropsWithMultipleValues extends BaseProps {
	values: any[]
	value?: null | undefined
}

export default function SelectPanelView({
	options,
	filteredOptions,
	value,
	values,
	onClickOption,
	wide,
	className,
	error,
	children,
	onOpen,
	onClose,
	keepOpen,
	style,
}: PropsWithSingleValue | PropsWithMultipleValues) {
	const displayOptions = filteredOptions || options
	const panelButtonRef = useRef<PanelButtonRef>(null)
	
	const valuesHash = useMemo(() => {
		if (!values) {
			return {}
		}
		
		return values.reduce((acc, curr) => {
			const opt = options.find(p => p.value === curr)
			acc[curr] = opt
			
			return acc
		}, {})
	}, [values])
	
	const isActive = (option:SelectBoxOption) => {
		if (values) {
			return valuesHash[option.value]
		}
		
		return option.value === value
	}
	
	const multipleValuesLabel = useMemo(() => {
		if (!values) return ''
		
		return values.reduce((acc, curr) => {
			return `${acc}, ${valuesHash[curr].label}`
		}, '').replace(',', '')
	}, [values])
	
	const items = <>
		{children}
		{displayOptions.map((opt, i) => {
			const label = isActive(opt) ? <><FontAwesomeIcon icon={faCheck} /> {opt.label}</> : opt.label
			const color = isActive(opt) ? 'var(--neutralAccentColor)' : ''

			return <button
				className="button plain wide dropdownButtonItem"
				onClick={() => {
					onClickOption(opt)
					!keepOpen && panelButtonRef.current?.close()
				}}
				key={i}
				style={{
					color,
				}}
			>
				{label}
			</button>
		})}
	</>
	
	const [activeOption, setActiveOption] = useState(() => {
		return options.find(opt => opt.value === value)
	})
	
	useEffect(() => {
		const newActive = options.find(opt => opt.value === value)

		if (newActive) {
			setActiveOption(newActive)
		}
	}, [options, value])
	
	const wideClass = wide ? 'wide' : ''
	
	return <PanelButton
		ref={panelButtonRef}
		panelContent={items}
		className={`input SelectBox hollow ${className} ${wideClass} ${error && 'error'}`}
		widePanel
		panelClassName='selectBoxPanel'
		onClose={onClose}
		onOpen={onOpen}
		style={style}
	>
		{!values && <>
			{activeOption?.label || ''} <span className="caret">
				<FontAwesomeIcon icon={faCaretDown} />
			</span>
		</>}
		
		{values && <>
			{multipleValuesLabel}
		</>}
	</PanelButton>
}
