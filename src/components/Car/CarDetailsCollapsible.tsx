'use client';

import {
	Collapsible,
	CollapsibleTrigger,
	CollapsibleContent,
} from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Package, Gauge } from 'lucide-react';

interface Car {
	fuelType: string;
	transmission: string;
	engineVolume: number;
	horsepower: number;
	torque: number;
	bodyType: string;
	segment: string;
	drivetrain: string;
	doors: number;
	seats: number;
	fuelConsumptionCity: number;
	fuelConsumptionHighway: number;
	luggageVolume: number;
	topSpeed: number;
	hasCruiseControl: boolean;
	hasParkingSensors: boolean;
	hasLaneAssist: boolean;
	hasBlindSpotMonitor: boolean;
}

export default function CarDetailsCollapsible({ car }: { car: Car }) {
	return (
		<Collapsible>
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-sm">
				<div className="flex flex-col">
					<span className="text-xs text-muted-foreground">Fuel Type</span>
					<span className="font-semibold">{car.fuelType}</span>
				</div>
				<div className="flex flex-col">
					<span className="text-xs text-muted-foreground">Transmission</span>
					<span className="font-semibold">{car.transmission}</span>
				</div>
				<div className="flex flex-col">
					<span className="text-xs text-muted-foreground">Engine Volume</span>
					<span className="font-semibold">{car.engineVolume} cc</span>
				</div>
				<div className="flex flex-col">
					<span className="text-xs text-muted-foreground">Horsepower</span>
					<span className="font-semibold">{car.horsepower} hp</span>
				</div>
				<div className="flex flex-col">
					<span className="text-xs text-muted-foreground">Torque</span>
					<span className="font-semibold">{car.torque} Nm</span>
				</div>
				<div className="flex flex-col">
					<span className="text-xs text-muted-foreground">Body Type</span>
					<span className="font-semibold">{car.bodyType}</span>
				</div>
			</div>

			<CollapsibleContent>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mt-6 pt-4 border-t dark:border-gray-700">
					<div className="flex items-center">
						<Package className="w-4 h-4 mr-2 text-gray-500" />
						<strong>Luggage Volume:</strong> {car.luggageVolume} L
					</div>
					<div className="flex items-center">
						<Gauge className="w-4 h-4 mr-2 text-gray-500" />
						<strong>Max Speed:</strong> {car.topSpeed} km/h
					</div>
					<div>
						<strong>Drivetrain:</strong> {car.drivetrain}
					</div>
					<div>
						<strong>Doors:</strong> {car.doors}
					</div>
					<div>
						<strong>Seats:</strong> {car.seats}
					</div>
					<div>
						<strong>City Consumption:</strong> {car.fuelConsumptionCity} L/100km
					</div>
					<div>
						<strong>Highway Consumption:</strong> {car.fuelConsumptionHighway}{' '}
						L/100km
					</div>
				</div>

				<div className="mt-6 pt-4 border-t dark:border-gray-700">
					<strong className="block mb-2">Key Features:</strong>
					<div className="flex flex-wrap gap-2">
						{[
							car.hasCruiseControl && 'Cruise Control',
							car.hasParkingSensors && 'Parking Sensors',
							car.hasLaneAssist && 'Lane Assist',
							car.hasBlindSpotMonitor && 'Blind Spot Monitor',
						]
							.filter(Boolean)
							.map((feature, index) => (
								<Badge
									key={index}
									variant="secondary"
									className="px-3 py-1 text-xs"
								>
									{feature}
								</Badge>
							))}
					</div>
				</div>
			</CollapsibleContent>

			<CollapsibleTrigger asChild>
				<button className="mt-4 text-primary text-sm font-medium hover:underline flex items-center">
					Show/Hide All Details
					<ChevronDown className="w-4 h-4 ml-1 transition duration-200 data-[state=open]:rotate-180" />
				</button>
			</CollapsibleTrigger>
		</Collapsible>
	);
}
