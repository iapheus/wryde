'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Filter, ListFilter, Search, Car } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import CarCard from '@/components/Explore/CarCard';
import FilterSidebar from '@/components/Explore/FilterSidebar';

import { API_BASE, initialFilters, defaultSortBy } from '@/lib/constants';

interface CarDetails {
	Id: string;
	Brand: string;
	Model: string;
	Year: number;
	FuelType: string;
	Transmission: string;
	EngineVolume: number | null;
	Horsepower: number;
	Torque: number;
	Segment: string;
	Doors: number;
	Seats: number;
	Drivetrain: string;
	BodyType: string;
	FuelConsumptionCity: number;
	FuelConsumptionHighway: number;
	TopSpeed: number;
	LuggageVolume: number;
	HasSunroof: boolean;
	HasCruiseControl: boolean;
	HasParkingSensors: boolean;
	HasLaneAssist: boolean;
	HasBlindSpotMonitor: boolean;
	CoverImage: string;
	Gallery: string[] | null;
	Description: string;
	CreatedAt: string;
	UpdatedAt: string;
}

interface CarData {
	Car: CarDetails;
	ExperienceCount: number;
}

const page = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const searchInputRef = React.useRef<HTMLInputElement>(null);

	const [allCars, setAllCars] = useState<CarData[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>(
		{}
	);
	const [sortBy, setSortBy] = useState<string>(defaultSortBy);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [isSearchFocused, setIsSearchFocused] = useState(false);
	const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
	const [page, setPage] = useState(0);
	const [hasMore, setHasMore] = useState(true);

	const getQueryString = useCallback(() => {
		const params = new URLSearchParams();

		Object.entries(activeFilters).forEach(([key, values]) => {
			if (values.length > 0) {
				params.set(key, values.join(','));
			}
		});

		if (sortBy !== defaultSortBy) {
			params.set('sort', sortBy);
		}

		if (searchQuery.trim()) {
			params.set('q', searchQuery.trim());
		}

		return params.toString();
	}, [activeFilters, sortBy, searchQuery]);

	const updateUrl = useCallback(
		(
			newFilters: Record<string, string[]>,
			newSortBy: string,
			newQuery: string
		) => {
			const params = new URLSearchParams();

			Object.entries(newFilters).forEach(([key, values]) => {
				if (values.length > 0) {
					params.set(key, values.join(','));
				}
			});

			if (newSortBy !== defaultSortBy) {
				params.set('sort', newSortBy);
			}

			if (newQuery.trim()) {
				params.set('q', newQuery.trim());
			}

			router.push(`?${params.toString()}`);
		},
		[router]
	);

	const fetchData = useCallback(
		async (pageToFetch: number, clearExisting: boolean) => {
			setIsLoading(true);
			setError(null);

			const currentQuery = getQueryString();
			const url = `${API_BASE}/car/${pageToFetch}${
				currentQuery ? `?${currentQuery}` : ''
			}`;

			try {
				const res = await fetch(url);

				if (!res.ok) {
					throw new Error('Failed to fetch car data');
				}

				const newCars: CarData[] = await res.json();

				setAllCars((prevCars) =>
					clearExisting ? newCars : [...prevCars, ...newCars]
				);
				setHasMore(newCars.length > 0);
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError('An unknown error occurred');
				}
			} finally {
				setIsLoading(false);
			}
		},
		[getQueryString]
	);

	useEffect(() => {
		const newActiveFilters: Record<string, string[]> = {};

		Object.keys(initialFilters).forEach((key) => {
			const param = searchParams.get(key);
			if (param) {
				newActiveFilters[key] = param.split(',');
			}
		});

		setActiveFilters(newActiveFilters);

		const sortParam = searchParams.get('sort') || defaultSortBy;
		setSortBy(sortParam);

		const searchParam = searchParams.get('q') || '';
		setSearchQuery(searchParam);

		setPage(0);
	}, [searchParams]);

	useEffect(() => {
		fetchData(page, true);
	}, [activeFilters, sortBy, searchQuery, fetchData]);

	const loadMore = () => {
		const nextPage = page + 1;
		setPage(nextPage);
		fetchData(nextPage, false);
	};

	const toggleFilter = (group: string, value: string) => {
		setActiveFilters((prev) => {
			const current = prev[group] || [];
			const isCurrentlyActive = current.includes(value);

			const updatedFilters = {
				...prev,
				[group]: isCurrentlyActive
					? current.filter((v) => v !== value)
					: [...current, value],
			};

			updateUrl(updatedFilters, sortBy, searchQuery);
			return updatedFilters;
		});
	};

	const handleSortChange = (newSortBy: string) => {
		setSortBy(newSortBy);
		updateUrl(activeFilters, newSortBy, searchQuery);
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const handleSearchSubmit = (queryToSubmit: string) => {
		setIsSearchFocused(false);
		updateUrl(activeFilters, sortBy, queryToSubmit);
	};

	const isFilterActive = (group: string, value: string) =>
		activeFilters[group]?.includes(value);

	const lowerQuery = searchQuery.toLowerCase().trim();

	const searchSuggestions = allCars
		.filter(
			(carData) =>
				carData.Car.Model.toLowerCase().includes(lowerQuery) ||
				carData.Car.Brand.toLowerCase().includes(lowerQuery)
		)
		.slice(0, 5);

	const isCustomSearchOpen = isSearchFocused && lowerQuery.length > 0;

	const handleMobileFilterApply = () => {
		setIsMobileFilterOpen(false);
	};

	return (
		<div className="min-h-screen bg-background text-foreground pt-[80px] md:pt-[96px] pb-12">
			<div className="p-4 md:p-8 max-w-7xl mx-auto">
				<header className="flex flex-col items-center mb-10">
					<div className="relative w-full sm:max-w-xl lg:max-w-3xl mx-auto">
						<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
						<Input
							ref={searchInputRef}
							placeholder="Search by brand, model, or experience..."
							className="pl-12 pr-4 h-14 w-full rounded-full text-base shadow-xl transition-all duration-200 focus:shadow-2xl focus:ring-2 focus:ring-primary/50"
							value={searchQuery}
							onChange={handleSearch}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleSearchSubmit(searchQuery);
								}
							}}
							onFocus={() => setIsSearchFocused(true)}
							onBlur={() => setTimeout(() => setIsSearchFocused(false), 100)}
						/>

						{isCustomSearchOpen && (
							<div className="absolute z-10 top-full mt-2 w-full bg-card text-card-foreground rounded-xl shadow-2xl border border-border">
								{searchSuggestions.length > 0 ? (
									<div className="space-y-1">
										{searchSuggestions.map((carData) => (
											<div
												key={carData.Car.Id}
												className="p-3 hover:bg-accent cursor-pointer flex justify-between items-center transition-colors"
												onMouseDown={(e) => {
													e.preventDefault();
													handleSearchSubmit(
														`${carData.Car.Brand} ${carData.Car.Model}`
													);
												}}
											>
												<span className="font-medium text-primary">
													{carData.Car.Brand}{' '}
													<span className="text-muted-foreground font-normal">
														{carData.Car.Model}
													</span>
												</span>
												<span className="text-sm text-muted-foreground flex items-center gap-1">
													<Car className="w-4 h-4" /> {carData.Car.BodyType}
												</span>
											</div>
										))}
										<div
											className="p-3 text-center bg-secondary hover:bg-secondary/80 cursor-pointer text-sm font-semibold border-t rounded-b-xl"
											onMouseDown={(e) => {
												e.preventDefault();
												handleSearchSubmit(searchQuery);
											}}
										>
											Search all experiences for "{searchQuery}"
										</div>
									</div>
								) : (
									<div className="p-3 text-muted-foreground text-sm">
										No results found.
									</div>
								)}
							</div>
						)}
					</div>

					<div className="flex justify-end w-full sm:max-w-xl lg:max-w-3xl mt-4">
						<Dialog
							open={isMobileFilterOpen}
							onOpenChange={setIsMobileFilterOpen}
						>
							<DialogTrigger asChild>
								<Button
									variant="outline"
									size="sm"
									className="shadow-md lg:hidden flex items-center gap-2"
								>
									<Filter className="w-4 h-4" /> Mobile Filters
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px] h-[90vh] overflow-y-auto">
								<DialogHeader>
									<DialogTitle className="flex items-center gap-2">
										<Filter className="w-5 h-5 text-primary" /> Filter Options
									</DialogTitle>
								</DialogHeader>
								<FilterSidebar
									toggleFilter={toggleFilter}
									isFilterActive={isFilterActive}
									onApplyFilters={handleMobileFilterApply}
								/>
							</DialogContent>
						</Dialog>
					</div>
				</header>

				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
					<aside className="hidden lg:block lg:col-span-1">
						<div className="p-4 space-y-6 bg-card text-card-foreground rounded-lg shadow-xl border border-border/50 h-full transition-colors">
							<FilterSidebar
								toggleFilter={toggleFilter}
								isFilterActive={isFilterActive}
							/>
						</div>
					</aside>

					<main className="lg:col-span-3">
						<div className="flex justify-between items-center mb-6 flex-wrap gap-4 p-2 bg-card/50 rounded-lg border">
							<p className="text-sm text-muted-foreground">
								Showing car experiences: --{allCars.length}--
							</p>

							<div className="flex items-center space-x-2">
								<ListFilter className="w-5 h-5 text-muted-foreground" />
								<span className="text-sm font-medium hidden sm:inline">
									Sort By:
								</span>
								<Select onValueChange={handleSortChange} value={sortBy}>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Sort Option" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="brand_asc">Brand Name (A-Z)</SelectItem>
										<SelectItem value="brand_desc">Brand Name (Z-A)</SelectItem>
										<SelectItem value="year_desc">Newest Model</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						{error && (
							<div className="text-center p-4 bg-red-100 text-red-700 rounded-md mb-6">
								Error fetching data: {error}
							</div>
						)}

						{isLoading && allCars.length === 0 && (
							<div className="text-center p-8 text-muted-foreground">
								Loading cars...
							</div>
						)}

						{!isLoading && allCars.length === 0 && !error && (
							<div className="text-center p-8 text-muted-foreground">
								No cars found matching your criteria.
							</div>
						)}

						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
							{allCars.map((carData) => (
								<CarCard key={carData.Car.Id} carData={carData} />
							))}
						</div>

						<div className="flex justify-center mt-8">
							{hasMore && !isLoading && (
								<Button
									onClick={loadMore}
									variant="outline"
									className="flex items-center gap-2"
								>
									Load More Experiences
								</Button>
							)}
							{isLoading && allCars.length > 0 && (
								<Button
									disabled
									variant="outline"
									className="flex items-center gap-2"
								>
									Loading...
								</Button>
							)}
							{!hasMore && allCars.length > 0 && (
								<p className="text-sm text-muted-foreground">
									You've reached the end of the list.
								</p>
							)}
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default page;
