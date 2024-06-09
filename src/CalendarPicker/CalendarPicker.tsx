import { useRef, useState, useMemo, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme as GlobalTheme, getColor } from './theme';
import CalendarIcon from './assets/calendar.svg';
import { MonthView } from './MonthView.tsx';
import { DayView } from './DayView';
import { datesMatch, isDateInRange, sumDaysToDate, sumMonthsToDate, stringifyDate, isLastDayOfMonth, areDatesInChronologicalOrder } from './utils/dates';
import OutsideClickHandler from 'react-outside-click-handler';
import { useEscape } from './hooks/useEscape';

const TODAY = new Date();

type CalenderPickerProps = {
	theme?: 'light' | 'dark';
	onChange?: (startDate: Date | undefined, endDatE: Date | undefined) => void;
};

const SHORTCUTS = [
	{ label: '7 days', onClick: (date: Date) => sumDaysToDate(date, 7) },
	{ label: '15 days', onClick: (date: Date) => sumDaysToDate(date, 15) },
	{ label: '30 days', onClick: (date: Date) => sumDaysToDate(date, 30) },
	{ label: '1 month', onClick: (date: Date) => sumMonthsToDate(date, 1) },
	{ label: '3 months', onClick: (date: Date) => sumMonthsToDate(date, 3) },
];

export function CalendarPicker({ onChange, theme = 'light' }: CalenderPickerProps) {
	const root = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	const [visibleDate, setVisibleDate] = useState(TODAY);
	const [startDate, setStartDate] = useState<Date | undefined>(undefined);
	const [endDate, setEndDate] = useState<Date | undefined>(undefined);

	useEffect(() => {
		if (startDate && endDate && !areDatesInChronologicalOrder(startDate, endDate)) {
			setStartDate(endDate);
			setEndDate(startDate);
		}
	}, [endDate, startDate]);

	const DayButton = useMemo(
		() =>
			function ({ date, index }: { date: Date; index: number }) {
				const shift = index === 0 ? date.getDay() + 1 : 0; // shift first day based on which day of the week it lands on
				const isSelected = (startDate && datesMatch(date, startDate)) || (endDate && datesMatch(date, endDate)) || false;
				const isToday = datesMatch(date, TODAY);
				const inRange = !isSelected && startDate && endDate ? isDateInRange(date, startDate, endDate) : false;

				const isFirstInRange = inRange && (index === 0 || date.getDay() === 0 || datesMatch(sumDaysToDate(date, -1), startDate));
				const isLastInRange = inRange && (isLastDayOfMonth(date) || date.getDay() === 6 || datesMatch(sumDaysToDate(date, 1), endDate));

				function onDayClick() {
					if (!startDate) {
						return setStartDate(date);
					}

					if (!endDate && datesMatch(date, startDate)) {
						return setStartDate(undefined);
					}

					if (datesMatch(date, endDate)) {
						return setEndDate(undefined);
					}

					if (!datesMatch(date, startDate)) {
						return setEndDate(date);
					}
				}

				return (
					<DayView
						$shift={shift}
						$isSelected={isSelected}
						$isToday={isToday}
						$inRange={inRange}
						$isFirstInRange={isFirstInRange}
						$isLastInRange={isLastInRange}
						data-merge={isSelected}
						onClick={onDayClick}
					>
						<span>{date.getDate()}</span>
					</DayView>
				);
			},
		[endDate, startDate]
	);

	function sumVisibleDate(amount: number) {
		setVisibleDate(sumMonthsToDate(visibleDate, amount));
	}

	function onButtonClick() {
		setIsOpen(!isOpen);
	}

	useEscape(() => setIsOpen(false));

	useEffect(() => {
		if (onChange && isOpen && !(startDate && endDate && !areDatesInChronologicalOrder(startDate, endDate))) {
			onChange(startDate, endDate);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [startDate, endDate, onChange]);

	return (
		<ThemeProvider theme={GlobalTheme[theme]}>
			<OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
				<Container ref={root}>
					<CalendarButton $selected={isOpen} onClick={onButtonClick}>
						<img src={CalendarIcon} />
						<ButtonLabel>
							{(!startDate || !endDate) && <span>Select date</span>}
							{startDate && endDate && (
								<span>
									{stringifyDate(startDate)} — {stringifyDate(endDate)}
								</span>
							)}
						</ButtonLabel>
					</CalendarButton>
					{isOpen && (
						<Drawer>
							<CalendarView>
								{[visibleDate, sumMonthsToDate(visibleDate, 1)].map((monthDate, index) => (
									<MonthView
										date={monthDate}
										DayView={DayButton}
										key={index}
										headerButton={index === 0 ? 'left' : 'right'}
										onHeaderButtonClick={() => sumVisibleDate(index === 0 ? -1 : 1)}
									/>
								))}
							</CalendarView>
							<Shortcuts>
								{SHORTCUTS.map((shortcut, index) => (
									<Button key={index} disabled={!startDate} onClick={() => startDate && setEndDate(shortcut.onClick(startDate))}>
										{shortcut.label}
									</Button>
								))}
							</Shortcuts>
						</Drawer>
					)}
				</Container>
			</OutsideClickHandler>
		</ThemeProvider>
	);
}

export const CalendarView = styled.div`
	display: flex;
`;

const Button = styled.button`
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

interface CalendarButtonProps {
	$selected?: boolean | undefined;
}

const CalendarButton = styled(Button)<CalendarButtonProps>`
	gap: 16px;
	color: ${(props) => getColor(props.$selected ? 'neutral-12' : 'neutral-10')};
`;

const ButtonLabel = styled.span`
	position: relative;

	display: inline-block;

	&:before {
		content: '00/00/0000 — 00/00/0000'; // reserve space for full date
		visibility: hidden;
		pointer-events: none;
	}

	> * {
		position: absolute;
		top: 0;
		left: 0;
	}
`;

const Shortcuts = styled.div`
	display: flex;
	gap: 16px;
	padding: 16px 24px 24px 24px;
`;

const Drawer = styled.div`
	position: absolute;
	left: 0;
	top: 100%;
	margin-top: 16px;

	border: 1px solid ${getColor('neutral-5')};
	border-radius: 12px;
	background-color: ${getColor('neutral-1')};
	box-shadow: 0px 16px 32px 0px hsla(0, 0%, 0%, 0.04);
	
	z-index: 2;
`;

const Container = styled.div`
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

	position: relative;

	font-family: 'Roboto Mono', monospace;
	font-size: 14px;
	font-weight: 400px;
	/* letter-spacing: -0.05em; */
`;
