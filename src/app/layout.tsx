import MenuBar from "@/components/MenuBar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import "@blocknote/core/fonts/inter.css";

export const metadata: Metadata = {
	title: "Blogu - Your blog",
	description: "Personal blog by Jean Christopher Navarro"
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
