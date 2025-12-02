'use client';
import Link from 'next/link';
import ThemeChanger from './ThemeChanger';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { User2, Menu, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

const navItems = [
	{ name: 'Home', href: '/' },
	{ name: 'Explore', href: '/explore' },
	{ name: 'Blog', href: '/blog' },
];

const NavLink: React.FC<{
	href: string;
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
}> = ({ href, children, className = '', onClick }) => (
	<Link
		href={href}
		className={`px-3 py-1 rounded-xl transition hover:bg-white/20 hover:backdrop-blur-sm ${className}`}
		onClick={onClick}
	>
		{children}
	</Link>
);

export default function Navbar() {
	const [token, setToken] = useState<string | null>(null);
	const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);

	useEffect(() => {
		const storedToken = localStorage.getItem('authToken');
		setToken(storedToken);
	}, []);

	const closeMobileSheet = () => {
		setIsMobileSheetOpen(false);
	};

	const desktopNavClasses = `
        absolute top-8 left-1/2 transform -translate-x-1/2 z-50
        flex gap-6 px-10 py-3 bg-black/65 dark:bg-gray-900/20 
        backdrop-blur-sm rounded-full border border-gray-300/30 
        dark:border-gray-700/30 shadow-xl text-sm font-medium text-white
        hidden lg:flex 
    `;

	return (
		<>
			<nav className={desktopNavClasses}>
				<Link href={'/'}>
					<Image
						src="/logo.png"
						width={120}
						height={60}
						alt="company logo"
						className="w-auto h-auto max-w-full"
					/>
				</Link>

				{navItems.map((item) => (
					<NavLink key={item.name} href={item.href}>
						{item.name}
					</NavLink>
				))}

				{token != null ? (
					<NavLink
						href={'/profile'}
						className="px-3 py-1 text-white flex items-center gap-1"
					>
						<User2 className="w-5 h-5" />
						Profile
					</NavLink>
				) : (
					<>
						<NavLink href="/login">Login</NavLink>
						<NavLink href="/register">Sign Up</NavLink>
					</>
				)}

				<ThemeChanger />
			</nav>

			<Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
				<div className="absolute top-6 left-4 z-50 lg:hidden">
					<SheetTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className="bg-black/80 hover:bg-black/90 text-white border-white/20 backdrop-blur-sm rounded-lg shadow-xl"
							aria-label="Open Mobile Menu"
						>
							<Menu className="w-6 h-6" />
						</Button>
					</SheetTrigger>
				</div>

				<SheetContent side="left" className="w-[80%] sm:w-[540px] pt-12">
					<SheetHeader>
						<SheetTitle className="flex items-center gap-2 text-2xl font-bold">
							<Image
								src="/logo.png"
								width={120}
								height={60}
								alt="company logo"
								className="w-[100px] h-auto max-w-full contrast-0 dark:contrast-100"
							/>
						</SheetTitle>
					</SheetHeader>

					<div className="flex flex-col gap-4 mt-8 text-lg font-medium">
						{navItems.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className="py-2 px-4 rounded-lg hover:bg-accent/50 transition-colors"
								onClick={closeMobileSheet}
							>
								{item.name}
							</Link>
						))}

						<div className="border-t pt-4 mt-4">
							{token != null ? (
								<Link
									href={'/profile'}
									className="py-2 px-4 rounded-lg hover:bg-accent/50 flex items-center gap-3 transition-colors text-primary"
									onClick={closeMobileSheet}
								>
									<User2 className="w-5 h-5" />
									Profile
								</Link>
							) : (
								<>
									<Link
										href="/login"
										className="py-2 px-4 rounded-lg hover:bg-accent/50 flex items-center gap-3 transition-colors"
										onClick={closeMobileSheet}
									>
										<LogIn className="w-5 h-5" />
										Log In
									</Link>
									<Link
										href="/register"
										className="py-2 px-4 rounded-lg hover:bg-accent/50 flex items-center gap-3 transition-colors"
										onClick={closeMobileSheet}
									>
										<UserPlus className="w-5 h-5" />
										Sign Up
									</Link>
								</>
							)}
						</div>

						<div className="mt-6 flex items-center justify-between px-4 py-2 border rounded-lg bg-secondary/30">
							<span className="font-semibold text-base">Theme:</span>
							<ThemeChanger />
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</>
	);
}
