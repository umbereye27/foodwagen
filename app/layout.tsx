"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../store";
import Footer from "../components/Footer";
import { Header } from "@/components/Header";
import { useState } from "react";
import AddEditMealModal from "@/components/modals/AddEditMealModal";
import { createFoodThunk } from "@/store/foods-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [addOpen, setAddOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleAdd = async (values: any) => {
    await dispatch(
      createFoodThunk({
        name: values.food_name,
        rating: values.food_rating,
        image: values.food_image,
        restaurant: {
          name: values.restaurant_name,
          logo: values.restaurant_logo,
          status: values.restaurant_status,
        },
      })
    ).unwrap();
    setAddOpen(false);
  };

  return (
    <>
      <Header onAddClick={() => setAddOpen(true)} />
      {children}
      <Footer />
      <AddEditMealModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={handleAdd}
        isSubmitting={false}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <LayoutContent>{children}</LayoutContent>
        </Provider>
      </body>
    </html>
  );
}
