import { createContext } from 'react'

export const PanelButtonContext = createContext({
	z: 900,
	hasParentMenu: false,
	parent: window as any,
	parentOpen: false,
})
