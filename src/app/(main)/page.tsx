'use client';
import BrowseBy from '@/components/Home/BrowseBy/BrowseBy';
import MostSearchedCars from '@/components/Home/MostSearchedCars/MostSearchedCars';
import LatestBlogPosts from '@/components/Home/LatestBlogPosts/LatestBlogPosts';
import ExploreOrReview from '@/components/Home/ExploreOrReview/ExploreOrReview';
import HomeCarousel from '@/components/Home/Carousel/HomeCarousel';
import CareouselInput from '@/components/Home/Carousel/CarouselInput';

export default function Home() {
	return (
		<div className="bg-white dark:bg-neutral-900 text-black dark:text-white">
			<HomeCarousel
				title={'Every Car Has a Story'}
				description={'Share your experience. Discover theirs.'}
			>
				<CareouselInput />
			</HomeCarousel>

			<BrowseBy />

			<MostSearchedCars />

			<ExploreOrReview />

			<LatestBlogPosts />
		</div>
	);
}
