# React Calendar Picker

Significa Front-end [Calendar Picker challenge](https://github.com/significa/frontend-challenge/tree/main/calendar-picker). Implemented in ~4 hours.

## Usage

```tsx
import { useState } from 'react';
import CalendarPicker from './CalenderPicker';

function MyApp() {
	const [range, setRange] = useState<[Date | undefined]>();

	function onChange(startDate, endDate) {
		setRange([startDate, endDate]);
	}

	return (
		<div>
			<CalendarPicker onChange={onChange} />
		</div>
	);
}
```

## Development

1. Ensure you are using a compatible node version (see [.nvmrc](./.nvmrc)
2. Install the dependencies with `npm install`.
3. Start the development server using `npm run dev`.

## Build

1. Run `npm run build`
2. Optionally, preview the build locally with `npm run preview`.
