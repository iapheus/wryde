import { Button } from '@/components/ui/button';
import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function MostSearchedCarsCard({ index, car }) {
	return (
		<div
			key={index}
			className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden flex flex-col"
		>
			<div className="flex justify-between items-start p-4">
				<div>
					<h3 className="text-lg font-semibold">
						{car.brand} {car.model}
					</h3>
				</div>
				<div className="flex items-center gap-1 text-yellow-500">
					<StarIcon className="w-5 h-5" />
					<span className="text-sm font-medium">{car.rating}</span>
				</div>
			</div>

			<div className="relative w-full h-48">
				<Image
					src={car.image}
					alt={`${car.brand} ${car.model}`}
					fill
					className="object-cover"
				/>
			</div>

			<div className="flex justify-between items-end p-4 text-sm text-gray-700 dark:text-gray-300">
				<div className="flex flex-col gap-1">
					<span>Transmission: {car.transmission}</span>
					<span>Seats: {car.seats}</span>
					<span>Horsepower: {car.horsepower} HP</span>
				</div>
				<Link href={`/car/${car.id}`}>
					<Button className="px-4 py-2   rounded-lg transition">
						View Details
					</Button>
				</Link>
			</div>
		</div>
	);
}
