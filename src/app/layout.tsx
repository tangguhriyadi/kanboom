import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";

const outfit = Outfit({ subsets: ["latin"] });

export const generateMetadata = (): Metadata => {
    const isLocal = process.env.ENV_IS_LOCAL;

    const url = isLocal
        ? "http://localhost:3000"
        : "https://tangguhriyadi.vercel.app";

    return {
        metadataBase: new URL(url),
        title: "KanBoom | Kanban Apps by Muhammad Tangguh Riyadi",
        description: "Kanban Apps by Muhammad Tangguh Riyadi",
        icons: {
            icon: ["/kb.png"],
        },
    };
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={outfit.className}>
                <header>
                    <Navbar />
                </header>
                {children}
                <Footer />
            </body>
        </html>
    );
}
