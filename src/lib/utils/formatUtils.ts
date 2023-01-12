export function formatCurrency(amount: number) {
	let num = Math.round(amount) / 100

	if (isNaN(num)) {
		return ' - '
	}

	return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num)
}

interface QueryStringParams {
	[name: string]: string | string[] | undefined | number | number[]
}

export function formatQueryString(params: QueryStringParams) {
	let q = '?'

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined) {
			if (value instanceof Object) {
				Object.values(value).map((val, index) => {
					q += `&${key}[${index}]=${val}`
				})
			} else {
				q += `&${key}=${value}`
			}
		}
	})

	return q
}

export const copyToClipboard = (val: any) => navigator.clipboard.writeText(val)
