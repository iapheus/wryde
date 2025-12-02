'use client';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { ReactNode } from 'react';

export default function HomeCarousel({
	children,
	title,
	description,
}: {
	children?: ReactNode;
	title?: string;
	description?: string;
}) {
	return (
		<div className="relative w-full h-[300px] sm:h-[400px] md:h-[490px] overflow-hidden">
			<div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
				<h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">
					{title && title}
				</h1>
				<p className="text-lg sm:text-xl mt-2 text-white/90">
					{description && description}
				</p>
				{children && children}
			</div>

			<Carousel
				className="w-full h-[490px]"
				opts={{ loop: true }}
				plugins={[Autoplay({ delay: 5000 })]}
			>
				<CarouselContent>
					{[1, 2, 3].map((i) => (
						<CarouselItem key={i} className="relative h-[490px]">
							<Image
								src={`/banner-${i}.jpg`}
								alt={`Banner ${i}`}
								fill
								className="object-cover blur-xs"
							/>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	);
}
