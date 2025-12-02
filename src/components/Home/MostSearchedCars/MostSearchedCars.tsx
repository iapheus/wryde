import MostSearchedCarsCard from './MostSearchedCarsCard';

const cars = [
	{
		brand: 'Tesla',
		model: 'Model 3',
		image: '/tesla.jpg',
		rating: 4.8,
		transmission: 'Automatic',
		seats: 5,
		horsepower: 283,
	},
	{
		brand: 'BMW',
		model: 'X5',
		image: '/bmw.webp',
		rating: 4.6,
		transmission: 'Automatic',
		seats: 5,
		horsepower: 335,
	},
	{
		brand: 'Toyota',
		model: 'Corolla',
		image: '/toyota.webp',
		rating: 4.4,
		transmission: 'Manual',
		seats: 5,
		horsepower: 139,
	},
];

export default function MostSearchedCars() {
	return (
		<section className="px-6 py-16 max-w-screen-xl mx-auto">
			<h2 className="text-3xl font-semibold mb-10 text-center">
				Most Searched Cars
			</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{cars.map((car, index) => (
					<MostSearchedCarsCard key={index} car={car} index={index} />
				))}
			</div>
		</section>
	);
}
