import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { AuthProvider } from "@/providers/AuthProvider/Provider";
import { ModelProvider } from "@/providers/ModelProvider/Provider";
import { QueryProvider } from "@/providers/QueryProvider/Provider";
import "./globals.scss";
import "./globals.css";
import { AuthorizationButton } from "@/components/business/Authorization";
import { ModelSelect } from "@/components/business/ModelSelect";
import { Sidebar } from "@/components/business/Sidebar";
import { Subscription } from "@/components/business/Subscription";
import styles from "./layout.module.scss";

const rubik = Rubik({
  variable: "--font-rubik",
  fallback: ["intl", "sans-serif"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JonuAI",
  description: "Best AI assistant for your daily life.",
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json"></link>
        <link
          rel="icon"
          href="/favicon.ico?favicon.ico"
          sizes="48x48"
          type="image/x-icon"
        ></link>
        <link
          rel="icon"
          href="/icon0.svg?icon0.svg"
          sizes="any"
          type="image/svg+xml"
        ></link>
        <link
          rel="icon"
          href="/icon1.png?icon1.png"
          sizes="96x96"
          type="image/png"
        ></link>
        <link
          rel="apple-touch-icon"
          href="/apple-icon.png?apple-icon.22c81a72.png"
          sizes="180x180"
          type="image/png"
        ></link>
        <meta name="apple-mobile-web-app-title" content="JonuAI" />
        <meta
          name="google-site-verification"
          content="kOMBcuVi1F7zH0Rj3nyl0v3HiIyN2OUJwcvY99xFYpY"
        />
      </head>
      <body className={`${rubik.variable}`}>
        <QueryProvider>
          <AuthProvider>
            <ModelProvider>
              <div className={styles.page}>
                <Sidebar />
                <div className={styles.mainContent}>
                  <header className={styles.header}>
                    <Sidebar forMobile />
                    <div className={styles.leftContent}>
                      <h1>Jonu</h1>
                      <ModelSelect />
                    </div>

                    <div className={styles.rightContent}>
                      <Subscription />
                      <AuthorizationButton />
                    </div>
                  </header>

                  <main className={styles.main}>{children}</main>
                </div>
              </div>
              {modal}
            </ModelProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
