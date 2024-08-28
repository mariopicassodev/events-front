import { Inter } from "next/font/google";
import "./globals.css";
import { i18n } from "../../../i18n-config";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata = {
    title: "Events App",
    description: "Events app with two languages"
};

export default function RootLayout({ children, params }) {
    return (
        <html lang={params.lang}>
            <body className={inter.className}>
                <Navbar params={params} />
                {children}
            </body>
        </html>
    );
}
