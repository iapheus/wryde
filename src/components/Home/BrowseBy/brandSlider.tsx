import { JSX } from 'react';
import { useTheme } from 'next-themes';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

import { AudiIcon } from '@/media/carLogos/audi';
import { BMWIcon } from '@/media/carLogos/bmw';
import { FordIcon } from '@/media/carLogos/ford';
import { HondaIcon } from '@/media/carLogos/honda';
import { HyundaiIcon } from '@/media/carLogos/hyundai';
import { JeepIcon } from '@/media/carLogos/jeep';
import { KiaIcon } from '@/media/carLogos/kia';
import { MercedesBenzIcon } from '@/media/carLogos/mercedes-benz';
import { MiniIcon } from '@/media/carLogos/mini';
import { NissanIcon } from '@/media/carLogos/nissan';
import { PorscheIcon } from '@/media/carLogos/porsche';
import { SubaruIcon } from '@/media/carLogos/subaru';
import { TeslaIcon } from '@/media/carLogos/tesla';
import { ToyotaIcon } from '@/media/carLogos/toyota';
import { VolkswagenIcon } from '@/media/carLogos/volkswagen';
import { VolvoIcon } from '@/media/carLogos/volvo';
import Link from 'next/link';

const logoIcons: Record<string, JSX.Element> = {
	kia: <KiaIcon style={{ height: '30px', marginLeft: '35px' }} />,
	subaru: <SubaruIcon style={{ height: '30px' }} />,
	mini: <MiniIcon style={{ height: '30px' }} />,
	hyundai: <HyundaiIcon style={{ height: '30px' }} />,
	mercedesBenz: <MercedesBenzIcon style={{ height: '30px' }} />,
	toyota: <ToyotaIcon style={{ height: '30px' }} />,
	bmw: <BMWIcon style={{ height: '30px' }} />,
	honda: <HondaIcon style={{ height: '30px' }} />,
	audi: <AudiIcon style={{ height: '30px' }} />,
	volvo: <VolvoIcon style={{ height: '30px' }} />,
	volkswagen: <VolkswagenIcon style={{ height: '30px' }} />,
	porsche: <PorscheIcon style={{ height: '30px' }} />,
	nissan: <NissanIcon style={{ height: '30px' }} />,
	tesla: <TeslaIcon style={{ height: '30px' }} />,
	jeep: <JeepIcon style={{ height: '30px' }} />,
	ford: <FordIcon style={{ height: '50px', marginRight: '35px' }} />,
};

export default function BrandSlider() {
	const { theme } = useTheme();

	const [emblaRef] = useEmblaCarousel(
		{
			loop: true,
			align: 'start',
		},
		[
			Autoplay({
				delay: 800,
				stopOnInteraction: false,
				stopOnMouseEnter: true,
			}),
		]
	);
	return (
		<div
			className="embla overflow-hidden mt-1 mask-x-from-70% mask-x-to-90%"
			ref={emblaRef}
		>
			<div className="embla__container flex gap-12 ">
				{Object.entries(logoIcons).map(([brand, icon]) => (
					<Link
						href={`/explore?brand=${brand}`}
						key={brand}
						className={`hover:contrast-100 hover:grayscale-0 embla__slide flex items-center justify-center min-w-[120px] h-24  ${
							theme == 'dark' ? 'contrast-0' : 'grayscale-100'
						}`}
					>
						{icon}
					</Link>
				))}
			</div>
		</div>
	);
}
