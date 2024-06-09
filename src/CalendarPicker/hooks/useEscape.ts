import { useEffect } from 'react';

export function useEscape(onEscape: (event: React.KeyboardEvent<HTMLButtonElement>) => void) {
	useEffect(() => {
		// @ts-ignore
		function handler(event) {
			if (event.keyCode === 27) {
				onEscape(event);
			}
		}

		window.addEventListener('keydown', handler);

		return () => {
			window.removeEventListener('keydown', handler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
}
