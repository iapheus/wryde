'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeChanger() {
	const { theme, setTheme } = useTheme();

	function changer() {
		if (theme == 'dark') setTheme('light');
		if (theme == 'light') setTheme('dark');
	}

	return (
		<>
			{theme == 'dark' ? (
				<Sun
					className="mx-3 my-1 z-50 hover:cursor-pointer"
					onClick={() => changer()}
				></Sun>
			) : (
				<Moon
					className="mx-3 my-1 z-50 hover:cursor-pointer"
					onClick={() => changer()}
				></Moon>
			)}
		</>
	);
}
