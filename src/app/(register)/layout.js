import { Prompt } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navigation"
import Footersection from '@/components/Footersection'

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300"],
  variable: "--font-prompt",
});

export const metadata = {
  title: "เว็บไซต์ซื้อขายสินค้าออนไลน์",
  description: "กางเกงยีน ชุดกีฬา รองเท้า เสือเชิต",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${prompt.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
