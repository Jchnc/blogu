import { BASE_URL } from "@/utils/constants";
import MenuBar from "@/components/MenuBar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import "@blocknote/core/fonts/inter.css";

export const metadata: Metadata = {
	metadataBase: new URL(BASE_URL),
	title: {
		default: "Blogu",
		template: "%s | Blogu"
	},
	description: "A simple blog platform",
	keywords: [
		"blog",
		"simple",
		"platform",
		"nextjs",
		"mantine",
		"blocknote",
		"Jean",
		"Navarro"
	],
	authors: [{ name: "Jean Navarro" }],
	creator: "Jean Navarro"
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="m-auto container">
					<main>
						<MenuBar />
						{children}
					</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
