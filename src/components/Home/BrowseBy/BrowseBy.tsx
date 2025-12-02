'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import BrandSlider from './brandSlider';
import TypeSelector from './typeSelector';

export default function BrowseBy() {
	const [browseBy, setBrowseBy] = useState<string>('brand');
	return (
		<section className="py-12 px-4 flex flex-col items-center">
			<div className="flex flex-wrap items-center justify-center gap-2 mb-6">
				<h2 className="text-2xl font-semibold">Browse by</h2>
				<Button
					onClick={() => setBrowseBy('brand')}
					variant={browseBy === 'brand' ? 'default' : 'outline'}
					className="text-xl font-medium"
				>
					Brand
				</Button>
				<Button
					onClick={() => setBrowseBy('type')}
					variant={browseBy === 'type' ? 'default' : 'outline'}
					className="text-xl font-medium"
				>
					Type
				</Button>
			</div>

			<div className="w-full">
				{browseBy === 'brand' ? <BrandSlider /> : <TypeSelector />}
			</div>
		</section>
	);
}
