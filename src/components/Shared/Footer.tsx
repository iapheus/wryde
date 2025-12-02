import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="w-full bg-gray-50 dark:bg-neutral-900 py-6 mt-12">
			<div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
				<span>2025 W-Ryde. All rights reserved.</span>
				<div className="flex gap-4">
					<Link href={'/contact'} className="hover:underline">
						Contact
					</Link>
				</div>
			</div>
		</footer>
	);
}
