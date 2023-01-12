import React, { useMemo } from 'react'
import { ReportingMonth } from '../../../../../../common/types/DateTypes'
import { MONTHS, YEARS } from '../../../../utils/dateUtils'
import SelectBox from './SelectBox'
import './ReportingMonthSelector.css'

interface Props {
	onValueChange(newValue: ReportingMonth): any
	value: ReportingMonth,
	wide?: boolean,
	error?: any,
	className?: string,
}

const MONTH_OPTIONS = MONTHS.map(m => ({
	label: m,
	value: m,
}))

const YEAR_OPTIONS = YEARS.map(y => ({
	label: y.toString(),
	value: y.toString(),
}))

export default function ReportingMonthSelector({
	onValueChange,
	value,
	wide,
	error,
	className,
}:Props) {
	const [month, year] = useMemo(() => value.split('-'), [value])
	
	const changeHandler = (index:number, value:string | number) => {
		const builder = [month, year]
		builder[index] = value.toString()
		onValueChange(builder.join('-') as any)
	}
	
	return (
		<span className={`ReportingMonthSelector ${wide ? 'wide' : ''}`}>
			<SelectBox
				className={`${className} monthSelector selector`}
				options={MONTH_OPTIONS}
				value={month}
				onValueChange={(newValue) => changeHandler(0, newValue.value)}
				error={error}
			/>
			
			<SelectBox
				className={`${className} yearSelector selector`}
				options={YEAR_OPTIONS}
				value={year}
				onValueChange={(newValue) => changeHandler(1, newValue.value)}
				error={error}
			/>
		</span>
	)
}
