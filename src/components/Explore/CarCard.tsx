'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CarDetails {
	Id: string;
	Brand: string;
	Model: string;
	Year: number;
	BodyType: string;
	CoverImage: string;
}

interface CarData {
	Car: CarDetails;
	ExperienceCount: number;
}

const CarCard: React.FC<{ carData: CarData }> = ({ carData }) => {
	const { Car, ExperienceCount } = carData;

	return (
		<Card className="rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
			<Link href={`/car/${Car.Id}`} className="block relative h-72 w-full">
				<div className="relative h-full w-full">
					<Image
						src={'/rav4gallery2.jpg'}
						alt={`${Car.Brand} ${Car.Model}`}
						layout="fill"
						objectFit="cover"
					/>

					<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 group-hover:opacity-80 transition-opacity"></div>

					<Button
						variant="ghost"
						size="icon"
						className="absolute top-3 left-3 rounded-full bg-white/30 text-white hover:bg-white/50 z-10 transition-colors"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
						}}
					>
						<Heart className="w-5 h-5 fill-primary text-primary" />
					</Button>

					<div className="absolute bottom-4 left-4 z-10 text-white">
						<h2 className="text-2xl font-bold leading-tight">
							{Car.Brand} {Car.Model}
						</h2>
						<p className="text-lg font-medium opacity-90">
							({Car.Year}) | {Car.BodyType}
						</p>
						<div className="flex items-center space-x-1 text-sm opacity-80 mt-1">
							<MessageSquare className="w-4 h-4 text-primary" />
							<span>{ExperienceCount} Experiences</span>
						</div>
					</div>

					<Button
						variant="default"
						size="icon"
						className="absolute bottom-4 right-4 rounded-full w-12 h-12 z-10 transition-transform group-hover:scale-110 group-hover:shadow-lg"
						aria-label="Read Experiences"
					>
						<ArrowRight className="w-6 h-6" />
					</Button>
				</div>
			</Link>
		</Card>
	);
};

export default CarCard;
