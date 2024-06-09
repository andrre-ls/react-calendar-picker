import { CalendarPicker } from './CalendarPicker';
import styled, { createGlobalStyle } from 'styled-components';

export function Preview() {
	return (
		<PreviewLayout>
			<CalendarPicker />
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
	display: grid;

	min-height: 100vh;
	place-items: center;
`;
