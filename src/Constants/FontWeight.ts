// Use constant object instead of enum because enum cannot have number key
const FontWeight = {
	Normal: 'normal',
	Bold: 'bold',
	'100': '100',
	'200': '200',
	'300': '300',
	'400': '400',
	'500': '500',
	'600': '600',
	'700': '700',
	'800': '800',
	'900': '900',
} as const

export default FontWeight
