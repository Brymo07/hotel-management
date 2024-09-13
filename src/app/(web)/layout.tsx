import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from '@/components/Header/Header'; // imported the header file so it can be accessed here for use
import Footer from '@/components/Footer/Footer'; // imported the footer file so it can be accessed here for use
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider/ThemeProvider";
import { NextAuthProvider } from "@/components/AuthProvider/AuthProvider";
import Toast from "@/components/Toast/Toast";


// changed font family from inter to Poppins and added weight, style and variable
const poppins = Poppins({ subsets: ["latin"],  
  weight: ['400', '500', '700', '900'], 
  style: ['italic', 'normal'], 
  variable: '--font-poppins' 
});

export const metadata: Metadata = {
  title: "Hotel Management App",
  description: "Discover the best hotel experience like never before",
};

/*
  called the Poppins class to be used by the pages.
  added the header and footer sections
*/
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css'
          crossOrigin='anonymous'
        />
      </head>
      <body className={poppins.className}> 
        <NextAuthProvider>
        <ThemeProvider>
          <Toast />
          <main className="font-normal">
            <Header />
            {children}
            <Footer />
          </main>
        </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
