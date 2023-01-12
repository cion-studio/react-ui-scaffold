import React, { CSSProperties } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PanelButton, { DropdownDirection } from '../PanelButton/PanelButton'

export interface DropdownItem {
	label: any,
	icon?: IconProp | any,
	onClick?(): void,
	color?: string
}

interface Props{
	children: any,
	items: DropdownItem[],
	style?: CSSProperties,
	className?: string,
	direction?: DropdownDirection,
	widePanel?: boolean,
	panelClassName?: string,
}

export default function DropdownButton({
	children,
	items,
	style,
	className,
	direction,
	widePanel,
	panelClassName,
}:Props) {
	const panelContent = items.map((t, i) => <button
		key={i}
		className="button plain wide dropdownButtonItem"
		style={{ color: t.color }}
		onClick={t.onClick}
	>
		{t.icon && <span className="icon">
			<FontAwesomeIcon icon={t.icon} />
		</span>}

		{t.label}
	</button>)
	
	return (
		<PanelButton
			widePanel = {widePanel}
			className={className}
			panelClassName={panelClassName}
			style={style}
			panelContent={panelContent}
			direction={direction}
			autoClose
		>{children}</PanelButton>
	)
}
