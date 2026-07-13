import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"The Boiling Seafood | Phnom Penh",description:"Bold catch, big flavor. The Boiling Seafood restaurant in Phnom Penh."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
