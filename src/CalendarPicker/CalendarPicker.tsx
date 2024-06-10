import { useRef, useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import OutsideClickHandler from 'react-outside-click-handler';
import { theme as GlobalTheme, getColor } from './theme';
import { useEscape } from './hooks/useEscape';
import CalendarIcon from './assets/calendar.svg';
import { Day } from './Day.styled';
import { MonthView, MonthViewHeader, MonthViewHeaderButton, MonthViewTitle, MonthViewCalendar } from './Month.styled';
import {
	datesMatch,
	isDateInRange,
	sumDaysToDate,
	sumMonthsToDate,
	stringifyDate,
	isLastDayOfMonth,
	areDatesInChronologicalOrder,
	getDateMonthName,
	destructureDate,
	getAllDaysInMonth,
} from './utils/dates';

import { Button } from './Button.styled';

const TODAY = new Date();

// TODO: should be a prop
const SHORTCUTS = [
	{ label: '7 days', onClick: (date: Date) => sumDaysToDate(date, 7) },
	{ label: '15 days', onClick: (date: Date) => sumDaysToDate(date, 15) },
	{ label: '30 days', onClick: (date: Date) => sumDaysToDate(date, 30) },
	{ label: '1 month', onClick: (date: Date) => sumMonthsToDate(date, 1) },
	{ label: '3 months', onClick: (date: Date) => sumMonthsToDate(date, 3) },
];

const ABBR_WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export type CalenderPickerProps = {
	theme?: 'light' | 'dark';
	onChange?: (startDate: Date | undefined, endDatE: Date | undefined) => void;
};

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

	useEscape(() => setIsOpen(false));

	useEffect(() => {
		if (onChange && isOpen && !(startDate && endDate && !areDatesInChronologicalOrder(startDate, endDate))) {
			onChange(startDate, endDate);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [startDate, endDate, onChange]);

	function onCalendarButtonClick() {
		setIsOpen(!isOpen);
	}

	function sumVisibleDate(amount: number) {
		setVisibleDate(sumMonthsToDate(visibleDate, amount));
	}

	function onDayClick(date: Date) {
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

	function computeDayProps(date: Date, index: number) {
		const shift = index === 0 ? date.getDay() + 1 : 0; // shift first day based on which day of the week it lands on
		const isSelected = (startDate && datesMatch(date, startDate)) || (endDate && datesMatch(date, endDate)) || false;
		const isToday = datesMatch(date, TODAY);
		const inRange = !isSelected && startDate && endDate ? isDateInRange(date, startDate, endDate) : false;

		const isFirstInRange = inRange && (index === 0 || date.getDay() === 0 || datesMatch(sumDaysToDate(date, -1), startDate));
		const isLastInRange = inRange && (isLastDayOfMonth(date) || date.getDay() === 6 || datesMatch(sumDaysToDate(date, 1), endDate));

		const merge = isSelected && !(startDate && endDate && (startDate.getDay() === 0 || endDate.getDay() === 0) && startDate.getDay() + endDate.getDay() === 6);

		return {
			$shift: shift,
			$isSelected: isSelected,
			$isToday: isToday,
			$inRange: inRange,
			$isFirstInRange: isFirstInRange,
			$isLastInRange: isLastInRange,
			'data-merge': merge,
		};
	}

	return (
		<ThemeProvider theme={GlobalTheme[theme]}>
			<OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
				<Container ref={root}>
					<CalendarButton $selected={isOpen && !!startDate && !!endDate} onClick={onCalendarButtonClick}>
						<img src={CalendarIcon} alt="calendar icon" />
						<CalendarButtonLabel>
							{(!startDate || !endDate) && <span>Select date</span>}
							{startDate && endDate && (
								<span>
									{stringifyDate(startDate)} — {stringifyDate(endDate)}
								</span>
							)}
						</CalendarButtonLabel>
					</CalendarButton>
					{isOpen && (
						<Drawer>
							<CalendarView>
								{[visibleDate, sumMonthsToDate(visibleDate, 1)].map((monthDate, index) => {
									const { month, year } = destructureDate(monthDate);
									const days = getAllDaysInMonth(month, year);

									return (
										<MonthView key={index}>
											<MonthViewHeader>
												{index === 0 && (
													<MonthViewHeaderButton onClick={() => sumVisibleDate(-1)}>
														<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M11.5 6.5L7.5 10.5L11.5 14.5" strokeWidth="1.4" strokeLinejoin="round" />
														</svg>
													</MonthViewHeaderButton>
												)}
												<MonthViewTitle>
													<span>{getDateMonthName(monthDate)}</span> — <span>{monthDate.getUTCFullYear()}</span>
												</MonthViewTitle>
												{index !== 0 && (
													<MonthViewHeaderButton onClick={() => sumVisibleDate(1)}>
														<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M8.5 14.5L12.5 10.5L8.5 6.5" strokeWidth="1.4" strokeLinejoin="round" />
														</svg>
													</MonthViewHeaderButton>
												)}
											</MonthViewHeader>
											<MonthViewCalendar>
												{ABBR_WEEK_DAYS.map((abbr, index) => (
													<abbr key={index}>{abbr}</abbr>
												))}
												{days.map((date, index) => (
													<Day key={index} onClick={() => onDayClick(date)} {...computeDayProps(date, index)}>
														<span>{date.getDate()}</span>
													</Day>
												))}
											</MonthViewCalendar>
										</MonthView>
									);
								})}
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

const Shortcuts = styled.div`
	display: flex;
	gap: 16px;
	padding: 16px 24px 24px 24px;
`;

const CalendarView = styled.div`
	display: flex;
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

	animation: enter-animation 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);

	@keyframes enter-animation {
		0% {
			opacity: 0;
			transform: translateY(8px);
		}
		100% {
			opacity: 1;
			transform: translateY(0%);
		}
	}
`;

interface CalendarButtonProps {
	$selected?: boolean | undefined;
}

const CalendarButton = styled(Button)<CalendarButtonProps>`
	gap: 16px;
	color: ${(props) => getColor(props.$selected ? 'neutral-12' : 'neutral-10')};
`;

const CalendarButtonLabel = styled.span`
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

const Container = styled.div`
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

	position: relative;

	font-family: 'Roboto Mono', monospace;
	font-size: 14px;
	font-weight: 400px;
	/* letter-spacing: -0.05em; */
`;
