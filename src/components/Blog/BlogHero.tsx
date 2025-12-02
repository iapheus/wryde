'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface BlogHeroProps {
	title: string;
	description: string;
}

export default function BlogHero({ title, description }: BlogHeroProps) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadAuthStatus = async () => {
			const status = localStorage.getItem('authToken') != null;
			setIsAuthenticated(status);
			setIsLoading(false);
		};
		loadAuthStatus();
	}, []);

	return (
		<div className="relative h-[300px] w-full overflow-hidden md:h-[450px]">
			<Image
				src="/blog-cover.jpg"
				alt="Blog Hero"
				fill
				className="object-cover mask-r-from-85% mask-r-to-100% mask-l-from-85% mask-l-to-100%"
				priority
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

			<div className="absolute bottom-0 left-0 p-8 text-white">
				<h1 className="text-4xl font-extrabold drop-shadow-lg md:text-6xl">
					{title}
				</h1>
				<p className="mt-2 text-xl font-light">{description}</p>
			</div>

			<div className="absolute bottom-0 right-0 p-8 text-white">
				{isLoading ? (
					<div className="h-10 w-32 animate-pulse rounded-md bg-gray-500/50"></div>
				) : isAuthenticated ? (
					<Link href="/blog/add">
						<Button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 hover:cursor-pointer">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
									clipRule="evenodd"
								/>
							</svg>
							<span>Add New Post</span>
						</Button>
					</Link>
				) : (
					<Link href="/login">
						<Button>Log In to add Post</Button>
					</Link>
				)}
			</div>
		</div>
	);
}
