# React Calendar Picker

Implementation of Significa's Front-end [Calendar Picker challenge](https://github.com/significa/frontend-challenge/tree/main/calendar-picker).

[→ Demo](https://andrre-ls.github.io/react-calendar-picker/)


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
			<CalendarPicker onChange={onChange} theme="light" />
		</div>
	);
}
```

## Development

1. Ensure you are using a compatible node version (see [.nvmrc](./.nvmrc))
2. Install the dependencies with `npm install`.
3. Start the development server using `npm run dev`.

## Build

1. Run `npm run build`
2. Optionally, preview the build locally with `npm run preview`.


## Fonts

1. Inter ([Google Fonts](https://fonts.google.com/specimen/Inter?query=inter))
1. Roboto Mono ([Google Fonts](https://fonts.google.com/specimen/Roboto+Mono?query=roboto+mono))
