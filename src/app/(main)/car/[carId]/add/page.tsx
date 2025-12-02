'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star, Car } from 'lucide-react';
import { API_BASE } from '@/lib/constants';

interface CarDetails {
	brand: string;
	model: string;
	year: number;
}

const RatingInput = ({
	label,
	rating,
	setRating,
}: {
	label: string;
	rating: number;
	setRating: (r: number) => void;
}) => {
	return (
		<div className="grid gap-2">
			<Label>{label} *</Label>
			<div className="flex items-center space-x-1">
				{Array.from({ length: 5 }, (_, index) => {
					const starValue = index + 1;
					return (
						<Star
							key={index}
							size={24}
							className={`cursor-pointer transition-colors ${
								starValue <= rating
									? 'fill-yellow-400 text-yellow-400'
									: 'text-gray-300'
							}`}
							onClick={() => setRating(starValue)}
						/>
					);
				})}
				{rating > 0 && (
					<span className="ml-4 text-sm font-semibold">{rating}/5</span>
				)}
			</div>
		</div>
	);
};

export default function AddExperiencePage() {
	const router = useRouter();
	const params = useParams();
	const carId = params.carId as string;

	const [carDetails, setCarDetails] = useState<CarDetails | null>(null);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const [comfortRating, setComfortRating] = useState(0);
	const [fuelRating, setFuelRating] = useState(0);
	const [cityDriveRating, setCityDriveRating] = useState(0);
	const [highwayDriveRating, setHighwayDriveRating] = useState(0);
	const [safetyRating, setSafetyRating] = useState(0);

	const [imageFile, setImageFile] = useState<File | null>(null);
	const [durationOfUse, setDurationOfUse] = useState<number | ''>('');
	const [mileage, setMileage] = useState<number | ''>('');
	const [isLoading, setIsLoading] = useState(false);
	const [fetchError, setFetchError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchCarDetails() {
			if (!carId) return;

			try {
				const response = await fetch(`${API_BASE}/car/${carId}`);
				if (!response.ok) {
					throw new Error('Failed to fetch car details.');
				}
				const data = await response.json();
				setCarDetails(data.result);
			} catch (error) {
				console.error('Car details fetch error:', error);
				setFetchError('Could not load car details.');
			}
		}
		fetchCarDetails();
	}, [carId]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (
			!title ||
			!content ||
			comfortRating === 0 ||
			fuelRating === 0 ||
			safetyRating === 0
		) {
			alert(
				'Please fill in the title, details, and all required rating fields (Comfort, Fuel, Safety).'
			);
			return;
		}

		setIsLoading(true);

		const experiencePayload = {
			CarId: carId,
			Title: title,
			Content: content,
			ComfortRating: comfortRating,
			FuelRating: fuelRating,
			CityDriveRating: cityDriveRating,
			HighwayDriveRating: highwayDriveRating,
			SafetyRating: safetyRating,
			DurationOfUseMonths: durationOfUse === '' ? null : durationOfUse,
			MileageAtReview: mileage === '' ? null : mileage,
		};

		try {
			const token = localStorage.getItem('authToken');
			const headers: HeadersInit = {
				'Content-Type': 'application/json',
			};
			if (token) {
				headers['Authorization'] = `Bearer ${token}`;
			}

			const response = await fetch(`${API_BASE}/experience/add`, {
				method: 'POST',
				body: JSON.stringify(experiencePayload),
				headers: headers,
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`API response failed: ${errorText}`);
			}

			alert(
				`Your new experience titled "${title}" has been successfully submitted for approval!`
			);
			router.push(`/car/${carId}`);
		} catch (error) {
			console.error('Error adding experience:', error);
			alert(
				`An error occurred while adding the experience. Please try again. ${
					error instanceof Error ? error.message : ''
				}`
			);
		} finally {
			setIsLoading(false);
		}
	};

	const carName = carDetails
		? `${carDetails.brand} ${carDetails.model} (${carDetails.year})`
		: carId;

	if (fetchError) {
		return (
			<div className="mx-auto max-w-2xl mt-20 px-4 py-10 text-center text-red-500 text-xl">
				{fetchError}
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-2xl mt-20 px-4 py-10">
			<p className="mb-8 text-lg text-gray-600 dark:text-gray-400 flex items-center">
				You are adding an experience for:
				<span className="font-mono font-semibold text-primary ml-2 flex items-center">
					<Car className="w-4 h-4 mr-2" />
					{carName}
				</span>
			</p>

			<Card>
				<CardHeader>
					<CardTitle>Experience Form</CardTitle>
					<CardDescription>
						Share your thoughts and ratings on using the vehicle. Required
						fields are marked with an asterisk (*).
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid gap-2">
							<Label htmlFor="title">Experience Title *</Label>
							<Input
								id="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="content">Detailed Description *</Label>
							<Textarea
								id="content"
								rows={6}
								value={content}
								onChange={(e) => setContent(e.target.value)}
								required
							/>
						</div>

						<h3 className="text-lg font-semibold pt-4 border-t dark:border-gray-700">
							Ratings (1-5 Stars)
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							<RatingInput
								label="Comfort"
								rating={comfortRating}
								setRating={setComfortRating}
							/>
							<RatingInput
								label="Fuel Economy"
								rating={fuelRating}
								setRating={setFuelRating}
							/>
							<RatingInput
								label="Safety"
								rating={safetyRating}
								setRating={setSafetyRating}
							/>
							<RatingInput
								label="City Driving"
								rating={cityDriveRating}
								setRating={setCityDriveRating}
							/>
							<RatingInput
								label="Highway Driving"
								rating={highwayDriveRating}
								setRating={setHighwayDriveRating}
							/>
						</div>

						<h3 className="text-lg font-semibold pt-4 border-t dark:border-gray-700">
							Usage Details (Optional)
						</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="duration">Duration of Use (Months)</Label>
								<Input
									id="duration"
									type="number"
									min="1"
									value={durationOfUse}
									onChange={(e) =>
										setDurationOfUse(
											e.target.value === '' ? '' : parseInt(e.target.value)
										)
									}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="mileage">Mileage at Review (km)</Label>
								<Input
									id="mileage"
									type="number"
									min="0"
									value={mileage}
									onChange={(e) =>
										setMileage(
											e.target.value === '' ? '' : parseInt(e.target.value)
										)
									}
								/>
							</div>
						</div>

						<div className="grid gap-2 pt-4 border-t dark:border-gray-700">
							<Label htmlFor="imageFile">Image Attachment (Optional)</Label>
							<Input
								id="imageFile"
								type="file"
								onChange={(e) =>
									setImageFile(e.target.files ? e.target.files[0] : null)
								}
								accept="image/*"
							/>
						</div>

						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? 'Submitting...' : 'Save Experience'}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
