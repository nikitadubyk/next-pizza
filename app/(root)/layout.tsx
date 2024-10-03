import type { Metadata } from "next";

import { Header } from "@/components/shared";

export const metadata: Metadata = {
  title: "Next Pizza | Главная",
  description: "Самая вкусная пицца во вселенной",
};

export default function HomeLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      {modal}
    </>
  );
}
