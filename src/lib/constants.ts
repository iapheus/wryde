export const API_BASE = 'http://localhost:5029/api';

export const initialFilters = {
	carType: [
		'Sedan',
		'SUV',
		'Hatchback',
		'Coupe',
		'Truck',
		'Off-road Vehicle',
		'Sports Car',
		'Convertible',
	],
	brand: [
		'BMW',
		'Mercedes-Benz',
		'Audi',
		'Tesla',
		'Ford',
		'Hyundai',
		'Jeep',
		'Volkswagen',
		'Porsche',
		'Toyota',
		'Mazda',
	],
	year: ['2024', '2023', '2022', '2021', '2020', '1995'],
};

export const defaultSortBy = 'brand_asc';

export const getTitle = (key: string) => {
	if (key === 'carType') return 'Car Type';
	if (key === 'brand') return 'Brand';
	if (key === 'year') return 'Model Year';
	return key;
};
