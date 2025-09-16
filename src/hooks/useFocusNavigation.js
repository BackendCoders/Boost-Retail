/** @format */

import { useRef } from 'react';

export default function useRowFocusNavigation() {
	const inputRefs = useRef([]);

	const registerRef = (index) => (el) => {
		inputRefs.current[index] = el;
	};

	const focusFirst = () => {
		if (inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
	};

	const handleKeyDown = (index, onLastEnter) => (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			const next = inputRefs.current[index + 1];

			if (next) {
				next.focus();
			} else if (onLastEnter) {
				// last input reached
				onLastEnter();
			}
		}
	};

	return { registerRef, handleKeyDown, focusFirst };
}
