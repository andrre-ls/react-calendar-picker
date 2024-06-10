import { styled } from 'styled-components';
import { getColor } from './theme';

export const Button = styled.button`
	display: flex;
	gap: 16px;
	align-items: center;
	padding: 12px 16px;

	font-family: 'Inter', sans-serif;
	font-weight: 500;
	font-size: 14px;
	line-height: 1.2;
	white-space: nowrap;

	color: ${getColor('neutral-10')};
	border: 1px solid ${getColor('neutral-5')};
	border-radius: 8px;
	background-color: ${getColor('neutral-1')};
	box-shadow: 0px 2px 4px 0px hsla(0, 0%, 0%, 0.02);

	cursor: pointer;

	transition: color 0.2s ease-out;
	transition-property: color, background-color;

	&:focus-visible {
		outline: none;
		border-color: ${getColor('neutral-12')};
	}

	&:hover {
		color: ${getColor('neutral-12')};
	}

	&:active {
		background-color: ${getColor('neutral-4')};
	}

	&:disabled {
		opacity: 0.5;
		background-color: ${getColor('neutral-2')};
		pointer-events: none;
	}
`;
