'use client';

import { useState } from 'react';
import { GalleryVerticalIcon, Plus, X } from 'lucide-react';
import Image from 'next/image';
import StarRating from './StarRating';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import Link from 'next/link';
import { Button } from '../ui/button';

interface GalleryItem {
	id: string;
	url: string;
}

interface Car {
	id: string;
	brand: string;
	model: string;
	year: number;
	segment: string;
	coverImage: string;
	gallery?: GalleryItem[];
}

interface Experience {
	comfortRating: number;
	fuelRating: number;
	cityDriveRating: number;
	highwayDriveRating: number;
	safetyRating: number;
}

interface CarHeroProps {
	car: Car;
	experiences: Experience[];
}

export default function CarHero({ car, experiences }: CarHeroProps) {
	const gallery = car.gallery ?? [];
	const totalReviews = experiences.length;
	const hasGallery = gallery.length > 0;

	const overallAvgRating =
		experiences.length > 0
			? experiences.reduce(
					(acc, exp) =>
						acc +
						(exp.comfortRating +
							exp.fuelRating +
							exp.cityDriveRating +
							exp.highwayDriveRating +
							exp.safetyRating) /
							5,
					0
			  ) / experiences.length
			: 0;

	const [open, setOpen] = useState(false);

	return (
		<div className="relative w-full h-[350px] md:h-[500px] overflow-hidden">
			<Image
				src={car.coverImage}
				alt={`${car.brand} ${car.model}`}
				fill
				className="object-cover dark:mask-alpha dark:mask-l-from-black dark:mask-l-from-85% dark:mask-l-to-transparent dark:mask-r-from-black dark:mask-r-from-85% dark:mask-r-to-transparent dark:mask-b-from-black dark:mask-b-from-95% dark:mask-b-to-transparent"
				priority
			/>

			<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
			<div className="absolute bottom-0 left-0 p-6 md:p-8 text-white w-full">
				<h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
					{car.brand} {car.model} ({car.year})
				</h1>
				<p className="text-xl font-light mt-2">{car.segment} Segment</p>

				{overallAvgRating > 0 && (
					<div className="flex flex-col md:flex-row md:items-center mt-4 justify-between w-full">
						<div className="flex items-center space-x-3 mb-4 md:mb-0">
							<StarRating rating={Math.round(overallAvgRating)} />
							<span className="text-2xl font-bold">
								{overallAvgRating.toFixed(1)}
							</span>
							<span className="text-lg">({totalReviews} User Experiences)</span>
						</div>

						<div className="flex flex-col sm:flex-row gap-3">
							{hasGallery && (
								<Dialog open={open} onOpenChange={setOpen}>
									<DialogTrigger asChild>
										<Button
											variant="secondary"
											className="flex items-center space-x-2 bg-white/30 backdrop-blur-sm text-white hover:bg-white/50 border border-white/50 w-full sm:w-auto"
											onClick={() => setOpen(true)}
										>
											<GalleryVerticalIcon className="w-5 h-5" />
											<span>Gallery ({gallery.length})</span>
										</Button>
									</DialogTrigger>
									<DialogContent className="max-w-5xl">
										<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
											{gallery.map((img) => (
												<div
													key={img.id}
													className="relative h-48 rounded overflow-hidden"
												>
													<Image
														src={img.url}
														alt=""
														fill
														className="object-cover"
													/>
												</div>
											))}
										</div>
									</DialogContent>
								</Dialog>
							)}

							<Link href={`/car/${car.id}/add`}>
								<Button className="flex items-center space-x-2 w-full sm:w-auto">
									<Plus className="h-4 w-4" />
									<span>Add Experience</span>
								</Button>
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
