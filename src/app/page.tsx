"use client";

import { useEffect, useState } from "react";
import { Court, TimeSlot } from "../lib/reservationData";
import Content from "../components/booking/Content";
import Footer from "../components/booking/Footer";
import Navbar from "../components/booking/Navbar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<
    TimeSlot | undefined
  >();
  const [selectedCourt, setSelectedCourt] = useState<Court | undefined>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const handlePaymentComplete = () => {
    toast.success("Payment successful! Booking confirmed 🎉");
    setIsPaymentSuccess(true);
  };

  useEffect(() => {
    if (!isPaymentSuccess) return;

    const timer = setTimeout(() => {
      router.refresh();
    }, 1500);

    return () => clearTimeout(timer);
  }, [isPaymentSuccess, router]);

  return (
    <div className="bg-[#e6edf4] min-h-screen py-5 lg:px-5 md:px-5 px-5 w-full flex flex-col font-sans">
      <Navbar />

      <Content
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        selectedTimeSlot={selectedTimeSlot}
        onSelectTimeSlot={setSelectedTimeSlot}
        selectedCourt={selectedCourt}
        onSelectCourt={setSelectedCourt}
        onPaymentComplete={handlePaymentComplete}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
        isPaymentSuccess={isPaymentSuccess}
      />

      <Footer />
    </div>
  );
}
