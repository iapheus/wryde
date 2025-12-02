'use client';

import React from 'react';
import { Filter } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { initialFilters, getTitle } from '@/lib/constants';

interface FilterSidebarProps {
	toggleFilter: (group: string, value: string) => void;
	isFilterActive: (group: string, value: string) => boolean;
	onApplyFilters?: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
	toggleFilter,
	isFilterActive,
	onApplyFilters,
}) => (
	<div className="space-y-6 h-full transition-colors">
		<h3 className="text-2xl font-bold tracking-tight flex items-center space-x-2 pb-2">
			<Filter className="w-6 h-6 text-primary" />
			<span>Filter</span>
		</h3>

		<Accordion
			type="multiple"
			defaultValue={['carType', 'brand']}
			className="w-full"
		>
			{Object.entries(initialFilters).map(([groupKey, options]) => (
				<AccordionItem key={groupKey} value={groupKey}>
					<AccordionTrigger className="text-lg font-semibold capitalize hover:no-underline">
						{getTitle(groupKey)}
					</AccordionTrigger>
					<AccordionContent className="pt-2">
						<div className="space-y-2">
							{options.map((option) => (
								<div key={option} className="flex items-center space-x-2">
									<Checkbox
										id={`${groupKey}-${option}`}
										checked={isFilterActive(groupKey, option)}
										onCheckedChange={() => toggleFilter(groupKey, option)}
										className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
									/>
									<label
										htmlFor={`${groupKey}-${option}`}
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										{option}
									</label>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>

		{onApplyFilters && (
			<Button
				className="w-full mt-4"
				variant="default"
				onClick={onApplyFilters}
			>
				Apply Filters and Close
			</Button>
		)}
	</div>
);

export default FilterSidebar;
