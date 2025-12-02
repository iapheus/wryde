'use client';

import { useState, useEffect, useCallback } from 'react';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import { useTheme } from 'next-themes';
import { API_BASE } from '@/lib/constants';
import Link from 'next/link';

interface CarDocument {
	id: string;
	brand: string;
	model: string;
}

export default function CarouselInput() {
	const { theme } = useTheme();
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<CarDocument[]>([]);
	const [dataLoading, setDataLoading] = useState(false);

	const fetchResults = useCallback(async (searchQuery: string) => {
		if (searchQuery.length < 2) {
			setResults([]);
			return;
		}

		setDataLoading(true);
		try {
			const response = await fetch(`${API_BASE}/elastic/${searchQuery}`);

			if (!response.ok) {
				setResults([]);
				return;
			}

			const data = await response.json();
			setResults(data as CarDocument[]);
		} catch (error) {
			setResults([]);
		} finally {
			setDataLoading(false);
		}
	}, []);

	useEffect(() => {
		const handler = setTimeout(() => {
			fetchResults(query);
		}, 300);

		return () => {
			clearTimeout(handler);
		};
	}, [query, fetchResults]);

	return (
		<div className="mt-6 w-full max-w-md mx-auto px-4 sm:px-0">
			<InputGroup className="bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-600 rounded shadow-md">
				<InputGroupInput
					onChange={(e) => setQuery(e.target.value)}
					value={query}
					placeholder="Search by brand or model..."
					className="bg-transparent text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
				/>
				<InputGroupAddon>
					{dataLoading && (
						<Spinner color={theme === 'dark' ? 'white' : 'gray'} />
					)}
				</InputGroupAddon>
			</InputGroup>

			{(query.length >= 1 || dataLoading) && (
				<div className="w-full mt-4 p-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-600 rounded shadow-md max-h-[300px] overflow-y-auto">
					{dataLoading ? (
						<p className="text-center text-gray-500 dark:text-gray-400 py-4">
							Searching...
						</p>
					) : results.length > 0 ? (
						results.map((car) => (
							<div
								key={car.id}
								className="mb-3 pb-3 border-b border-gray-200 dark:border-neutral-700 last:mb-0 last:pb-0 last:border-b-0"
							>
								<Link
									href={`/car/${car.id}`}
									className="text-lg font-medium leading-tight"
								>
									{car.brand} {car.model}
								</Link>
							</div>
						))
					) : (
						<p className="text-center text-gray-500 dark:text-gray-400 py-4">
							No results found for "{query}".
						</p>
					)}
				</div>
			)}
		</div>
	);
}
