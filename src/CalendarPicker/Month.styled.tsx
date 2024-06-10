import styled from 'styled-components';
import { getColor } from './theme';
import { BaseDayStyles } from './Day.styled';

export const MonthViewCalendar = styled.main`
	width: fit-content;
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	gap: 4px 0;

	align-items: center;
	text-align: center;

	abbr {
		${BaseDayStyles};
	}
`;

export const MonthViewTitle = styled.div`
	grid-column: 2;
	padding: 16px 0;

	font-size: 16px;
	color: ${getColor('neutral-7')};

	> *:nth-child(1) {
		color: ${getColor('neutral-12')};
		font-family: 'Inter', sans-serif;
		font-weight: 510;
	}

	> *:nth-child(2) {
		color: ${getColor('neutral-11')};
	}
`;

export const MonthViewHeaderButton = styled.button`
	${BaseDayStyles};

	background-color: transparent;
	border: none;
	border-radius: 12px;

	cursor: pointer;

	&:hover {
		background-color: ${getColor('neutral-4')};
	}

	svg {
		width: 20px;
		height: 20px;

		stroke: ${getColor('neutral-12')};
	}
`;

export const MonthViewHeader = styled.header`
	display: grid;
	grid-template-columns: 44px auto 44px;
	justify-items: center;
	align-items: center;
`;

export const MonthView = styled.div`
	padding: 24px 24px 16px 24px;
`;
