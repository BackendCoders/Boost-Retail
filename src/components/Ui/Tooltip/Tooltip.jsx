/** @format */

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './tooltip.css';

export default function Tooltip({ content, children, ...props }) {
	return (
		<Tippy
			content={content}
			animation='shift-away'
			theme='custom'
			placement='bottom'
			offset={[15, 20]}
			arrow={false}
			{...props}
		>
			{children}
		</Tippy>
	);
}
