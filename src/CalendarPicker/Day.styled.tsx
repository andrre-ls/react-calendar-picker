import styled, { css } from 'styled-components';
import { getColor, getGradient } from './theme';

export const BaseDayStyles = css`
	width: 48px;
	height: 48px;

	display: flex;
	justify-content: center;
	align-items: center;

	font-family: 'Roboto Mono', monospace;
	font-weight: 500;
	font-size: 14px;
	color: ${getColor('neutral-10')};
`;

interface DayViewProps {
	$shift: number;
	$isToday: boolean;
	$isSelected: boolean;
	$inRange: boolean;
	$isFirstInRange: boolean;
	$isLastInRange: boolean;
}

export const Day = styled.div<DayViewProps>`
	${BaseDayStyles}

	position: relative;
	grid-column-start: ${(props) => props.$shift ?? 0};

	--color: ${getColor('neutral-10')};
	color: var(--color);
	background-color: transparent;
	border: none;

	cursor: pointer;

	// button background
	&:before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 12px;
		pointer-events: none;
	}

	&[data-merge='true'] + [data-merge='true']:before {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	&[data-merge='true']:has(+ [data-merge='true']):before {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	${(props) =>
		props.$isToday &&
		css`
			--color: ${getColor('neutral-12')};

			&:after {
				content: '';
				position: absolute;
				width: 4px;
				height: 4px;
				left: calc(50% - 2px);
				bottom: 8px;

				border-radius: 100%;
				background-color: var(--color);
			}
		`};

	${(props) =>
		props.$inRange &&
		css`
			--color: ${getColor('neutral-12')};
			background-color: ${getColor('neutral-3')};
		`};

	${(props) =>
		props.$isSelected
			? css`
					--color: ${getColor('neutral-1')};
					box-shadow: 0px 6px 12px 0px hsla(0, 0%, 0%, 0.06);

					&:before {
						background-color: ${getColor('neutral-12')};
					}
			  `
			: css`
					&:hover:before {
						background-color: ${getColor('neutral-4')};
					}
			  `};

	${(props) =>
		(props.$isFirstInRange || props.$isLastInRange) &&
		css`
			background: ${getGradient(props.$isFirstInRange && props.$isLastInRange ? 'fade-edges' : props.$isFirstInRange ? 'fade-left' : 'fade-right')};
		`};

	> * {
		position: relative;
	}
`;
