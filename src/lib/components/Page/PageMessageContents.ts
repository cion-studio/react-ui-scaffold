import { IconProp } from '@fortawesome/fontawesome-svg-core'

export default interface PageMessageContents{
	sticky?:boolean,
	content?: any,
	onClick?():any|void,
	color?:string,
	style?: any,
	loading?:boolean,
	icon?: IconProp,
}
