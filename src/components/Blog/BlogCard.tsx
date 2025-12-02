'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Image as ImageIcon } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

export default function BlogCard({ post }: { post: BlogPost }) {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [showReadMore, setShowReadMore] = useState(false);
	const summaryRef = useRef<HTMLParagraphElement>(null);
	const router = useRouter();

	useEffect(() => {
		if (summaryRef.current) {
			const lineHeight = parseFloat(
				getComputedStyle(summaryRef.current).lineHeight || '20'
			);
			const maxHeight = lineHeight * 3;
			setShowReadMore(summaryRef.current.scrollHeight > maxHeight);
		}
	}, []);

	return (
		<>
			<Card
				onClick={() => router.push(`/blog/${post.id}`)}
				className="hover:border-2 hover:border-yellow-500 border-2 hover:cursor-pointer shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between"
			>
				<CardHeader className="p-4 flex flex-col">
					<div className="relative h-40 w-full rounded-md overflow-hidden mb-1">
						<Image
							src={post.coverImage || '/tesla.jpg'}
							alt={post.title}
							fill
							className="object-cover"
							onClick={() => setSelectedImage(post.coverImage)}
						/>
					</div>
					<CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
					{post.tags && (
						<div className="flex flex-row">
							{post.tags.map((tag) => (
								<Badge
									key={tag.id}
									variant="outline"
									className="px-2 py-0.5 text-xs h-auto"
								>
									{tag.name}
								</Badge>
							))}
						</div>
					)}
				</CardHeader>

				<CardContent className="p-4 pt-0 -mt-5 flex-grow">
					<div className="flex items-center gap-3 pt-4 border-t dark:border-gray-700">
						<Image
							src={
								'https://avatar.iran.liara.run/public' || post.author?.avatarUrl
							}
							alt={post.author?.firstName}
							width={36}
							height={36}
							className="rounded-full object-cover"
						/>
						<div className="text-sm">
							<div className="font-medium">
								{post.author.firstName} {post.author.lastName}
							</div>
							<div className="text-muted-foreground text-xs flex items-center">
								<MapPin className="w-3 h-3 mr-1" />
								{post.author.location}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<Dialog
				open={!!selectedImage}
				onOpenChange={() => setSelectedImage(null)}
			>
				<DialogContent className="max-w-3xl">
					{selectedImage && (
						<div className="relative w-full h-[400px]">
							<Image
								src={selectedImage}
								alt="blog image"
								fill
								className="object-contain rounded-md"
							/>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
}
