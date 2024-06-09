import styled from 'styled-components';
import { useMemo } from 'react';
import { getColor } from './theme';
import { getDateMonthName, destructureDate, getAllDaysInMonth } from './utils/dates';
import { BaseDayStyles } from './DayView';

const ABBR_WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

type MonthViewProps = {
	date: Date;
	DayView: React.ComponentType<{
		date: Date;
		index: number;
	}>;
	headerButton: 'left' | 'right' | false;
	onHeaderButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export function MonthView({ date, DayView, headerButton = false, onHeaderButtonClick }: MonthViewProps) {
	const days = useMemo(() => {
		const { month, year } = destructureDate(date);

		return getAllDaysInMonth(month, year);
	}, [date]);

	return (
		<Container>
			<Header>
				{headerButton === 'left' && (
					<HeaderButton onClick={onHeaderButtonClick}>
						<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M11.5 6.5L7.5 10.5L11.5 14.5" strokeWidth="1.4" strokeLinejoin="round" />
						</svg>
					</HeaderButton>
				)}
				<Title>
					<span>{getDateMonthName(date)}</span> — <span>{date.getUTCFullYear()}</span>
				</Title>
				{headerButton === 'right' && (
					<HeaderButton onClick={onHeaderButtonClick}>
						<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.5 14.5L12.5 10.5L8.5 6.5" strokeWidth="1.4" strokeLinejoin="round" />
						</svg>
					</HeaderButton>
				)}
			</Header>
			<Calendar>
				{ABBR_WEEK_DAYS.map((abbr, index) => (
					<abbr key={index}>{abbr}</abbr>
				))}
				{days.map((dayDate, index) => (
					<DayView date={dayDate} key={index} index={index} />
				))}
			</Calendar>
		</Container>
	);
}

const Calendar = styled.time`
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

const Title = styled.div`
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

const HeaderButton = styled.button`
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

const Header = styled.header`
	display: grid;
	grid-template-columns: 44px auto 44px;
	justify-items: center;
	align-items: center;
`;

const Container = styled.div`
	padding: 24px 24px 16px 24px;
`;
