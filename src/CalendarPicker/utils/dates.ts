export function getDateMonthName(date: Date) {
	return date.toLocaleString('default', { month: 'long' });
}

export function destructureDate(date: Date) {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	return { year, month, day };
}

// convert Date object to dd[divider]mm[divider]yyyy
export function stringifyDate(date: Date, divider: string = '/') {
	const { year, month, day } = destructureDate(date);

	let transformedMonth = month.toString();
	let transformedDay = day.toString();

	if (transformedMonth.length < 2) {
		transformedMonth = `0${month}`;
	}

	if (transformedDay.length < 2) {
		transformedDay = `0${day}`;
	}

	return [transformedDay, transformedMonth, year].join(divider);
}

export function getAllDaysInMonth(month: number, year: number) {
	const currentDate = new Date(year, month - 1, 1);
	const days = [];

	while (currentDate.getMonth() === month - 1) {
		days.push(new Date(currentDate));
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return days;
}

export function datesMatch(dateA: Date | undefined, dateB: Date | undefined) {
	if (dateA && dateB) {
		return dateA.toDateString() === dateB.toDateString();
	} else {
		return false;
	}
}

export function isDateInRange(date: Date, dateRangeStart: Date, dateRangeEnd: Date) {
	if (date && dateRangeStart && dateRangeEnd) {
		const startValue = dateRangeStart.valueOf();
		const endValue = dateRangeEnd.valueOf();

		const value = date.valueOf();
		const min = Math.min(startValue, endValue);
		const max = Math.max(startValue, endValue);

		return value >= min && value <= max;
	} else {
		return false;
	}
}

export function sumDaysToDate(date: Date, numDays: number) {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + numDays);

	return newDate;
}

export function sumMonthsToDate(start: Date, numMonths: number) {
	const newDate = new Date(start);
	newDate.setMonth(newDate.getMonth() + numMonths);

	return newDate;
}

export function isLastDayOfMonth(date: Date) {
	return date.getMonth() !== sumDaysToDate(date, 1).getMonth();
}

export function areDatesInChronologicalOrder(dateA: Date, dateB: Date) {
	return dateA.valueOf() <= dateB.valueOf();
}
