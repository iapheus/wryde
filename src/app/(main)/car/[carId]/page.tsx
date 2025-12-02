import { Car } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import CarHero from '@/components/Car/CarHero';
import CarDetailsCollapsible from '@/components/Car/CarDetailsCollapsible';
import ExperienceCard from '@/components/Car/ExperienceCard';
import { notFound } from 'next/navigation';
import { API_BASE } from '@/lib/constants';

interface CarDetails {}

interface ApiCarData {}

interface Experience {}

export default async function CarPage({
	params,
}: {
	params: { carId: string };
}) {
	const { carId } = await params;

	try {
		const [carRes, experiencesRes] = await Promise.all([
			fetch(`${API_BASE}/car/${carId}`, { cache: 'no-store' }),
			fetch(`${API_BASE}/experience/${carId}`, {
				cache: 'no-store',
			}),
		]);

		if (!carRes.ok || !experiencesRes.ok) {
			if (carRes.status === 404) notFound();
			throw new Error('Failed to fetch data from API.');
		}

		const carData: ApiCarData = await carRes.json();
		const experiences: Experience[] = await experiencesRes.json();

		const car: CarDetails = carData.result;

		const gridLayout =
			experiences.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-1';

		return (
			<div className="max-w-6xl mx-auto space-y-12 pb-16">
				<CarHero car={car} experiences={experiences} />

				<div className="px-6">
					<Card className="p-6 shadow-xl border-t-4 border-primary/70">
						<CardHeader className="p-0 mb-4">
							<CardTitle className="text-2xl font-bold flex items-center">
								<Car className="w-6 h-6 mr-2 text-primary" />
								Technical Specifications
							</CardTitle>
						</CardHeader>

						<CarDetailsCollapsible car={car} />
					</Card>
				</div>

				<div
					className={`grid grid-cols-1 sm:grid-cols-2 ${gridLayout} gap-6 px-6`}
				>
					{experiences.map((exp) => (
						<ExperienceCard key={exp.id} exp={exp} />
					))}
				</div>
			</div>
		);
	} catch (error) {
		console.error('Data loading error:', error);
		return (
			<div className="max-w-6xl mx-auto p-8 text-center text-xl text-red-500">
				A critical error occurred while loading data.
			</div>
		);
	}
}
