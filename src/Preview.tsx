import { CalendarPicker } from './CalendarPicker';
import styled, { createGlobalStyle } from 'styled-components';

export function Preview() {
	function onChange(startDate: Date | undefined, endDate: Date | undefined) {
		console.table({
			start: startDate,
			end: endDate,
		});
	}

	return (
		<PreviewLayout>
			<CalendarPicker onChange={onChange} />
			<CalendarPicker onChange={onChange} theme="dark" />
			<GlobalStyles />
		</PreviewLayout>
	);
}

const GlobalStyles = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
	}
	
	

`;

const PreviewLayout = styled.div`
	min-height: 100vh;

	padding: clamp(24px, 10vw, 64px);
	display: flex;
	flex-direction: column;
	gap: 24px;

	background-color: hsla(0, 0%, 97%, 1);
`;
