import './globals.css';
import { ThemeProvider } from '@/lib/theme-provider';

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
				defaultTheme="dark"
				enableSystem
				disableTransitionOnChange
			>
				<body className="">{children}</body>
			</ThemeProvider>
		</html>
	);
}
