# 🧘‍♀️ DIRO Pilates Reservation App

> A modern, responsive web application for booking Pilates sessions, built for the DIRO Technical Test.

## 🚀 Live Demo
**[View Live Demo](https://pilares-nu.vercel.app/)**

## 📋 Overview
This application streamlines the reservation process for Pilates classes. It features a user-friendly 3-step wizard flow allowing users to select a date, choose a studio, pick a time slot, and complete the booking with a simulated payment process.

The project focuses on **Clean Architecture**, **State Management**, and **User Experience (UX)**.

## ✨ Key Features
- **3-Step Booking Wizard:** Intuitive flow (Date Selection -> Studio Selection -> Time Slot).
- **Global State Management:** Powered by **Zustand** to eliminate prop drilling and manage reservation flow efficiently.
- **Robust Validation:** Prevents users from proceeding without selecting required data.
- **Data Persistence:** Booking details are securely backed up to `LocalStorage` to prevent data loss on page refresh (Success Page).
- **Responsive UI:** Built with **Tailwind CSS** and **Shadcn UI** for a seamless mobile and desktop experience.
- **Mock Payment Integration:** Simulated payment flow with success receipt generation.

## 🛠️ Tech Stack

**Frontend:**
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** Shadcn UI (Radix Primitives)
- **Icons:** Lucide React

**State Management & Logic:**
- **Zustand:** For global client-side state.
- **Date-fns:** For robust date manipulation.
- **Sonner:** For toast notifications.

## 📂 Project Structure

```bash
src/
├── app/                  # Next.js App Router pages
│   ├── api/              # API Routes (Mock Backend)
│   ├── payment-success/  # Success Page
│   └── page.tsx          # Main Booking Flow
├── components/
│   ├── booking/          # Booking specific components (Wizard, Slots, Form)
│   └── ui/               # Reusable UI components (Buttons, Inputs)
├── store/
│   └── useBookingStore.ts # Zustand Store (Centralized Logic)
├── lib/
│   └── utils.ts          # Helper functions (Currency formatter, etc.)
└── types/                # TypeScript interfaces
