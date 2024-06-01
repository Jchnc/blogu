import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MenuBar from "@/components/MenuBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Blogu - Your blog",
	description: "Personal blog by Jean Christopher Navarro",
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<main className="m-auto container">
					<MenuBar />
					{children}
				</main>
			</body>
		</html>
	);
}
