import type { Metadata } from "next";
import "./globals.css";
import {MotionProvider} from "@/components/motion-provider";
export const metadata:Metadata={title:"The Boiling Seafood | Cajun Seafood in Phnom Penh",description:"Fresh Cajun seafood boils with bold Louisiana flavor. Dine-in, pick-up and delivery daily from 11am–11pm at #20 Street 302, BKK1, Phnom Penh."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><MotionProvider>{children}</MotionProvider></body></html>}
