import suv from '@/media/carTypes/suv.svg';
import hatchback from '@/media/carTypes/hatchback.svg';
import sedan from '@/media/carTypes/sedan.svg';
import coupe from '@/media/carTypes/coupe.svg';
import convertible from '@/media/carTypes/convertible.svg';
import electric from '@/media/carTypes/electric.svg';
import pickup from '@/media/carTypes/pickup.svg';
import van from '@/media/carTypes/van.svg';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const vehicleTypes = [
	{
		name: 'Sedan',
		icon: (
			<Image
				src={sedan}
				alt="sedan car icon"
				height={32}
				width={32}
				className="dark:invert dark:brightness-200 rotate-y-180"
			/>
		),
	},
	{
		name: 'Hatchback',
		icon: (
			<Image
				src={hatchback}
				alt="hatchback car icon"
				height={32}
				width={32}
				className="dark:invert dark:brightness-200 rotate-y-180"
			/>
		),
	},
	{
		name: 'SUV',
		icon: (
			<Image
				src={suv}
				alt="suv car icon"
				height={32}
				width={32}
				className="dark:invert dark:brightness-200"
			/>
		),
	},
	{
		name: 'Coupe',
		icon: (
			<Image
				src={coupe}
				alt="coupe car icon"
				height={32}
				width={32}
				className="dark:invert dark:brightness-200 rotate-y-180"
			/>
		),
	},
	{
		name: 'Convertible',
		icon: (
			<Image
				src={convertible}
				alt="convertible car icon"
				height={32}
				width={32}
				className="dark:invert dark:brightness-200 rotate-y-180"
			/>
		),
	},
	{
		name: 'Hybrid',
		icon: (
			<Image
				src={hatchback}
				alt="hybrid car icon"
				height={32}
				width={32}
				className="dark:invert dark:brightness-200 rotate-y-180"
			/>
		),
	},
	{
		name: 'Electric',
		icon: (
			<Image
				src={electric}
				alt="electric car icon"
				height={32}
				width={32}
				className="dark:invert dark:brightness-200 rotate-y-180"
			/>
		),
	},
	{
		name: 'Pickup',
		icon: (
			<Image
				src={pickup}
				alt="pickup car icon"
				height={32}
				width={32}
				className="dark:invert dark:brightness-200"
			/>
		),
	},
	{
		name: 'Van',
		icon: (
			<Image
				src={van}
				alt="van car icon"
				height={32}
				width={32}
				className="dark:invert dark:brightness-200 rotate-y-180"
			/>
		),
	},
];

export default function TypeSelector() {
	const router = useRouter();
	return (
		<div className="w-full flex flex-wrap justify-center gap-6 py-6 hover:cursor-pointer">
			{vehicleTypes.map((type) => (
				<div
					onClick={() => {
						router.push(`/explore?carType=${type.name}`);
					}}
					key={type.name}
					className="flex flex-col items-center justify-center w-24 h-24 bg-white dark:bg-neutral-800 rounded-lg shadow hover:scale-105 transition-transform"
				>
					{type.icon}
					<span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-200">
						{type.name}
					</span>
				</div>
			))}
		</div>
	);
}
