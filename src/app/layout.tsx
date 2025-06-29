import type { Metadata } from "next";
import "./globals.css";
import ReduxProviderWrapper from "@/redux/redux-provider/reduxProviderWrapper";
import { DashboardToaster } from "@/components/ui/Toster";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Harmoni Admin"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ReduxProviderWrapper>{children}</ReduxProviderWrapper>
        <DashboardToaster />
        <Toaster position="top-right" />

      </body>
    </html>
  );
}
