'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Route, MapPin, Image as ImageIcon } from 'lucide-react';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StarRating from './StarRating';

interface User {
	firstName: string;
	lastName: string;
	profilePicUrl?: string;
	country: string;
}

interface Tag {
	id: string;
	name: string;
}

interface GalleryItem {
	id: string;
	url: string;
}

interface Experience {
	id: string;
	title: string;
	content: string;
	comfortRating: number;
	fuelRating: number;
	cityDriveRating: number;
	highwayDriveRating: number;
	safetyRating: number;
	durationOfUseMonths: number;
	mileageAtReview: number;
	user: User;
	tags: Tag[];
	gallery?: GalleryItem[];
}

const RatingItem = ({ label, rating }: { label: string; rating: number }) => (
	<div className="flex flex-col items-center">
		<span className="text-base font-bold text-primary">
			{rating.toFixed(1)}
		</span>
		<span className="text-xs text-muted-foreground">{label}</span>
	</div>
);

export default function ExperienceCard({ exp }: { exp: Experience }) {
	const avgRating =
		(exp.comfortRating +
			exp.fuelRating +
			exp.cityDriveRating +
			exp.highwayDriveRating +
			exp.safetyRating) /
		5;

	const userProfilePic =
		exp.user.profilePicUrl || 'https://avatar.iran.liara.run/public';
	const galleryCount = exp.gallery?.length || 0;
	const hasGallery = galleryCount > 0;

	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [showReadMore, setShowReadMore] = useState(false);
	const contentRef = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		if (contentRef.current) {
			const lineHeight = parseFloat(
				getComputedStyle(contentRef.current).lineHeight || '20'
			);
			const maxHeight = lineHeight * 3;
			setShowReadMore(contentRef.current.scrollHeight > maxHeight);
		}
	}, []);

	return (
		<>
			<Card className="shadow-lg hover:shadow-xl transition duration-300 flex flex-col justify-between">
				<CardHeader className="p-4 flex flex-col">
					<div className="flex items-center mb-3 border-b pb-2 dark:border-gray-700">
						<Image
							src={userProfilePic}
							alt={`${exp.user.firstName} Profile`}
							width={40}
							height={40}
							className="rounded-full object-cover mr-3"
						/>
						<div>
							<p className="text-sm font-semibold">
								{exp.user.firstName} {exp.user.lastName}
							</p>
							<p className="text-xs text-muted-foreground flex items-center">
								<MapPin className="w-3 h-3 mr-1" />
								{exp.user.country}
							</p>
						</div>
					</div>
					<div className="flex items-center justify-between">
						<CardTitle className="text-lg line-clamp-2">{exp.title}</CardTitle>
						<StarRating rating={Math.round(avgRating)} />
					</div>
				</CardHeader>

				<CardContent className="p-4 pt-0 space-y-3 flex-grow">
					<div className="flex justify-around items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
						<RatingItem label="Comfort" rating={exp.comfortRating} />
						<RatingItem label="Fuel" rating={exp.fuelRating} />
						<RatingItem label="Safety" rating={exp.safetyRating} />
					</div>

					<p
						ref={contentRef}
						className="text-sm line-clamp-3 text-gray-700 dark:text-gray-300"
					>
						{exp.content}
					</p>

					{showReadMore && (
						<Link
							href={`/experience/${exp.id}`}
							className="text-sm text-primary font-medium hover:underline"
						>
							Read more →
						</Link>
					)}

					<div className="flex flex-col gap-2 pt-2 border-t dark:border-gray-700">
						<div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
							<span className="flex items-center">
								<Calendar className="w-3 h-3 mr-1" />
								{exp.durationOfUseMonths} months
							</span>
							<span className="flex items-center">
								<Route className="w-3 h-3 mr-1" />
								{exp.mileageAtReview} km
							</span>
						</div>
						<div className="flex gap-1 flex-wrap">
							{exp.tags.slice(0, 3).map((tag) => (
								<Badge
									key={tag.id}
									variant="outline"
									className="px-2 py-0.5 text-xs h-auto"
								>
									{tag.name}
								</Badge>
							))}
						</div>
					</div>

					{hasGallery && (
						<div className="pt-2 space-y-2">
							{exp.gallery.map((img, index) => (
								<button
									key={img.id}
									onClick={() => setSelectedImage(img.url)}
									className="flex items-center gap-2 text-sm text-primary hover:underline"
								>
									<ImageIcon className="w-4 h-4" />
									Attachment {index + 1}
								</button>
							))}
						</div>
					)}
				</CardContent>
			</Card>

			<Dialog
				open={!!selectedImage}
				onOpenChange={() => setSelectedImage(null)}
			>
				<DialogContent className="max-w-3xl">
					{selectedImage && (
						<div className="relative w-full h-[400px]">
							<Image
								src={selectedImage}
								alt="Enlarged image"
								fill
								className="object-contain rounded-md"
							/>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
}
