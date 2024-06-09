export const theme = {
	colors: {
		'neutral-1': 'hsla(0, 0%, 99%, 1)',
		'neutral-2': 'hsla(0, 0%, 97%, 1)',
		'neutral-3': 'hsla(0, 0%, 95%, 1)',
		'neutral-4': 'hsla(0, 0%, 93%, 1)',
		'neutral-5': 'hsla(0, 0%, 91%, 1)',
		'neutral-7': 'hsla(0, 0%, 86%, 1)',
		'neutral-10': 'hsla(0, 0%, 52%, 1)',
		'neutral-11': 'hsla(0, 0%, 44%, 1)',
		'neutral-12': 'hsla(0, 0%, 9%, 1)',
	},
};

export function getColor(name: string) {
	// @ts-ignore
	return (props) => props.theme.colors[name];
}
