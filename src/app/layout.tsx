// This is for the metadat and the top bar and sets the fonts.

///////////////////////////////////////////////////////////////////////

// This is for the metadata of the page
import type { Metadata } from "next";
// This is for the image on the top bar
import Image from "next/image"
//This is for the local font
import localFont from "next/font/local";
//This is for the professor image
import Professor from "@/images/professor.webp";
// This is fro tailwind CSS
import "./globals.css";

// Sets what the default sans font is for tailwind css
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

// Sets what the defualt font is for Mono in tailwind css
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

//Sets the title, the description for sharing links, favicon needs fixing
export const metadata: Metadata = {
  //Give the course title
  title: "Linguistics Chatbot",
  //Gives info about the site
  description: "This is a chatbot that is made to review the lingustics course",
  //Tries to give favicon, but needs fixing
  icons:"/favicon1.ico"
};

export default function RootLayout({
  //All of the individual pages
  children,
}: Readonly<{
  //Makes it so this does not change the pages
  children: React.ReactNode;
}>) {
  return (
    //top bar navigation and display
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <header className="bg-cyan-900 w-screen h-[14vh] flex flex-row content-center place-items-center">
        <Image src={Professor} alt="professor" width="100"className="w-32"></Image>
        <h1 className="font-mono ml-16 text-white text-4xl">Lingustics Chatbot</h1>
      </header>
        {children}
      </body>
    </html>
  );
}
