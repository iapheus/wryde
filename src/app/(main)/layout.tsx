import Navbar from '@/components/Shared/Navbar';

import { ThemeProvider } from '@/lib/theme-provider';
import Footer from '@/components/Shared/Footer';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className="w-full h-full m-0 p-0 box-border"
		>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<body className="">
					<Navbar />
					{children}
					<Footer />
				</body>
			</ThemeProvider>
		</html>
	);
}
